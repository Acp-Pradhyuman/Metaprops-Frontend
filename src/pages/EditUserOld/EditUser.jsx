import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer';
import styled from 'styled-components';
import Button from '../../components/Button';
import Heading from '../../components/commons/Heading';
import styles from './EdirUser.module.css';

//Redux
import { handleApiCall } from '../../api';
import { endpoints } from '../../utils/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/Slice/UserSlice/GetUser';

const EditUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userData = useSelector(
		(state) => state.userInformation.userInformation
	);

	const [name, setName] = useState(userData.name);
	const [email, setEmail] = useState(userData.email);
	const [number, setNumber] = useState(userData.phone_no);
	const [occupation, setOccupation] = useState(userData.occupation);
	const [dob, setDob] = useState('');
	const [image, setImage] = useState('');
	const [imagePreview, setImagePreview] = useState(userData.display_picture);
	const [bannerImage, setBannerImage] = useState('');
	const [bannerImagePreview, setBannerImagePreview] = useState(
		userData.cover_picture
	);

	const handleEditUserData = (field, value) => {
		if (field === 'name') {
			setName(value);
		} else if (field === 'email') {
			setEmail(value);
		} else if (field === 'number') {
			setNumber(value);
		} else if (field === 'occupation') {
			setOccupation(value);
		} else if (field === 'dob') {
			setDob(value);
		} else if (field === 'image') {
			let reader = new FileReader();
			reader.onload = function (e) {
				setImagePreview(e.target.result);
			};
			reader.readAsDataURL(value);
			setImage(value);
		} else if (field === 'bannerImage') {
			let reader = new FileReader();
			reader.onload = function (e) {
				setBannerImagePreview(e.target.result);
			};
			reader.readAsDataURL(value);
			setBannerImage(value);
		}
	};
	const handleClearState = () => {
		setBannerImage('');
		setDob('');
		setEmail('');
		setImage('');
		setName('');
		setNumber('');
		setOccupation('');
		setImagePreview('');
		setBannerImagePreview('');
	};
	const handleEditUser = async () => {
		let userData = new FormData();
		if (number) userData.append('phone_no', number);
		if (name) userData.append('name', name);
		if (occupation) userData.append('occupation', occupation);
		if (image) userData.append('display_picture', image);
		if (bannerImage) userData.append('cover_picture', bannerImage);
		const response = await handleApiCall(
			'put',
			`${endpoints.updateUserProfile}`,
			userData
		);
		if (response?.data?.success) {
			dispatch(setUserData(response.data?.data));
			navigate('/profile');
		}
	};
	return (
		<>
			<Header />
			<section className='py-12'>
				<div className='container pb-4'>
					<Heading
						title='Edit Profile'
						description='Please complete the below inforamtion in order compliment your User
            Profile. This information shall be kept private and not displayed on
            your profile for security reasons.'
					/>
				</div>
				<div className='container flex gap-12 lg:flex-col'>
					<div className='flex-1'>
						<div className={styles.input_box}>
							<label htmlFor='' className={styles.user_label}>
								Display Name
							</label>
							<input
								className={styles.user_input}
								placeholder='Display Name'
								value={name}
								onChange={(e) => handleEditUserData('name', e.target.value)}
							></input>
						</div>
						<div className={styles.input_box}>
							<label htmlFor='' className={styles.user_label}>
								Email Address
							</label>
							<input
								className={styles.user_input}
								placeholder='example@email.com'
								type='email'
								value={email}
								onChange={(e) => handleEditUserData('email', e.target.value)}
							></input>
						</div>
						<div className={styles.input_box}>
							<label htmlFor='' className={styles.user_label}>
								Mobile Number
							</label>
							<input
								className={styles.user_input}
								placeholder='+970000000000'
								type='number'
								value={number}
								onChange={(e) => handleEditUserData('number', e.target.value)}
							></input>
						</div>
						<div className={styles.input_box}>
							<label htmlFor='' className={styles.user_label}>
								Occupation
							</label>
							<input
								className={styles.user_input}
								placeholder='Marketing Professional'
								value={occupation}
								onChange={(e) =>
									handleEditUserData('occupation', e.target.value)
								}
							></input>
						</div>
						<div className={styles.input_box}>
							<label htmlFor='' className={styles.user_label}>
								Date of Birth
							</label>
							<input
								className={styles.user_input}
								placeholder='dd/mm/yyyy'
								type='date'
								value={dob}
								onChange={(e) => handleEditUserData('dob', e.target.value)}
							></input>
						</div>
						<div className='flex items-center gap-6 mb-6'>
							<Button className='flex-1' onClick={handleEditUser}>
								Save
							</Button>
							<Button
								className='flex-1'
								colorStyle='#E7EBF0'
								textColor='black'
								onClick={handleClearState}
							>
								Cancel
							</Button>
						</div>
					</div>

					<div className='flex-1'>
						<form>
							<div>
								<label htmlFor='' className={styles.user_label}>
									Image
								</label>

								<div className={`${styles.property_details_wrap} mt-2 mb-4`}>
									{imagePreview ? (
										<img id='bannerImage' src={imagePreview} alt='your image' />
									) : (
										<img src='/img/home/file-type-img1.png' />
									)}
									<div className={styles.edit}>
										<i className='fas fa-pencil-alt text-blue-800' />
										<input
											type='file'
											name='profile_pic'
											accept='image/jpeg, image/bmp, image/png,image/svg'
											onChange={(e) =>
												handleEditUserData('image', e.target.files[0])
											}
										/>
									</div>
								</div>
							</div>
							<div>
								<label htmlFor='' className={styles.user_label}>
									Banner Image
								</label>

								<div className={`${styles.display_picture_wrap} mt-2`}>
									{bannerImagePreview ? (
										<img
											id='bannerImage'
											src={bannerImagePreview}
											alt='your banner image'
										/>
									) : (
										<img src='/img/dummy-img.jpg' />
									)}
									<div className={styles.edit}>
										<i className='fas fa-pencil-alt' />
										<input
											type='file'
											name='profile_pic'
											accept='image/jpeg, image/bmp, image/png,image/svg'
											onChange={(e) =>
												handleEditUserData('bannerImage', e.target.files[0])
											}
										/>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default EditUser;

const input = styled.input`
	padding: 0.5em;
	outline: none;
	border: 1px solid #e2e2e2;
	margin: 0.2em 0 1.3em 0;
	width: 100%;
`;

const label = styled.label`
	font-weight: 600;
	margin-bottom: 0.3em;
`;

const div = styled.div`
	display: flex;
	flex-direction: column;
`;
