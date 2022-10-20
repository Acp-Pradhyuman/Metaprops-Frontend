import React,  {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

//Redux
import { useDispatch } from 'react-redux';
import { setCurrentRole } from '../../../redux/Slice/UserSlice/RegisterUser';
import {handleApiCall} from '../../../api/index';
import {PopUp} from '../../../utils/utility';
import {setRoleData} from '../../../redux/Slice/UserSlice/RegisterUser';
import {endpoints} from '../../../utils/endpoints'

function ConnectWalletLanding() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(()=> {
		getRoleData();
	},[])

	const getRoleData = async () => {
		let response = await handleApiCall("get", `${endpoints.getRole}`);
		if (response?.data?.success) {
		  dispatch(setRoleData(response?.data?.data));
		} else {
		  PopUp("Something Went Wrong !", "Internal Server Error", "error");
		}
	  };

	const handleNavigation = (role) => {
		dispatch(setCurrentRole(role));
		localStorage.setItem('role', role);
		
		setTimeout(() => {
			navigate('/connect-metamask');
		}, 1000);
	};
	return (
		<div>
			<section class='main-pannel-sec'>
				<div class='container'>
					<div class='row mb-3'>
						<div class='col-md-12 '>
							<div class='top-heading-are text-center'>
								<h2>Before Wallet Connection, Please Choose your role</h2>
								<p>
									MetaProps makes a clear distinction between our Creators and
									our Users. Therefore, to create new NFT content, you must
									first connect your Creator Digital Wallet to begin the
									Registration process. If you wish to join as a User,
									please connect your wallet to begin engaging with the
									platform.
								</p>
							</div>
							<div class='banner-button-wrap btn-group-wrapper'>
								<a
									class='btn btn-block btn-secoundry btn-lg font-weight-medium auth-form-btn'
									onClick={() => handleNavigation('Creator')}
								>
									Connect as a Creator
								</a>
								<a
									class='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
									onClick={() => handleNavigation('User')}
								>
									Connect as a User
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default ConnectWalletLanding;
