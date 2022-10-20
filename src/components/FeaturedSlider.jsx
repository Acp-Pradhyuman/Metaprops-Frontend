import React from "react";
import FeatureCard from "../components/FeatureCard";
import Slider from "react-slick";
import SliderWrapper from "./Sliders/SliderStyle";

const FeaturedSlider = () => {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
    arrows: false,
    adaptiveHeight: true,
	responsive: [
		{
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 3,
			infinite: true,
			dots: true,
		  },
		},
		{
		  breakpoint: 600,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 2,
			initialSlide: 2,
			dots: true,
  
		  },
		},
		{
		  breakpoint: 480,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		  },
		},
	  ],
    appendDots: dots => <ul>{dots}</ul>
	
	};
	return (
		<div>
			<SliderWrapper>
				<Slider {...settings}>
					<FeatureCard
						title="Retro diglsaga & Neonsetery"
						titleImg="/img/home/feature1.png"
					/>
					<FeatureCard
						title="Retro diglsaga & Neonsetery"
						titleImg="/img/home/feature1.png"
					/>
					<FeatureCard
						title="Retro diglsaga & Neonsetery"
						titleImg="/img/home/feature1.png"
					/>
					<FeatureCard
						title="Retro diglsaga & Neonsetery"
						titleImg="/img/home/feature1.png"
					/>
					<FeatureCard
						title="Retro diglsaga & Neonsetery"
						titleImg="/img/home/feature1.png"
					/>
					<FeatureCard
						title="Retro diglsaga & Neonsetery"
						titleImg="/img/home/feature1.png"
					/>
				</Slider>
			</SliderWrapper>
		</div>
	);
};

export default FeaturedSlider;
