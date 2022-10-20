import { data } from "jquery";
import React from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ name, titleImg, comapanyImg, id, isVerify }) => {
  return (
    <>
      <div className="col-md-2 px-3">
        <div className="digital-architecture-box">
          <a href={`/view-creator/${id}`}>
            <div
              className="digital-architecture-img"
              style={{ cursor: "pointer" }}
            >
              <a>
                <img src={titleImg} />
              </a>
            </div>
          </a>

          <div className="created-box-wrapper">
            <div
              className="feature-icon-box"
              style={{
                //background: "url(./img/home/file-type-img.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <img src={comapanyImg} />
            </div>
            <a href={`/view-creator/${id}`}>
              <div
                className="feature-name-wrap feature-wrap-name"
                style={{ color: "black" }}
              >
                <span>{name}</span>{" "}
                {isVerify === 1 && <img src="/img/home/blue-check.png" />}
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureCard;
