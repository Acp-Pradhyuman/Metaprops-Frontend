import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HomePageFooter from "../../components/Home/HomePageFooter";
import { handleApiCall } from "../../api";
import { endpoints } from "../../utils/endpoints";
import { useDispatch, useSelector } from "react-redux";
import {
  setCollectionDetail,
  setCollectionSearch,
  setCollectionSort,
} from "../../redux/Slice/CollectionDetail";
import { useParams } from "react-router-dom";
import Select from "react-select";

import filterImg from "../../assets/img/user/fillter-head.svg";
import HomeCard from "../../components/HomeCards/HomeCard";
import Filter from "./Filter";
import { PopUp } from "../../utils/utility";

import ETH_IMG_SVG from "../../assets/img/section-image/etherim.svg";

const BANNER_IMG = require("../../assets/img/inner-banner1.png");
const ETH_IMG = require("../../assets/img/section-image/etherim.png");
const BLUE_TICK = require("../../assets/img/home/blue-check.png");

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
    // margin: "10px 0px",
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

const CollectionDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [sort, setSort] = useState("");
  const [sortOptions, setSortOptions] = useState([
    { value: "-1", label: "Most Favourited" },
    { value: "-1", label: "Newest" },
    { value: "1", label: "Oldest" },
    { value: "-1", label: "Price (High to Low)" },
    { value: "1", label: "Price (Low to High)" },
  ]);

  const [searchData, setSearchData] = useState("");
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);
  const [collectionData, setCollectionData] = useState({});
  const [NFTData, setNftData] = useState([]);
  const [isSeeMoreVisible, setIsSeeMoreVisible] = useState(false);
  const [totalData, setTotalData] = useState();

  const collectionDetailData = useSelector(
    (state) => state.collectionDetailInfo.collectionDetailInfo
  );

  useEffect(() => {
    // handleGetCollections();
    handleGetCollectionsInfo();
    getNftsofThisCollection();
    handleGetCollectionTotal();
  }, []);

  useEffect(() => {
    handleGetCollectionSearch();
  }, [searchData]);

  useEffect(() => {
    handleCollectionDetailSort();
  }, [sort]);

  const handleGetCollectionTotal = async () => {
    const response = await handleApiCall(
      "post",
      `${endpoints.getCollectionTotal}`,
      {
        id: params?.id,
      }
    );
    if (response?.data?.success) {
      setTotalData(response?.data);
    }
  };

  //Fetch collection details only like collection name, desc. , banner image
  const handleGetCollectionsInfo = async () => {
    try {
      const response = await handleApiCall(
        "get",
        `${endpoints.getCollectionInfo}${params.id}`
      );
      if (response?.data?.success) {
        setCollectionData(response?.data?.data);
      } else {
        PopUp("Something Went Wrong", response?.data?.message, "error");
      }
    } catch (error) {
      PopUp("Something Went Wrong", error?.response?.message, "error");
    }
  };

  const handleGetCollectionSearch = async () => {
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.collectionFilter}${params.id}`,
        {
          keyword: searchData,
        }
      );
      if (response.data.success) {
        setNftData(response?.data?.data);
        setIsSeeMoreVisible(response?.data?.next_page === null ? false : true);
        // dispatch(setCollectionSearch(response?.data?.data));
      } else {
        PopUp("Something Went Wrong", response?.data?.message, "error");
      }
    } catch (error) {
      PopUp("Something Went Wrong", error?.response?.message, "error");
    }
  };
  const getNftsofThisCollection = async () => {
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.collectionFilter}${params.id}`
      );
      if (response.data.success) {
        setNftData(response?.data?.data);
        setIsSeeMoreVisible(response?.data?.next_page === null ? false : true);
        // dispatch(setCollectionSearch(response?.data?.data));
      } else {
        PopUp("Something Went Wrong", response?.data?.message, "error");
      }
    } catch (error) {
      PopUp("Something Went Wrong", error?.response?.message, "error");
    }
  };

  const handleCollectionDetailSort = async () => {
    let resEnd;
    if (sort.label === "Most Favourited") {
      resEnd = `${endpoints.collectionFilter}${params.id}&favourite=${-1}`;
    } else if (sort.label === "Newest") {
      resEnd = `${endpoints.collectionFilter}${params.id}&createdAt=${-1}`;
    } else if (sort.label === "Oldest") {
      resEnd = `${endpoints.collectionFilter}${params.id}&createdAt=${1}`;
    } else if (sort.label === "Price (High to Low)") {
      resEnd = `${endpoints.collectionFilter}${params.id}&price=${-1}`;
    } else if (sort.label === "Price (Low to High)") {
      resEnd = `${endpoints.collectionFilter}${params.id}&price=${1}`;
    }
    const response = await handleApiCall("post", resEnd);
    if (response?.data?.success) {
      setNftData(response?.data?.data);
      setIsSeeMoreVisible(response?.data?.next_page === null ? false : true);

      dispatch(setCollectionSort(response?.data?.data));
    }
  };

  const handleSort = (e) => {
    setSort(e);
  };

  // console.log('first, ', collectionDetailData);
  console.log("iii", NFTData[0]);

  return (
    <>
      <Header />
      <section
        className="p-0 collections-banner"
        style={{
          backgroundImage: `url(${
            collectionData?.collection_thumbnail &&
            collectionData?.collection_thumbnail
          })`,
        }}
      >
        {/* <div className="container">
          <ul className="propert-details-list">
            <li>
              <span>{totalData?.items}</span>
              <p>Items</p>
            </li>
            <li>
              <span>{totalData?.owners}</span>
              <p>Owners</p>
            </li>
            <li>
              <div>
                <img src={ETH_IMG_SVG} />
                <span>{totalData?.floorPrice}</span>
              </div>
              <p>Floor Price</p>
            </li>
            <li>
              <div>
                <img src={ETH_IMG_SVG} />
                <span>{totalData?.priceVolume}</span>
              </div>
              <p>Volume Traded</p>
            </li>
          </ul>
        </div> */}
      </section>

      <section className="main-pannel-sec collection-details-page pt-4">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="collection-top-area">
                <h3>
                  {collectionData?.name}
                  {/* {collectionData?.name && (
                    <img className="ml-2" src={BLUE_TICK} />
                  )} */}
                </h3>
                <p>
                  {collectionData?.description
                    ? collectionData?.description
                    : "Description is not available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid px-5">
          <div className="row">
            <div className="col-lg-12">
              <div
                className={
                  isFilterBoxVisible
                    ? "left-side-column fillter-bar-show"
                    : "left-side-column fillter-bar-hide"
                }
              >
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-xs-12">
                    <Filter
                      show={() => setIsFilterBoxVisible(!isFilterBoxVisible)}
                      create={setNftData}
                      id={params?.id}
                      seeMore={setIsSeeMoreVisible}
                      createdApi={getNftsofThisCollection}
                    />
                  </div>
                  <div className="col-lg-9 col-md-9 col-xs-12">
                    <div className="row">
                      <div className="col-md-6 left-side-top-head">
                        <div className="input-group">
                          <input
                            type="search"
                            className="form-control rounded"
                            placeholder="Search Collection"
                            aria-label="Search"
                            aria-describedby="search-addon"
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
                      <div className="col-md-3 blank-column" />
                      <div className="col-md-3 slect-option-wrap">
                        <Select
                          options={sortOptions}
                          defaultValue={{ label: "Sort by", value: "Sort by" }}
                          onChange={(e) => handleSort(e)}
                          value={sort}
                          styles={customStyles}
                          isSearchable={false}
                          placeholder="Sort By"
                        />
                      </div>
                    </div>
                    {NFTData.length === 0 && (
                      <div className="row">
                        <div className="col-md-12 profile-item-display-col">
                          <div className="profile-item-display-box text-center my-4 no-item col-sm-12">
                            <h3>No items to display</h3>
                            <p>No NFTs available in this collection</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="row mt-4 mx-0 free-column">
                      <div className="tab-content tab-content-area">
                        <div className="row">
                          {NFTData.length > 0 &&
                            NFTData.map((data) => {
                              return (
                                <HomeCard
                                  key={data._id}
                                  id={data.nft_data._id}
                                  creatorProfile={data?.nft_data.user_id}
                                  featureImg={
                                    data.nft_data && data.nft_data.preview_image
                                  }
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
                                  title={data?.nft_data?.nft_name}
                                  creator={data?.user_data_new?.name}
                                  // ethPrice={
                                  //   data.sold_nft && data.sold_nft.price
                                  // }

                                  ethPrice={
                                    data.sold_nft && data.sold_nft.price
                                      ? data.sold_nft.price
                                      : "Not on sale"
                                  }
                                  isVerify={data.user_data_new.is_verify}
                                  allMarket
                                />
                              );
                            })}

                          {isSeeMoreVisible && (
                            <div className="col-md-12 text-center content-wrap">
                              <a
                                className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                href="javascript:void(0);"
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
      </section>

      <HomePageFooter />
    </>
  );
};

export default CollectionDetail;
