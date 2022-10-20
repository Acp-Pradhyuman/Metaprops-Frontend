import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HomePageFooter from "../../components/Home/HomePageFooter";
import HomeCard from "../../components/HomeCards/HomeCard";
import Select from "react-select";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Modal from "../../components/commons/Modal/Modal";
import SocialShare from "../../components/SocialShare/SocialShare";
import {
  setNftOfCreators,
  setNftOfCreatorSearch,
  setNftOfCreatorSort,
  setNftOfCreatorsPage,
} from "../../redux/Slice/NftOfCreator";

import { handleApiCall } from "../../api";
import { endpoints } from "../../utils/endpoints";
import { setUserProfileInfo } from "../../redux/Slice/ViewCreator";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setOwnedNft, setFavoritedNft } from "../../redux/Slice/OwnedNft";
import FilterMenu from "../../components/Creators/FilterMenu";
import filterImg from "../../assets/img/user/fillter-head.svg";
import { PopUp } from "../../utils/utility";

const ETH_IMG = require("../../assets/img/section-image/etherim.png");
const CREATOR_IMG = require("../../assets/img/creator.png");
const TYPE_IMG = require("../../assets/img/home/file-type-img1.png");
const BLUE_TICK = require("../../assets/img/home/blue-check.png");
// const filterImg = require("../../assets/img/user/fillter-head.svg")

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "black",
    padding: 5,
    margin: "0px",
    background: "#e8e9e9",
    ":hover": {
      background: "#4472c7",
      color: "white",
    },
    boxShadow: "none",
  }),
  indicatorSeparator: () => ({
    border: "none",
    color: "black",
  }),
  dropdownIndicator: () => ({
    color: "black",
    paddingRight: ".5em",
  }),
  control: (provided, state) => ({
    ...provided,
    background: "#e8e9e9",
    margin: "10px 0px",
    border: "0px solid",
    borderRadius: "0px",
    outline: "none",
    boxShadow: "none",
  }),
  input: () => ({
    margin: "0px",
  }),
  menu: (provided, state) => ({
    ...provided,
    background: "#e8e9e9",
    margin: "5px 0px",
    borderColor: "#e8e9e9",
    borderRadius: "0px",
    padding: "0px",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const ViewCreator = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [searchData, setSearchData] = useState(null);

  // const creatorProfileDetails = useSelector(
  //   (state) => state.userProfileInfo.userProfileInfo
  // );
  const [creatorProfileDetails, setCreatorProfileDetails] = useState([]);
  // const createdNftData = useSelector(
  // 	(state) => state.nftOfCreators.nftOfCreators
  // );

  const [sortOptions, setSortOptions] = useState([
    { value: "-1", label: "Most Favourited" },
    { value: "-1", label: "Newest" },
    { value: "1", label: "Oldest" },

    { value: "-1", label: "Price (High to Low)" },
    { value: "1", label: "Price (Low to High)" },
  ]);

  const [copy, setCopy] = useState(false);
  const [show, setShow] = useState(false);
  const [seeMore, setSeeMore] = useState(1);
  const [sort, setSort] = useState(false);
  const [noSeeMore, setNoSeeMore] = useState();
  const [bannerData, setBannerData] = useState(null);
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);
  const [favoritedNftData, setFavoritedNftData] = useState([]);
  const [creatorActivity, setCreatorActivity] = useState([]);

  const [favSeeMoreButton, setFavSeeMoreButton] = useState(false);
  const [favCurrentPage, setFavCurrentPage] = useState(1);
  const [activitySeeMoreButton, setActivitySeeMoreButton] = useState(false);

  const [currentTab, setCurrentTab] = useState("created");
  const [createdNftData, setCreatedNftData] = useState([]);
  const [activityCurrentPage, setActivityCurrentPage] = useState(1);
  const [payload, setPayload] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setCopy(false);
    }, 4000);
  });

  useEffect(() => {
    handleGetUserProfile();
    handleCreatedNft();
    handleFavoritedNft();
    handleGetCreatorActivity();
    getBannerData();
    dispatch(setNftOfCreatorsPage(1));
  }, []);

  useEffect(() => {
    searchData !== null && handleCreatedNftSearch();
  }, [searchData]);

  useEffect(() => {
    handleCreatorSort();
  }, [sort]);

  useEffect(() => {
    setTimeout(() => {
      handleViewCreatorPage();
    }, 50);
  }, [seeMore]);
  useEffect(() => {
    setTimeout(() => {
      if (favCurrentPage > 1) handleFavoritedNft();
    }, 50);
  }, [favCurrentPage]);

  useEffect(() => {
    if (activityCurrentPage > 1) handleGetCreatorActivity();
  }, [activityCurrentPage]);

  const handleViewCreatorPage = async () => {
    const response = await handleApiCall(
      "post",
      `${endpoints.getNftOfCreator}?creator_id=${id}&page=${seeMore}`
    );
    if (response?.data?.success) {
      setNoSeeMore(response?.data?.next_page);

      seeMore > 1 && dispatch(setNftOfCreatorsPage(response?.data?.data));
      seeMore > 1 &&
        setCreatedNftData((prev) => [...prev, ...response?.data?.data]);
    }
  };
  const handleGetCreatorActivity = async () => {
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.getCreatorActivity}?page=${activityCurrentPage}`,
        {
          id,
        }
      );
      if (response.data.success) {
        setCreatorActivity((prev) => [...prev, ...response?.data?.data]);
        setActivitySeeMoreButton(
          response?.data?.next_page === null ? false : true
        );
      } else {
        PopUp("Internal Server Error", response.data.message, "error");
      }
    } catch (error) {
      PopUp("Something Went Wrong", error.response.message, "error");
    }
  };

  //Get User Profile Data
  const handleGetUserProfile = async () => {
    const response = await handleApiCall(
      "post",
      `${endpoints.getUserProfile}`,
      { id }
    );
    if (response.data.success) {
      setCreatorProfileDetails(response?.data?.data);
      setCreatorProfileDetails(response?.data?.data);
      dispatch(setUserProfileInfo(response?.data?.data));
    }
  };

  //Get Creator Created NFT Data
  const handleCreatedNft = async () => {
    const response = await handleApiCall(
      "post",
      `${endpoints.getNftOfCreator}?creator_id=${id}`
    );
    if (response?.data?.success) {
      setCreatedNftData(response?.data?.data);
      dispatch(setNftOfCreators(response?.data?.data));
    }
  };

  const handleCreatedNftSearch = async () => {
    try {
      const response = await handleApiCall(
        "post",
        currentTab === "created"
          ? `${endpoints.getNftOfCreator}?creator_id=${id}&keyword=${searchData}`
          : `${endpoints.getFavoritedNft}?user_id=${id}`,
        currentTab === "created" ? {} : { keyword: searchData ?? "" }
      );
      if (response?.data?.success) {
        if (searchData !== null) {
          if (currentTab === "created") {
            setCreatedNftData(response?.data?.data);
          } else if (currentTab === "Fav") {
            setFavoritedNftData(response?.data?.data);
          }
        }
      } else {
        setFavoritedNftData([]);
      }
    } catch (error) {
      PopUp("Something Went Wrong", error.response.message, "error");
    }
  };

  //Get Creator Favourited NFTs Data
  const handleFavoritedNft = async (status) => {
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.getFavoritedNft}?user_id=${id}&page=${favCurrentPage}`
      );
      if (response?.data?.success) {
        if (status === 2)
          setFavoritedNftData((prev) => [...prev, ...response?.data?.data]);
        if (status === 1 || !status) setFavoritedNftData(response?.data?.data);

        // setFavoritedNftData(response?.data?.data);

        setFavSeeMoreButton(response?.data?.next_page === null ? false : true);
        dispatch(setFavoritedNft(response?.data?.data));
      }
    } catch (error) {
      PopUp("Something Went Wrong", error.response.message, "error");
    }
  };

  const handleCreatorSort = async () => {
    let resEnd;
    if (currentTab === "created") {
      if (sort.label === "Most Favourited") {
        resEnd = `${
          endpoints.getNftOfCreator
        }?creator_id=${id}&favourite=${-1}&keyword=${searchData ?? ""}`;
      } else if (sort.label === "Newest") {
        resEnd = `${
          endpoints.getNftOfCreator
        }?creator_id=${id}&createdAt=${-1}&keyword=${searchData ?? ""}`;
      } else if (sort.label === "Oldest") {
        resEnd = `${
          endpoints.getNftOfCreator
        }?creator_id=${id}&createdAt=${1}&keyword=${searchData ?? ""}`;
      } else if (sort.label === "Price (High to Low)") {
        resEnd = `${
          endpoints.getNftOfCreator
        }?creator_id=${id}&price=${-1}&keyword=${searchData ?? ""}`;
      } else if (sort.label === "Price (Low to High)") {
        resEnd = `${
          endpoints.getNftOfCreator
        }?creator_id=${id}&price=${1}&keyword=${searchData ?? ""}`;
      }
    } else if (currentTab === "Fav") {
      if (sort.label === "Most Favourited") {
        resEnd = `${endpoints.getFavoritedNft}?user_id=${id}&favourite=${-1}`;
      } else if (sort.label === "Newest") {
        resEnd = `${endpoints.getFavoritedNft}?user_id=${id}&createdAt=${-1}`;
      } else if (sort.label === "Oldest") {
        resEnd = `${endpoints.getFavoritedNft}?user_id=${id}&createdAt=${1}`;
      } else if (sort.label === "Price (High to Low)") {
        resEnd = `${endpoints.getFavoritedNft}?user_id=${id}&price=${-1}`;
      } else if (sort.label === "Price (Low to High)") {
        resEnd = `${endpoints.getFavoritedNft}?user_id=${id}&price=${1}`;
      }
    }
    try {
      const response = await handleApiCall("post", resEnd, payload);
      if (response?.data?.success) {
        if (currentTab === "created") {
          setCreatedNftData(response?.data?.data);
        } else if (currentTab === "Fav") {
          setFavoritedNftData(response?.data?.data);
        }
      }
    } catch (error) {
      PopUp("Something Went Wrong", error.response.message, "error");
    }
  };

  const handleSort = (e) => {
    setSort(e);
  };

  const gotoSocialPage = (url) => {
    let URL = `https://${url}`;
    window.open(URL, "_blank");
  };
  const getBannerData = async () => {
    const response = await handleApiCall(
      "post",
      `${endpoints.getFloorPriceCreator}`,
      {
        id,
      }
    );
    if (response?.data?.success) {
      setBannerData(response?.data);
    }
  };

  const pattern = /^((http|https|ftp):\/\/)/;

  return (
    <>
      <Header />
      <section
        className="p-0 collections-banner"
        style={{
          backgroundImage: `url(${
            creatorProfileDetails[0]?.user_data &&
            creatorProfileDetails[0]?.user_data.banner_image
          })`,
        }}
      >
        <div className="container">
          <ul class="propert-details-list">
            <li>
              <span>{bannerData?.createdCount}</span>
              <p>Items</p>
            </li>
            <li>
              <span>{bannerData?.soldCount}</span>
              <p>Owners</p>
            </li>
            <li>
              <img src={ETH_IMG} />
              <span>{bannerData?.floorPrice}</span>
              <p>Floor Price</p>
            </li>
            <li>
              <img src={ETH_IMG} />
              <span>{Math.round(bannerData?.priceVolume * 1000) / 1000}</span>
              <p>Volume Traded</p>
            </li>
          </ul>
        </div>
      </section>

      <div>
        <section className="pt-3 pb-4 margin-botom-wrap">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-3 property-col-wrap">
                <div className="property-details-wrap creator-property-details">
                  <div class="profilePic">
                    <img
                      src={
                        creatorProfileDetails[0]?.user_data?.profile_image &&
                        creatorProfileDetails[0]?.user_data?.profile_image
                      }
                    />
                  </div>
                  <div className="d-flex property-icon-box">
                    <ul className="property-share-link">
                      {creatorProfileDetails[0]?.user_data?.twitter && (
                        <li>
                          <a
                            href={
                              pattern.test(
                                `${
                                  creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.twitter
                                }`
                              )
                                ? creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.twitter
                                : `https://${
                                    creatorProfileDetails[0]?.user_data &&
                                    creatorProfileDetails[0]?.user_data?.twitter
                                  }`
                            }
                            target="_blank"
                          >
                            <i class="fa-brands fa-twitter text-black"></i>
                          </a>
                        </li>
                      )}
                      {creatorProfileDetails[0]?.user_data?.facebook && (
                        <li>
                          <a
                            href={
                              pattern.test(
                                `${
                                  creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.facebook
                                }`
                              )
                                ? creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.facebook
                                : `https://${
                                    creatorProfileDetails[0]?.user_data &&
                                    creatorProfileDetails[0]?.user_data
                                      ?.facebook
                                  }`
                            }
                            target="_blank"
                          >
                            <i class="fa-brands fa-facebook-f text-black"></i>
                          </a>
                        </li>
                      )}
                      {creatorProfileDetails[0]?.user_data?.linkdin && (
                        <li>
                          <a
                            href={
                              pattern.test(
                                `${
                                  creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.linkdin
                                }`
                              )
                                ? creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.linkdin
                                : `https://${
                                    creatorProfileDetails[0]?.user_data &&
                                    creatorProfileDetails[0]?.user_data?.linkdin
                                  }`
                            }
                            target="_blank"
                          >
                            <i class="fa-brands fa-linkedin-in text-black"></i>
                          </a>
                        </li>
                      )}
                      {creatorProfileDetails[0]?.user_data?.youtube && (
                        <li>
                          <a
                            href={
                              pattern.test(
                                `${
                                  creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.youtube
                                }`
                              )
                                ? creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.youtube
                                : `https://${
                                    creatorProfileDetails[0]?.user_data &&
                                    creatorProfileDetails[0]?.user_data?.youtube
                                  }`
                            }
                            target="_blank"
                          >
                            <i class="fa-brands fa-youtube text-black"></i>
                          </a>
                        </li>
                      )}
                      {creatorProfileDetails[0]?.user_data?.telegram && (
                        <li>
                          <a
                            href={
                              pattern.test(
                                `${
                                  creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.telegram
                                }`
                              )
                                ? creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.telegram
                                : `https://${
                                    creatorProfileDetails[0]?.user_data &&
                                    creatorProfileDetails[0]?.user_data
                                      ?.telegram
                                  }`
                            }
                            target="_blank"
                          >
                            <i class="fa-brands fa-telegram text-black"></i>
                          </a>
                        </li>
                      )}
                      {creatorProfileDetails[0]?.user_data?.instagram && (
                        <li>
                          <a
                            href={
                              pattern.test(
                                `${
                                  creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.instagram
                                }`
                              )
                                ? creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.instagram
                                : `https://${
                                    creatorProfileDetails[0]?.user_data &&
                                    creatorProfileDetails[0]?.user_data
                                      ?.instagram
                                  }`
                            }
                            target="_blank"
                          >
                            <i class="fa-brands fa-instagram text-black"></i>
                          </a>
                        </li>
                      )}
                      {creatorProfileDetails[0]?.user_data?.discord && (
                        <li>
                          <a
                            href={
                              pattern.test(
                                `${
                                  creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.discord
                                }`
                              )
                                ? creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.discord
                                : `https://${
                                    creatorProfileDetails[0]?.user_data &&
                                    creatorProfileDetails[0]?.user_data?.discord
                                  }`
                            }
                            target="_blank"
                          >
                            <i class="fa-brands fa-discord text-black"></i>
                          </a>
                        </li>
                      )}
                      {creatorProfileDetails[0]?.user_data?.medium && (
                        <li>
                          <a
                            href={
                              pattern.test(
                                `${
                                  creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.medium
                                }`
                              )
                                ? creatorProfileDetails[0]?.user_data &&
                                  creatorProfileDetails[0]?.user_data?.medium
                                : `https://${
                                    creatorProfileDetails[0]?.user_data &&
                                    creatorProfileDetails[0]?.user_data?.medium
                                  }`
                            }
                            target="_blank"
                          >
                            <i class="fa-brands fa-medium text-black"></i>
                          </a>
                        </li>
                      )}
                    </ul>
                    <ul className="property-share-link proerty-web-icon">
                      <li>
                        {pattern.test(
                          `${creatorProfileDetails[0]?.user_data?.creator_web}`
                        ) && (
                          <a
                            href={
                              creatorProfileDetails[0]?.user_data?.creator_web
                            }
                            target="_blank"
                          >
                            <i class="fas fa-globe"></i>
                          </a>
                        )}
                      </li>
                      <li>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${creatorProfileDetails[0]?.user_data?.primary_address}`}
                          target="_blank"
                        >
                          <i className="fas fa-map-marker-alt" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-5 col-6 property-details-area">
                <h3>
                  {creatorProfileDetails[0]?.user_data?.name}
                  {creatorProfileDetails[0]?.user_data.is_verify === 1 && (
                    <img src={BLUE_TICK} />
                  )}
                </h3>
                <form>
                  <div
                    className="d-flex mb-3"
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <input
                      type="text"
                      style={{ border: "none", width: "70%" }}
                      placeholder={
                        creatorProfileDetails[0]?.wallet_address
                          ? `${creatorProfileDetails[0]?.wallet_address.substring(
                              0,
                              5
                            )}...${creatorProfileDetails[0]?.wallet_address.substring(
                              creatorProfileDetails[0]?.wallet_address.length -
                                4
                            )}`
                          : "0x595Cb9420d584u45d3"
                      }
                    />
                    <CopyToClipboard
                      text={
                        creatorProfileDetails[0]?.wallet_address &&
                        creatorProfileDetails[0]?.wallet_address
                      }
                      onCopy={() => setCopy(true)}
                    >
                      {copy ? (
                        <i
                          className="fa-solid fa-check"
                          style={{ cursor: "pointer", color: "#4472c7" }}
                        />
                      ) : (
                        <i
                          className="far fa-copy"
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </CopyToClipboard>
                  </div>
                </form>
                <span>
                  Joined:{" "}
                  {moment(
                    creatorProfileDetails[0]?.createdAt &&
                      creatorProfileDetails[0]?.createdAt
                  ).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className="col-lg-7 col-md-12 description-text-wrap">
                <p>{creatorProfileDetails[0]?.user_data?.creator_desc}</p>
              </div>
            </div>
          </div>
        </section>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              "\n\t\t.property-details-area {\n\t\t\tflex: 0 0 21%;\n\t\t\tmax-width: 21%;\n\t\t}\n\t\t.description-text-wrap {\n\t\t\tflex: 0 0 61%;\n\t\t\tmax-width: 61%;\n\t\t}\n\t",
          }}
        />

        <section className="main-pannel-sec pt-0 pb-2 user-profile-align ragister-wrapper-sec">
          <div className="container-fluid px-5">
            <ul className="nav nav-tabs collections-list-wrap row mb-4">
              <li className="col-md-3">
                <a
                  data-toggle="tab"
                  href="#home"
                  onClick={() => setCurrentTab("created")}
                  className="active"
                >
                  Created
                </a>
              </li>
              {/* <li className="col-md-3">
                <a
                  data-toggle="tab"
                  href="#menu1"
                  onClick={() => setCurrentTab("Fav")}
                >
                  Favorited
                </a>
              </li> */}
              <li className="col-md-3">
                <a
                  data-toggle="tab"
                  href="#menu2"
                  onClick={() => setCurrentTab("Activity")}
                >
                  Activity
                </a>
              </li>
              <li
                className="share-btn-wrap col-md-3"
                style={{ cursor: "pointer" }}
              >
                <a onClick={() => setShow(true)}>
                  <i className="fas fa-share-alt" />
                  Share
                </a>
              </li>
            </ul>
            <div className="row">
              <div className="col-lg-12">
                <div
                  className={
                    isFilterBoxVisible && currentTab !== "Activity"
                      ? "left-side-column fillter-bar-show"
                      : "left-side-column fillter-bar-hide"
                  }
                >
                  <div className="row">
                    {currentTab !== "Activity" ? (
                      <div className="col-lg-3 col-md-3 col-xs-12">
                        <FilterMenu
                          show={() =>
                            setIsFilterBoxVisible(!isFilterBoxVisible)
                          }
                          tab={currentTab}
                          create={
                            currentTab === "created"
                              ? setCreatedNftData
                              : setFavoritedNftData
                          }
                          createdApi={
                            currentTab === "created"
                              ? handleCreatedNft
                              : currentTab === "Fav"
                              ? handleFavoritedNft
                              : null
                          }
                          callFav={handleFavoritedNft}
                          id={id}
                          setFav={setFavoritedNftData}
                          setPayLoad={setPayload}
                        />
                      </div>
                    ) : (
                      <div className="col-lg-3 col-md-3 col-xs-12"></div>
                    )}
                    <div className="col-lg-9 col-md-9 col-xs-12">
                      <div className="row">
                        {currentTab !== "Activity" && (
                          <div className="col-md-6 left-side-top-head pl-1">
                            <div className="input-group">
                              <input
                                type="search"
                                className="form-control rounded"
                                placeholder="Search Creator NFTs"
                                aria-label="Search"
                                aria-describedby="search-addon"
                                // name="keyword"
                                value={searchData}
                                onChange={(e) => setSearchData(e.target.value)}
                              />
                              {searchData && (
                                <i
                                  class="fa-regular fa-x"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setSearchData("")}
                                ></i>
                              )}
                              <i className="fas fa-search" />
                            </div>
                          </div>
                        )}
                        <div className="col-md-3 blank-column" />
                        {currentTab !== "Activity" && (
                          <div className="col-md-3 slect-option-wrap pl-1">
                            <Select
                              options={sortOptions}
                              onChange={(e) => handleSort(e)}
                              value={sort}
                              styles={customStyles}
                              isSearchable={false}
                              defaultValue={{ value: "0", label: "Sort By" }}
                              placeholder="Sort By"
                            />
                          </div>
                        )}
                      </div>

                      <div className="row mx-0 free-column">
                        <div className="tab-content tab-content-area">
                          <div id="home" className="tab-pane fade in active">
                            {createdNftData.length > 0 ? (
                              <div className="row mt-4 mx-n1">
                                {createdNftData.length > 0 &&
                                  createdNftData.map((data) => {
                                    return (
                                      <HomeCard
                                        key={data._id}
                                        id={data._id}
                                        featureImg={data.preview_image}
                                        creatorProfile={data?.user_id}
                                        likes={
                                          data.likeCountData
                                            ? data.likeCountData.like_count
                                            : 0
                                        }
                                        viewCount={
                                          data?.views_count?.view_count
                                            ? data?.views_count?.view_count
                                            : 0
                                        }
                                        title={data.nft_name}
                                        creator={data?.creatorInfo?.name}
                                        ethPrice={
                                          data.token_owner.price ||
                                          "Not On Sale"
                                        }
                                        userId={data?.creatorInfo?.user_id}
                                        allMarket
                                      />
                                    );
                                  })}

                                {noSeeMore !== null && (
                                  <div class="col-md-12 mt-3 text-center content-wrap">
                                    <a
                                      class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                      onClick={() => setSeeMore(seeMore + 1)}
                                    >
                                      See More
                                    </a>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="profile-item-display-box text-center my-4">
                                    <h3>No NFTs to display</h3>
                                    <p>
                                      Once NFTs have been Created, they will
                                      appear here.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div
                            id="menu1"
                            className="tab-pane fade favorite-profile-wrap"
                          >
                            {favoritedNftData.length > 0 ? (
                              <div className="row mt-4 mx-n1">
                                {favoritedNftData &&
                                  favoritedNftData.length > 0 &&
                                  favoritedNftData.map((data) => {
                                    return (
                                      <HomeCard
                                        key={data._id}
                                        id={data?.nftData?._id}
                                        creatorProfile={data?.user_id}
                                        featureImg={
                                          data?.nftData?.preview_image
                                        }
                                        likes={
                                          data?.likeCountData?.like_count
                                            ? data?.likeCountData?.like_count
                                            : 0
                                        }
                                        viewCount={
                                          data?.views_count?.view_count
                                            ? data?.views_count?.view_count
                                            : 0
                                        }
                                        title={data?.nftData?.nft_name}
                                        creator={
                                          data?.user_data_new?.name
                                            ? data?.user_data_new?.name
                                            : data?.creatorInfo?.name
                                        }
                                        userId={
                                          data?.nftData
                                            ? data?.nftData?.user_id
                                            : data?.creatorInfo?.user_id
                                        }
                                        ethPrice={
                                          data?.token_owner?.price
                                            ? data?.token_owner?.price
                                            : "Not On Sale"
                                        }
                                        allMarket
                                      />
                                    );
                                  })}

                                {favSeeMoreButton && (
                                  <div className="col-md-12 text-center mb-4 content-wrap">
                                    <a
                                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                      onClick={() =>
                                        setFavCurrentPage(favCurrentPage + 1)
                                      }
                                    >
                                      See More
                                    </a>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="profile-item-display-box text-center my-4">
                                    <h3>No items to display</h3>
                                    <p>
                                      Once NFTs have been Favorited, they will
                                      appear here.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div id="menu2" className="tab-pane fade">
                            <div className="activity-table-wrap table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Activity</th>
                                    <th>Item</th>
                                    <th>Price</th>
                                    {/* <th>Quantity</th> */}
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {creatorActivity &&
                                    creatorActivity.length > 0 &&
                                    creatorActivity.map((item) => {
                                      return (
                                        <>
                                          <tr key={item?._id}>
                                            <td>{item?.activity_type}</td>
                                            <td>{item?.nftData?.nft_name}</td>
                                            <td>{item?.token_owner?.price}</td>
                                            {/* <td>
                                              {
                                                item?.token_owner
                                                  ?.token_quantity
                                              }
                                            </td> */}
                                            <td>
                                              {item?.nftData?.creator_addr
                                                ? `${item?.nftData?.creator_addr.substring(
                                                    0,
                                                    4
                                                  )}...${item?.nftData?.creator_addr.substring(
                                                    item?.nftData?.creator_addr
                                                      .length - 4
                                                  )}`
                                                : ""}
                                            </td>
                                            <td>{item?.to_address}</td>
                                            <td>
                                              {moment(item?.createdAt).format(
                                                "DD/MM/YYYY"
                                              )}
                                            </td>
                                          </tr>
                                        </>
                                      );
                                    })}
                                </tbody>
                              </table>
                              {activitySeeMoreButton && (
                                <div className="col-md-12 text-center mb-4 content-wrap">
                                  <a
                                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                    onClick={() =>
                                      setActivityCurrentPage(
                                        activityCurrentPage + 1
                                      )
                                    }
                                  >
                                    See More
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <HomePageFooter />
      <Modal show={show} onClose={() => setShow(false)}>
        <SocialShare id={id} creator={true} />
      </Modal>
    </>
  );
};

export default ViewCreator;
