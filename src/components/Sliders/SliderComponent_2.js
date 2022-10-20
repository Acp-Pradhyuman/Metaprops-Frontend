import React from "react";
import Slider from "react-slick";
import SliderWrapper from "./SliderStyle.js";

const SamplePrevArrow = (props) => {
	const { className, onClick } = props;
	return (
		<div className={className} onClick={onClick}>
			<i
				className="fa-solid fa-angle-left p-1 px-2 bg-white ml-4"
				style={{ border: "1px solid gray" }}
			></i>
		</div>
	);
};

const SampleNextArrow = (props) => {
	const { className, onClick } = props;
	return (
		<div className={className} onClick={onClick}>
			<i
				className="fa-solid fa-angle-right  p-1 px-2 bg-white ml-4"
				style={{ border: "1px solid gray" }}
			></i>
		</div>
	);
};

const SliderComponent = ({ children }) => {
	const settings = {
		dots: true,
		arrows: true,
		speed: 500,
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		initialSlide: 0,
		prevArrow: <SamplePrevArrow />,
		nextArrow: <SampleNextArrow />,
		responsive: [
			{
				breakpoint: 1600,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
					dots: true,
				},
			},
			{
				breakpoint: 1099,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
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
		appendDots: (dots) => <ul>{dots}</ul>,
	};
	return (
		<div>
			<SliderWrapper>
				<Slider {...settings}>{children}</Slider>
			</SliderWrapper>
		</div>
	);
};

export default SliderComponent;
