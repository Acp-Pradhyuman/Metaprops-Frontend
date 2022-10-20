import React from "react";
const BLUE_TICK = require("../../assets/img/home/blue-check.png");
const BG_IMG = require("../../assets/img/home/file-type-img.png");
const FEATURE_IMG = require("../../assets/img/home/feature1.png");
const TITLE_IMG = require("../../assets/img/section-image/slide-1.png");

const FeatureCard = () => {
  return (
    <>
      <div className="digital-architecture-box">
        <div className="digital-architecture-img">
          <img src={TITLE_IMG} />
        </div>
        <div className="created-box-wrapper">
          <div
            className="feature-icon-box"
            style={{
              //background: `url(${BG_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img src={FEATURE_IMG} />
          </div>
          <div className="feature-name-wrap">
            Retro digital
            <br /> saga <img src={BLUE_TICK} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureCard;
