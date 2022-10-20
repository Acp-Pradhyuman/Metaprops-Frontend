import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton
} from 'react-share';

import styles from './SocialShare.module.css';
import Button from '../Button';
import { endpoints } from './../../utils/endpoints';
import { useSelector } from 'react-redux';

const SocialShare = ({ id, creator, nftView}) => {
	const userId = useSelector(
		(state) => state.creatorInformation?.creartorInformation?.[0]?._id
	);
	const [copy, setCopy] = useState(false);
	const [url, setUrl] = useState(creator ? `${endpoints.baseShareUrl}view-creator/${id}` : nftView ? `${endpoints.baseShareUrl}view-nft/${id}` :`${endpoints.baseShareUrl}${userId}`);
    

	// console.log("userIduserIduserIduserId", userId)
	return (
		<div className={styles.shares}>
			<h2 className={styles.shares_title}>Share</h2>
			<p>
				Share content via social media platforms or copy a link to send
				directly.
			</p>

			<ul className='modal-share-icon-slider' style={{justifyContent: "center"}}>
				<li style={{cursor: "pointer"}}>
					<FacebookShareButton url={url}>
						<i class='fa-brands fa-facebook-f'></i>
					</FacebookShareButton>
				</li>
				<li style={{cursor: "pointer"}}>
					<a>
						<LinkedinShareButton url={url}>
							<i
								class='fa-brands fa-linkedin-in'
								style={{ color: 'black' }}
							></i>
						</LinkedinShareButton>
					</a>
				</li>
				<li style={{cursor: "pointer"}}>
					<a>
						<WhatsappShareButton url={url}>
							<i class='fa-brands fa-whatsapp' style={{ color: 'black' }}></i>
						</WhatsappShareButton>
					</a>
				</li>
				<li style={{cursor: "pointer"}}>
					<a>
						<TelegramShareButton url={url}>
							<i class='fa-brands fa-telegram' style={{ color: 'black' }}></i>
						</TelegramShareButton>
					</a>
				</li>
				<li style={{cursor: "pointer"}}>
					<TwitterShareButton url={url}>
						<i class='fa-brands fa-twitter'></i>
					</TwitterShareButton>
				</li>
			</ul>

			<div className={styles.or_box}>
				<div className={styles.or_line}></div>
				<span className='text-gray-500'>Or</span>
				<div className={styles.or_line}></div>
			</div>

			<form action=''>
				<p className={styles.share_text}>Share the link:</p>
				<input
					type='text'
					className='w-100  border border-gray-300 p-3 text-gray-600'
					value={url}
				/>
				<CopyToClipboard
					text={url}
					onCopy={() => setCopy(true)}
				>
					<Button className={styles.btn_style} margin='20px 0 0 0'>
						{copy ? 'Link Copied' : 'Copy Link'}
					</Button>
				</CopyToClipboard>
			</form>
		</div>
	);
};

export default SocialShare;
