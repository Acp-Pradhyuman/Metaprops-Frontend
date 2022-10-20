import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NFT from "../../utils/Abis/NFT7.json";
import { abi } from "../../utils/endpoints";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { handleApiCall } from "./../../api/index";
import { endpoints } from "./../../utils/endpoints";
import Loader from "./../commons/Loader/index";
import { PopUp } from "../../utils/utility";
import LazyMinter from "../../utils/web3/lazyMinter";
import { UseSelector } from "react-redux";
import { resaleStartAuction } from "../../utils/functions/resaleStartAuction";

const SellNftModal = ({ showModal, data, royalty }) => {
  const nftDetail = useSelector((state) => state.nftDetail.currentNFT);

  const navigate = useNavigate();
  const [isSigning, setIsSigning] = useState(false);
  const [IpfsUri, setIpfsUri] = useState("");
  const handelCancel = () => {
    navigate(`/view-nft/${data?.id}`);
  };
  const handleSign = async () => {
    setIsSigning(true);
    const response = await handleApiCall("post", `${endpoints.uploadIpfs}`, {
      id: data?.id,
    });
    if (response?.data?.success) {
      setIpfsUri(response?.data?.ipfsUri);

      signature(response?.data?.ipfsUri);

      if (nftDetail?.creatorAddr !== nftDetail?.token_owner?.seller_id) {
        const days = getTimeInDays(data?.start_date, data?.end_date);
        resaleStartAuction(nftDetail?.market_id, days, data);
      }
    } else {
      setIsSigning(false);
    }
  };

  const handleSellNFT = async (sign, uri, market_id, type) => {
    let response;
    if (type === "Auction") {
      response = await handleApiCall("post", `${endpoints.sellNFT}`, {
        ...data,
        ipfsUri: uri,
        signature: sign,
        type,
        market_id,
      });
    } else {
      response = await handleApiCall("post", `${endpoints.sellNFT}`, {
        ...data,
        ipfsUri: uri,
        signature: sign,
        type,
      });
    }
    if (response?.data?.success) {
      setIsSigning(false);
      handelCancel();
    } else {
      PopUp("Something went wrong", "Internal Server Error", "error");
    }
  };


  const getTimeInDays = (start = "", end = "") => {
    if (start && end) {
      let startDate = start.split("/");
      let endDate = end.split("/");
      const oneDay = 1000 * 60 * 60 * 24; // hours*minutes*seconds*milliseconds
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

  let tx;

  const signature = async (uri) => {
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
    let lazyMinter = new LazyMinter({ contract: contract, signer: signer });
    // debugger;
    // const balanceInEth = ethers.utils.formatEther(0.5);
    let price = ethers.utils.parseEther(data?.price.toString());
    if (data?.type === "Auction") {
      const days = getTimeInDays(data?.start_date, data?.end_date);
      const result = await contract.start(
        nftDetail?.token_count,
        price,
        days,
        tokenaddress,
        royalty
      );
      tx = await result.wait();
      console.log("createAndBuyTokenWETH", tx.events[0].args.marketItemId._hex);

      await lazyMinter
        .createVoucher(nftDetail?.token_count, uri, price)
        .then((voucher) => {
          const { signature, tokenId, uri } = voucher;
          console.log(tx.events[0].args.marketItemId._hex, "HEXXX");
          handleSellNFT(
            voucher,
            uri,
            tx.events[0].args.marketItemId._hex,
            data?.type
          );
        })
        .catch((error) => {
          alert(error);
          // PopUp("Metamask Error", , "error");
          setIsSigning(false);
        });
    } else {
      await lazyMinter
        .createVoucher(nftDetail?.token_count, uri, price)
        .then((voucher) => {
          const { signature, tokenId, uri } = voucher;
          handleSellNFT(voucher, uri, undefined, data?.type);
        })
        .catch((error) => {
          alert(error);
          // PopUp("Metamask Error", , "error");
          setIsSigning(false);
        });
    }
  };

  console.log("datattattata", data)
  return (
    <>
      <div
        className=""
        id="selling-you-item"
        role="document"
        style={{ border: "none" }}
      >
        <div className="">
          <div className="modal-body">
            <div className="modal-inner-area">
              <h3>Selling your Nft</h3>
              <p
                className="mt-2"
                style={{
                  width: "75%",
                  margin: "0 auto",
                  fontSize: "15px",
                  textAlign: "center",
                }}
              >
                Please sign in your digital wallet to list the NFT for sale.
              </p>
              <div className="help-faq-wrapper">
                <div className="panel-group" id="accordion">
                  <div className="panel panel-default">
                    <div id="collapse3" className="panel-collapse collapse in">
                      <div className="panel-body">
                        <p>
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr, sed diam lorem ipsum lemar nonumy eirmod
                          tempor, Lorem ipsum dolor sit amet, consetetur
                          sadipscing elitr.
                        </p>
                        <span>Waiting for initialization…</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="row">
              <div className="col-md-12 px-0">
                <div className="url-link">
                  <a
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={!isSigning ? handleSign : ""}
                    id="js-ready-sell-modal"
                    disabled={isSigning}
                  >
                    {isSigning ? <Loader /> : "Sign"}
                  </a>
                </div>
              </div>
              {/* <div className='col-md-6'>
								<div className='url-link'>
									<a
										className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
										onClick={handelCancel}
										id='js-ready-sell-modal'
									>
										Cancel
									</a>
								</div>
							</div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellNftModal;
