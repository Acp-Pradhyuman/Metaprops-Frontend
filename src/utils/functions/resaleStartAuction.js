import { ethers, Wallet } from "ethers";
import Web3Modal from "web3modal";
import { abi } from "../endpoints";
import { endpoints } from "../endpoints";
import { handleApiCall } from "../../api/index";
import { PopUp } from "../utility";

export const resaleStartAuction = async (market_id, days, data, value, onClose, goToViewNft, walletAddress) => {
	const web3Modal = new Web3Modal({
		network: "mumbai",
		cacheProvider: true,
	});
	const connection = await web3Modal.connect();
	const provider = new ethers.providers.Web3Provider(connection);
	const signer = provider.getSigner();

	let contract = new ethers.Contract(abi.nftAddress, abi.nft13, signer);

	let resaleContract = new ethers.Contract(
		abi.resaleAddress,
		abi.resale,
		signer
	);

	let price = ethers.utils.parseEther(value.toString());

	if (data?.type === "Auction") {
		let res = await contract
			.setSellerAndFixedPrice(Number(market_id), price, {
				gasLimit: 1000000,
			})
			.then(async () => {
				await resaleContract
					.resaleStart(abi.nftAddress, Number(market_id), price, days, {
						gasLimit: 1000000,
					})
					.then(async () => {
						let response = await handleApiCall("post", `${endpoints.sellNFT}`, {
							...data,
							type: data?.type,
							market_id,
							seller_id: walletAddress
						});
						if (response?.data?.success) {
							onClose()
							PopUp("NFT listed successfully", "", "success");
							goToViewNft()
						}
					})
					.catch((error) => {
						PopUp("Something went wrong!", error, "error");
					});
			});
	}
};
