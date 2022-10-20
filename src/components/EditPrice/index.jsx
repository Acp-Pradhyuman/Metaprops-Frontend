import React, { useState, useEffect } from 'react';
import Modal from './../commons/Modal/Modal.jsx';
import SellNftModal from './../SellNftModal';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { useSelector } from 'react-redux';
import { useParams, Link, Navigate } from 'react-router-dom';

import { PopUp } from '../../utils/utility.js';
import { handleApiCall } from './../../api/index';
import { endpoints } from './../../utils/endpoints';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const BLUE_TICK = require('../../assets/img/home/blue-check.png');
const NFT_TABLE = require('../../assets/img/section-image/nft-table.png');
const BLOCK_PREVIEW = require('../../assets/img/section-image/slide-1.png');
const FILE_PREVIEW = require('../../assets/img/folder.png');
const SALE_IMG = require('../../assets/img/section-image/round-check.png');

const EditPrice = () => {
	const nftDetail = useSelector((state) => state.nftDetail.currentNFT);

	const { id } = useParams();
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [showNested, setShowNested] = useState(false);
	const [type, setType] = useState('Fixed');
	const [currencyOptions, setCurrencyOptions] = useState([
		{ value: 'Eth', label: 'Eth on Polygon' },
		{ value: 'Matic', label: 'Matic' }
	]);
	const [currency, setCurrency] = useState('');
	const [royality, setRoyality] = useState('');
	const [isPrivate, setIsPrivate] = useState(false);
	const [address, setAddress] = useState([]);
	const [fee, setFee] = useState('');
	const [amount, setAmount] = useState('');
	const [duration, setDuration] = useState({ label: '1 day', value: '1 day' });
	const [durationOptions, setDurationOptions] = useState([
		{ label: '1 day', value: '1 day' },
		{ label: '3 days', value: '3 days' },
		{ label: '1 month', value: '1 month' },
		{ label: '3 months', value: '3 months' },
		{ label: '6 months', value: '6 months' }
	]);
	const [startingDate, setStartingDate] = useState('');
	const [endingDate, setEndingDate] = useState('');
	const [payload, setPayload] = useState({});

	const handleType = (selection) => {
		setType(selection);
	};
	useEffect(() => {
		getCommision();
	}, []);
	useEffect(() => {
		const today = new Date();
		if (duration?.value === '1 day') {
			const priorDate = new Date().setDate(today.getDate() + 1);
			const date = new Date(priorDate);
			const start = today.toLocaleDateString('en-US').split('/');
			const end = date.toLocaleDateString('en-US').split('/');
			setStartingDate(`${start[1]}/${start[0]}/${start[2]}`);
			setEndingDate(`${end[1]}/${end[0]}/${end[2]}`);
		} else if (duration?.value === '3 days') {
			const priorDate = new Date().setDate(today.getDate() + 3);
			const date = new Date(priorDate);
			const start = today.toLocaleDateString('en-US').split('/');
			const end = date.toLocaleDateString('en-US').split('/');
			setStartingDate(`${start[1]}/${start[0]}/${start[2]}`);
			setEndingDate(`${end[1]}/${end[0]}/${end[2]}`);
		} else if (duration?.value === '1 month') {
			const priorDate = new Date().setDate(today.getDate() + 30);
			const date = new Date(priorDate);
			const start = today.toLocaleDateString('en-US').split('/');
			const end = date.toLocaleDateString('en-US').split('/');
			setStartingDate(`${start[1]}/${start[0]}/${start[2]}`);
			setEndingDate(`${end[1]}/${end[0]}/${end[2]}`);
		} else if (duration?.value === '3 months') {
			const priorDate = new Date().setDate(today.getDate() + 90);
			const date = new Date(priorDate);
			const start = today.toLocaleDateString('en-US').split('/');
			const end = date.toLocaleDateString('en-US').split('/');
			setStartingDate(`${start[1]}/${start[0]}/${start[2]}`);
			setEndingDate(`${end[1]}/${end[0]}/${end[2]}`);
		} else if (duration?.value === '6 months') {
			const priorDate = new Date().setDate(today.getDate() + 180);
			const date = new Date(priorDate);
			const start = today.toLocaleDateString('en-US').split('/');
			const end = date.toLocaleDateString('en-US').split('/');
			setStartingDate(`${start[1]}/${start[0]}/${start[2]}`);
			setEndingDate(`${end[1]}/${end[0]}/${end[2]}`);
		}
	}, [duration]);
	const handleSellFormData = (field, value) => {
		console.table({ field, value });
		if (field === 'currency') {
			setCurrency(value);
		}
		if (field === 'royality') {
			if (value) {
				if (Number(value) > 100 || Number(value) < 1) {
					PopUp('Invalid Value', 'Please Enter Value Between 1 - 100', 'error');
					setRoyality('');
				} else {
					setRoyality(Number(value));
				}
			} else {
				setRoyality('');
			}
		}
		if (field === 'private') {
			setIsPrivate(value);
		}
		if (field === 'Address') {
			setAddress(value);
		}
		if (field === 'amount') {
			setAmount(value);
		}
		if (field === 'duration') {
			setDuration(value);
		}
		if (field === 'starting_date') {
			setStartingDate(value);
		}
		if (field === 'ending_date') {
			setEndingDate(value);
		}
	};
	const getCommision = async () => {
		try {
			const response = await handleApiCall('get', `${endpoints.getCommision}`);
			if (response?.data?.success) {
				setFee(response?.data?.data?.fees);
			}
		} catch (error) {
			PopUp('Something went wrong', 'Internal server error', 'error');
		}
	};

	const handleSellNFT = async () => {
		let data = {
			id,
			type,
			metaprops_fees: fee,
			is_private: isPrivate ? 1 : 0
		};
		if (nftDetail?.creator_addr) {
			data['creator_addr'] = nftDetail?.creator_addr;
		}
		if (currency) {
			data['currency'] = currency?.value;
		} else {
			PopUp('Invalid Value', 'Please Select Currency', 'error');
			return;
		}
		if (amount) {
			data['price'] = +amount;
		} else {
			PopUp('Invalid Value', 'Please Enter Price', 'error');
			return;
		}
		if (royality) {
			data['future_royalty'] = `${royality}%`;
		}
		if (isPrivate && address && address.length) {
			const temp = [];
			address.map((item) => {
				temp.push(item.value);
			});
			data['private_address'] = temp;
		}
		if (type === 'Auction') {
			if (duration) {
				data['duration'] = duration?.value;
			} else {
				PopUp(
					'Invalid Value',
					'Please Select Starting and Ending Date',
					'error'
				);
				return;
			}
		}
		if (startingDate) {
			data['start_date'] = startingDate;
		}
		if (endingDate) {
			data['end_date'] = endingDate;
		}
		setPayload(data);
		setShow(true);
	};
	return (
		<>
			<section className='main-pannel-sec'>
				<div className='container'>
					<div className='row mb-4'>
						<div className='col-md-12'>
							<div className='top-heading-are text-center'>
								<h2>Edit Price</h2>
								<p>
									Please complete the below information to successfully list
									your NFT for sale. Choose between fixed or auction based sale
									strategies or whether to sell privately.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='container'>
					<div className='row'>
						<div className='col-md-6'>
							<div className='sell-nft-wraaper'>
								<div className='sell-nft-box-wrap'>
									<img src={nftDetail && nftDetail?.preview_image} />
									<div className='sell-nft-name'>
										<h3>{nftDetail && nftDetail?.nft_name}</h3>
										<span className='second-col'>
											<a href='javascript:void(0);' tabIndex={0}>
												{nftDetail &&
													nftDetail?.creatorInfo &&
													nftDetail?.creatorInfo.length &&
													nftDetail?.creatorInfo[0]?.name}
											</a>{' '}
											<img src={BLUE_TICK} />
										</span>
									</div>
								</div>
								{/* <div className='sell-nft-details'>
									<span>Price</span>
									<h3>7.0154 ETH</h3>
									<span>$20,000 USD</span>
								</div> */}
							</div>
						</div>
					</div>
					<div className='row mt-4'>
						<div className='col-md-6'>
							<div className='sell-nft-tab'>
								<h3>Type</h3>
								<ul className='nav nav-tabs'>
									<li className='active'>
										<a
											data-toggle='tab'
											className={type === 'Fixed' ? 'active' : ''}
											onClick={() => handleType('Fixed')}
										>
											Fixed
										</a>
									</li>
									<li>
										<a
											data-toggle='tab'
											className={type === 'Auction' ? 'active' : ''}
											onClick={() => handleType('Auction')}
										>
											Auction
										</a>
									</li>
								</ul>
								<div>
									<div id='fixed' className='tab-pane fade in active pt-3'>
										<form className='profile-wrap-form row'>
											<div
												className='form-group col-md-6'
												style={{ zIndex: '136' }}
											>
												<label>Price</label>
												<div className='slect-option-wrap'>
													<Select
														defaultValue={currency}
														value={currency}
														onChange={(e) => handleSellFormData('currency', e)}
														options={currencyOptions}
													/>
												</div>
											</div>
											<div className='form-group col-md-6'>
												<label>&nbsp;</label>
												<input
													type='text'
													className='form-control'
													placeholder='Amount'
													style={{ borderRadius: '5px', height: '37px' }}
													value={amount}
													onChange={(e) =>
														handleSellFormData('amount', e.target.value)
													}
												/>
											</div>
											{type === 'Fixed' && (
												<>
													<div className='form-group col-md-6'>
														<label>MetaProps Fees</label>
														<input
															type='text'
															value={fee}
															className='form-control'
															placeholder='platform fee'
															disabled
														/>
													</div>
													<div className='form-group col-md-6'>
														<label>Future Royalty</label>
														<input
															type='text'
															className='form-control'
															placeholder
															value={royality}
															onChange={(e) =>
																handleSellFormData('royality', e.target.value)
															}
														/>
													</div>
												</>
											)}
											{type === 'Auction' && (
												<>
													<div
														className='form-group col-md-12'
														style={{ zIndex: '125' }}
													>
														<label>Duration</label>
														<Select
															defaultValue={
																durationOptions &&
																durationOptions.length &&
																durationOptions[0]
															}
															onChange={(e) =>
																handleSellFormData('duration', e)
															}
															options={durationOptions}
														/>
													</div>
													<div className='form-group col-md-6'>
														<label>Starting Date</label>
														<input
															type='text'
															className='form-control'
															placeholder='Flat rate of 5%'
															value={startingDate}
															onChange={(e) =>
																handleSellFormData(
																	'starting_date',
																	e.target.value
																)
															}
															disabled
														/>
														<i className='fas fa-calendar-week' />
													</div>
													<div className='form-group col-md-6'>
														<label>Ending Date</label>
														<input
															type='text'
															className='form-control'
															placeholder='Flat rate of 5%'
															value={endingDate}
															disabled
															onChange={(e) =>
																handleSellFormData(
																	'ending_date',
																	e.target.value
																)
															}
														/>
														<i className='fas fa-calendar-week' />
													</div>
												</>
											)}
											<div className='form-group col-md-12 mt-2'>
												<div className='make-private-wrap'>
													<label>Make Private</label>
													<div className='custom-control custom-switch'>
														<input
															type='checkbox'
															className='custom-control-input'
															id='customSwitches'
															checked={isPrivate}
															onChange={(e) =>
																handleSellFormData('private', e.target.checked)
															}
														/>
														<label
															className='custom-control-label'
															htmlFor='customSwitches'
														/>
													</div>
													{isPrivate && (
														<CreatableSelect
															isMulti
															onChange={(e) => handleSellFormData('Address', e)}
															options={address}
															placeholder='Add Address'
														/>
													)}
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
						<div className='col-md-6'>
							<div className='row sell-nft-tab2'>
								<div className='col-md-6 col-sm-6'>
									<div className='blockchain-box'>
										<span>Blockchain Preview Image</span>
										<img src={nftDetail && nftDetail?.preview_image} />
									</div>
								</div>
								<div className='col-md-6 col-sm-6'>
									<div className='blockchain-box1'>
										<span>Blockchain Compressed File</span>
										<div className='blockchain-wrap'>
											<img src={FILE_PREVIEW} />
										</div>
									</div>
								</div>
								<div className='col-md-6 col-sm-6 cancel-btn-wrapper'>
									<Link
										className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn mt-4'
										to={`/view-nft/${id}`}
									>
										Cancel
									</Link>
								</div>
								<div className='col-md-6 col-sm-6'>
									<a
										className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn mt-4'
										onClick={handleSellNFT}
									>
										Sell
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Modal show={show} onClose={() => setShow(false)}>
				<SellNftModal showModal={() => setShowNested(true)} data={payload} />
			</Modal>

			<Modal show={showNested} onClose={() => setShowNested(false)}>
				<div className='' role='document'>
					<div className=''>
						<div className='modal-body'>
							<div className='modal-inner-area text-center'>
								<h2>Your item is ready for sale</h2>
								<p>
									Thank you for completing the relavant data. Your NFT is now
									successfully listed.
								</p>
								<img src={SALE_IMG} />
							</div>
						</div>
						<div className='modal-footer'>
							<div className='url-link'>
								<a
									className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
									href='view-nft1.html'
									tabIndex={0}
								>
									View NFT
								</a>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default EditPrice;
