import React from "react";
const FEATURE_IMG = require('../../../assets/img/section-image/slide-1.png')
const ETH_IMG = require('../../../assets/img/section-image/etherim.png')
const BLUE_TICK = require('../../../assets/img/home/blue-check.png')
const MarketPlaceCard = () => {
  return (
    <>
      <div className="col-md-3">
        <div className="digital-architecture-box">
          <div className="digital-architecture-img">
            <img src={FEATURE_IMG}/>
            <div className="view-details-wrap">
              <span>
                <i className="fa fa-eye" />
                25k
              </span>
              <span>
                <i className="fa fa-heart" />
                652
              </span>
            </div>
          </div>
          <div className="box-details-wrap">
            <h3>NFT 1</h3>
            <ul className="listing-style-wrap">
              <li>
                <span className="first-col">Creator</span>
                <span className="second-col">
                  <a href="javascript:void(0);" tabIndex={0}>
                    Creator!
                  </a>
                  <img src={BLUE_TICK}/>
                </span>
              </li>
              <li>
                <span className="first-col">Price:</span>
                <span className="second-col">
                  <img src={ETH_IMG}/>
                  <span>7.0154</span>
                  <span className="usdet-wrap"> (USD $20,000)</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPlaceCard;
