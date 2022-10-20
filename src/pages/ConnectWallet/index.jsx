import React from 'react';
import Header from '../../components/Header';
import ConnectWalletLanding from '../../components/ConnectWallet/MainWalletPage';
import Footer from '../../components/Home/HomePageFooter';

function ConnectWallet() {
	return (
		<div>
			<Header />
			<ConnectWalletLanding />
			<Footer />
		</div>
	);
}

export default ConnectWallet;
