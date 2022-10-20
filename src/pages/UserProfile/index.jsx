import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import HomePageFooter from "../../components/Home/HomePageFooter";
import FilterImg from "../../assets/img/user/fillter-head.svg";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import HomeCard from "../../components/HomeCards/HomeCard";
import Modal from "../../components/commons/Modal/Modal";
import SocialShare from "../../components/SocialShare/SocialShare";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { PopUp } from "../../utils/utility";
import FilterMenuUser from "./Filter";
import { setUserData } from "../../redux/Slice/UserSlice/GetUser";
import { handleApiCall } from "../../api";
import { endpoints } from "../../utils/endpoints";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/commons/Loader";
import moment from "moment";

//Static
const PROFILE_IMG = require("../../assets/img/home/file-type-img1.png");
const BANNER_IMG = require("../../assets/img/userBanner.jpg");
const BLUE_TICK = require("../../assets/img/home/blue-check.png");
const ETH_IMG = require("../../assets/img/section-image/etherim.png");

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

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.registerUser.userTokens);
  const USDPrice = useSelector(
    (state) => state?.homeInfo?.currentUSDPrice?.usd_price
  );
  const [sort, setSort] = useState("");
  const [copy, setCopy] = useState(false);
  const [favData, setFavData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [favSearchData, setFavSearchData] = useState("");
  const [favSeeMore, setFavSeeMore] = useState();
  const [favCurrentPage, setFavCurrentPage] = useState(1);
  const [ownedCurrentPage, setOwnedCurrentPage] = useState(1);
  const [favSeeMoreButton, setFavSeeMoreButton] = useState(false);
  const [activitySeeMoreButton, setActivitySeeMoreButton] = useState(false);
  const [ownedSeeMoreButton, setOwnedSeeMoreButton] = useState(false);
  const [ownedData, setOwnedData] = useState([]);
  const [onSaleData, setOnSaleData] = useState([]);
  const [activity, setActivity] = useState([]);
  const [activityCurrentPage, setActivityCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState("Owned");
  const [loader, setLoader] = useState(true);

  const [sortOptions, setSortOptions] = useState([
    { value: "-1", label: "Most Favourited" },
    { value: "-1", label: "Newest" },
    { value: "1", label: "Oldest" },
    { value: "-1", label: "Price (High to Low)" },
    { value: "1", label: "Price (Low to High)" },
  ]);
  const [isImageUploaded, setisImageUploaded] = useState(false);
  const [image, setImage] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const UserData = useSelector(
    (state) => state.userInformation.userInformation
  );
  const userAddress = UserData.length > 0 && UserData[0]?.wallet_address;
  const userId = UserData && UserData[0]?._id;

  const {
    cover_picture,
    date_of_birth,
    display_picture,
    email,
    name,
    wallet_address,
  } = UserData[0] || {};
  const [show, setShow] = useState(false);
  useEffect(() => {
    handleGetUserProfile();
    handleFavoritedNft();
    handleGetUserOwned(1);
  }, []);
  useEffect(() => {
    handleGetUserProfile();
    handleFavoritedNft();
    handleGetUserOwned(1);
  }, [userAddress]);
  useEffect(() => {
    if (currentTab === "Owned") handleGetUserOwned(1);
    if (currentTab === "Favorited") handleFavoritedNft(1);
    if (currentTab === "Activity") handleActivity(1);
    handleFavoritedNft();
  }, [currentTab]);
  useEffect(() => {
    if (ownedCurrentPage > 1) handleGetUserOwned(2);
  }, ownedCurrentPage);

  const handleEditUser = () => {
    navigate("/edit-user");
  };

  useEffect(() => {
    handleGetUserOwned(1);
    handleActivity();
    handleGetUserOnSaleNft();
  }, []);

  useEffect(() => {
    searchData !== "" && handleSearchNft();
  }, [searchData]);

  useEffect(() => {
    favSearchData !== "" && handleSearchNft();
  }, [favSearchData]);

  useEffect(() => {
    setTimeout(() => {
      favCurrentPage > 1 && handleFavoritedNft();
    });
  }, [favCurrentPage]);

  useEffect(() => {
    setTimeout(() => {
      activityCurrentPage > 1 && handleActivity();
    });
  }, [activityCurrentPage]);

  useEffect(() => {
    setTimeout(() => {
      ownedCurrentPage > 1 && handleGetUserOwned(2);
    });
  }, [ownedCurrentPage]);

  const handleGetUserProfile = async () => {
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.getUserProfile}`,
        {
          id: user?.data?._id,
        }
      );
      if (response.data.success) {
        dispatch(setUserData(response?.data?.data));
      }
    } catch (error) {
      PopUp("Something Went Wrong", error.response.message, "error");
    }
  };

  const handleGetUserOwned = async (status) => {
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.getUserOwned}?page=${ownedCurrentPage}`,
        {
          user_addr: userAddress,
        }
      );
      if (response.data.success) {
        if (status === 1) setOwnedData(response?.data?.data);
        if (status === 2)
          setOwnedData((prev) => [...prev, ...response?.data?.data]);

        setLoader(false);
        if (response?.data?.next_page !== null)
          setOwnedCurrentPage((ownedCurrentPage) => ownedCurrentPage++);
        setOwnedSeeMoreButton(
          response?.data?.next_page === null ? false : true
        );
      }
    } catch (error) {
      PopUp("Something Went Wrong", error.response.message, "error");
    }
  };

  useEffect(() => {
    handleUserSort();
  }, [sort]);

  const handleFavoritedNft = async (status) => {
    const response = await handleApiCall(
      "post",
      `${endpoints.getFavoritedNft}?user_id=${userId}&page=${favCurrentPage}`
    );
    if (response?.data?.success) {
      if (status === 2)
        setFavData((prev) => [...prev, ...response?.data?.data]);
      if (status === 1) setFavData(response?.data?.data);
      setFavSeeMoreButton(response?.data?.next_page === null ? false : true);
    }
  };

  const handleSearchNft = async () => {
    let resEnd;
    let bodyEnd;
    if (currentTab === "Owned") {
      resEnd = `${endpoints.getUserOwned}`;
      bodyEnd = {
        user_addr: userAddress,
        keyword: searchData,
      };
    } else if (currentTab === "Favorited") {
      resEnd = `${endpoints.getFavoritedNft}?user_id=${userId}`;
      bodyEnd = { keyword: favSearchData };
    }
    const response = await handleApiCall("post", resEnd, bodyEnd);
    if (currentTab === "Owned") {
      if (response?.data?.success) {
        setOwnedData(response?.data?.data);
      }
    } else if (currentTab === "Favorited") {
      if (response?.data?.success) {
        setFavData(response?.data?.data);
      } else {
        setFavData([]);
      }
    }
  };

  const handleActivity = async () => {
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.getCreatorActivity}?page=${activityCurrentPage}`,
        {
          id: userId,
        }
      );
      if (response.data.success) {
        activitySeeMoreButton
          ? setActivity((prev) => [...prev, ...response?.data?.data])
          : setActivity((prev) => response?.data?.data);
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

  const handleUserSort = async () => {
    let resEnd;
    let bodyEnd;
    if (currentTab === "Owned") {
      if (sort.label === "Most Favourited") {
        resEnd = `${endpoints.getUserOwned}`;
        bodyEnd = {
          user_addr: userAddress,
          favourite: -1,
        };
      } else if (sort.label === "Newest") {
        resEnd = `${endpoints.getUserOwned}`;
        bodyEnd = {
          user_addr: userAddress,
          createdAt: -1,
        };
      } else if (sort.label === "Oldest") {
        resEnd = `${endpoints.getUserOwned}`;
        bodyEnd = {
          user_addr: userAddress,
          createdAt: 1,
        };
      } else if (sort.label === "Price (High to Low)") {
        resEnd = `${endpoints.getUserOwned}`;
        bodyEnd = {
          user_addr: userAddress,
          price: -1,
        };
      } else if (sort.label === "Price (Low to High)") {
        resEnd = `${endpoints.getUserOwned}`;
        bodyEnd = {
          user_addr: userAddress,
          price: 1,
        };
      }
    } else if (currentTab === "Favorited") {
      if (sort.label === "Most Favourited") {
        resEnd = `${
          endpoints.getFavoritedNft
        }?user_id=${userId}&favourite=${-1}`;
      } else if (sort.label === "Newest") {
        resEnd = `${
          endpoints.getFavoritedNft
        }?user_id=${userId}&createdAt=${-1}`;
      } else if (sort.label === "Oldest") {
        resEnd = `${
          endpoints.getFavoritedNft
        }?user_id=${userId}&createdAt=${1}`;
      } else if (sort.label === "Price (High to Low)") {
        resEnd = `${endpoints.getFavoritedNft}?user_id=${userId}&price=${-1}`;
      } else if (sort.label === "Price (Low to High)") {
        resEnd = `${endpoints.getFavoritedNft}?user_id=${userId}&price=${1}`;
      }
    }
    const response = await handleApiCall("post", resEnd, bodyEnd);
    if (response?.data?.success) {
      if (currentTab === "Owned") {
        setOwnedData(response?.data?.data);
      } else if (currentTab === "Favorited") {
        setFavData(response?.data?.data);
      }
    }
  };
  const handleSort = (e) => {
    setSort(e);
  };

  const handleSearch = (e) => {
    if (currentTab === "Owned") {
      setSearchData(e.target.value);
    } else if (currentTab === "Favorited") {
      setSearchData("");
      setFavSearchData(e.target.value);
    } else {
      setSearchData(e.target.value);
    }
  };

  const handleGetUserOnSaleNft = async () => {
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.onSaleApi}?page=1`,
        {
          owner_addr: userAddress,
        }
      );
      if (response?.data?.success) {
        setOnSaleData(response?.data?.data);
      }
    } catch (error) {
      PopUp("Something Went Wrong!!", "", "error");
    }
  };

  const handleBannerImageUpload = async (image) => {
    let reader = new FileReader();
    reader.onload = function (e) {
    };
    reader.readAsDataURL(image);
    setImage(image);
    let form = new FormData();
    form.append("cover_picture", image);
    setisImageUploaded(true);
    const response = await handleApiCall(
      "put",
      `${endpoints.updateUserProfile}`,
      form
    );
    setisImageUploaded(false);

    if (response?.data?.success) {
      handleGetUserProfile();
    }
  };
  const handleProfileImageUpload = async (image) => {
    let reader = new FileReader();
    reader.onload = function (e) {
    };
    reader.readAsDataURL(image);
    setImage(image);
    let form = new FormData();
    form.append("display_picture", image);
    setisImageUploaded(true);
    const response = await handleApiCall(
      "put",
      `${endpoints.updateUserProfile}`,
      form
    );
    setisImageUploaded(false);

    if (response?.data?.success) {
      handleGetUserProfile();
    }
  };

  return (
    <>
      <Header />
      <section
        className="p-0 collections-banner"
        style={{
          backgroundImage: `url(${cover_picture ? cover_picture : BANNER_IMG})`,
        }}
      >
        <div className="container">
          <div className="edit">
            <i className="fas fa-pencil-alt" />
            <input
              type="file"
              name="profile_pic"
              accept="image/jpeg, image/bmp, image/png,image/svg"
              onChange={(e) => handleBannerImageUpload(e.target.files[0])}
            />
          </div>
          <div className="edit-creators-btn">
            <a
              className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
              onClick={handleEditUser}
            >
              Edit User
            </a>
          </div>
        </div>
      </section>
      <section className="pt-3 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-3 property-col-wrap">
              <div className="property-details-wrap">
                <div style={{ position: "relative" }}>
                  <img src={display_picture ? display_picture : PROFILE_IMG} />
                  <div className="edit" style={{ cursor: "pointer" }}>
                    <i className="fas fa-pencil-alt" />
                    <input
                      type="file"
                      name="profile_pic"
                      accept="image/jpeg, image/bmp, image/png,image/svg"
                      onChange={(e) =>
                        handleProfileImageUpload(e.target.files[0])
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-5 col-6 property-details-area property-details-area2">
              <div className="mobile-edit-creators-btn">
                <a
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  onClick={handleEditUser}
                >
                  Edit User
                </a>
              </div>
              <h3>
                {name ? name : "Name"}
                {name && <img src={BLUE_TICK} />}
              </h3>

              <form>
                <div
                  className="mb-2"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    style={{
                      border: "none",
                      width: "70%",
                      marginRight: "auto",
                    }}
                    placeholder={
                      wallet_address
                        ? `${wallet_address.substring(
                            0,
                            5
                          )}...${wallet_address.substring(
                            wallet_address.length - 4
                          )}`
                        : "0x595Cb9420d584u45d3"
                    }
                  />
                  <CopyToClipboard
                    text={wallet_address}
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
                {moment(UserData && UserData[0]?.createdAt).format(
                  "DD/MM/YYYY"
                )}
              </span>
     
            </div>
          </div>
        </div>
      </section>

      <section className="main-pannel-sec pt-0 pb-2 user-profile-align ragister-wrapper-sec">
        <div className="container-fluid px-5">
          <ul className="nav nav-tabs collections-list-wrap row mb-4">
            <li className="col-md-3" onClick={() => setCurrentTab("Owned")}>
              <a data-toggle="tab" href="#home" className="active">
                Collectibles / Owned
              </a>
            </li>
            <li className="col-md-3" onClick={() => setCurrentTab("Favorited")}>
              <a data-toggle="tab" href="#menu1">
                Favorited
              </a>
            </li>
            <li className="col-md-3" onClick={() => setCurrentTab("onsale")}>
              <a data-toggle="tab" href="#menu3">
                On Sale
              </a>
            </li>
            <li className="col-md-3" onClick={() => setCurrentTab("Activity")}>
              <a data-toggle="tab" href="#menu2">
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
                  isFilterVisible && currentTab !== "Activity"
                    ? "left-side-column fillter-bar-show"
                    : "left-side-column fillter-bar-hide"
                }
              >
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-xs-12">
                    <div className="right-side-col">
                      <div className="fillter-by-box">
                        {currentTab !== "Activity" && (
                          <>
                            <div
                              class="fillter-top-area mobile-filter-hide"
                              onClick={() =>
                                setIsFilterVisible(!isFilterVisible)
                              }
                            >
                              <img src={FilterImg} />
                              <span>Filter by</span>
                              <i
                                class={
                                  isFilterVisible
                                    ? "fas fa-arrow-up"
                                    : "fas fa-arrow-down"
                                }
                              ></i>
                            </div>

                            <FilterMenuUser
                              tab={currentTab}
                              create={setOwnedData}
                              createApi={handleGetUserOwned}
                              fav={setFavData}
                              address={userAddress}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-9 col-xs-12">
                    {currentTab !== "Activity" && (
                      <>
                        <div className="row">
                          <div className="col-md-6 left-side-top-head">
                            <div className="input-group">
                              <input
                                type="search"
                                className="form-control rounded"

                                aria-label="Search"
                                aria-describedby="search-addon"
                
                                value={searchData}
                                onChange={handleSearch}
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
                          <div className="col-md-3 blank-column" />
                          <div className="col-md-3 slect-option-wrap ml-auto pl-1">
                            <Select
                              options={sortOptions}
                              defaultValue={{
                                label: "Sort by",
                                value: "Sort by",
                              }}
                              onChange={(e) => handleSort(e)}
                              value={sort}
                              styles={customStyles}
                              isSearchable={false}
                              placeholder="Sort By"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="row mx-0 free-column">
                      <div className="tab-content tab-content-area" id="user">
                        <div id="home" className="tab-pane fade in active">
                          {ownedData.length > 0 ? (
                            <>
                              <div className="row mt-4 mx-n1">
                                {loader ? (
                                  <Loader />
                                ) : (
                                  <>
                                    {ownedData.length > 0 &&
                                      ownedData.map((data) => {
                                        return (
                                          <div className="marketplace-box-wrapper px-1 d-flex mb-4 flex-column">
                                            <div className="digital-architecture-box h-100">
                                              <div className="digital-architecture-img">
                                                <a
                                                  style={{
                                                    textDecoration: "none",
                                                  }}
                                                  href={`/view-nft/${
                                                    data._id && data._id
                                                  }`}
                                                >
                                                  <img
                                                    src={
                                                      data.preview_image &&
                                                      data.preview_image
                                                    }
                                                  />
                                                </a>

                                                <div className="view-details-wrap">
                                                  <span>
                                                    <i className="fa fa-eye" />
                                                    {data.views_count &&
                                                      data.views_count
                                                        .view_count}
                                                  </span>
                                                  <span>
                                                    <i className="fa fa-heart" />
                                                    {!data.likeCountData
                                                      ? 0
                                                      : data.likeCountData
                                                          .like_count}
                                                  </span>
                                                </div>
                                              </div>

                                              <div className="box-details-wrap">
                                                <a
                                                  style={{
                                                    textDecoration: "none",
                                                  }}
                                                  href={`/view-nft/${
                                                    data._id && data._id
                                                  }`}
                                                >
                                                  <h3>{data.nft_name}</h3>
                                                </a>

                                                <ul className="listing-style-wrap">
                                                  <li>
                                                    <span className="first-col">
                                                      Creator:
                                                    </span>
                                                    <span className="second-col">
                                                      <a
                                                        href={`/view-creator/${
                                                          data.creatorInfo &&
                                                          data.creatorInfo
                                                            .user_id
                                                        }`}
                                                      >
                                                        {data.creatorInfo &&
                                                          data.creatorInfo.name}
                                                      </a>{" "}
                                                      {data.creatorInfo
                                                        ?.is_verify === 1 && (
                                                        <img src={BLUE_TICK} />
                                                      )}
                                                    </span>
                                                  </li>
                                                  <li>
                                                    <span className="first-col">
                                                      Price:
                                                    </span>
                                                    <span className="second-col">
                                                      <img src={ETH_IMG} />
                                                      <span>
                                                        {data.token_owner &&
                                                          data.token_owner
                                                            .price}
                                                      </span>
                                                      <span class="usdet-wrap">{`(US$ ${(
                                                        USDPrice *
                                                        data?.token_owner?.price
                                                      ).toFixed(3)})`}</span>
                                                    </span>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    {ownedSeeMoreButton && (
                                      <div className="col-md-12 text-center mb-4 content-wrap">
                                        <a
                                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                          onClick={() =>
                                            setOwnedCurrentPage(
                                              ownedCurrentPage + 1
                                            )
                                          }
                                        >
                                          See More
                                        </a>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </>
                          ) : (
                            <div className="row">
                              <div className="col-md-12">
                                <div className="profile-item-display-box text-center my-4">
                                  <h3>No items to display</h3>
                                  <p>
                                    Once NFTs have been purchased, they will
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
                          {favData && favData.length > 0 ? (
                            <div className="row mt-4 mx-n1">
                              {favData.length > 0 &&
                                favData.map((data) => {
                                  return (
                                    <HomeCard
                                      key={data._id}
                                      id={data.nftData?._id}
                                      featureImg={
                                        data.nftData &&
                                        data.nftData.preview_image
                                      }
                                      likes={
                                        data.likeCountData
                                          ? data.likeCountData.like_count
                                          : 0
                                      }
                                      viewCount={data.likeCountData.like_count}
                                      title={
                                        data.nftData && data.nftData.nft_name
                                      }
                                      creator={
                                        data.user_data_new &&
                                        data.user_data_new.name
                                      }
                                      userId={
                                        data.nftData && data.nftData.user_id
                                      }
                                      isVerify={data.creatorInfo?.is_verify}
                                      ethPrice={
                                        data.sold_nft && data.sold_nft.price
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
                                    Once NFTs have been favorited, they will
                                    appear here.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div
                          id="menu3"
                          className="tab-pane fade favorite-profile-wrap"
                        >
                          {onSaleData && onSaleData.length > 0 ? (
                            <div className="row mt-4 mx-n1">
                              {onSaleData.length > 0 &&
                                onSaleData.map((data) => {
                                  return (
                                    <HomeCard
                                      key={data._id}
                                      id={data?._id}
                                      featureImg={data && data.preview_image}
                                      likes={
                                        data.likeCountData
                                          ? data.likeCountData.like_count
                                          : 0
                                      }
                                      viewCount={data?.view_count?.view_count}
                                      title={data.nft_name && data.nft_name}
                                      creator={
                                        data.creatorInfo &&
                                        data.creatorInfo?.name
                                      }
                                      userId={
                                        data.nftData && data.nftData.user_id
                                      }
                                      ethPrice={
                                        data.token_owner &&
                                        data.token_owner.price
                                      }
                                      isVerify={data.creatorInfo?.is_verify}
                                      allMarket
                                      onSaleColor
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
                                    Once NFTs have been placed on sale, they
                                    will appear here.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div
                          id="menu2"
                          className="tab-pane fade user-profile-tab-box"
                        >
                          <div className="row mb-4">
                            <div className="col-md-12 activity-table-wrap table-responsive">
                              {activity.length > 0 ? (
                                <>
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th>Activity</th>
                                        <th>Item</th>
                                        <th>Price</th>
                          
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Date</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {activity.length > 0 &&
                                        activity.map((data) => {
                                          return (
                                            <tr>
                                              <td>{data.activity_type}</td>
                                              <td>
                                                {!data.nftData
                                                  ? "Unnamed"
                                                  : data.nftData.nft_name}
                                              </td>
                                              <td>
                                                {!data.price ? "" : data.price}
                                              </td>
                        
                                              <td title={data.user_address}>
                             
                                                {data.user_address
                                                  ? `${data.user_address?.substring(
                                                      0,
                                                      5
                                                    )}...${data.user_address?.substring(
                                                      data.user_address.length -
                                                        4
                                                    )}`
                                                  : 0}
                                              </td>

                                              <td title={data.to_address}>
                                                {data.to_address
                                                  ? `${data.to_address.substring(
                                                      0,
                                                      5
                                                    )}...${data.to_address.substring(
                                                      data.to_address.length - 4
                                                    )}`
                                                  : ""}
                                              </td>
                                              <td>
                                                {moment(
                                                  data && data?.createdAt
                                                ).format("DD/MM/YYYY")}
                                              </td>
                                            </tr>
                                          );
                                        })}
                                    </tbody>
                                  </table>
                                </>
                              ) : (
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Activity</th>
                                      <th>Item</th>
                                      <th>Price</th>
                                      <th>From</th>
                                      <th>To</th>
                                      <th>Date</th>
                                    </tr>
                                  </thead>
                                </table>
                              )}

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

                        <div
                          id="menu2"
                          className="tab-pane fade user-profile-tab-box"
                        >
                          <div className="row mb-4">
                            <div className="col-md-12 activity-table-wrap table-responsive">
                              {activity.length > 0 ? (
                                <>
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th>Activity</th>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Date</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {activity.length > 0 &&
                                        activity.map((data) => {
                                          return (
                                            <tr>
                                              <td>{data.activity_type}</td>
                                              <td>
                                                {!data.nftData
                                                  ? "Unnamed"
                                                  : data.nftData.nft_name}
                                              </td>
                                              <td>
                                                {!data.price ? "" : data.price}
                                              </td>                                            
                                            <td title={data.user_address}>
                                               
                                                {data.user_address
                                                  ? `${data.user_address?.substring(
                                                      0,
                                                      5
                                                    )}...${data.user_address?.substring(
                                                      data.user_address.length -
                                                        4
                                                    )}`
                                                  : 0}
                                              </td>
                                              <td title={data.to_address}>
                                                {data.to_address
                                                  ? `${data.to_address.substring(
                                                      0,
                                                      5
                                                    )}...${data.to_address.substring(
                                                      data.to_address.length - 4
                                                    )}`
                                                  : ""}
                                              </td>
                                              <td>
                                                {moment(
                                                  data && data?.createdAt
                                                ).format("DD/MM/YYYY")}
                                              </td>
                                            </tr>
                                          );
                                        })}
                                    </tbody>
                                  </table>
                                </>
                              ) : (
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Activity</th>
                                      <th>Item</th>
                                      <th>Price</th>
                           
                                      <th>From</th>
                                      <th>To</th>
                                      <th>Date</th>
                                    </tr>
                                  </thead>
                                </table>
                              )}
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
        </div>
      </section>
      <Modal show={show} onClose={() => setShow(false)}>
        <SocialShare />
      </Modal>
      <HomePageFooter />
    </>
  );
};

export default UserProfile;
