import axios from 'axios';
import { endpoints } from './../utils/endpoints';

export const handleApiCall = async (method = '', url = '', data = {}) => {
	let axiosConfig = {
		method,
		url: `${endpoints.baseUrl}${url}`,
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	};
	if (method !== 'get') axiosConfig['data'] = data;
	try {
		let response = await axios(axiosConfig);
		return response;
	} catch (error) {
		console.warn(error.response.message);
	}
};
