import React, { useEffect, useState } from 'react';
import SliderComponent from '../SliderComponent_2';
import CollectionCard from '../../HomeCards/CollectionCard';
import { handleApiCall } from '../../../api';
import { endpoints } from '../../../utils/endpoints';
import { setCollection } from '../../../redux/Slice/Home';
import { useDispatch, useSelector } from 'react-redux';

const FeatureImg = require('../../../assets/img/section-image/slide-1.png');

const CollectionSlider = () => {
	const dispatch = useDispatch();
	const [data,setData] = useState([])

	const collectionData = useSelector((state) => state.homeInfo.collectionInfo);

	useEffect(() => {
		const handleGetTerms = async () => {
			const response = await handleApiCall(
				'get',
				`${endpoints.getFeaturedCollection}`
			);
			if (response.data.success) {
				setData(response?.data?.data || collectionData)
				dispatch(setCollection(response?.data?.data));
			}
		};
		handleGetTerms();
	}, []);

	return (
		<>
			<SliderComponent name={'typology'} arrow={true}>
				{data.length > 0 &&
					data.map((data) => {
						return (
							<CollectionCard
								image={
									!data.cover_picture
										? FeatureImg
										: data.cover_picture
								}
								title= {
									data.name.length < 30 ? data.name : `${(data.name).substring(0,34)}...`
								  }
								id={data._id}
							/>
						);
					})} 
			</SliderComponent>
		</>
	);
};

export default CollectionSlider;
