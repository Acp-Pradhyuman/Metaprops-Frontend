import React from "react";

const CREATOR_IMG = require("../../assets/img/home/blue-check.png");

const BuyingConfirmation = () => {
  return (
    <>
      <div className="">
        <div className="modal-body">
          <div className="text-center">
            <h2 style={{ fontFamily: "Kenney Future Square" }}>
              Buying Confirmation
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consetetur sading elitr, sed diam
              nonumy
            </p>
            <div
              className="vew-nft-pannel"
              style={{ border: "none", fontSize: "15px !important" }}
            >
              <div className="view-nft-inner buying_font_size">
                <span>NFT Name</span>
                <span className="bold" style={{ fontSize: "15px" }}>
                  NFT 1
                </span>
              </div>
              <div className="view-nft-inner buying_font_size">
                <span>Creator</span>
                <span className="second-col">
                  Creator!{" "}
                  <img src={CREATOR_IMG}/>
                </span>
              </div>
              <div className="view-nft-inner mt-1 buying_font_size">
                <span>Sales</span>
                <span className="bold">
                  0 Sales
                </span>
              </div>
              <div className="view-nft-inner mt-1 buying_font_size">
                <span>Social Links</span>
                <span className="bold">
                  Not Specified
                </span>
              </div>
              <div className="view-nft-inner mt-1 buying_font_size">
                <span>Contract Address</span>
                <span className="bold">
                  0x595Cb9420
                </span>
              </div>
              <div className="view-nft-inner mt-1 buying_font_size">
                <span>Total Volume</span>
                <span className="bold">
                  7.0154 ETH
                </span>
              </div>
              <div className="view-nft-inner mt-1 buying_font_size">
                <span>Total Items</span>
                <span className="bold">
                  1 Items
                </span>
              </div>
              <div className="view-nft-inner mt-1 buying_font_size">
                <span>Created Date</span>
                <span className="bold">
                  2 Week Ago
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center" style={{ gap: "1em" }}>
            <a className="btn btn-block buying_decline">Decline</a>
            <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
              Accept
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyingConfirmation;
