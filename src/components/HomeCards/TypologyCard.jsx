import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchTypology } from '../../redux/Slice/AllMarketplace';
const TypologyCard = ({ name, image }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleTypologyNavigate = () => {
		dispatch(setSearchTypology(name));
		navigate('/marketplace');
	};
	return (
		<div onClick={handleTypologyNavigate}>
			<div className='collection-name-wrap m-3 v-box'>
				<img src={image} />
				<h4>{name}</h4>
			</div>
		</div>
	);
};

export default TypologyCard;
