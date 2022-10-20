import axios from "axios";
import { ethers, Wallet } from "ethers";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link, useNavigate, useParams } from "react-router-dom";
import Web3Modal from "web3modal";
import { handleApiCall } from "../../api";
import SVG_3 from "../../assets/img/section-image/3.svg";
import SVG_4 from "../../assets/img/section-image/4.svg";
import { logout } from "../../redux/Slice/Logout";
import MetaData from "../../hoc/Helmet";
import moment from "moment";
import AuctionTimeBid from "../AutionTimeBid";
import {
  setCurrentActivity,
  setCurrentNft,
} from "../../redux/Slice/NftDetails";
import { abi, endpoints } from "../../utils/endpoints";
import { PopUp } from "../../utils/utility";
import LazyMinter from "../../utils/web3/lazyMinter";
import Loader from "../commons/Loader";
import Modal from "../commons/Modal/Modal";
import ViewNftSlider from "../ViewNftSlider";
import SocialShare from "../SocialShare/SocialShare";
import {
  resaleNFT,
  resaleApprove,
  resaleBuyApprove,
  resaleBuyConfirmation,
} from "../../utils/functions/resaleNft";
import { setNftSellerAddr } from "../../redux/Slice/NftDetails";
import { cancelNftResell } from "../../utils/functions/cancelNFTResell";
import ETH_IMAGE_SVG from "../../assets/img/section-image/etherim.svg";

const CREATOR_IMAGE = require("../../assets/img/home/blue-check.png");
const FEATURED_IMG = require("../../assets/img/section-image/slide-1.png");
const CHECKOUT_IMG = require("../../assets/img/section-image/nft-table.png");
const ROUND_CHECK = require("../../assets/img/section-image/round-check.png");

function NftDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(
    (state) => state?.registerUser?.userTokens?.data
  );
  const userRoleData = useSelector((state) => state?.registerUser);
  const pattern = /^((http|https|ftp):\/\/)/;
  const USDPrice = useSelector(
    (state) => state?.homeInfo?.currentUSDPrice?.usd_price
  );
  useEffect(async () => {
    const result = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    let price = ethers.utils.parseEther(
      (nftData?.token_owner?.price).toString()
    );

    let balance = await getWETHbalance(result[0]);
    console.log("GET price", Number(price._hex));
  }, []);
  useEffect(async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    let walletMnemonic = Wallet.fromMnemonic(process.env.REACT_APP_MNEMONIC);
    let wallet = walletMnemonic.connect(provider);

    console.log(wallet, "wwallet");
  }, []);
  const userAuth = useSelector((state) => state?.registerUser);
  const [show, setShow] = useState(false);
  const [isNftDetailVisible, setIsNftDetailVisible] = useState(true);
  const [isCustomPropsVisible, setIsCustomPropsVisible] = useState(true);
  const [isZIPDetailVisible, setIsZIPDetailVisible] = useState(true);
  const [isTechDetailVisible, setIsTechDetailVisible] = useState(true);
  const [showNested, setShowNested] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showBid, setShowBid] = useState(false);
  const [isReportVisible, setIsReportVisible] = useState(false);
  // const [isShareOptionVisible, setIsShareOptionVisible] = useState(false);
  const [nftData, setNftData] = useState({});
  const [activityData, setActivityData] = useState([]);
  const [message, setMessage] = useState("");
  // const [likedStatus, setLikedStatus] = useState("");
  const [isFav, setIsFav] = useState(null);
  const [isEditPriceVisible, setIsEditPriceVisible] = useState(false);
  const [nftPrice, setNftPrice] = useState(0);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [listing, setListing] = useState([]);
  const [isAcceptDisable, setIsAcceptDisable] = useState(false);
  const [bidPrice, setBidPrice] = useState(0);
  const [bidPriceError, setBidPriceError] = useState("");
  const [offeringDetail, setOfferingDetail] = useState([]);
  const [isOnBid, setIsOnBid] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [socialPopup, setSocialPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancel, setShowCancel] = useState(false);
  const [zipDownload, setZipDownload] = useState(false);
  const [showResaleModal, setShowResaleModal] = useState(false);
  const [showResaleModalVal, setShowResaleModalVal] = useState(false);
  const [resaleVal, setResaleVal] = useState("");
  const [vData, setVData] = useState();

  useEffect(() => {
    dispatch(setNftSellerAddr(nftData?.token_owner?.seller_id));
  }, []);

  console.log("hash", nftData?.token_owner?.seller_id);

  useEffect(() => {
    defaultFunctionCalls();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const defaultFunctionCalls = () => {
    setIsLoading(true);
    getNftDetail();
    getActivity();
    getLikeDetail();
    handleViewCount();
    getOfferingDetails();
  };
  const handleViewCount = async () => {
    const config = {
      method: "get",
      url: "https://api.ipify.org?format=json",
      headers: {},
    };
    const ip = await axios(config);
    let payload = {
      ip: ip?.data?.ip,
      token_id: id,
      date: new Date().toISOString(),
    };
    await handleApiCall("post", `${endpoints.updateViewCount}`, payload);
  };
  const handleLikeNft = async (type) => {
    let data = {
      token_id: id,
      user_id: userData?._id,
      token_count: nftData?.token_count,
      wallet_address: userData?.wallet_address,
    };
    if (type === "like") {
      data["is_favourited"] = 1;
    } else if (type === "dislike") {
      data["is_favourited"] = 0;
    }
    const response = await handleApiCall("post", `${endpoints.addFav}`, data);
    if (response?.data?.success) {
      getLikeDetail();
      getNftDetail();
    }
  };
  const getListing = async (count) => {
    const response = await handleApiCall(
      "get",
      `${endpoints.getListing}${count}`
    );
    if (response?.data?.success) {
      setListing(response?.data?.data);
    }
  };
  const getNftDetail = async () => {
    const response = await handleApiCall(
      "get",
      `${endpoints.getNFTDetails}${id}`
    );

    if (response?.data?.success) {
      if (response?.data?.data.length) setNftData(response?.data?.data[0]);
      else {
        PopUp("Something Went Wrong", "Blocked NFT", "error");
        navigate("/");
      }
      getListing(response?.data?.data?.[0].token_count);

      dispatch(setCurrentNft(response?.data?.data[0]));
    } else {
      navigate("/");
    }
  };
  const getLikeDetail = async () => {
    const response = await handleApiCall(
      "get",
      `${endpoints.getLikeStatus}token_id=${id}&user_id=${userData?._id}`
    );

    if (response?.data?.success) {
      setIsFav(response?.data?.data?.is_favourited);
    }
  };
  const getActivity = async () => {
    const response = await handleApiCall("post", `${endpoints.getActivity}`, {
      id,
    });
    if (response?.data?.success) {
      setActivityData(response?.data?.data);
      dispatch(setCurrentActivity(response?.data?.data));
    }
  };
  const updatePrice = async () => {
    if (nftPrice) {
      try {
        const response = await handleApiCall(
          "put",
          `${endpoints.editNftPrice}`,
          {
            id: nftData?.token_owner?._id,
            price: +nftPrice,
          }
        );
        if (response?.data?.success) {
          setIsEditPriceVisible(false);
          signature(nftData?.token_owner?.ipfs_uri);
        }
      } catch (error) {
        PopUp("Something Went Wrong", "Internal Server Error", "error");
      }
    }
  };
  const handleUpdateVoucher = async (voucher) => {
    await handleApiCall("put", `${endpoints.updateVoucher}`, {
      id: nftData?.token_owner?._id,
      signature: voucher,
    });
    getActivity();
    getLikeDetail();
    handleViewCount();
    getNftDetail();
  };
  const signature = async (uri) => {
    const web3Modal = new Web3Modal({
      network: "mumbai",
      cacheProvider: true,
    });

    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const nftaddress = "0x06453C6188Dc121B4695d5437a0F9340E11DdA45";
    let contract = new ethers.Contract(abi.nftAddress, abi.nft13, signer);
    let lazyMinter = new LazyMinter({ contract: contract, signer: signer });
    let price = ethers.utils.parseEther(nftData?.token_owner?.price.toString());
    await lazyMinter
      .createVoucher(nftData?.token_count, uri, price)
      .then((voucher) => {
        const { signature, tokenId, uri } = voucher;

        setVData(voucher);

        console.log(voucher, "vou");
        handleUpdateVoucher(voucher);
      })
      .catch((error) => {
        PopUp("Metamask Error", "Not Able to Sign Voucher", "error");
      });
  };
  const handleAcceptModal = () => {
    if (nftData?.blockchain === "Eth on polygon" || "Eth") {
      setIsAcceptDisable(true);
      approval(nftData?.token_owner?.price, undefined);
    } else {
      setShow(false);
      setShowNested(true);
    }
  };
  const handleConfirmModal = () => {
    if (isAgreed) {
      if (nftData?.blockchain === "Eth on polygon" || "Eth") {
        WETHbuy();
      } else {
        Maticbuy();
      }
    }
  };
  const handleReportInput = (message = "") => {
    setMessage(message);
  };
  const handleReport = async () => {
    if (!userData) {
      PopUp(
        "Authentication Error",
        "Please login to perform this action",
        "error"
      );
      return;
    }
    if (message) {
      const response = await handleApiCall("post", `${endpoints.postReport}`, {
        report_type: "nft",
        message,
        from_id: userData?._id,
        from_address: userData?.wallet_address,
        token_id: nftData?.token_owner?.token_id,
        token_count: nftData?.token_count,
      });
      if (response?.data?.success) {
        setMessage("");
        setIsReportVisible(false);
        PopUp("Success", "Reported Successfully", "success");
      } else {
        PopUp("Interval Server Error", "Please try again", "error");
      }
    } else {
      PopUp("Message Error", "Please enter message.", "error");
    }
  };
  const whichButtonNeedToShow = () => {
    if (
      userAuth?.userTokens?.accessToken &&
      userAuth?.currentRole === "Creator" &&
      userData?._id === nftData?.user_id &&
      !nftData?.token_owner //Check if Nft is not on sale
    ) {
      return "edit&Sell";
    } else if (
      userAuth?.userTokens?.accessToken &&
      userAuth?.currentRole === "Creator" &&
      userData?._id === nftData?.user_id &&
      nftData?.token_owner &&
      nftData?.token_owner?.on_sale === 0 &&
      nftData?.token_owner?.sold === 0
    ) {
      return "edit&Sell";
    } else if (
      userAuth?.userTokens?.accessToken &&
      userAuth?.currentRole === "Creator" &&
      userData?._id === nftData?.user_id &&
      nftData?.token_owner?.on_sale === 0 &&
      nftData?.token_owner?.sold === 0
    ) {
      return "edit&Sell";
    } else if (
      userAuth?.userTokens?.accessToken &&
      userAuth?.currentRole === "Creator" &&
      userData?._id === nftData?.user_id &&
      nftData?.token_owner?.on_sale === 1 &&
      nftData?.token_owner?.sold === 0
    ) {
      return "edit";
    } else if (
      userAuth?.userTokens?.accessToken &&
      userAuth?.currentRole === "User" &&
      nftData?.token_owner?.on_sale === 1 &&
      nftData?.token_owner?.sold === 0 &&
      nftData?.token_owner?.type === "Fixed"
    ) {
      return "buynow";
    } else if (
      userAuth?.userTokens?.accessToken &&
      userAuth?.currentRole === "User" &&
      nftData?.token_owner?.sold === 0 &&
      nftData?.token_owner?.on_sale === 1 &&
      nftData?.token_owner?.type === "Auction"
    ) {
      return "placeabid";
    } else if (!nftData?.token_owner) {
      return "NotOnSale";
    } else if (
      userAuth?.userTokens?.accessToken &&
      nftData?.token_owner?.on_sale === 1 &&
      userAuth?.currentRole === "Creator"
    ) {
      return "creator";
    } else {
      return "visitor";
    }
  };
  const isHeIsUserOrCreator = () => {
    if (userAuth?.currentRole === "Creator") {
      return "Creator";
    } else if (userAuth?.currentRole === "User") {
      return "User";
    } else {
      return "Visitor";
    }
  };
  const checkEtherium = () => {
    if (window.ethereum.isConnected() && window.ethereum.selectedAddress) {
    } else {
      PopUp("Metamask Error", "Please connect account in metamask", "warning");
      return;
    }
    if (+window.ethereum.networkVersion !== abi.chainId) {
      PopUp("Network Error", "Please change your network", "error");
      window.ethereum.request({
        method: "eth_requestAccounts",
        params: [
          {
            chainId: "0x13881",
            rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            chainName: "Polygon Testnet Mumbai",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          },
        ],
      });
      return;
    }
  };

  const handleBuyNow = async () => {
    console.log("BUYYYY NOW FIRST");
    const result = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    let price = ethers.utils.parseEther(
      (nftData?.token_owner?.price).toString()
    );

    let balance = await getWETHbalance(result[0]);
    checkEtherium();

    let newBalance = Number(ethers.utils.formatEther(balance));
    let newPrice = Number(ethers.utils.formatEther(price._hex));

    if (newBalance >= newPrice) {
      setShow(true);

      console.log("Get Called");
    } else {
      PopUp(
        `Your Balance is insufficent ${ethers.utils.formatEther(balance)} WETH`,
        "",
        "error"
      );
      return;
      console.log("Get Error");
    }
  };

  const approval = async (bidPrice, final) => {
    const web3Modal = new Web3Modal({
      network: "mumbai",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const tokenaddress = abi.tokenAddress;
    const nftaddress = abi.nftAddress;

    let token = new ethers.Contract(tokenaddress, abi.weth, signer);
    try {
      if (nftData?.token_owner?.type !== "Auction") {
        let price = ethers.utils.parseEther(
          (nftData?.token_owner?.price).toString()
        ); //minimum price
        let result = await token.approve(nftaddress, price);
        setShow(false);
        setIsAcceptDisable(false);
        setShowNested(true);
      } else {
        setIsOnBid(true);
        let mainprice = ethers.utils.parseEther(bidPrice.toString()); //minimum price
        let result = await token.approve(nftaddress, mainprice);
        let handle;
        let receipt;
        let tx = await result.wait();
        if (tx?.confirmations >= 1) {
          finalBidPlace();
        } else {
          setIsOnBid(false);
          PopUp("Transaction Failed", "Please try again", "error");
        }
        return;
      }
    } catch (error) {
      setIsOnBid(false);

      PopUp("Approval Error", error?.message, "error");
      return;
    }
  };
  const Maticbuy = async () => {
    const web3Modal = new Web3Modal({
      network: "mumbai",
      cacheProvider: true,
    });

    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const nftaddress = abi.nftAddress;
    let contract = new ethers.Contract(nftaddress, abi.nft13, signer);
    let price = ethers.utils.parseEther(nftData?.token_owner?.price.toString()); //minimum price
    let voucher = nftData?.token_owner?.signature;
    let royality = nftData?.token_owner?.future_royality;
    royality = royality ? royality : 0;
    setIsBuying(true);

    let result;
    try {
      result = await contract.createAndBuyTokenWETH(
        voucher,
        parseInt(royality) ? parseInt(royality) : 0,
        abi.zeroAddress,
        {
          value: price,
        },

        {
          gasLimit: 1000000, //Gas Limit.....
        }
      );

      const tx = await result.wait();
      console.log("createAndBuyTokenWETH", tx.events);

      if (tx.events[6].args[0]._hex) {
        const response = await handleApiCall(
          "post",
          `${endpoints.purchaseNFT}`,
          {
            id: nftData?._id,
            hash_value: result?.hash,
            owner_addr: userData?.wallet_address,
            market_id: tx.events[6].args[0]._hex,
          }
        );
        if (response?.data?.success) {
          setTransactionHash(result?.hash);
          setShowNested(false);
          setShowConfirm(true);
          setZipDownload(true);
        } else {
          PopUp("Something went wrong", "Please Try Again", "error");
        }
      }
    } catch (error) {
      PopUp("Transaction Error MATIC", error?.message, "error");
    }

    setIsBuying(false);
  };

  const getWETHbalance = async (address) => {
    const web3Modal = new Web3Modal({
      network: "mumbai",
      cacheProvider: true,
    });

    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let token = new ethers.Contract(abi.tokenAddress, abi.weth, signer);

    let result = await token.balanceOf(address);

    return result._hex;
  };

  const WETHbuy = async () => {
    const web3Modal = new Web3Modal({
      network: "mumbai",
      cacheProvider: true,
    });

    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const tokenaddress = abi.tokenAddress;

    const nftaddress = abi.nftAddress;
    let contract = new ethers.Contract(nftaddress, abi.nft13, signer);
    let token = new ethers.Contract(tokenaddress, abi.weth, signer);
    let price = ethers.utils.parseEther(
      (nftData?.token_owner?.price).toString()
    );
    let voucher = nftData?.token_owner?.signature;
    let royality = nftData?.token_owner?.future_royality;
    royality = royality ? royality : 0;
    setIsBuying(true);

    //Below line 61 is to  web3 call for only matic and 64 to 67 is for WETH
    let result;
    try {
      result = await contract.createAndBuyTokenWETH(
        voucher,
        parseInt(royality) ? parseInt(royality) : 0,
        tokenaddress,
        {
          gasLimit: 1000000, //Gas Limit.....
        }
      );

      const tx = await result.wait();
      console.log("createAndBuyTokenWETH", tx.events[6].args[0]._hex);

      if (tx.events[6].args[0]._hex) {
        const response = await handleApiCall(
          "post",
          `${endpoints.purchaseNFT}`,
          {
            id: nftData?._id,
            hash_value: result?.hash,
            owner_addr: userData?.wallet_address,
            market_id: tx.events[6].args[0]._hex,
          }
        );
        if (response?.data?.success) {
          setTransactionHash(result?.hash);
          setShowNested(false);
          setShowConfirm(true);
        } else {
          PopUp("Something went wrong", "Please Try Again", "error");
        }
      }
    } catch (error) {
      PopUp("Transaction Error WETH", error?.message, "error");
    }

    setIsBuying(false);
  };
  const handleAfterConfirm = () => {
    setShowConfirm(false);
    getNftDetail();
  };
  const handlePlaceBid = async () => {
    setShowBid(true);
  };
  const PlaceBid = async () => {
    checkEtherium();

    const result = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let price = ethers.utils.parseEther(
      (nftData?.token_owner?.price).toString()
    );
    let balance = await getWETHbalance(result[0]);
    checkEtherium();
    let newBalance = Number(ethers.utils.formatEther(balance));
    let newPrice = Number(ethers.utils.formatEther(price._hex));
    if (newBalance >= newPrice) {
      approval(bidPrice, finalBidPlace);

      console.log("Get Called");
    } else {
      PopUp(
        `Your Balance is insufficent ${ethers.utils.formatEther(balance)} WETH`,
        "",
        "error"
      );
      return;
      console.log("Get Error");
    }
  };

  const finalBidPlace = async () => {
    const web3Modal = new Web3Modal({
      network: "mumbai",
      cacheProvider: true,
    });

    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    let token = new ethers.Contract(abi.tokenAddress, abi.weth, signer);

    const nftaddress = abi.nftAddress;
    const tokenaddress = abi.tokenAddress;
    setIsOnBid(true);

    let contract = new ethers.Contract(nftaddress, abi.nft13, signer);
    let resellContract = new ethers.Contract(
      abi.resaleAddress,
      abi.resale,
      signer
    );
    let price = ethers.utils.parseEther(bidPrice.toString()); //minimum price
    let result;
    let tx;
    try {
      if (nftData?.is_lock) {
        let result1 = await token.approve(abi.resaleAddress, price, {
          gasLimit: 1000000,
        });

        let tx3 = await result1.wait();

        if (tx3.events[0]) {
          result = await resellContract.resaleBid(
            nftData?.token_owner?.token_count,
            price,
            abi.nftAddress,
            Number(nftData?.market_id),
            {
              gasLimit: 1000000,
            }
          );
        }
      } else {
        let result1 = await token.approve(abi.nftAddress, price, {
          gasLimit: 1000000,
        });

        let tx3 = await result1.wait();

        if (tx3.events[0]) {
          result = await contract.bid(Number(nftData?.market_id), price, {
            gasLimit: 1000000,
          });
        }
      }

      tx = await result.wait();

      if (tx?.confirmations >= 1) {
        setTransactionHash(result?.hash);
        setShowBid(false);
        placeABid();
      } else {
        setIsOnBid(false);
        PopUp("Transaction Failed", "Please try again", "error");
      }
    } catch (error) {
      PopUp("Something Went Wrong", error?.message, "error");
      setShowBid(false);
      setIsOnBid(false);
    }
  };

  const handleBidPrice = (price) => {
    setBidPriceError("");
    setBidPrice(price);
    let mainPrice = nftData?.bid_maxPrice
      ? nftData?.bid_maxPrice
      : nftData?.token_owner?.price;

    if (price <= mainPrice) {
      setBidPriceError(
        `Please Enter Higher Price than ${
          nftData?.bid_maxPrice
            ? nftData?.bid_maxPrice
            : nftData?.token_owner?.price
        }`
      );
    } else {
      setBidPriceError("");
      setBidPrice(price);
    }
  };

  const placeABid = async () => {
    try {
      const response = await handleApiCall("post", `${endpoints.placeBid}`, {
        token_id: nftData?._id,
        price: Number(bidPrice),
        user_address: userData?.wallet_address,
        user_id: userData?._id,
      });
      if (response?.data?.success) {
        setIsOnBid(false);
        PopUp("Bid Placed", "User Bid has been Placed", "success");
        getNftDetail();
        setTimeout(() => {
          navigate(`/view-nft/${id}`);
        }, 200);
      } else {
        setIsOnBid(false);
      }
    } catch (error) {
      setIsOnBid(false);

      PopUp("Internal server error", error?.message, "error");
    }
  };

  const getOfferingDetails = async () => {
    try {
      const response = await handleApiCall("get", `${endpoints.getBid}${id}`);
      if (response?.data?.success) {
        setOfferingDetail(response?.data?.data);
      } else {
        PopUp("Something went wrong", response?.data?.message, "error");
      }
    } catch (error) {
      PopUp("Internal server error", error?.message, "error");
      return;
    }
  };
  const getTimeInDays = (start = "", end = "") => {
    if (start && end) {
      let startDate = start.split("/");
      let endDate = end.split("/");
      const oneDay = 1000 * 60 * 60 * 24;
      const firstDate = new Date(
        `${+startDate[1]}/${+startDate[0]}/${+startDate[2]}`
      );
      const secondDate = new Date(
        `${+endDate[1]}/${+endDate[0]}/${+endDate[2]}`
      );
      let diffDays = secondDate.getTime() - firstDate.getTime();
      diffDays = diffDays / oneDay;

      return diffDays;
    }
  };

  const _handleAcceptBid = async (id, user_address) => {
    const web3Modal = new Web3Modal({
      network: "mumbai",
      cacheProvider: true,
    });

    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const nftaddress = abi.nftAddress;
    const tokenaddress = abi.tokenAddress;
    let contract = new ethers.Contract(nftaddress, abi.nft13, signer);
    let resellContract = new ethers.Contract(
      abi.resaleAddress,
      abi.resale,
      signer
    );

    let walletMnemonic = Wallet.fromMnemonic(process.env.REACT_APP_MNEMONIC);
    let wallet = walletMnemonic.connect(provider);

    let adminContract = new ethers.Contract(abi.nftAddress, abi.nft13, wallet);

    try {
      setIsAccept(true);
      let result;
      if (nftData?.is_lock) {
        await resellContract
          .resaleEnd(abi.nftAddress, Number(nftData?.market_id), user_address, {
            gasLimit: 1000000, //Gas Limit.....
          })
          .then(async () => {
            result = await adminContract.setOwner(
              Number(nftData?.market_id),
              user_address,
              {
                gasLimit: 2100000,
                gasPrice: 2000000000000,
                from: wallet.address, //Gas Limit.....
              }
            );
          });
      } else {
        result = await contract.end(
          Number(nftData?.market_id),
          nftData?.token_owner?.signature,
          user_address,
          {
            gasLimit: 1000000, //Gas Limit.....
          }
        );
      }
      let tx = await result.wait();
      if (tx?.confirmations >= 1) {
        setTransactionHash(result?.hash);

        _handleAcceptBidApi(id, result?.hash, user_address);
      } else {
        PopUp("Transaction Failed", "Please try again", "error");
      }
      setIsAccept(false);
    } catch (error) {
      PopUp("Something Went Wrong", error?.message, "error");
    }
  };
  const _handleAcceptBidApi = async (id, hash, user_address) => {
    setIsAccept(true);
    try {
      const response = await handleApiCall("post", `${endpoints.acceptBid}`, {
        id: id,
        hash_value: hash,
        owner_addr: user_address,
      });
      if (response?.data?.success) {
        PopUp("Bid Accept", "User Bid has been Accepted", "success");
        defaultFunctionCalls();
        window.location.reload();
      } else {
        PopUp("Bid Accept", "Internal server error", "error");
      }
    } catch (error) {
      PopUp("Internal server error", error?.message, "error");
    }
    setIsAccept(false);
  };

  const handleLogout = async () => {
    let response = await handleApiCall("put", `${endpoints.logout}`);
    if (response?.data?.success) {
      localStorage.clear();
      dispatch(logout());
      navigate("/connect-wallet");
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }
  };

  console.log(vData);

  const handleCancelNft = async () => {
    let response = await handleApiCall("put", `${endpoints.cancelNft}`, {
      id: nftData._id,
    });
    if (response?.data?.success) {
      PopUp("NFT listing cancelled", "", "success");
      navigate("/creator-profile");
    }
  };

  console.log("DATTA iddd", offeringDetail.user_address);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div>
        <section>
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-12">
                <div class="view-nft-banner">
                  <MetaData
                    title={nftData?.nft_name}
                    desc={nftData?.description}
                    url={`${endpoints.baseShareUrl}view-nft/${id}`}
                    image={nftData?.preview_image}
                  />
                  <div className="w-100">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <ViewNftSlider image={nftData?.nft_media} />
                    )}
                  </div>
                  <div class="view-details-wrap">
                    <span>
                      <i class="fa fa-eye"></i>
                      {nftData?.views_count?.view_count
                        ? nftData?.views_count?.view_count
                        : 0}
                    </span>

                    {isHeIsUserOrCreator() === "User" ? (
                      isFav === 1 ? (
                        <span onClick={() => handleLikeNft("dislike")}>
                          <i class="fa fa-heart"></i>
                          {nftData?.likeCountData?.like_count}
                        </span>
                      ) : (
                        <span onClick={() => handleLikeNft("like")}>
                          <i
                            class="fa fa-heart-o"
                            style={{ color: "#aca9a9" }}
                          ></i>
                          {nftData?.likeCountData?.like_count}
                        </span>
                      )
                    ) : (
                      <span>
                        <i
                          class="fa fa-heart-o"
                          style={{ color: "#aca9a9" }}
                        ></i>
                        {nftData?.likeCountData?.like_count}
                      </span>
                    )}
                  </div>
                  <ul class="action-nft-list">
                    <li>
                      <a
                        href="javascript:void(0);"
                        onClick={() => setSocialPopup(true)}
                      >
                        <img src={SVG_3} />
                      </a>
                    </li>
                    <li>
                      <a onClick={() => setIsReportVisible(true)}>
                        <img style={{ cursor: "pointer" }} src={SVG_4} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                <div style={{ height: "100%" }}>
                  <div
                    className="nft-description-wrap"
                    style={{
                      height:
                        nftData?.token_owner &&
                        nftData?.token_owner.type === "Auction" &&
                        nftData?.current_owner?.wallet_address ===
                          userData?.wallet_address
                          ? "82.6%"
                          : "100%",
                    }}
                  >
                    <div className="nft-description-head">
                      <span>Description</span>
                    </div>
                    <div className="nft-description-content">
                      <p>{nftData?.description}</p>
                    </div>
                  </div>
                  {nftData?.token_owner &&
                    nftData?.token_owner.type === "Auction" &&
                    nftData?.current_owner?.wallet_address ===
                      userData?.wallet_address && (
                      <div className="exp-wrapper mt-3">
                        <span className="exp-title pr-1">Expires:</span>
                        <AuctionTimeBid data={nftData?.token_owner?.end_date} />
                      </div>
                    )}
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                {isHeIsUserOrCreator() === "User" ? (
                  <div
                    className="digital-architecture-box"
                    style={{
                      margin: "0",
                      height:
                        nftData?.token_owner &&
                        nftData?.token_owner.type === "Auction"
                          ? "100%"
                          : "100%",
                    }}
                  >
                    <div className="digital-architecture-img">
                      <img
                        src={nftData?.preview_image}
                        style={{
                          height:
                            nftData?.token_owner &&
                            nftData?.token_owner.type === "Auction"
                              ? 245
                              : 272,
                        }}
                      />
                      <div className="view-details-wrap">
                        <span>
                          <i className="fa fa-eye" />
                          {nftData?.views_count?.view_count
                            ? nftData?.views_count?.view_count
                            : 0}
                        </span>
                        <span>
                          <i className="fa fa-heart" />
                          {nftData?.likeCountData?.like_count || 0}
                        </span>
                      </div>
                    </div>
                    <div className="box-details-wrap">
                      <h3>{nftData?.nft_name}</h3>
                      <ul className="listing-style-wrap">
                        <li>
                          <span className="first-col">Creator:</span>
                          <span className="second-col">
                            <a href="javascript:void(0);" tabIndex={0}>
                              {nftData &&
                                nftData?.creatorInfo &&
                                nftData?.creatorInfo.length > 0 &&
                                nftData?.creatorInfo?.[0]?.name}
                            </a>
                            {nftData?.creatorInfo[0]?.is_verify === 1 && (
                              <img
                                src={CREATOR_IMAGE}
                                style={{ width: "15px" }}
                              />
                            )}
                          </span>
                        </li>
                        <li>
                          <span className="first-col">Price:</span>
                          <span className="second-col">
                            <img
                              src={
                                nftData?.blockchain === "Ethereum" ||
                                nftData?.blockchain === "Eth on polygon"
                                  ? ETH_IMAGE_SVG
                                  : ETH_IMAGE_SVG
                              }
                            />
                            <span>
                              {nftData?.token_owner?.price || "Not On Sale"}
                            </span>
                            {nftData?.token_owner?.price && (
                              <span className="usdet-wrap">{`(US$ ${(
                                USDPrice * nftData?.token_owner?.price
                              ).toFixed(2)} )`}</span>
                            )}
                          </span>
                        </li>
                      </ul>
                      <div className="box-details-button box-details-button1 mt-4">
                        {nftData?.token_owner?.owner_addr ===
                          userData?.wallet_address &&
                          nftData?.token_owner?.on_sale === 0 && (
                            <Link
                              to={`/resale-nft/${
                                nftData?.token_owner?.type === "Fixed"
                                  ? "fixed"
                                  : "auction"
                              }/${nftData._id}`}
                              style={{
                                padding: "0px",
                              }}
                            >
                              <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                                List NFT for Resale
                              </a>
                            </Link>
                          )}

                        {nftData?.token_owner.seller_id !==
                          nftData?.creator_addr &&
                          nftData?.token_owner?.seller_id !==
                            userData?.wallet_address &&
                          nftData?.token_owner?.owner_addr !==
                            userData?.wallet_address &&
                          nftData?.token_owner?.type !== "Auction" && (
                            <a
                              className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                              onClick={() => setShow(true)}
                            >
                              Buy Now
                            </a>
                          )}

                        {whichButtonNeedToShow() === "buynow" &&
                          nftData?.token_owner.seller_id ===
                            nftData?.creator_addr &&
                          nftData?.token_owner?.seller_id !==
                            userData?.wallet_address &&
                          nftData?.token_owner?.owner_addr !==
                            userData?.wallet_address &&
                          nftData?.token_owner?.type !== "Auction" && (
                            <a
                              className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                              onClick={handleBuyNow}
                            >
                              Buy Now
                            </a>
                          )}

                        {console.log(userData?.wallet_address, "assssssdrerss")}
                        {console.log(
                          nftData?.token_owner?.seller_id,
                          "assssssdrerss seller"
                        )}

                        {nftData?.is_lock === 1 &&
                          nftData?.token_owner?.seller_id ===
                            userData?.wallet_address &&
                          nftData?.token_owner?.on_sale === 1 && (
                            <a
                              className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                              onClick={() => setShowCancel(true)}
                            >
                              Cancel
                            </a>
                          )}

                        {whichButtonNeedToShow() === "placeabid" &&
                          nftData?.token_owner?.on_sale === 1 &&
                          nftData?.current_owner?.wallet_address !==
                            userData?.wallet_address && (
                            <>
                              <div className="d-flex justfiy-content-between flex-column w-100">
                                <span class="f-13-500 mb-0 d-block">
                                  Last Bid:
                                </span>
                                <div class="lastbidinfo-button lbi-btn-group">
                                  <div className="lastbidinfo">
                                    <img
                                      src={
                                        nftData?.blockchain === "Ethereum" ||
                                        nftData?.blockchain === "Eth on polygon"
                                          ? ETH_IMAGE_SVG
                                          : ETH_IMAGE_SVG
                                      }
                                    />
                                    <div className="lastbidinfo-div px-1">
                                      <p className="mb-0 lastbidinfo-first p-0 w-100 border-0 bg-transparent">
                                        {nftData?.bid_maxPrice === null
                                          ? "None"
                                          : nftData?.bid_maxPrice}
                                      </p>
                                      <p className="mb-0 lastbidinfo-second p-0 w-100 border-0 bg-transparent">
                                        {nftData?.bid_maxPrice === null ? (
                                          `Not available`
                                        ) : (
                                          <>{`(US$ ${(
                                            USDPrice * nftData?.bid_maxPrice
                                          ).toFixed(3)})`}</>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                  <a
                                    class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                    onClick={() => setShowBid(true)}
                                    tabindex="0"
                                  >
                                    Placed Bid
                                  </a>
                                </div>
                              </div>
                            </>
                          )}
                        {whichButtonNeedToShow() === "NotOnSale" && (
                          <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                            Not yet on sale
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ) : isHeIsUserOrCreator() === "Creator" ? (
                  <div
                    class="digital-architecture-box flex-fill"
                    style={{ margin: "0" }}
                  >
                    <div class="digital-architecture-img">
                      <img
                        src={nftData?.preview_image}
                        style={{ height: "275px" }}
                      />
                      <div class="view-details-wrap">
                        <span>
                          <i class="fa fa-eye"></i>
                          {nftData?.views_count?.view_count
                            ? nftData?.views_count?.view_count
                            : 0}
                        </span>
                        <span>
                          <i class="fa fa-heart"></i>
                          {nftData?.likeCountData?.like_count || 0}
                        </span>
                      </div>
                    </div>
                    <div class="box-details-wrap">
                      <h3>{nftData?.nft_name}</h3>
                      <ul class="listing-style-wrap">
                        <li>
                          <span class="first-col">Creator:</span>
                          <span class="second-col">
                            <a
                              href={`/view-creator/${nftData?.user_id}`}
                              tabindex="0"
                            >
                              {nftData &&
                                nftData?.creatorInfo &&
                                nftData?.creatorInfo.length > 0 &&
                                nftData?.creatorInfo?.[0].name}
                            </a>{" "}
                            <img
                              src={CREATOR_IMAGE}
                              style={{ width: "15px" }}
                            />
                          </span>
                        </li>
                        <li>
                          <span class="first-col">Price:</span>
                          <span class="second-col">
                            <img
                              src={
                                nftData?.blockchain === "Ethereum" ||
                                nftData?.blockchain === "Eth" ||
                                (nftData?.blockchain === "Eth on polygon" &&
                                  ETH_IMAGE_SVG)
                              }
                            />
                            <span>
                              {nftData?.token_owner?.price
                                ? nftData?.token_owner?.price.toLocaleString(
                                    "en",
                                    {
                                      useGrouping: false,
                                      minimumFractionDigits: 1,
                                      maximumFractionDigits: 5,
                                    }
                                  )
                                : "Not On Sale"}
                            </span>
                            {nftData?.token_owner?.price && (
                              <span className="usdet-wrap">{`(US$ ${(
                                USDPrice * nftData?.token_owner?.price
                              ).toFixed(3)})`}</span>
                            )}
                          </span>
                        </li>
                      </ul>
                      {whichButtonNeedToShow() === "edit&Sell" &&
                        nftData?.token_owner?.on_sale !== 0 && (
                          <>
                            <div class="box-details-button">
                              <Link
                                class="btn btn-block btn-secoundray btn-lg font-weight-medium auth-form-btn"
                                tabindex="0"
                                to={`/edit-nft/${id}`}
                              >
                                Edit
                              </Link>
                              <Link
                                class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                to={`/sell-nft/${id}`}
                              >
                                Sell
                              </Link>
                            </div>
                          </>
                        )}
                      {whichButtonNeedToShow() === "edit" &&
                        nftData?.current_owner?.wallet_address ===
                          userData?.wallet_address && (
                          <>
                            <div class="box-details-button">
                              <Link
                                class="btn btn-block btn-secoundray btn-lg font-weight-medium auth-form-btn"
                                tabindex="0"
                                to={`/edit-nft/${id}`}
                              >
                                Edit
                              </Link>
                              <a
                                class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                onClick={() => setShowCancel(true)}
                              >
                                Cancel
                              </a>
                            </div>
                          </>
                        )}
                      {whichButtonNeedToShow() === "creator" && (
                        <>
                          <div className="box-details-button box-details-button1">
                            <a
                              className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                              // tabIndex={0}
                              onClick={handleLogout}
                            >
                              Connect as User to Buy
                            </a>
                          </div>
                        </>
                      )}
                      {whichButtonNeedToShow() === "NotOnSale" && (
                        <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                          Not yet on sale
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className="digital-architecture-box"
                    style={{ margin: "0", height: "100%" }}
                  >
                    <div className="digital-architecture-img">
                      <img
                        src={
                          nftData?.preview_image
                            ? nftData?.preview_image
                            : FEATURED_IMG
                        }
                        style={{ height: 275 }}
                      />
                      <div className="view-details-wrap">
                        <span>
                          <i className="fa fa-eye" />
                          {nftData?.views_count?.view_count
                            ? nftData?.views_count?.view_count
                            : 0}
                        </span>
                        <span>
                          <i className="fa fa-heart" />
                          {nftData?.likeCountData?.like_count || 0}
                        </span>
                      </div>
                    </div>
                    <div className="box-details-wrap">
                      <h3>{nftData?.nft_name}</h3>
                      <ul className="listing-style-wrap">
                        <li>
                          <span className="first-col">Creator</span>
                          <span className="second-col nft-details-name">
                            <a href="javascript:void(0);" tabIndex={0}>
                              {nftData &&
                                nftData?.creatorInfo &&
                                nftData?.creatorInfo.length > 0 &&
                                nftData?.creatorInfo?.[0]?.name}
                            </a>
                            <img
                              src={CREATOR_IMAGE}
                              style={{ width: "15px" }}
                            />
                          </span>
                        </li>
                        <li>
                          <span className="first-col">Price:</span>
                          <span className="second-col">
                            <img
                              src={
                                nftData?.blockchain === "Ethereum" ||
                                nftData?.blockchain === "Eth"
                                  ? ETH_IMAGE_SVG
                                  : ETH_IMAGE_SVG
                              }
                            />
                            <span>
                              {nftData?.token_owner?.price || "Not On Sale"}
                            </span>
                            {nftData?.token_owner?.price && (
                              <span className="usdet-wrap">{`( US$ ${(
                                USDPrice * nftData?.token_owner?.price
                              ).toFixed(2)} )`}</span>
                            )}
                          </span>
                        </li>
                      </ul>
                      <div className="box-details-button box-details-button1">
                        {whichButtonNeedToShow() === "visitor" && (
                          <a
                            className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                            onClick={() => navigate("/connect-wallet")}
                          >
                            Connect to Buy
                          </a>
                        )}
                        {whichButtonNeedToShow() === "NotOnSale" && (
                          <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                            Not yet on sale
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-lg-4 col-md-12">
                <div class="panel-group" id="accordion">
                  <div class="vew-nft-pannel panel panel-default mb-4">
                    <div class="panel-heading">
                      <h3 class="panel-title">
                        <a
                          onClick={() =>
                            setIsNftDetailVisible(!isNftDetailVisible)
                          }
                        >
                          NFT Details{" "}
                          <i
                            className={
                              isNftDetailVisible
                                ? "fas fa-angle-up"
                                : "fas fa-angle-down"
                            }
                          />
                        </a>
                      </h3>
                    </div>
                    {isNftDetailVisible && (
                      <div
                        id="collapse1"
                        class="panel-collapse in collapse show"
                      >
                        <div class="panel-body">
                          {nftData && nftData?.information_type && (
                            <div class="view-nft-inner">
                              <span>Information Type:</span>
                              <span
                                class="bold"
                                style={{
                                  display: "flex",
                                  flexDirection: "flexEnd",
                                }}
                              >
                                {nftData?.information_type}
                              </span>
                            </div>
                          )}
                          {nftData && nftData?.drawing_format && (
                            <div class="view-nft-inner">
                              <span>Drawing Format:</span>
                              <span
                                class="bold text-uppercase"
                                style={{
                                  display: "flex",
                                  justifyContent: "right",
                                }}
                              >
                                {nftData?.drawing_format.join(" ")}
                              </span>
                            </div>
                          )}
                          {nftData && nftData?.completion_status && (
                            <div class="view-nft-inner">
                              <span>Completion:</span>
                              <span
                                class="bold"
                                style={{
                                  display: "flex",
                                  flexDirection: "flexEnd",
                                }}
                              >
                                {nftData?.completion_status}
                              </span>
                            </div>
                          )}
                          {nftData && nftData?.licence_type && (
                            <div class="view-nft-inner">
                              <span>Licence Type:</span>
                              <span
                                class="bold"
                                style={{
                                  display: "flex",
                                  flexDirection: "flexEnd",
                                }}
                              >
                                {nftData?.licence_type.charAt(0).toUpperCase() +
                                  nftData?.licence_type.slice(1)}
                              </span>
                            </div>
                          )}
                          {nftData && nftData?.external_link && (
                            <div class="view-nft-inner">
                              <span>External Link:</span>
                              <span
                                class="bold"
                                style={{
                                  display: "flex",
                                  flexDirection: "flexEnd",
                                }}
                              >
                                {" "}
                                <a
                                  href={
                                    pattern.test(
                                      `${nftData && nftData?.external_link}`
                                    )
                                      ? nftData && nftData?.external_link
                                      : `https://${
                                          nftData && nftData?.external_link
                                        }`
                                  }
                                  target="_blank"
                                >
                                  {nftData && nftData?.external_link.length < 21
                                    ? nftData?.external_link
                                    : `${nftData?.external_link.substring(
                                        0,
                                        15
                                      )}...`}
                                </a>
                              </span>
                            </div>
                          )}
                          {nftData && nftData?.construction_status && (
                            <div class="view-nft-inner">
                              <span>IRL Construction Status:</span>
                              <span
                                class="bold"
                                style={{
                                  display: "flex",
                                  flexDirection: "flexEnd",
                                }}
                              >
                                {nftData?.construction_status.replace(
                                  /(^\w|\s\w)/g,
                                  (m) => m.toUpperCase()
                                )}
                              </span>
                            </div>
                          )}
                          {nftData && nftData?.tags && (
                            <div class="view-nft-inner">
                              <span>Creator Collection:</span>
                              <span
                                class="bold"
                                style={{
                                  display: "flex",
                                  flexDirection: "flexEnd",
                                }}
                              >
                                {nftData?.tags.join(" ")}
                              </span>
                            </div>
                          )}

                          {nftData && nftData?.typology && (
                            <div class="view-nft-inner">
                              <span>Typologies:</span>
                              <span class="bold">
                                {nftData?.typology &&
                                  nftData?.typology.map((typoData) => {
                                    return (
                                      <>
                                        {typoData.name &&
                                        typoData?.name !== undefined
                                          ? `${typoData?.name}  `
                                          : "Not Available"}
                                      </>
                                    );
                                  })}
                              </span>
                            </div>
                          )}
                          {nftData &&
                            nftData?.current_owner &&
                            nftData?.current_owner?.name && (
                              <div class="view-nft-inner">
                                <span>Owned by:</span>
                                <span
                                  class="bold"
                                  style={{
                                    display: "flex",
                                    flexDirection: "flexEnd",
                                  }}
                                >
                                  {nftData?.current_owner?.name.length < 20
                                    ? nftData?.current_owner?.name
                                    : `${nftData?.current_owner?.name.substring(
                                        0,
                                        18
                                      )}...`}
                                </span>
                              </div>
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                  {nftData?.customProperties &&
                    nftData?.customProperties.length > 0 && (
                      <div class="vew-nft-pannel panel panel-default mb-4">
                        <div class="panel-heading">
                          <h3 class="panel-title">
                            <a
                              onClick={() =>
                                setIsCustomPropsVisible(!isCustomPropsVisible)
                              }
                            >
                              Custom Properties
                              <i
                                className={
                                  isCustomPropsVisible
                                    ? "fas fa-angle-up"
                                    : "fas fa-angle-down"
                                }
                              />
                            </a>
                          </h3>
                        </div>
                        {isCustomPropsVisible && (
                          <div
                            id="collapse2"
                            class="panel-collapse in collapse show"
                          >
                            <div class="panel-body">
                              <div class="custom-properties-file-main">
                                {nftData?.customProperties.map((item) => {
                                  return (
                                    <div class="custom-properties-file-wrap">
                                      <span>{item.type}</span>
                                      <h6>{item.name}</h6>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  <div class="vew-nft-pannel panel panel-default mb-4">
                    <div class="panel-heading">
                      <h3 class="panel-title">
                        <a
                          onClick={() =>
                            setIsZIPDetailVisible(!isZIPDetailVisible)
                          }
                        >
                          ZIP File Contains{" "}
                          <i
                            className={
                              isZIPDetailVisible
                                ? "fas fa-angle-up"
                                : "fas fa-angle-down"
                            }
                          />
                        </a>
                      </h3>
                    </div>
                    {isZIPDetailVisible && (
                      <div
                        id="collapse2"
                        class="panel-collapse in collapse show"
                      >
                        <div class="panel-body">
                          {nftData?.zip_names?.nft_zip_names &&
                            nftData?.zip_names?.nft_zip_names.length > 0 &&
                            nftData?.zip_names?.nft_zip_names.map(
                              (fileName) => {
                                return (
                                  <>
                                    <div class="zip-file-wrap">
                                      <span>{fileName}</span>
                                    </div>
                                  </>
                                );
                              }
                            )}
                        </div>
                        {userRoleData?.currentRole === "User" &&
                          nftData?.token_owner?.sold === 1 && (
                            <div>
                              <a
                                className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                href={nftData?.nft_zip_files}
                              >
                                Download ZIP
                              </a>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                  <div class="vew-nft-pannel panel panel-default vew-nft-pannel-last">
                    <div class="panel-heading">
                      <h3 class="panel-title">
                        <a
                          onClick={() =>
                            setIsTechDetailVisible(!isTechDetailVisible)
                          }
                        >
                          Technical Details{" "}
                          <i
                            className={
                              isTechDetailVisible
                                ? "fas fa-angle-up"
                                : "fas fa-angle-down"
                            }
                          />
                        </a>
                      </h3>
                    </div>
                    {isTechDetailVisible && (
                      <div
                        id="collapse1"
                        class="panel-collapse in collapse show"
                      >
                        <div class="panel-body">
                          {nftData && nftData?.contract_addr && (
                            <div class="view-nft-inner">
                              <span>Contract Address:</span>
                              <span className="bold ellipse_effect">
                                {nftData?.contract_addr}
                              </span>
                            </div>
                          )}
                          {nftData && nftData?.token_count && (
                            <div class="view-nft-inner">
                              <span>Token ID:</span>
                              <span className="bold ellipse_effect">
                                {nftData?.token_count}
                              </span>
                            </div>
                          )}
                          {nftData && nftData?.token_standard && (
                            <div class="view-nft-inner">
                              <span>Token Standard:</span>
                              <span class="bold">
                                {nftData?.token_standard}
                              </span>
                            </div>
                          )}
                          {nftData && nftData?.blockchain && (
                            <div class="view-nft-inner">
                              <span>Blockchain:</span>
                              <span class="bold">
                                {nftData?.blockchain ? "Polygon" : ""}
                              </span>
                            </div>
                          )}
                          {nftData && nftData?.blockchain && (
                            <div class="view-nft-inner">
                              <span>Contract Address:</span>
                              <span class="bold">
                                <a
                                  href={`https://etherscan.io/address/${nftData.creator_addr}`}
                                  target="_blank"
                                >
                                  {`${
                                    nftData?.creator_addr &&
                                    nftData?.creator_addr.substring(0, 4)
                                  }...${
                                    nftData?.creator_addr &&
                                    nftData?.creator_addr.substring(
                                      nftData.creator_addr.length - 4
                                    )
                                  }`}
                                </a>
                              </span>
                            </div>
                          )}
                          {nftData &&
                          nftData?.token_owner &&
                          nftData.token_owner.future_royality ? (
                            <div class="view-nft-inner">
                              <span>Creator Royalty:</span>
                              <span class="bold">
                                {nftData.token_owner.future_royality}
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="col-lg-8 col-md-12">
                <div class="view-nft-table mb-4">
                  <div class="vew-nft-table-head">
                    <h3>Activity</h3>
                  </div>
                  <div class="nft-table-data table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Activity</th>
                          <th>Price</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activityData &&
                          activityData.length > 0 &&
                          activityData
                            .slice()
                            .reverse()
                            .map((item, index) => {
                              return (
                                <>
                                  {item && item?.activity_type === "Edit" ? (
                                    ""
                                  ) : (
                                    <>
                                      <tr key={index}>
                                        <td className="on-sale-cap">
                                          {item?.activity_type}
                                        </td>
                                        <td>
                                          {item?.activity_type === "Minted"
                                            ? 0
                                            : item?.token_owner?.price}
                                        </td>
                                        <td>
                                          {item.user_address &&
                                          item.user_address ? (
                                            <a
                                              href={`/view-creator/${item.user_id}`}
                                            >
                                              {`${item.user_address.substring(
                                                0,
                                                4
                                              )}...${item.user_address.substring(
                                                item.user_address.length - 4
                                              )}`}
                                            </a>
                                          ) : (
                                            "----"
                                          )}
                                        </td>
                                        <td>
                                          {`${item?.to_address.substring(
                                            0,
                                            4
                                          )}...${item.to_address.substring(
                                            item.to_address.length - 4
                                          )}`}
                                        </td>
                                        <td>
                                          {moment(item?.createdAt).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </td>
                                      </tr>
                                    </>
                                  )}
                                </>
                              );
                            })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="view-nft-table view-nft-listing">
                  <div class="vew-nft-table-head">
                    <h3>Listing</h3>
                  </div>
                  {listing && listing.length > 0 ? (
                    <div class="nft-table-data table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Price</th>
                            <th>USD Price</th>
                            <th>By</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listing &&
                            listing.length > 0 &&
                            listing
                              .slice()
                              .reverse()
                              .map((item) => {
                                return (
                                  <>
                                    <tr>
                                      {item?.price && (
                                        <td>{item?.price} ETH</td>
                                      )}
                                      {item?.price && (
                                        <td>
                                          ${(USDPrice * item?.price).toFixed(3)}
                                        </td>
                                      )}

                                      {item?.from_address && (
                                        <td>{`${item.from_address.substring(
                                          0,
                                          4
                                        )}...${item.from_address.substring(
                                          item.from_address.length - 4
                                        )}`}</td>
                                      )}
                                      <td>
                                        {moment(item?.createdAt).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div class="view-no-item table-responsive">
                      <span>No listing information available</span>
                    </div>
                  )}
                </div>
                {/* {isHeIsUserOrCreator() === "Creator" &&
                  userData?._id === nftData?.user_id &&
                  nftData?.token_owner?.type === "Auction" && ( */}
                {nftData?.current_owner?.wallet_address ===
                  userData?.wallet_address && (
                  <div class="view-nft-table view-nft-listing my-4">
                    <div class="vew-nft-table-head">
                      <h3>Offering</h3>
                    </div>
                    {offeringDetail && offeringDetail.length > 0 ? (
                      <div class="nft-table-data table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>Price</th>
                              <th>USD Price</th>
                              <th>From</th>
                              <th>Expires in</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {offeringDetail &&
                              offeringDetail.length > 0 &&
                              offeringDetail.map((item) => {
                                return (
                                  <>
                                    <tr>
                                      {item?.price && (
                                        <td>{item?.price} ETH</td>
                                      )}
                                      {item?.price && (
                                        <td>
                                          ${(USDPrice * item?.price).toFixed(3)}
                                        </td>
                                      )}
                                      {item?.user_address && (
                                        <td className="ellipse_effect">
                                          {`${item.user_address.substring(
                                            0,
                                            4
                                          )}...${item.user_address.substring(
                                            item.user_address.length - 4
                                          )}`}
                                        </td>
                                      )}
                                      {item.bid_start_date &&
                                        item.bid_start_date && (
                                          <td>
                                            {getTimeInDays(
                                              item?.bid_start_date,
                                              item?.bid_end_date
                                            )}{" "}
                                            Days
                                          </td>
                                        )}
                                      {nftData?.token_owner?.sold !== 1 && (
                                        <td>
                                          <button
                                            className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                            onClick={
                                              userData?.wallet_address ===
                                                nftData?.token_owner
                                                  ?.seller_id &&
                                              (() =>
                                                _handleAcceptBid(
                                                  item?._id,
                                                  item?.user_address
                                                ))
                                            }
                                            disabled={
                                              nftData?.token_owner?.on_sale ===
                                              0
                                                ? true
                                                : false
                                            }
                                          >
                                            Accept
                                          </button>
                                        </td>
                                      )}
                                    </tr>
                                  </>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div class="view-no-item table-responsive">
                        <span>No offers yet</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <Modal show={show} onClose={() => setShow(false)}>
          <div>
            <div className="modal-body">
              <div className="text-center">
                <h2 className="buyer_heading">Buying Confirmation</h2>
                <p
                  style={{
                    paddingBottom: "2em",
                  }}
                >
                  Please review the below information before progressing to the
                  next stage of purchase.
                </p>
                <div
                  className="vew-nft-pannel"
                  style={{
                    border: "none",
                    fontSize: "15px !important",
                    margin: "2em 0",
                  }}
                >
                  <div className="view-nft-inner">
                    <span
                      style={{
                        fontSize: "15px",
                        display: "flex",
                        flexDirection: "left",
                      }}
                    >
                      NFT Name:
                    </span>
                    <span className="bold" style={{ fontSize: "15px" }}>
                      {nftData &&
                      nftData?.nft_name &&
                      nftData?.nft_name.length < 20
                        ? nftData?.nft_name
                        : `${nftData?.nft_name?.substring(0, 20)}...`}
                    </span>
                  </div>
                  <div className="view-nft-inner mt-2">
                    <span
                      style={{
                        fontSize: "15px",
                        display: "flex",
                        flexDirection: "left",
                      }}
                    >
                      Creator:{" "}
                    </span>
                    <span className="second-col" style={{ fontSize: "15px" }}>
                      {nftData &&
                      nftData?.creatorInfo &&
                      nftData?.creatorInfo?.[0]?.name.length < 18
                        ? nftData?.creatorInfo?.[0]?.name
                        : `${nftData?.creatorInfo?.[0]?.name.substring(
                            0,
                            24
                          )}...`}
                    </span>
                    {nftData?.creatorInfo &&
                      nftData?.creatorInfo?.[0]?.is_verify === 1 && (
                        <img
                          src={CREATOR_IMAGE}
                          style={{
                            width: "17px",
                            height: "17px",
                            marginLeft: "5px",
                          }}
                        />
                      )}
                  </div>
                  {nftData?.contract_addr && (
                    <div className="view-nft-inner mt-2">
                      <span
                        style={{
                          fontSize: "15px",
                          display: "flex",
                          flexDirection: "left",
                        }}
                      >
                        Contract Address:
                      </span>
                      <span className="bold" style={{ fontSize: "15px" }}>
                        {nftData?.contract_addr}
                      </span>
                    </div>
                  )}
                  <div className="view-nft-inner mt-2">
                    <span
                      style={{
                        fontSize: "15px",
                        display: "flex",
                        flexDirection: "left",
                      }}
                    >
                      Total Price:
                    </span>
                    <span className="bold" style={{ fontSize: "15px" }}>
                      {nftData?.token_owner?.price} ETH
                    </span>
                  </div>
                  <div className="view-nft-inner mt-2">
                    <span
                      style={{
                        fontSize: "15px",
                        display: "flex",
                        flexDirection: "left",
                      }}
                    >
                      Created Date:
                    </span>
                    <span className="bold" style={{ fontSize: "15px" }}>
                      {moment(nftData && nftData?.createdAt).format(
                        "DD/MM/YYYY"
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center" style={{ gap: "1em" }}>
                <a
                  className="btn btn-block buying_decline"
                  onClick={() => setShow(false)}
                  style={{ background: "#e8e9e9", fontWeight: 600 }}
                >
                  Decline
                </a>
                <a
                  className="btn btn-block btn-primary btn-lg auth-form-btn"
                  onClick={
                    isAcceptDisable
                      ? ""
                      : nftData?.creator_addr ===
                        nftData?.token_owner?.seller_id
                      ? handleAcceptModal
                      : () =>
                          resaleBuyApprove(
                            () => setShow(false),
                            nftData?.token_owner?.price,
                            () => setShowNested(true),
                            () => setIsAcceptDisable(false),
                            () => setIsAcceptDisable(true)
                          )
                  }
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {isAcceptDisable ? (
                    <Loader
                      color="white"
                      width={18}
                      height={18}
                      bgColor="#e2e2e2"
                    />
                  ) : (
                    "Accept"
                  )}
                </a>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          show={showNested}
          onClose={() => !isBuying && setShowNested(false)}
        >
          <div>
            <div className="">
              <div className="modal-body">
                <div className="modal-inner-area text-center">
                  <h2>Checkout</h2>
                  <p
                    style={{
                      paddingBottom: "1em",
                    }}
                  >
                    Confirm and sign for the purchase based on the below
                    information
                  </p>
                  <div className="sell-nft-wraaper mt-4">
                    <div className="sell-nft-box-wrap">
                      <img
                        src={
                          nftData?.preview_image
                            ? nftData?.preview_image
                            : CHECKOUT_IMG
                        }
                      />
                      <div className="sell-nft-name">
                        <h3>
                          {" "}
                          {nftData &&
                          nftData?.nft_name &&
                          nftData?.nft_name.length < 20
                            ? nftData?.nft_name
                            : `${nftData?.nft_name?.substring(0, 20)}...`}
                        </h3>
                        <span className="second-col">
                          <a href="javascript:void(0);" tabIndex={0}>
                            {nftData &&
                            nftData?.creatorInfo &&
                            nftData?.creatorInfo?.[0]?.name.length < 15
                              ? nftData?.creatorInfo?.[0]?.name
                              : `${nftData?.creatorInfo?.[0]?.name.substring(
                                  0,
                                  15
                                )}...`}
                          </a>{" "}
                          <img src={CREATOR_IMAGE} />
                        </span>
                      </div>
                    </div>
                    <div className="sell-nft-details">
                      <span>Price:</span>
                      <h3>{nftData?.token_owner?.price} ETH</h3>
                      <span>
                        US${(USDPrice * nftData?.token_owner?.price).toFixed(3)}
                      </span>
                    </div>
                  </div>
                  <div
                    className="vew-nft-pannel mb-2"
                    style={{ border: "none" }}
                  ></div>
                  <div
                    className="custom-control custom-checkbox text-left"
                    style={{ paddingTop: "1em" }}
                  >
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="defaultUnchecked"
                      onChange={(e) => setIsAgreed(e.target.checked)}
                    />
                    <label
                      className="custom-control-label text-gray h6"
                      htmlFor="defaultUnchecked"
                    >
                      I agree to{" "}
                      <a href="/terms" target="_blank">
                        {" "}
                        terms & conditions
                      </a>
                    </label>
                  </div>
                </div>
              </div>
              {isAgreed && (
                <div className="modal-footer">
                  <a
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={
                      nftData?.creator_addr === nftData?.token_owner?.seller_id
                        ? handleConfirmModal
                        : () =>
                            resaleBuyConfirmation(
                              nftData?.market_id,
                              nftData?.token_owner?.token_id,
                              () => getNftDetail(),
                              () => setIsBuying(false),
                              () => setIsBuying(true),
                              () => setShowNested(false),
                              () => setShowConfirm(true)
                            )
                    }
                  >
                    {isBuying ? (
                      <Loader
                        color="white"
                        width={18}
                        height={18}
                        bgColor="#e2e2e2"
                      />
                    ) : (
                      "Confirm"
                    )}
                  </a>
                </div>
              )}
            </div>
          </div>
        </Modal>

        <Modal show={showConfirm} onClose={handleAfterConfirm}>
          <div>
            <div className="">
              <div className="modal-body">
                <div className="modal-inner-area text-center">
                  <h2>Purchase Completed</h2>
                  <p>Your purchase was successfully completed.</p>
                  <img src={ROUND_CHECK} className="pt-3 pb-4" />
                  <div className="sell-nft-wraaper">
                    <div className="sell-nft-box-wrap">
                      <img
                        src={
                          nftData?.preview_image
                            ? nftData?.preview_image
                            : CHECKOUT_IMG
                        }
                      />
                      <div className="sell-nft-name">
                        <h3>
                          {nftData &&
                          nftData?.nft_name &&
                          nftData?.nft_name.length < 20
                            ? nftData?.nft_name
                            : `${nftData?.nft_name?.substring(0, 20)}...`}
                        </h3>
                        <span className="second-col">
                          <a tabIndex={0}>
                            {nftData &&
                            nftData?.creatorInfo &&
                            nftData?.creatorInfo?.[0]?.name.length < 15
                              ? nftData?.creatorInfo?.[0]?.name
                              : `${nftData?.creatorInfo?.[0]?.name.substring(
                                  0,
                                  15
                                )}...`}
                          </a>{" "}
                          <img src={CREATOR_IMAGE} />
                        </span>
                      </div>
                    </div>
                    <div className="sell-nft-details">
                      <span>Price</span>
                      <h3>{nftData?.token_owner?.price} ETH</h3>
                      <span>
                        ${(USDPrice * nftData?.token_owner?.price).toFixed(3)}{" "}
                        USD
                      </span>
                    </div>
                  </div>
                  <div className="vew-nft-pannel" style={{ border: "none" }}>
                    <div className="view-nft-inner mt-4">
                      <span>Status:</span>
                      <span className="bold">Completed</span>
                    </div>
                    <div className="view-nft-inner">
                      <span>Transaction ID:</span>
                      <span className="bold">{`${transactionHash.substring(
                        0,
                        4
                      )}...${transactionHash.substring(
                        transactionHash.length - 4
                      )}`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal show={socialPopup} onClose={() => setSocialPopup(false)}>
          <SocialShare id={id} nftView={true} />
        </Modal>

        <Modal show={showBid} onClose={() => setShowBid(false)}>
          <div>
            <div className="place-bid-modal">
              <div className="modal-body">
                <div className="modal-inner-area text-center">
                  <h2>Place a BID</h2>
                  <p>
                    Please place a bid on the selected NFT. Amount must be
                    larger than listed price
                  </p>
                  <form className="profile-wrap-form row">
                    <div className="form-group col-md-12 mb-0">
                      <label>Price</label>
                      <div className="copy-box-wrap">
                        <input
                          type="number"
                          placeholder={15}
                          className="form-control"
                          value={bidPrice}
                          onChange={(e) => handleBidPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    {bidPriceError && (
                      <div style={{ margin: "0 auto", color: "red" }}>
                        {bidPriceError}
                      </div>
                    )}
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <a
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  onClick={bidPriceError ? "" : finalBidPlace}
                >
                  {isOnBid ? (
                    <Loader
                      color="white"
                      width={18}
                      height={18}
                      bgColor="#e2e2e2"
                    />
                  ) : (
                    "Place Bid"
                  )}
                </a>
              </div>
            </div>
          </div>
        </Modal>
        {isReportVisible && (
          <Modal show={true} onClose={() => setIsReportVisible(false)}>
            <div id="view-nft-report">
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="modal-inner-area text-center">
                      <h2>Report this NFT</h2>
                      <p>
                        Please fill in the below box with an explanation of the
                        issue and a member of the team will take appropriate
                        action.
                      </p>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Message"
                          onChange={(e) => handleReportInput(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <a
                      className="btn btn-block  btn-primary btn-lg font-weight-medium auth-form-btn"
                      href="javascript:void(0);"
                      id="js-ready-sell-modal2"
                      onClick={handleReport}
                    >
                      Report
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
        {isEditPriceVisible && (
          <Modal
            show={isEditPriceVisible}
            onClose={() => setIsEditPriceVisible(false)}
          >
            <div className="" id="edit-price-modal">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{}}>
                  <div className="modal-body">
                    <div className="form-group">
                      <label
                        className="swal-title"
                        style={{ marginTop: "-15%", fontWeight: "200" }}
                      >
                        Edit Price
                      </label>
                      <h6 className="swal-text">
                        Please enter the new price for the NFT and click on
                        submit button
                      </h6>
                      <div className="copy-box-wrap">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setNftPrice(e.target.value)}
                          style={{ marginTop: "5%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <a
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      href
                      id="modal-backdrop-remove"
                      onClick={updatePrice}
                      style={{
                        width: "25%",
                        margin: "0 auto",
                        marginTop: "-3%",
                      }}
                    >
                      Submit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
        <Modal show={showCancel} onClose={() => setShowCancel(false)}>
          <div>
            <div className="" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="modal-inner-area text-center">
                    <h2>Cancel your listing?</h2>
                    <p>Are you sure you want cancel the listing of your NFT?</p>
                  </div>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "1em" }}
                >
                  <a
                    className="btn btn-block buying_decline"
                    onClick={
                      nftData?.token_owner?.seller_id !==
                        nftData?.creator_addr &&
                      nftData?.token_owner?.seller_id ===
                        userData?.wallet_address &&
                      nftData?.token_owner?.sold === 0
                        ? () =>
                            cancelNftResell(
                              nftData?.market_id,
                              nftData?._id,
                              () => getNftDetail(),
                              () => setShowCancel(false)
                            )
                        : handleCancelNft
                    }
                  >
                    Yes
                  </a>
                  <a
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={() => setShowCancel(false)}
                  >
                    No
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          show={showResaleModalVal}
          onClose={() => setShowResaleModalVal(false)}
        >
          <div>
            <div className="" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="modal-inner-area text-center">
                    <h2>Set your price</h2>
                    <input
                      type="text"
                      className="w-100  border border-gray-300 p-2 text-gray-600 mt-3"
                      style={{ width: "100%" }}
                      placeholder="Enter your price"
                      value={resaleVal}
                      onChange={(e) => setResaleVal(e.target.value)}
                    />
                  </div>
                  <div
                    className="d-flex align-items-center mt-3"
                    style={{ gap: "1em" }}
                  >
                    <a
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={() =>
                        resaleNFT(
                          nftData?.market_id,
                          resaleVal,
                          () => setShowResaleModalVal(false),
                          nftData?.token_owner.token_id,
                          () => getNftDetail(),
                          () => setIsBuying(false),
                          () => setIsBuying(true)
                        )
                      }
                    >
                      {isBuying ? (
                        <Loader
                          color="white"
                          width={18}
                          height={18}
                          bgColor="#e2e2e2"
                        />
                      ) : (
                        "Submit"
                      )}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal show={showResaleModal} onClose={() => setShowResaleModal(false)}>
          <div>
            <div className="" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="modal-inner-area text-center">
                    <h2>Are you sure you want to approve?</h2>
                    <p>Approve is must for list NFT for resale</p>
                  </div>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "1em" }}
                >
                  <a
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={() =>
                      resaleApprove(
                        () => setShowResaleModalVal(true),
                        () => setShowResaleModal(false),
                        () => setIsBuying(false),
                        () => setIsBuying(true)
                      )
                    }
                  >
                    {isBuying ? (
                      <Loader
                        color="white"
                        width={18}
                        height={18}
                        bgColor="#e2e2e2"
                      />
                    ) : (
                      "Approve"
                    )}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default NftDetails;
