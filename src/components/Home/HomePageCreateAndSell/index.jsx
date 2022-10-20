import React from 'react';

//Static
import WALLET_IMAGE from '../../../assets/img/home/wallet.svg';
import PROFILE_IMAGE from '../../../assets/img/home/profile.svg';
import NFT_IMAGE from '../../../assets/img/home/nft.svg';
import SALES_IMAGE from '../../../assets/img/home/sales.svg';
import MANAGE_IMAGE from '../../../assets/img/home/manage.svg';

function CreateAndSell() {
	return (
		<div>
			<section class='pt-1'>
				<div class='container'>
					<div class='row'>
						<div class='col-md-12'>
							<div class='top-heading-are text-center'>
								<h2>Create & Sell</h2>
								<p>
									As a prospective creator you must first register and have
									profile approved before you are eligible to list NFTs for
									sale. Profiles are given verified status if sufficient
									documentation is submitted.
								</p>
							</div>
						</div>
					</div>
					<div class='row mt-4 creator-sell-row'>
						<div class='creator-sell-wrap'>
							<div class='inner-creator-sell'>
								<div class='creator-img-box'>
									<img src={WALLET_IMAGE} />
								</div>
								<h3>Setup Creator Wallet</h3>
								<p>
									A Metamask account must be generated to receive digital crypto
									payments.
								</p>
							</div>
						</div>
						<div class='creator-sell-wrap'>
							<div class='inner-creator-sell'>
								<div class='creator-img-box'>
									<img src={PROFILE_IMAGE} />
								</div>
								<h3>Create your Profile</h3>
								<p>
									All Relevant creator profile information provided, submitted
									and approved by Metaprops.
								</p>
							</div>
						</div>
						<div class='creator-sell-wrap'>
							<div class='inner-creator-sell'>
								<div class='creator-img-box'>
									<img src={NFT_IMAGE} />
								</div>
								<h3>Upload NFTs</h3>
								<p>
									Files and other data can be uploaded to generate a digital
									architecture NFT.
								</p>
							</div>
						</div>
						<div class='creator-sell-wrap'>
							<div class='inner-creator-sell'>
								<div class='creator-img-box'>
									<img src={SALES_IMAGE} />
								</div>
								<h3>Sales and Royalties</h3>
								<p>
									Once purchased, these NFTs remain on your profile as sold
									assets and creators continue to receive future sale royalties.
								</p>
							</div>
						</div>
						<div class='creator-sell-wrap'>
							<div class='inner-creator-sell'>
								<div class='creator-img-box'>
									<img src={MANAGE_IMAGE} />
								</div>
								<h3>Manage Your Profile</h3>
								<p>Update Creator information and manage account settings.</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default CreateAndSell;
