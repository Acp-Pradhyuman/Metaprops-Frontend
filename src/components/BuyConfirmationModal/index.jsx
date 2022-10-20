import React from "react";

const BuyConfirmationModal = () => {
  return (
    <>
      <div>
        <div className="" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="modal-inner-area text-center">
                <h2>Buying Confirmation</h2>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sading elitr, sed diam
                  nonumy
                </p>
                <div className="vew-nft-pannel">
                  <div className="view-nft-inner">
                    <span>NFT Name</span>
                    <span className="bold">NFT 1</span>
                  </div>
                  <div className="view-nft-inner">
                    <span>Creator</span>
                    <span className="second-col">
                      Creator! <img src="./assets/img/home/blue-check.png" />
                    </span>
                  </div>
                  <div className="view-nft-inner">
                    <span>Sales</span>
                    <span className="bold">0 Sales</span>
                  </div>
                  <div className="view-nft-inner">
                    <span>Social Links</span>
                    <span className="bold">Not Specified</span>
                  </div>
                  <div className="view-nft-inner">
                    <span>Contract Address</span>
                    <span className="bold">0x595Cb9420</span>
                  </div>
                  <div className="view-nft-inner">
                    <span>Total Volume</span>
                    <span className="bold">7.0154 ETH</span>
                  </div>
                  <div className="view-nft-inner">
                    <span>Total Items</span>
                    <span className="bold">1 Items</span>
                  </div>
                  <div className="view-nft-inner">
                    <span>Created Date</span>
                    <span className="bold">2 Week Ago</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <a
                className="btn btn-block btn-secoudray btn-lg font-weight-medium auth-form-btn"
                href="javascript:void(0);"
                tabIndex={0}
              >
                Decline
              </a>
              <a
                className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                href="javascript:void(0);"
                tabIndex={0}
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#checkout-modal"
              >
                Accept
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyConfirmationModal;
