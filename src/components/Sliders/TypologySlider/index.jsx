import React, { useEffect, useState } from 'react';
import SliderComponent from '../SliderComponent';
import TypologyCard from '../../HomeCards/TypologyCard';
import { handleApiCall } from '../../../api';
import { endpoints } from '../../../utils/endpoints';
import { setTypology } from '../../../redux/Slice/Home';
import { useDispatch, useSelector } from 'react-redux';

const TypologySlider = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState([])

	const typologyData = useSelector((state) => state.homeInfo.typologyInfo);

	useEffect(() => {
		const handleGetTerms = async () => {
			const response = await handleApiCall('get', `${endpoints.featuredTypology}`);
			if (response.data.success) {
				setData(response?.data?.data || typologyData)
				dispatch(setTypology(response?.data?.data));
			}
		};

		handleGetTerms();
	}, []);


	return (
		<div>
			<SliderComponent dots={true}>
				{data.length > 0 &&
					data.map((data) => {
						return (
							<TypologyCard
								name={data.name}
								image={data.image}
								key={data._id}
							/>
						);
					})}
			</SliderComponent>
		</div>
	);
};

export default TypologySlider;
