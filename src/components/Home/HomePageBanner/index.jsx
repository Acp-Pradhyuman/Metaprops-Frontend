import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../../utils/endpoints";
import { handleApiCall } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { setBannerImage } from "../../../redux/Slice/BannerImage";
import { Link } from "react-router-dom";

//Static
const BACKGROUND = require("../../../assets/img/home/banner-img.png");
const BANNER_MAIN = require("../../../assets/img/home/banner-main.png");
const BLUE_CHECK = require("../../../assets/img/home/blue-check.png");
const ETH = require("../../../assets/img/section-image/etherim.png");

function HomePageBanner() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bannerData = useSelector(
    (state) => state.bannerImageInfo.bannerImageInfo
  );
  const USDPrice = useSelector(
    (state) => state?.homeInfo?.currentUSDPrice?.usd_price
  );

  useEffect(() => {
    const handleGetBanner = async () => {
      const response = await handleApiCall(
        "get",
        `${endpoints.getBannerImage}`
      );
      if (response?.data?.success) {
        dispatch(setBannerImage(response?.data?.data));
      }
    };

    handleGetBanner();
  }, []);

  return (
    <div>
      <section
        class="banner pb-5 pt-5"
        style={{
          background: `url(${
            bannerData && bannerData[0]?.nft_data?.preview_image
          })`,
          backgroundSize: "cover",
          height: "fit-content",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div class="container banner-slider-wrap slick-white-dotted">
          <div class="row pt-4 pb-4 mt-5">
            <div class="col-xl-6 col-lg-10 col-md-12 banner-overlay mt-5">
              <div class="banner-content">
                <h1>
                  Premium Digital Architecture NFTs Created by the World’s
                  Leading Architects
                </h1>
                <p>
                  Browse digital architecture created by the world’s leading
                  architects and designers. Become part of the digital
                  architecture community by owning and trading your own
                  Non-Fungible tokens (NFTs). Register as a creator to monetise
                  projects and allow others to share in your passion for digital
                  architecture production.
                </p>
                <div class="banner-button-wrap">
                  <a
                    class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={() => navigate("/marketplace")}
                  >
                    Explore&nbsp;&nbsp;&nbsp;
                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                  </a>
                  <a
                    class="btn btn-block btn-secoundry btn-lg font-weight-medium auth-form-btn"
                    onClick={() => navigate("/connect-wallet")}
                  >
                    Create&nbsp;&nbsp;&nbsp;
                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-xl-6 mt-5 banner-top-wrapper">
              {bannerData.length > 0 &&
                bannerData.slice(0, 1).map((data) => {
                  return (
                    <>
                      <a href={`/view-nft/${data?.nft_data?._id}`}>
                        <div class="banner-main-wrapper">
                          <img
                            src={
                              data?.nft_data?.preview_image
                                ? data?.nft_data?.preview_image
                                : BANNER_MAIN
                            }
                            style={{ height: "384px" }}
                          />
                          {/* {data?.views_count?.view_count && (
														<div class='banner-vew-count'>
															<div class='view-details-wrap'>
																<span>
																	<i class='fa fa-eye'></i>
																	{data?.views_count?.view_count
																		? data?.views_count?.view_count
																		: 0}
																</span>
																<span>
																	<i class='fa fa-heart'></i>
																	{!data.likeCountData
																		? 0
																		: data?.likeCountData?.like_count}
																</span>
															</div>
														</div>
													)} */}
                          <div class="banner-img-overlay">
                            <div class="banner-overlay-inner">
                              <div class="banner-text-wrapper">
                                {data?.creatorInfo?.name && (
                                  <>
                                    <a
                                      href={`/view-nft/${data?.nft_data?._id}`}
                                      style={{
                                        textDecoration: "none",
                                        color: "white",
                                      }}
                                    >
                                      <h3>
                                        {/* {data?.nft_data?.nft_name} */}
                                        {data?.nft_data?.nft_name.length < 30
                                          ? data?.nft_data?.nft_name
                                          : `${data?.nft_data?.nft_name.substring(
                                              0,
                                              30
                                            )}...`}
                                      </h3>
                                      <h3>
                                        {/* {data?.nft_data?.nft_name.length < 10
                                          ? data?.nft_data?.nft_name
                                          : `${data?.nft_data?.nft_name.substring(
                                              0,
                                              18
                                            )}...`} */}
                                      </h3>
                                    </a>{" "}
                                    <span class="second-col">
                                      <a tabindex="0">
                                        {/* {data?.creatorInfo?.name} */}
                                        {data?.creatorInfo?.name.length < 30
                                          ? data?.creatorInfo?.name
                                          : `${data?.creatorInfo?.name.substring(
                                              0,
                                              30
                                            )}...`}
                                      </a>
                                      {data.creatorInfo.is_verify === 1 && (
                                        <img src={BLUE_CHECK} />
                                      )}
                                    </span>
                                  </>
                                )}
                              </div>
                              {data?.token_owner?.price && (
                                <div class="banner-eth-text">
                                  <span class="second-col">
                                    <img src={ETH} />
                                    <span>{data?.token_owner?.price}</span>
                                    <span class="usdet-wrap">{`(US$ ${(
                                      USDPrice * data?.token_owner?.price
                                    ).toFixed(3)})`}</span>
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </a>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePageBanner;
