import React from 'react';
import Header from '../../components/Header';
import EditCreator from '../../components/Creators/EditCreator';
import Footer from '../../components/Home/HomePageFooter';

import EditCreatorSlice from '../../redux/Slice/UserSlice/Creator/EditCreator';

const Creators = () => {
	return (
		<div>
			<Header />
			<EditCreator />
			<Footer />
		</div>
	);
};

export default Creators;
