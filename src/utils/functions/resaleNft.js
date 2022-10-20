import { ethers, Wallet } from "ethers";
import Web3Modal from "web3modal";
import { abi } from "../endpoints";
import { endpoints } from "../endpoints";
import { handleApiCall } from "../../api/index";
import { PopUp } from "../utility";

export const resaleApprove = async (valModal, onClose, isfalse, isTrue) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  isTrue();
  let contract = new ethers.Contract(abi.nftAddress, abi.nft13, signer);

  let res = await contract
    .setApprovalForAll(abi.resaleAddress, true, {
      gasLimit: 1000000,
    })
    .catch((error) => {
      PopUp("Something went wrong", error, "error");
    });
  let tx = await res.wait();

  if (tx?.confirmations >= 1) {
    isfalse();
    onClose();
  }
};

export const resaleNFT = async (
  marketId,
  value,
  onClose,
  id,
  getNft,
  isFalse,
  isTrue,
  closeModal,
  type
) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  const walletAddress = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  isTrue();

  const price = ethers.utils.parseEther(value.toString());
  let contract = new ethers.Contract(abi.nftAddress, abi.nft13, signer);
  let resaleContract = new ethers.Contract(
    abi.resaleAddress,
    abi.resale,
    signer
  );

  let result = await contract.setSellerAndFixedPrice(Number(marketId), price, {
    gasLimit: 1000000, //Gas Limit.....
  });
  let tx = await result.wait();

  if (tx.events[0].transactionHash) {
    let result = await resaleContract.secondarySale(
      abi.nftAddress,
      Number(marketId),
      {
        gasLimit: 1000000, //Gas Limit.....
      }
    );

    let tx = await result.wait();
    console.log("TX if statement", tx.events);

    if (tx.events) {
      const response = await handleApiCall("post", `${endpoints.sellNFT}`, {
        seller_id: walletAddress[0],
        price: value,
        id,
        type: ""
      });
      if (response?.data?.success) {
        isFalse();
        onClose();
        PopUp("NFT listed successfully", "", "success");
        getNft();
        closeModal()
      } else {
        PopUp("Something went wrong", "Please Try Again", "error");
      }
    }
  }
};

export const resaleBuyApprove = async (
  onClose,
  value,
  onOpen,
  isLoading,
  isFeteching
) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  const price = ethers.utils.parseEther(value.toString());

  let token = new ethers.Contract(abi.tokenAddress, abi.weth, signer);
  isFeteching();

  let result = await token
    .approve(abi.resaleAddress, price, {
      gasLimit: 1000000, //Gas Limit.....
    })
    .then(() => {
      onClose();
      onOpen();
      isLoading();
    });
};

export const resaleBuyConfirmation = async (
  marketId,
  id,
  getNft,
  isLoading,
  isFeteching,
  onClose,
  confirmModal
) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  isFeteching();

  let resaleContract = new ethers.Contract(
    abi.resaleAddress,
    abi.resale,
    signer
  );

  const walletAddress = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  let walletMnemonic = Wallet.fromMnemonic(process.env.REACT_APP_MNEMONIC);
  let wallet = walletMnemonic.connect(provider);

  let adminContract = new ethers.Contract(abi.nftAddress, abi.nft13, wallet);

  await resaleContract
    .secondaryBuy(Number(marketId), abi.nftAddress, {
      gasLimit: 1000000, //Gas Limit.....
    })
    .then(async () => {
      let result = await adminContract.setOwner(
        Number(marketId),
        walletAddress[0],
        {
          gasLimit: 2100000,
          gasPrice: 2000000000000,
          from: wallet.address,
        }
      );
      let tx = await result.wait();
      isLoading();

      console.log("Wallet add", walletAddress[0]);
      if (tx.events) {
        const response = await handleApiCall(
          "post",
          `${endpoints.purchaseNFT}`,
          {
            owner_addr: walletAddress[0],
            id,
          }
        );
        if (response?.data?.success) {
          onClose();
          confirmModal();
          getNft();
        } else {
          PopUp("Something went wrong", "Please Try Again", "error");
          onClose();
        }
      }
    });
};
