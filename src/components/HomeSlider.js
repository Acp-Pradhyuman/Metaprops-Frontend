import React from "react";
import HomeCard from "../components/HomeCard";
import Slider from "react-slick";

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="fa-solid fa-angle-left border border-black p-2 px-3 bg-white ml-4"></i>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="fa-solid fa-angle-right  border border-black p-2 px-3 bg-white"></i>
    </div>
  );
};

const HomeSlider = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
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
  };
  return (
    <div>
      <Slider {...settings}>
        <HomeCard
          title="Logos Villas and Apartments"
          creator="Creators"
          price="7.154"
        />
        <HomeCard
          title="Logos Villas and Apartments"
          creator="Creators"
          price="7.154"
        />
        <HomeCard
          title="Logos Villas and Apartments"
          creator="Creators"
          price="7.154"
        />
        <HomeCard
          title="Logos Villas and Apartments"
          creator="Creators"
          price="7.154"
        />
        <HomeCard
          title="Logos Villas and Apartments"
          creator="Creators"
          price="7.154"
        />
        <HomeCard
          title="Logos Villas and Apartments"
          creator="Creators"
          price="7.154"
        />
        <HomeCard
          title="Logos Villas and Apartments"
          creator="Creators"
          price="7.154"
        />
        <HomeCard
          title="Logos Villas and Apartments"
          creator="Creators"
          price="7.154"
        />
        <HomeCard
          title="Logos Villas and Apartments"
          creator="Creators"
          price="7.154"
        />
        <HomeCard
          title="Logos Villas and Apartments"
          creator="Creators"
          price="7.154"
        />
      </Slider>
    </div>
  );
};

export default HomeSlider;
