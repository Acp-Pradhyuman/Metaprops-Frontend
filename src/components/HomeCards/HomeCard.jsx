import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ETH_IMG_SVG from "../../assets/img/section-image/etherim.svg";
const BLUE_TICK = require("../../assets/img/home/blue-check.png");
const ETH_IMG = require("../../assets/img/section-image/etherim.png");
const HomeCard = ({
  id,
  featureImg,
  likes,
  viewCount,
  title,
  creator,
  ethPrice,
  page,
  allMarket,
  userId,
  creatorProfile,
  isVisible,
  isVerify,
  onSaleColor,
}) => {
  const USDPrice = useSelector(
    (state) => state?.homeInfo?.currentUSDPrice?.usd_price
  );

  if (isVisible) {
    return (
      <>
        <div
          className={`${
            page
              ? "col-md-3 mb-4"
              : allMarket
              ? "marketplace-box-wrapper px-1 d-flex mb-4 flex-column"
              : "px-3"
          }`}
        >
          <div
            className="digital-architecture-box h-100"
            style={{ background: "#A8977B14 0% 0% no-repeat padding-box" }}
          >
            <div className="digital-architecture-img">
              <Link to={`/view-nft/${id}`}>
                <img src={featureImg} />{" "}
              </Link>
              <div className="view-details-wrap">
                <span>
                  <i className="fa fa-eye" />
                  {viewCount}
                </span>
                <span>
                  <i className="fa fa-heart" />
                  {likes}
                </span>
              </div>
            </div>
            <div className="box-details-wrap">
              <a href={`/view-nft/${id}`}>
                <h3>{title}</h3>
              </a>
              <ul className="listing-style-wrap">
                <li>
                  <span className="first-col">Creator:</span>
                  <span className="second-col ellipse_effect">
                    <a
                      href={`/view-creator/${
                        creatorProfile == undefined ? userId : creatorProfile
                      }`}
                    >
                      <a>{creator}</a>
                    </a>
                    {isVerify === 1 ? (
                      <img
                        src={BLUE_TICK}
                        style={{ width: "15px", marginLeft: "4px " }}
                      />
                    ) : (
                      ""
                    )}
                  </span>
                </li>
                <li>
                  <span className="first-col">Price:</span>
                  <span className="second-col d-flex align-items-center">
                    <img src={ETH_IMG_SVG} width="15" className="mr-1" />
                    <span>{ethPrice}&nbsp;</span>{" "}
                    {typeof parseInt(ethPrice) === "number" && (
                      <span
                        class="usdet-wrap"
                        style={{
                          position: "absolute",
                          top: "94.7%",
                          fontSize: "12px",
                        }}
                      >
                        {/* {`(US$ ${((USDPrice || 0) * ethPrice || 0).toFixed(
                          3
                        )})` ?? ""} */}
                        {ethPrice === "Not On Sale" ||
                        ethPrice === "Not on sale"
                          ? ""
                          : `(US$ ${
                              ((USDPrice || 0) * ethPrice).toFixed(3) ?? ""
                            })`}
                      </span>
                    )}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className={`${
            page
              ? "col-md-3 mb-4"
              : allMarket
              ? "marketplace-box-wrapper px-1 d-flex mb-4 flex-column"
              : "px-3"
          }`}
        >
          <div
            className="digital-architecture-box h-100"
            style={{ background: "#A8977B14 0% 0% no-repeat padding-box" }}
          >
            <div className="digital-architecture-img">
              <Link to={`/view-nft/${id}`}>
                <img src={featureImg} />{" "}
              </Link>
              <div className="view-details-wrap">
                <span>
                  <i className="fa fa-eye" />
                  {viewCount}
                </span>
                <span>
                  <i
                    className="fa fa-heart"
                    style={{ color: onSaleColor ? "white" : "" }}
                  />
                  {likes}
                </span>
              </div>
            </div>
            <div className="box-details-wrap">
              <a href={`/view-nft/${id}`}>
                <h3>{title}</h3>
              </a>
              <ul className="listing-style-wrap">
                <li>
                  <span className="first-col">Creator:</span>
                  <span className="second-col ellipse_effect">
                    <a
                      href={`/view-creator/${
                        creatorProfile == undefined ? userId : creatorProfile
                      }`}
                    >
                      <a>{creator}</a>
                    </a>
                    {isVerify === 1 ? (
                      <img
                        src={BLUE_TICK}
                        style={{ width: "15px", marginLeft: "4px " }}
                      />
                    ) : (
                      ""
                    )}
                  </span>
                </li>
                <li>
                  <span className="first-col">Price:</span>
                  <span className="second-col d-flex align-items-center">
                    <img src={ETH_IMG_SVG} width="15" className="mr-1" />
                    <span>{ethPrice}&nbsp;</span>{" "}
                    {typeof parseInt(ethPrice) === "number" && (
                      <span
                        class="usdet-wrap"
                        style={{
                          position: "absolute",
                          top: "94.7%",
                          fontSize: "12px",
                        }}
                      >
                        {ethPrice === "Not On Sale" ||
                        ethPrice === "Not on sale"
                          ? ""
                          : `(US$ ${
                              ((USDPrice || 0) * ethPrice).toFixed(2) ?? ""
                            })`}
                      </span>
                    )}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default HomeCard;
