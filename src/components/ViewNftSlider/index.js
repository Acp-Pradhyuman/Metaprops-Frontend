import { data } from "jquery";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import SliderWrapper from "../Sliders/SliderStyle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { style } from "@mui/system";

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

const ViewNftSlider = ({ image }) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [data, setData] = useState([]);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    initialSlide: 0,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  const settings2 = {
    className: "center",
      // centerMode: true,
      infinite: data.length>=3,
      arrows: false,
      slidesToShow: 3,
      speed: 500,
      dots: false,
      slidesToScroll: 2,
      initialSlide: 0,
    // 
    // 
    // infinite: false,
    // speed: 500,
    // slidesToShow: 6,
    // 
    // 
    
  };

  useEffect(() => {
    getImages(image);
  }, [image]);

  const getImages = (image) => {
    const temp = [];
    image &&
      image.length &&
      image.map((item) => {
        temp.unshift({ image: item });
      });
    setData(temp);
  };
  return (
    <>
      <div>
        <SliderWrapper>
          <Slider
            asNavFor={nav2}
            ref={(slider1) => setNav1(slider1)}
            {...settings}
          >
            {data &&
              data.length > 0 &&
              data.map((item) => {
                return (
                  <img className="slider-top-img " src={item.image} alt="" />
                );
              })}
          </Slider>
        </SliderWrapper>

        <SliderWrapper>
          <Slider
            asNavFor={nav1}
            ref={(slider2) => setNav2(slider2)}
            slidesToShow={4}
            swipeToSlide={false}
            focusOnSelect={true}
            
            // afterChange={()=>{
            //   style={border:"2px solid black"}

            // }}
            
            {...settings2}
          >
            {data &&
              data.length > 0 &&
              data.map((item) => {
                return (
                  <img  src={item.image} alt="" className="slider-bottom-img" />
                );
              })}
          </Slider>
        </SliderWrapper>
      </div>
    </>
  );
};

export default ViewNftSlider;
