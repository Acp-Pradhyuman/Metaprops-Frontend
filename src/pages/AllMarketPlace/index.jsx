import React, { useEffect } from 'react';
import Header from '../../components/Header';
import HomePageFooter from '../../components/Home/HomePageFooter';
import HomeCard from '../../components/HomeCards/HomeCard';
import FilterImg from '../../assets/img/user/fillter-head.svg';
import { handleApiCall } from '../../api';
import { endpoints } from '../../utils/endpoints';
import { setAllMarketPlace } from '../../redux/Slice/AllMarketplace';
import { useDispatch, useSelector } from 'react-redux';

const AllMarketPlace = () => {
	const dispatch = useDispatch();

	const marketplaceData = useSelector(
		(state) => state.allMarketplaceInfo.allMarketplaceInfo
	);

	useEffect(() => {
		const handleGetTerms = async () => {
			const response = await handleApiCall(
				'get',
				`${endpoints.getAllMarketPlace}`
			);
			if (response.data.success) {
				dispatch(setAllMarketPlace(response?.data?.data));
			}
		};

		handleGetTerms();
	}, []);

	return (
		<>
			<Header />
			<section className='main-pannel-sec'>
				<div className='container'>
					<div className='row mb-4'>
						<div className='col-md-12'>
							<div className='top-heading-are text-center'>
								<h2>Marketplace</h2>
								<p>
									Browse the full MetaProps marketplace to be exposed the
									largest collection of high quality digital NFT architecture
									content available in the world. Use the filter bar to refine
									your search and find your perfect digital assets.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='container-fluid px-5'>
					<div className='row'>
						<div className='col-lg-12'>
							<div className='left-side-column'>
								<div className='row all-marketplace-wrap all-marketplace-wrap1'>
									<div className='col-md-3'>
										<div className='d-flex'>
											<div className='fillter-top-area'>
												<img src={FilterImg} />
												<span>Filter by</span>
												<i className='fas fa-arrow-down' />
											</div>
										</div>
									</div>
									<div className='col-md-6 left-side-top-head'>
										<div className='input-group'>
											<input
												type='search'
												className='form-control rounded'
												placeholder='Search Marketplace'
												aria-label='Search'
												aria-describedby='search-addon'
											/>
											<i className='fas fa-search' />
										</div>
									</div>
									<div className='col-md-3 blank-column' />
									<div className='col-md-3 slect-option-wrap'>
										<details className='custom-select1'>
											<summary className='radios'>
												<input
													type='radio'
													name='item'
													id='default'
													title='Sort by'
													defaultChecked
												/>
												<input
													type='radio'
													name='item'
													id='item1'
													title='Sort by'
												/>
												<input
													type='radio'
													name='item'
													id='item2'
													title='Most Viewed'
												/>
												<input
													type='radio'
													name='item'
													id='item3'
													title='Most Favourite'
												/>
											</summary>
											<ul className='list'>
												<li>
													<label htmlFor='item1'>Sort by</label>
												</li>
												<li>
													<label htmlFor='item2'>Most Viewed</label>
												</li>
												<li>
													<label htmlFor='item3'>Most Favourite</label>
												</li>
											</ul>
										</details>
									</div>
								</div>
								<div className>
									<div className='row mt-4'>
										{marketplaceData.length > 0 &&
											marketplaceData.map((data) => {
												return (
													<HomeCard
														key={data._id}
														featureImg={data.preview_image}
														likes={652}
														viewCount={data?.views_count?.view_count}
														title={data.nft_name}
														creator={data.user_data_new.name}
														ethPrice={7.0154}
														allMarket
													/>
												);
											})}
										<div className='col-md-12 text-center content-wrap'>
											<a
												className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
												href='javascript:void(0);'
											>
												See More
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<HomePageFooter />
		</>
	);
};

export default AllMarketPlace;
