import React, { useState } from 'react';
import {
	FacebookShareButton,
	LinkedinShareButton,
	TelegramShareButton,
	WhatsappShareButton
} from 'react-share';
import { Link } from 'react-router-dom';

import styles from './AddNftModal.module.css';
import { endpoints } from './../../utils/endpoints';

const AddNftModal = ({ id }) => {
	const [url, setUrl] = useState(`${endpoints.baseShareUrl}/${id}`);
	return (
		<div style={{ textAlign: 'center', padding: '1em' }}>
			<h2 style={{ fontSize: '27px' }}>NFT Added successfully</h2>
			<p>Check on your profile to view the NFT or click the link below.</p>
			<div>
				<p style={{ fontSize: '17px', color: 'black' }}>Share to</p>
				<div className={styles.share_icons}>
					<div className={styles.icon}>
						<FacebookShareButton url={url}>
							<i class='fa-brands fa-facebook-f'></i>
						</FacebookShareButton>
					</div>

					<div className={styles.icon}>
						<LinkedinShareButton url={url}>
							<i class='fa-brands fa-linkedin-in'></i>
						</LinkedinShareButton>
					</div>

					<div className={styles.icon}>
						<WhatsappShareButton url={url}>
							<i class='fa-brands fa-whatsapp'></i>
						</WhatsappShareButton>
					</div>

					<div className={styles.icon}>
						<TelegramShareButton url={url}>
							<i class='fa-brands fa-telegram'></i>
						</TelegramShareButton>
					</div>
				</div>
			</div>
			<div className='modal-footer mt-4 p-0'>
				<Link
					className='btn btn-block  btn-primary btn-lg font-weight-medium auth-form-btn'
					id='js-ready-sell-modal2'
					to={`/view-nft/${id}`}
				>
					View NFT
				</Link>
			</div>
		</div>
	);
};

export default AddNftModal;
