import React from 'react';
import TypologySlider from '../../Sliders/TypologySlider';

//Static
const TYPOLOGY_IMAGE = require('../../../assets/img/home/typology-bg.png');

function Typology() {
	return (
		<div>
			<section
				style={{
					background: `url(${TYPOLOGY_IMAGE})`,
					backgroundSize: 'cover'
				}}
			>
				<div class='container'>
					<div class='row'>
						<div class='col-md-12'>
							<div class='top-heading-are text-center top-heading-are1'>
								<h2>Browse by Typology</h2>
								<p>
									Browse the marketplace by searching by typology to understand
									the wealth of content available in each of these sectors.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class='container-fluid mt-3'>
					<div className='slick-white-dotted mb-5'>
						<TypologySlider />
					</div>
				</div>
			</section>
		</div>
	);
}

export default Typology;
