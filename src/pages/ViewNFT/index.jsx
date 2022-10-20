import { useEffect } from 'react';
import Header from '../../components/Header';
import NFTDetail from '../../components/NftDetails';
import Footer from '../../components/Home/HomePageFooter';

function ViewNFT() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<Header />
			<NFTDetail />
			<Footer />
		</>
	);
}

export default ViewNFT;
