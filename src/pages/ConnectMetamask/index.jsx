import React from 'react';
import Header from '../../components/Header';
import ConnectMetaMask from '../../components/ConnectMetamask/MetamaskLanding';
import Footer from '../../components/Home/HomePageFooter';

function ConnectMetamask() {
	return (
		<div>
			<Header />
			<ConnectMetaMask onAddressChanged={(address) => {}} />
			<Footer />
		</div>
	);
}

export default ConnectMetamask;
