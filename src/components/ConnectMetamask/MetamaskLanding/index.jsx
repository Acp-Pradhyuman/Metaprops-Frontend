import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Web3 from 'web3';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

//Redux
import { handleApiCall } from '../../../api';
import { endpoints } from '../../../utils/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from '../../../redux/Slice/UserSlice/RegisterUser/index';
import swal from 'sweetalert';
import Modal from '../../commons/Modal/Modal';
import { PopUp } from '../../../utils/utility';

const META_MASK_IMAGE = require('../../../assets/img/meta-icon.png');

export default function ConnectMetamask({ onAddressChanged }) {
	const navigate = useNavigate();
	const [userAddress, setUserAddress] = useState('');
	const role = useSelector((state) => state.registerUser.currentRole);
	const roleData = useSelector((state) => state.registerUser.roleData);
	const dispatch = useDispatch();

	const navigateProfile = () => {
		if (role === 'Creator') navigate('/creator-profile');
		else navigate('/profile');
		// window.location.reload();
	};

	async function checkIfWalletIsConnected() {
		if (window.ethereum.selectedAddress) {
			const accounts = await window.ethereum.request({
				method: 'eth_accounts'
			});
			if (accounts.length > 0) {
				const account = accounts[0];
				setUserAddress(account);
				return;
			}

			if (isMobileDevice()) {
				await connect();
			}
		}
	}
	async function connect() {
		if (!window.ethereum) {
			swal({
				text: 'Metamask is not installed in your browser',
				icon: 'error',
				button: 'Download Now'
			}).then((willDelete) => {
				if (willDelete) {
					return (window.location.href = 'https://metamask.io');
				}
			});
		} else {

			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts'
			});
			setUserAddress(accounts[0]);
		}
	}

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	useEffect(() => {
		onAddressChanged(userAddress);
		if (userAddress) {
			registerClient();
		}
	}, [userAddress]);

	function isMobileDevice() {
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	}
	const registerClient = async () => {
		let roleId =
			roleData.length > 0 &&
			roleData.filter((item) => item.name === role ? item._id  : '');
			console.log("baby",roleId)
			handleRegisterClient(roleId)
	};
	const handleRegisterClient = async (roleId) => {
		let	response = await handleApiCall('post', `${endpoints.registerClient}`, {
			wallet_address: userAddress,
			role_id: Array.isArray(roleId) ? roleId[0]._id : roleId
		});

		if (response?.data?.success) {
			dispatch(setUserToken(response.data));
			const { Refreshtoken, accessToken } = response.data;
			localStorage.setItem('refreshToken', Refreshtoken);
			localStorage.setItem('token', accessToken);
			localStorage.setItem('userData', JSON.stringify(response.data?.data));
			navigateProfile();
			console.log("hrllo", Refreshtoken)
		} else if (response?.data?.message === "Your user Profile has been blocked by the admin Please contact at support@metaprops.io") {
			PopUp('Profile Blocked!', response?.data?.message, 'error');
		} else if (response?.data?.message === "Your account is deleted by Admin") {
			PopUp('Account Deleted!', response?.data?.message, 'error');
		}
		else {
			PopUp('Wrong User Role!', response?.data?.message, 'error');
		}
	}
	if (isMobileDevice()) {
		const dappUrl = ''; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
		const metamaskAppDeepLink = 'https://metamask.app.link/dapp/' + dappUrl;
		return (
			<section class='main-pannel-sec'>
				<div class='container'>
					<div class='row mb-3'>
						<div class='col-md-12'>
							<div class='top-heading-are text-center'>
								<h2>Sign in to your Wallet</h2>
								<p>
									Please log in to the platform using your
									metamask digital wallet. This will enable to you to begin
									buying and selling digital architecture.
								</p>
							</div>
							<div class='banner-button-wrap btn-group-wrapper metamask-btn'>
								<a
									class='btn btn-block btn-secoundry btn-lg font-weight-medium auth-form-btn'
									onClick={connect}
								>
									<img src={META_MASK_IMAGE} /> Continue with Metamask
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	} else {
		return (
			<>
				<section class='main-pannel-sec'>
					<div class='container'>
						<div class='row mb-3'>
							<div class='col-md-12'>
								<div class='top-heading-are text-center'>
									<h2>Sign in to your Wallet</h2>
									<p>
										Please log in to the platform using your
										metamask digital wallet. This will enable to you to begin
										buying and selling digital architecture.
									</p>
								</div>
								<div class='banner-button-wrap btn-group-wrapper metamask-btn'>
									<a
										class='btn btn-block btn-secoundry btn-lg font-weight-medium auth-form-btn'
										onClick={connect}
									>
										<img src={META_MASK_IMAGE} /> Continue with Metamask
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>
			</>
		);
	}
}
