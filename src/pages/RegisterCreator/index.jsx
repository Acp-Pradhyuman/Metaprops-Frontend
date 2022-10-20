import React from 'react';

//component
import Header from '../../components/Header';
import RegistorNewCreator from '../../components/Creators/RegisterNewCreator';
import Footer from '../../components/Home/HomePageFooter';
import { useSelector } from 'react-redux';

function RegisterCreator() {
	const userRole = useSelector((state) => state.registerUser.currentRole);

	return (
		<div>
			<Header />
			<RegistorNewCreator role={userRole ?? localStorage.getItem('role')} />
			<Footer />
		</div>
	);
}

export default RegisterCreator;
