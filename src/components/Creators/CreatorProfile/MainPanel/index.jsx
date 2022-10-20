import React, { useState, useEffect } from "react";
import Select from "react-select";
import Filter from "../../../MarketPlace/Filter";
import SelectStyle from "../../../commons/SelectStyle";

import FilterImg from "../../../../assets/img/user/fillter-head.svg";
import FilterMenu from "../../FilterMenu";

import Modal from "../../../commons/Modal/Modal";
import SocialShare from "../../../SocialShare/SocialShare";
import HomeCard from "../../../../components/HomeCards/HomeCard";
import { handleApiCall } from "../../../../api";
import { endpoints } from "../../../../utils/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { PopUp } from "../../../../utils/utility";
import moment from "moment";

import {
  setCreatorSearchInfo,
  setCreatorSortInfo,
  setNftOfCreatorsPage,
  setActivityInfo,
  setSaleSearchInfo,
  setSoldSearchInfo,
  setSaleSortInfo,
  setSoldSortInfo,
  setNftOfOnSale,
  setNftOfOnSold,
} from "../../../../redux/Slice/CreatorProfile";
import Loader from "../../../commons/Loader";

const TITLE_IMG = require("../../../../assets/img/section-image/slide-1.png");

const MainPanel = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [saleSearchdata, setSaleSearchdata] = useState("");
  const [soldSearchData, setSoldSearchData] = useState("");
  const [loader, setLoader] = useState(true);
  const [sort, setSort] = useState("");
  const [sortOptions, setSortOptions] = useState([
    { value: "-1", label: "Most Favourited" },
    { value: "-1", label: "Newest" },
    { value: "1", label: "Oldest" },
    { value: "-1", label: "Price (High to Low)" },
    { value: "1", label: "Price (Low to High)" },
  ]);
  const [seeMore, setSeeMore] = useState(1);
  const [activityMore, setActivityMore] = useState(1);
  const [noSeeMore, setNoSeeMore] = useState();
  const [activityNoMore, setActivityNoMore] = useState();
  const [collapse, setCollapse] = useState(false);
  const [tabSwitch, setTabSwitch] = useState("Created");
  const [saleSeeMore, setSaleSeeMore] = useState(1);
  const [soldSeeMore, setSoldSeeMore] = useState(1);
  const [saleSeeMoreButton, setSaleSeeMoreButton] = useState(false);
  const [soldSeeMoreButton, setSoldSeeMoreButton] = useState(false);
  const [nftData, setNftData] = useState([]);
  const [soldNftData, setSoldNftData] = useState([]);
  const [saleNftData, setSaleNftData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  // UseSelector Function For Nfts, activity, On sale and Sold Data.
  const createdNftData = useSelector(
    (state) => state.creatorProfileInfo.creatorProfileInfo
  );
  const creatorData = useSelector(
    (state) => state.creatorInformation.creartorInformation
  );

  const onSaleData = useSelector(
    (state) => state.creatorProfileInfo.creatorOnSaleInfo
  );

  const onSoldData = useSelector(
    (state) => state.creatorProfileInfo.creatorSoldInfo
  );

  // Some Constants ------
  const userId = creatorData.length > 0 && creatorData[0]._id;
  // const creatorProfile = creatorData.length > 0 && creatorData[0].user_id;
  const status = creatorData.length > 0 && creatorData[0]?.user_data?.status;
  const creatorAddress =
    creatorData.length > 0 && creatorData[0].wallet_address;
  const creatorId = userId;

  useEffect(() => {
    if (creatorId) handleViewCreatorPage(1);
    if (creatorId) handleActivity(1);
  }, [creatorId]);

  // Handle NFT Search For Created, Sold and On Sale
  useEffect(() => {
    if (creatorId) handleNftSearch();
  }, [searchData, saleSearchdata, soldSearchData]);

  useEffect(() => {
    if (creatorId) handleCreatorSort();
  }, [sort]);

  useEffect(() => {
    if (seeMore > 1 && creatorId) handleViewCreatorPage(2);
  }, [seeMore]);
  useEffect(() => {
    if (saleSeeMore > 1 && creatorId) handleOnSale(2);
  }, [saleSeeMore]);
  useEffect(() => {
    if (soldSeeMore > 1 && creatorId) handleSold(2);
  }, [soldSeeMore]);

  
  // Handle NFT Search For Created, Sold and On Sale
  useEffect(() => {
    if (creatorId) handleNftSearch();
  }, [searchData, saleSearchdata, soldSearchData]);

  useEffect(() => {
    if (creatorId) handleCreatorSort();
  }, [sort]);

  // useEffect(() => {
  //   if (seeMore > 1 && creatorId) handleViewCreatorPage(2);
  // }, [seeMore]);

  // useEffect(() => {
  //   if (saleSeeMore > 1 && creatorId) handleOnSale(2);
  // }, [saleSeeMore]);
  // useEffect(() => {
  //   if (soldSeeMore > 1 && creatorId) handleSold(2);
  // }, [soldSeeMore]);

  useEffect(() => {
    if (tabSwitch === "Created") {
      handleViewCreatorPage(1);
    } else if (tabSwitch === "Sold") {
      handleSold(1);
    } else if (tabSwitch === "On Sale") {
      handleOnSale(1);
    } 
  }, [tabSwitch]);

  useEffect(() => {
    if (creatorId) handleActivity(2);
    
  }, [activityMore]);

  const handleViewCreatorPage = async (isFill) => {
    if (creatorId) {
      try {
        const response = await handleApiCall(
          "post",
          `${endpoints.getNftOfCreator}?creator_id=${creatorId}&page=${seeMore}`
        );
        setLoader(false);
        if (response.data.success) {
          setNoSeeMore(response?.data?.next_page);
          if (isFill === 2)
            setNftData((prev) => [...prev, ...response?.data?.data]);
          if (isFill === 1) setNftData(response?.data?.data);
          seeMore > 1 && dispatch(setNftOfCreatorsPage(response?.data?.data));
        }
      } catch (e) {
        setLoader(false);

        PopUp("Something went wrong", "Internal server error", "error");
      }
    }
  };

  const handleSold = async (isMerged) => {
    if (creatorId) {
      try {
        const response = await handleApiCall(
          "post",
          `${endpoints.soldApi}?page=${soldSeeMore}`,
          { id: creatorId }
        );
        if (response.data.success) {
          setSoldSeeMoreButton(
            response?.data?.next_page === null ? false : true
          );
          if (isMerged === 1) setSoldNftData(response?.data?.data);
          if (isMerged === 2)
            setSoldNftData((prev) => [...prev, ...response?.data?.data]);
          saleSeeMore >= 1 && dispatch(setNftOfOnSold(response?.data?.data));
        }
      } catch (e) {
        PopUp("Something went wrong", "Internal server error", "error");
      }
    }
  };

  const handleOnSale = async (isMerged) => {
    if (creatorId) {
      try {
        const response = await handleApiCall(
          "post",
          `${endpoints.onSaleApi}?page=${saleSeeMore}`,
          { id: creatorId }
        );
        // setNoSeeMore(response?.data?.next_page);
        if (response.data.success) {
          setSaleSeeMoreButton(
            response?.data?.next_page === null ? false : true
          );

          if (isMerged === 1) setSaleNftData(response?.data?.data);
          if (isMerged === 2)
            setSaleNftData((prev) => [...prev, ...response?.data?.data]);
          dispatch(setNftOfOnSale(response?.data?.data));
        }
      } catch (e) {
        PopUp("Something went wrong", "Internal server error", "error");
      }
    }
  };

  const handleActivity = async (isFill) => {
    if (creatorId) {
      try {
        const response = await handleApiCall(
          "post",
          `${endpoints.getCreatorActivity}?page=${activityMore}`,
          {
            id: creatorId,
          }
        );
        if (response.data.success) {
          setActivityNoMore(response?.data?.next_page === null ? false : true);
          if (isFill === 1) setActivityData(response?.data?.data);
          if (isFill === 2) {
            setActivityData((prev) => [...prev, ...response?.data?.data]);
            activityMore > 1 && dispatch(setActivityInfo(response?.data?.data));
          }
        }
      } catch (e) {
        PopUp("Something went wrong", "Internal server error", "error");
      }
    }
  };

  // Handle NFT Search For Created, Sold and On Sale
  const handleNftSearch = async () => {
    if (creatorId) {
      try {
        setLoader(true);
        let resEnd;
        let bodyEnd;

        if (tabSwitch === "Created") {
          resEnd = `${endpoints.getCreatorData}${creatorId}&keyword=${searchData}`;
          bodyEnd = {};
        } else if (tabSwitch === "On Sale") {
          resEnd = `${endpoints.onSaleApi}`;
          bodyEnd = {
            id: creatorId,
            keyword: saleSearchdata,
          };
        } else if (tabSwitch === "Sold") {
          resEnd = `${endpoints.soldApi}`;
          bodyEnd = {
            id: creatorId,
            keyword: soldSearchData,
          };
        } else {
          resEnd = `${endpoints.getCreatorData}${creatorId}&keyword=${searchData}`;
          bodyEnd = {};
        }

        const response = await handleApiCall("post", resEnd, bodyEnd);
        setLoader(false);

        if (response?.data?.success) {
          if (tabSwitch === "Created") {
            setNftData(response?.data?.data);
            return dispatch(setCreatorSearchInfo(response?.data?.data));
          } else if (tabSwitch === "On Sale") {
            setSaleNftData(response?.data?.data);
            return dispatch(setSaleSearchInfo(response?.data?.data));
          } else if (tabSwitch === "Sold") {
            setSoldNftData(response?.data?.data);
            return dispatch(setSoldSearchInfo(response?.data?.data));
          } else {
            setNftData(response?.data?.data);
            return dispatch(setCreatorSearchInfo(response?.data?.data));
          }
        }
      } catch (error) {
        PopUp("Something Went Wrong", "Internal Server error", "error");
      }
    }
  };

  const handleCreatorSort = async () => {
    if (creatorId) {
      try {
        let resEnd;
        let payload = {
          id: creatorId,
        };
        if (tabSwitch === "Created") {
          if (sort.label === "Most Favourited") {
            resEnd = `${endpoints.getCreatorData}${creatorId}&favourite=${-1}`;
          } else if (sort.label === "Newest") {
            resEnd = `${endpoints.getCreatorData}${creatorId}&createdAt=${-1}`;
          } else if (sort.label === "Oldest") {
            resEnd = `${endpoints.getCreatorData}${creatorId}&createdAt=${1}`;
          } else if (sort.label === "Price (High to Low)") {
            resEnd = `${endpoints.getCreatorData}${creatorId}&price=${-1}`;
          } else if (sort.label === "Price (Low to High)") {
            resEnd = `${endpoints.getCreatorData}${creatorId}&price=${1}`;
          } else {
            resEnd = `${endpoints.getCreatorData}${creatorId}&favourite=${-1}`;
          }
        } else if (tabSwitch === "On Sale") {
          if (sort.label === "Favourited") {
            resEnd = `${endpoints.onSaleApi}?page=${saleSeeMore}`;
            payload = {
              ...payload,
              favourite: -1,
            };
          } else if (sort.label === "Newest") {
            resEnd = `${endpoints.onSaleApi}?page=${saleSeeMore}`;
            payload = {
              ...payload,
              createdAt: -1,
            };
          } else if (sort.label === "Oldest") {
            resEnd = `${endpoints.onSaleApi}?page=${saleSeeMore}`;
            payload = {
              ...payload,
              createdAt: 1,
            };
          } else if (sort.label === "Price (High to Low)") {
            resEnd = `${endpoints.onSaleApi}?page=${saleSeeMore}`;
            payload = {
              ...payload,
              price: -1,
            };
          } else if (sort.label === "Price (Low to High)") {
            resEnd = `${endpoints.onSaleApi}?page=${saleSeeMore}`;
            payload = {
              ...payload,
              price: 1,
            };
          } else {
            resEnd = `${endpoints.onSaleApi}?page=${saleSeeMore}`;
            payload = {
              ...payload,
              favourite: -1,
            };
          }
        } else if (tabSwitch === "Sold") {
          if (sort.label === "Favourited") {
            resEnd = `${endpoints.soldApi}?page=${soldSeeMore}`;
            payload = {
              ...payload,
              favourite: -1,
            };
          } else if (sort.label === "Newest") {
            resEnd = `${endpoints.soldApi}?page=${soldSeeMore}`;
            payload = {
              ...payload,
              createdAt: -1,
            };
          } else if (sort.label === "Oldest") {
            resEnd = `${endpoints.soldApi}?page=${soldSeeMore}`;
            payload = {
              ...payload,
              createdAt: 1,
            };
          } else if (sort.label === "Price (High to Low)") {
            resEnd = `${endpoints.soldApi}?page=${soldSeeMore}`;
            payload = {
              ...payload,
              price: -1,
            };
          } else if (sort.label === "Price (Low to High)") {
            resEnd = `${endpoints.soldApi}?page=${soldSeeMore}`;
            payload = {
              ...payload,
              price: 1,
            };
          } else {
            resEnd = `${endpoints.soldApi}?page=${soldSeeMore}`;
            payload = {
              ...payload,
              favourite: -1,
            };
          }
        }

        const response = await handleApiCall("post", resEnd, payload);
        setLoader(false);

        if (response?.data?.success) {
          if (tabSwitch === "Created") {
            setNftData(response?.data?.data);
            return dispatch(setCreatorSortInfo(response?.data?.data));
          } else if (tabSwitch === "On Sale") {
            setSaleNftData(response?.data?.data);
            return dispatch(setSaleSortInfo(response?.data?.data));
          } else if (tabSwitch === "Sold") {
            setSoldNftData(response?.data?.data);
            return dispatch(setSoldSortInfo(response?.data?.data));
          } else {
            setNftData(response?.data?.data);
            return dispatch(setCreatorSortInfo(response?.data?.data));
          }
        }
      } catch (e) {
        PopUp("Something went wrong", "Internal server error", "error");
      }
    }
  };

  const handleSort = (e) => {
    setSort(e);
  };

  // Handle NFT Search State For Created, Sold and On Sale
  const handleSearch = (e) => {
    // console.log(e.target.value, tabSwitch);
    if (tabSwitch === "Created") {
      setSearchData(e.target.value);
      setSaleSearchdata("");
      setSoldSearchData("");
    } else if (tabSwitch === "On Sale") {
      setSearchData("");
      setSoldSearchData("");
      setSaleSearchdata(e.target.value);
    } else if (tabSwitch === "Sold") {
      setSoldSearchData(e.target.value);
      setSaleSearchdata("");
      setSearchData("");
    }
  };

  const _handleSaleNft = (data) => {
    setSaleNftData(data);
  };

  return (
    <>
      <section className="main-pannel-sec pt-0 pb-2 user-profile-align ragister-wrapper-sec">
        <div className="container-fluid px-5">
          <ul className="nav nav-tabs collections-list-wrap row mb-4">
            <li className="col-md-3" onClick={() => setTabSwitch("Created")}>
              <a data-toggle="tab" href="#home" className="active">
                Created
              </a>
            </li>
            {status === 0 && (
              <>
                <li className="col-md-3">
                  <a data-toggle="tab" href="#menu1">
                    On Sale
                  </a>
                </li>
                <li className="col-md-3">
                  <a data-toggle="tab" href="#menu2">
                    Activity
                  </a>
                </li>
              </>
            )}
            {status === 1 && (
              <>
                <li
                  className="col-md-3"
                  onClick={() => setTabSwitch("On Sale")}
                >
                  <a data-toggle="tab" href="#menu1">
                    On Sale
                  </a>
                </li>
                <li className="col-md-3" onClick={() => setTabSwitch("Sold")}>
                  <a data-toggle="tab" href="#menu2">
                    Sold
                  </a>
                </li>
                <li
                  className="col-md-3"
                  onClick={() => setTabSwitch("Activity")}
                >
                  <a data-toggle="tab" href="#menu3">
                    Activity
                  </a>
                </li>
              </>
            )}
            <li className="col-md-3"></li>
            <li
              className="share-btn-wrap col-md-3"
              style={{ cursor: "pointer" }}
            >
              <a
                onClick={() => {
                  setShow(status === undefined ? false : true);
                }}
              >
                <i className="fas fa-share-alt" />
                Share
              </a>
            </li>
          </ul>
          <div className="row">
            <div className="col-lg-12">
              <div
                className={
                  collapse && tabSwitch !== "Activity"
                    ? "left-side-column fillter-bar-show"
                    : "left-side-column fillter-bar-hide"
                }
              >
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-xs-12">
                    {tabSwitch !== "Activity" && (
                      <FilterMenu
                        sold={setSoldNftData}
                        sale={_handleSaleNft}
                        soldApi={handleSold}
                        saleApi={handleOnSale}
                        create={setNftData}
                        show={() => setCollapse(!collapse)}
                        createdApi={handleViewCreatorPage}
                        tab={tabSwitch}
                        id={userId}
                      />
                    )}
                  </div>

                  <div className="col-lg-9 col-md-9 col-xs-12">
                    {tabSwitch !== "Activity" && (
                      <div className="row">
                        <div className="col-md-6 left-side-top-head">
                          <div className="input-group">
                            <input
                              type="search"
                              className="form-control rounded"
                              placeholder="Search Creators Nfts"
                              aria-label="Search"
                              aria-describedby="search-addon"
                              // name="keyword"
                              value={searchData ? searchData : saleSearchdata ? saleSearchdata : soldSearchData ? soldSearchData : ""}
                              onChange={handleSearch}
                            />
                            {searchData && (
                              <i
                                class="fa-regular fa-x"
                                style={{ cursor: "pointer" }}
                                onClick={() => setSearchData("")}
                              ></i>
                            )}
                            {saleSearchdata && (
                              <i
                                class="fa-regular fa-x"
                                style={{ cursor: "pointer" }}
                                onClick={() => setSaleSearchdata("")}
                              ></i>
                            )}
                            {soldSearchData && (
                              <i
                                class="fa-regular fa-x"
                                style={{ cursor: "pointer" }}
                                onClick={() => setSoldSearchData("")}
                              ></i>
                            )}
                            <i className="fas fa-search" />
                          </div>
                        </div>
                        <div className="col-md-3 crater-profile-blank" />
                        <div className="col-md-3 slect-option-wrap pl-1">
                          <Select
                            options={sortOptions}
                            defaultValue={{
                              label: "Sort by",
                              value: "Sort by",
                            }}
                            onChange={(e) => handleSort(e)}
                            value={sort}
                            styles={SelectStyle}
                            isSearchable={false}
                            placeholder="Sort By"
                          />
                        </div>
                      </div>
                    )}
                    <div className="row free-column">
                      <div className="tab-content tab-content-area create-profile-tab-wrap">
                        <div id="home" className="tab-pane fade in active on-sale-tab-menu-wrap">
                          {loader ? (
                            <Loader />
                          ) : (
                            <>
                              {nftData && nftData.length > 0 ? (
                                <div className="row mt-4 mx-n1">
                                  {nftData.map((data) => {
                                    return (
                                      <HomeCard
                                        key={data._id}
                                        id={data?._id}
                                        creatorProfile={data?.user_id}
                                        featureImg={data?.preview_image}
                                        likes={
                                          !data.likeCountData
                                            ? 0
                                            : data.likeCountData.like_count
                                        }
                                        viewCount={
                                          createdNftData &&
                                          data?.views_count &&
                                          data?.views_count?.view_count
                                        }
                                        title={data?.nft_name}
                                        creator={data?.creatorInfo?.name}
                                        ethPrice={
                                          data?.token_owner?.price
                                            ? data?.token_owner?.price.toLocaleString(
                                              "en",
                                              {
                                                useGrouping: false,
                                                minimumFractionDigits: 2,
                                              }
                                            )
                                            : "Not On Sale"
                                        }
                                        allMarket
                                      />
                                    );
                                  })}

                                  {noSeeMore !== null && nftData.length > 11 && (
                                    <div className="col-md-12 text-center mb-4 content-wrap">
                                      <a
                                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
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
                                        Once NFTs have
                                        been created, they will appear here.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        <div id="menu1" className="tab-pane fade on-sale-tab-menu-wrap">
                          {saleNftData && saleNftData.length > 0 ? (
                            <div className="row mt-4 mx-n1">
                              {saleNftData.length > 0 &&
                                saleNftData.map((data) => {
                                  return (
                                    <HomeCard
                                      key={data._id}
                                      id={data._id}
                                      featureImg={
                                        data?.preview_image &&
                                        data?.preview_image
                                      }
                                      likes={
                                        data.likeCountData
                                          ? data?.likeCountData?.like_count
                                          : 0
                                      }
                                      viewCount={
                                        onSaleData &&
                                        data.views_count &&
                                        data.views_count.view_count
                                      }
                                      title={data?.nft_name}
                                      creator={
                                        data?.creatorInfo &&
                                        data.creatorInfo.name
                                      }
                                      ethPrice={
                                        data.token_owner.price || "Not On Sale"
                                      }
                                      allMarket
                                    />
                                  );
                                })}

                              {saleSeeMoreButton && (
                                <div className="col-md-12 text-center mb-4 content-wrap">
                                  <a
                                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                    onClick={() =>
                                      setSaleSeeMore((prev) => prev + 1)
                                    }
                                  >
                                    See More
                                  </a>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="row">
                              <div className="col-md-12 sold-tab-box ">
                                <div className="profile-item-display-box text-center my-4">
                                  <h3>No NFTs to display</h3>
                                  <p>
                                    Once NFTs have been placed on sale, they
                                    will appear here.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div id="menu2" className="tab-pane fade sold-tab-menu-wrap">
                          {soldNftData && soldNftData.length > 0 ? (
                            <div className="row mt-4 mx-n1">
                              {soldNftData.length > 0 &&
                                soldNftData.map((data) => {
                                  return (
                                    <HomeCard
                                      key={data._id}
                                      id={data._id}
                                      featureImg={data?.preview_image}
                                      likes={
                                        data.likeCountData
                                          ? data.likeCountData?.like_count
                                          : 0
                                      }
                                      viewCount={
                                        onSoldData &&
                                        data.views_count &&
                                        data.views_count.view_count
                                      }
                                      title={data?.nft_name}
                                      creator={
                                        data.creatorInfo &&
                                        data?.creatorInfo?.name
                                      }
                                      ethPrice={
                                        data.token_owner.price || "Not On Sale"
                                      }
                                      allMarket
                                    />
                                  );
                                })}

                              {soldSeeMoreButton && (
                                <div className="col-md-12 text-center mb-4 content-wrap">
                                  <a
                                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                    onClick={() =>
                                      setSoldSeeMore((prev) => soldSeeMore + 1)
                                    }
                                  >
                                    See More
                                  </a>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="row">
                              <div className="col-md-12 sold-tab-box-wrap">
                                <div className="profile-item-display-box text-center mb-4">
                                  <h3>No NFTs to display</h3>
                                  <p>
                                    Once NFTs have been sold, they will appear
                                    here.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div id="menu3" className="tab-pane fade">
                          <div className="mb-4">
                            <div className="activity-table-wrap table-responsive">
                              {activityData.length > 0 ? (
                                <>
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
                                      {activityData.length > 0 &&
                                        activityData.map((data) => {
                                          return (
                                            <>
                                              {
                                                data && data.activity_type !== "Edit" ? (
                                                  <>
                                                    <tr>
                                                      <td>{data.activity_type}</td>
                                                      <td>
                                                        {!data.nftData
                                                          ? "Unnamed"
                                                          : data.nftData.nft_name}
                                                      </td>
                                                      <td>
                                                        {data?.activity_type === "Minted"
                                                          ? 0
                                                          : data?.token_owner?.price}
                                                      </td>
                                                      {/* <td>
                                                {!data.token_owner
                                                  ? 0
                                                  : data.token_owner
                                                      .token_quantity}
                                              </td> */}
                                                      <td>
                                                        {data.nftData
                                                          ? `${data.nftData.creator_addr?.substring(
                                                            0,
                                                            5
                                                          )}...${data.nftData.creator_addr?.substring(
                                                            data.nftData
                                                              .creator_addr.length - 4
                                                          )}`
                                                          : 0}
                                                      </td>

                                                      <td>{data?.activity_type == "List" ? `${data.nftData
                                                        ? `${data.nftData.contract_addr?.substring(
                                                          0,
                                                          5
                                                        )}...${data.nftData.contract_addr?.substring(
                                                          data.nftData
                                                            .contract_addr.length - 4
                                                        )}`
                                                        : 0}` : ""}</td>
                                                      <td>
                                                        {/* {data.createdAt &&
                                                  new Date(
                                                    data.createdAt
                                                  ).toDateString()} */}
                                                        {moment(
                                                          data?.createdAt &&
                                                          data?.createdAt
                                                        ).format("DD/MM/YYYY")}
                                                      </td>
                                                    </tr>
                                                  </>
                                                ) : ""
                                              }
                                            </>

                                          );
                                        })}
                                    </tbody>
                                  </table>
                                  {activityNoMore && (
                              <div className="text-center mb-4 content-wrap">
                                <a
                                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                  onClick={() =>
                                    setActivityMore(activityMore + 1)
                                  }
                                >
                                  See More
                                </a>
                              </div>
                            )}
                                </>
                              ) : (
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
                                </table>
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
        <SocialShare creator />
      </Modal>
    </>
  );
};

export default MainPanel;
