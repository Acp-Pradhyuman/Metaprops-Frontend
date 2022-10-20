import React from 'react';
import HomeSlider from '../../../components/Sliders/HomeSlider/index';


function HomePageHero() {
	return (
		<div>
			<section>
				<div class='container'>
					<div class='row'>
						<div class='col-md-12 mb-2'>
							<div class='top-heading-are text-center'>
								<h2>Become a Digital Architecture Landlord</h2>
								<p>
									Own and trade your own digital architecture across a range of
									typologies. Collect professional works from the best creators
									in the world.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class='container-fluid mt-3'>
					<div className='home-slide black-dots mb-5'>
						<HomeSlider />
					</div>
				</div>
			</section>
		</div>
	);
}

export default HomePageHero;
