import React, { useEffect } from 'react';
import Header from '../../components/Header';
import HomePageFooter from '../../components/Home/HomePageFooter';
import { handleApiCall } from '../../api';
import { endpoints } from '../../utils/endpoints';
import { setPrivacy } from '../../redux/Slice/GetTerms';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';

const PrivacyPolicy = () => {
	const dispatch = useDispatch();

	const privacyData = useSelector((state) => state.termsInfo.privacyInfo);

	useEffect(() => {
		handleGetTerms();
	}, []);
	const handleGetTerms = async () => {
		const response = await handleApiCall(
			'get',
			`${endpoints.getPrivacyPolicy}`
		);
		if (response.data.success) {
			dispatch(setPrivacy(response?.data.data));
		}
	};

	return (
		<>
			<Header />
			<section>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='top-heading-are'>
								<h2>Privacy Policy</h2>
								<div className='row'>
									<div className='col-md-7'>
										<p>
											Please find the MetaProps Privacy Policy stated below.
											Please contact MetaProps Team in case of further queries.
										</p>
									</div>
									<div className='col-md-5 privacy-policy-search'>
										{/* <div className='input-group mr-2'>
											<input
												type='search'
												className='form-control rounded'
												placeholder='Privacy Policy'
												aria-label='Search'
												aria-describedby='search-addon'
											/>
											<i className='fas fa-search' />
										</div> */}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='row mt-4'>
						<div className='col-md-12'>
							<div className='privacy-all-text'>
								{parse(`${privacyData.privacy_policy}`)}
							</div>
						</div>
					</div>
				</div>
			</section>
			<HomePageFooter />
		</>
	);
};

export default PrivacyPolicy;
