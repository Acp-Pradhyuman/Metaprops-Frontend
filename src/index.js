import React from 'react';
import ReactDOM from 'react-dom';
// import { ChakraProvider } from "@chakra-ui/react";
// import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './assets/fonts/fontawesome-webfont.ttf';
import { MetaMaskProvider } from 'metamask-react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { HandleRefreshToken } from './utils/utility';
import axios from 'axios';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

// For GET requests
axios.interceptors.request.use(
	(req) => {
		// Add configurations here

		return req;
	},
	(err) => {
		return Promise.reject(err);
	}
);

// For POST requests
axios.interceptors.response.use(
	(res) => {
		// Add configurations here
		return res;
	},
	(err) => {
		if (err.response.status === 400) {
			HandleRefreshToken();
			// Genrate New Refresh Token
		} else if (err.response.status === 403) {
			//Refresh Token Expired
			localStorage.clear();
			window.location.href = '/';
		}
		// else if (err.response.status === 500) {
		// 	localStorage.clear();
		// 	window.location.href = '/';
		// }
		return Promise.reject(err);
	}
);

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			{/* <React.StrictMode> */}
				<MetaMaskProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</MetaMaskProvider>
			{/* </React.StrictMode> */}
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);
