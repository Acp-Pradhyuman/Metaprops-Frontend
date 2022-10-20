import React, { useState, useEffect } from 'react';
import { setFavoritedNft } from '../../../redux/Slice/OwnedNft';
import { handleApiCall } from '../../../api';
import { endpoints } from '../../../utils/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import HomeCard from '../../../components/HomeCards/HomeCard';
import { PopUp } from '../../../utils/utility';

const Favourited = () => {
	const dispatch = useDispatch();
	const favoritedNftData = useSelector(
		(state) => state.ownedNftInfo.favoritedNftInfo
	);
	useEffect(() => {
		handleFavoritedNft();
	}, []);
	//Get Creator Favourited NFTs Data
	const handleFavoritedNft = async () => {
		try {
			const response = await handleApiCall(
				'post',
				`${endpoints.getFavoritedNft}?user_id=${'621cad5ba71fb9251771ef4c'}`
			);
			if (response?.data?.success) {
				dispatch(setFavoritedNft(response?.data?.data));
			}
		} catch (e) {
			PopUp('Something went wrong', 'Internal server error', 'error');
		}
	};
	return (
		<>
			{favoritedNftData.length > 0 ? (
				<div className='row mt-4'>
					{favoritedNftData.length > 0 &&
						favoritedNftData.map((data) => {
							return (
								<HomeCard
									key={data._id}
									featureImg={data?.nftData?.preview_image}
									likes={652}
									viewCount={data?.likeCountData?.like_count}
									title={data?.nftData?.nft_name}
									creator={data?.user_data_new?.name}
									ethPrice={7.0154}
									allMarket
								/>
							);
						})}

					<div className='col-md-12 text-center mb-4 content-wrap'>
						<a
							className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
							href='all-marketplace.html'
						>
							See More
						</a>
					</div>
				</div>
			) : (
				<div className='row'>
					<div className='col-md-12'>
						<div className='profile-item-display-box text-center my-4'>
							<h3>No items to display</h3>
							<p>Once NFTs have been purchased, they will appear here.</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Favourited;
