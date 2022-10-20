import { ethers, Wallet } from "ethers";
import Web3Modal from "web3modal";
import { abi } from "../endpoints";
import { endpoints } from "../endpoints";
import { handleApiCall } from "../../api/index";
import { PopUp } from "../utility";

export const cancelNftResell = async (market_id, id, getNft, onClose) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  let resaleContract = new ethers.Contract(
    abi.resaleAddress,
    abi.resale,
    signer
  );

  let result = await resaleContract
    .cancelSale(abi.nftAddress, Number(market_id), { gasLimit: 1000000 })
    .then(async () => {
      let response = await handleApiCall("put", `${endpoints.cancelNft}`, {
        id,
      });
      if (response?.data?.success) {
        PopUp("NFT listing cancelled", "", "success");
        onClose()
        getNft()
      }
    })
    .catch((error) => {
      PopUp("Something went wrong", error, "error");
    });
};
