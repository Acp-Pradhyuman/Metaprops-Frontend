import React from "react";
import FeatureCard from "../components/FeatureCard";
import Slider from "react-slick";
import SliderWrapper from "./Sliders/SliderStyle";

const TypologySlider = () => {
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
    appendDots: dots => <ul>{dots}</ul>,
    customPaging: i => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    )
  };
	return (
		<div>
			<SliderWrapper>
				<Slider {...settings}>
					<div className="typo-image p-2">
						<img src="/img/home/collection1.png" alt="" />
						<p className="type-text font-bold text-white text-center">Residential Villas</p>
					</div>
					<div className="typo-image p-2">
						<img src="/img/home/collection2.png" alt="" />
						<p className="type-text font-bold text-white text-center">Residentials Apartments</p>
					</div>
					<div className="typo-image p-2">
						<img src="/img/home/collection3.png" alt="" />
						<p className="type-text text-white font-bold">Offices</p>
					</div>
					<div className="typo-image p-2">
						<img src="/img/home/collection4.png" alt="" />
						<p className="type-text text-white font-bold text-center">Skycrapers</p>
					</div>
					<div className="typo-image p-2">
						<img src="/img/home/collection2.png" alt="" />
						<p className="type-text text-white font-bold text-center">Mixed Use developments</p>
					</div>
				</Slider>
			</SliderWrapper>
		</div>
	);
};

export default TypologySlider;
