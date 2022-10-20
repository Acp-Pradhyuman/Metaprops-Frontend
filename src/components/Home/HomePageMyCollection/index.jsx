import React from 'react';
import CollectionSlider from '../../Sliders/CollectionSlider';
import { useNavigate } from 'react-router-dom';

//Static
const SLIDE_IMAGE = require('../../../assets/img/section-image/slide-1.png');
function MyCollection() {
	const navigate = useNavigate();
	return (
		<div>
			<section>
				<div class='container'>
					<div class='row'>
						<div class='col-md-12'>
							<div class='top-heading-are text-center'>
								<h2>Browse by Collections</h2>
								<p>
									The team at MetaProps select the very best NFTs from the top
									and most popular creators in the world. The content ranges from architecture typologies and
									other specialist categories.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class='container-fluid mt-4 pt-2'>
					<div className='home-slide'>
						<CollectionSlider />
					</div>
					<div class='row'>
						<div class='col-md-12 text-center content-wrap mt-0'>
							<a
								class='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn mt-4'
								onClick={() => navigate("/collection")}
							>
								Browse Collections
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default MyCollection;
