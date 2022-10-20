import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTerms } from '../../redux/Slice/GetTerms';
import { endpoints } from '../../utils/endpoints';
import { handleApiCall } from '../../api';
import parse from 'html-react-parser';
import Header from '../../components/Header';
import HomePageFooter from '../../components/Home/HomePageFooter';

const Terms = () => {
	const dispatch = useDispatch();

	const termsData = useSelector((state) => state.termsInfo.termsInfo);

	// const parseData = parse(`termsData.terms_and_condition`);

	useEffect(() => {
		const handleGetTerms = async () => {
			const response = await handleApiCall('get', `${endpoints.getTerms}`);
			if (response.data.success) {
				dispatch(setTerms(response?.data?.data));
			}
		};

		handleGetTerms();
	}, []);

	return (
		<>
			<Header />
			<section>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='top-heading-are'>
								<h2>Terms &amp; Conditions</h2>
								<div className='row'>
									<div className='col-md-7'>
										<p>
											Please find the MetaProps Terms and Conditions stated
											below. Please contact MetaProps Team in case of further
											queries.
										</p>
										<div className='date-update-wrap'>
											<span>
												<strong>Effective From:</strong> March 7th, 2022
											</span>
											<span>
												<strong>Last Updated:</strong> March 7th, 2022
											</span>
										</div>
									</div>
									{/* <div className='col-md-5 privacy-policy-search'>
										<div className='input-group mr-2'>
											<input
												type='search'
												className='form-control rounded'
												placeholder='Terms & Conditions'
												aria-label='Search'
												aria-describedby='search-addon'
											/>
											<i className='fas fa-search' />
										</div>
									</div> */}
								</div>
							</div>
						</div>
					</div>
					<div className='row mt-4'>
						<div className='col-md-12'>
							<div className='privacy-all-text terms-conditions-wrap'>
								{parse(`${termsData.terms_and_condition}`)}
							</div>
						</div>
					</div>
				</div>
			</section>
			<HomePageFooter />
		</>
	);
};

export default Terms;
