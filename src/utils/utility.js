import { handleApiCall } from '../api';
import { endpoints } from './endpoints';
import swal from 'sweetalert';

export const HandleRefreshToken = async () => {
	try {
		const response = await handleApiCall(
			'post',
			`${endpoints.updateRefreshToken}`,
			{
				refreshToken: localStorage.getItem('refreshToken')
			}
		);
		if (response?.data?.success) {
			localStorage.setItem('token', response.data.accessToken);
		} else {
			localStorage.clear();
			// window.location.reload();
		}
	} catch (error) {
		localStorage.clear();
		// window.location.reload();
	}
};
export const PopUp = (message = '', apiMessage = '', type = '') => {
	return swal(message, apiMessage, type );
};
export const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

export 	async function checkIfWalletIsConnected() {
	if (window.ethereum.selectedAddress) {
		const accounts = await window.ethereum.request({
			method: 'eth_accounts'
		});
		if (accounts.length > 0) {
			const account = accounts[0];
			return account;
		}
	}else{
		return false
	}
}