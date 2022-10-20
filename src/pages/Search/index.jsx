import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HomePageFooter from "../../components/Home/HomePageFooter";
import FilterBox from "./FilterBox";
import { useParams, Link } from "react-router-dom";
import HomeCard from "../../components/HomeCards/HomeCard";
import { PopUp } from "../../utils/utility";

import { handleApiCall } from "../../api";
import { endpoints } from "../../utils/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { setHomeSearch } from "../../redux/Slice/HomeSearch";

import FilterImg from "../../assets/img/user/fillter-head.svg";
import Loader from "../../components/commons/Loader";
import Select from "react-select";
import FilterMenu from "../../components/Creators/FilterMenu";
import { checkIfWalletIsConnected } from "../../utils/utility";

//static files
const BLUE_TICK = require("../../assets/img/home/blue-check.png");
const FILE_IMG = require("../../assets/img/home/file-type-img.png");

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

const Search = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [nftSize, setNftSize] = useState(12);
  const [collectionSize, setCollectionSize] = useState(12);
  const [creatorSize, setCreatorSize] = useState(12);
  const [connectedAddress, setConnectedAddress] = useState("");
  const [collapse, setCollapse] = useState(true);
  const [loader, setLoader] = useState(true);
  const [searchInfo, setSearchInfo] = useState(true);
  const [sort, setSort] = useState();

  const [searchData, setSearchData] = useState("");
  const [filterPayload, setFilterPayload] = useState({});

  const [sortOptions, setSortOptions] = useState([
    { value: "-1", label: "Most Viewed" },
    { value: "-1", label: "Most Favourited" },
  ]);

  const [sortOptionCreator, setSortOptionCreator] = useState([
    { value: "-1", label: "Newest" },
    { value: "-1", label: "Oldest" },
  ]);

  const [sortOptionAll, setSortOptionAll] = useState([
    { value: "-1", label: "Most Viewed" },
    { value: "-1", label: "Most Favourited" },
    { value: "-1", label: "Newest" },
    { value: "-1", label: "Oldest" },
  ]);

  //SOme Constants For NullCheck and SearchCount----
  const nullCheck = Object.keys(searchInfo).length !== 0;

  const searchCount =
    (nullCheck && searchInfo.dataNft.length) +
    (nullCheck && searchInfo.dataCollection.length) +
    (nullCheck && searchInfo.dataCreator.length);

  useEffect(() => {
    setTimeout(() => {
      handleGetSearch();
    }, 50);
    checkMetamask();
  }, []);

  useEffect(() => {
    handleSearchData();
  }, [searchData]);

  useEffect(() => {
    handleSearchSort();
  }, [sort]);

  const handleGetSearch = async () => {
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.getSearch}${params.string}`
      );

      if (response?.data?.success) {
        let result = handlePrivateNft(response?.data);
        setSearchInfo(response?.data);
        dispatch(setHomeSearch(response?.data));
        setLoader(false);
      }
    } catch (error) {
      PopUp("Something Went Wrong", error.response.message, "error");
    }
  };
  async function checkMetamask() {
    let address = await checkIfWalletIsConnected();
    if (address) setConnectedAddress(address);
  }
  const handlePrivateNft = (data = []) => {
    //Filter Private Nft's
    let isPrivate = data.filter((item) => {
      return item.token_owner.is_private;
    });

    //Filter Not Private Nft's
    let notIsPrivate = data.filter((item) => {
      return !item.token_owner.is_private;
    });
    let result = notIsPrivate.length ? [...notIsPrivate] : [];

    let privateNft;
    //Check if wallet is connected and filter the private nft based on wallet address and private nft addresses
    if (connectedAddress) {
      privateNft =
        isPrivate.length &&
        isPrivate.filter((item) => {
          if (item.token_owner.private_address.includes(connectedAddress)) {
            return item;
          }
          return "";
        });
    }
    result =
      privateNft && privateNft.length
        ? [...notIsPrivate, ...privateNft]
        : [...notIsPrivate];
    return result;
  };

  const handleSearchData = async () => {
    let payload = Object.keys(filterPayload).length !== 0 ? filterPayload : "";
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.getSearch}${params.string}&keyword=${searchData}`,
        payload && payload
      );

      if (response?.data?.success) {
        let result = handlePrivateNft(response?.data);
        setSearchInfo(response?.data);

        setLoader(false);
      }
    } catch (error) {
      PopUp("Something Went Wrong", error.response.message, "error");
    }
  };

  const handleSearchSort = async () => {
    try {
      let resEnd;
      let payload =
        Object.keys(filterPayload).length !== 0 ? filterPayload : "";
      if (sort && Object.keys(sort).length > 0) {
        if (sort.label === "Most Viewed") {
          resEnd = `${endpoints.getSearch}${
            params.string
          }&mostViewed=${-1}&keyword=${searchData}`;
        } else if (sort.label === "Most Favourited") {
          resEnd = `${endpoints.getSearch}${
            params.string
          }&favourite=${-1}&keyword=${searchData}`;
        } else if (sort.label === "Newest") {
          resEnd = `${endpoints.getSearch}${
            params.string
          }&createdAt=${-1}&keyword=${searchData}`;
        } else if (sort.label === "Oldest") {
          resEnd = `${endpoints.getSearch}${
            params.string
          }&createdAt=${1}&keyword=${searchData}`;
        }
      }
      const response = await handleApiCall("post", resEnd, filterPayload);

      if (response?.data?.success) {
        let result = handlePrivateNft(response?.data);
        setSearchInfo(response?.data);
        setLoader(false);
      }
    } catch (error) {
      PopUp("Something Went Wrong", error?.response?.message, "error");
    }
  };

  const handleSort = (e) => {
    setSort(e);
  };

  const handleSearchInfo = (e) => {
    setSearchData(e.target.value);
  };

  return (
    <>
      <Header />
      <section className="main-pannel-sec filter-bar-sec">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="top-heading-are text-center">
                {nullCheck && searchInfo.dataNft?.length > 0 ? (
                  <>
                    <h2>Marketplace</h2>
                    <p>
                      Browse the full MetaProps marketplace to be exposed the
                      largest collection of high quality digital NFT
                      architecture content available in the world. Use the
                      filter bar to refine your search and find your perfect
                      digital assets.
                    </p>
                  </>
                ) : nullCheck && searchInfo.dataCollection?.length > 0 ? (
                  <>
                    <h2>Collections</h2>
                    <p>
                      The MetaProps team select the best of what the platform
                      has to offer and arrange them into carefully arranged hand
                      picked collections for review and purchase.
                    </p>
                  </>
                ) : (
                  <>
                    <h2>Creators</h2>
                    <p>
                      The Creators listed on this page are the best digital NFT
                      architecture designers in the world. They specialize in
                      different sectors and typologies. Browse through their
                      work to learn more about their creations.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid px-5">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-xs-12">
              <div className="right-side-col">
                {nullCheck && searchInfo.dataNft?.length > 0 && (
                  <div className="fillter-by-box">
                    <div
                      className="fillter-top-area mobile-filter-hide"
                      onClick={() => setCollapse(!collapse)}
                    >
                      <img src={FilterImg} />
                      <span>Filter by</span>
                      <i className="fas fa-arrow-up" />
                    </div>
                    {collapse && (
                      <FilterBox
                        searchData={setSearchInfo}
                        filterPayload={setFilterPayload}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div
              className={
                nullCheck && searchInfo?.dataNft?.length > 0
                  ? "col-lg-9 col-md-9"
                  : "col-lg-12 col-md-9"
              }
            >
              <div className="left-side-column">
                <div className="row">
                  <div className="col-md-6 left-side-top-head">
                    <div className="input-group">
                      <input
                        type="search"
                        className="form-control rounded"
                        placeholder="Search Marketplace"
                        aria-label="Search"
                        aria-describedby="search-addon"
                        onChange={handleSearchInfo}
                      />
                      <i className="fas fa-search" />
                    </div>
                  </div>
                  <div className="col-md-3 mt-2">
                    Showing - {searchCount}{" "}
                    {searchCount === 1 ? "result" : "results"}
                  </div>
                  <div className="col-md-3">
                    <div className="sort-tab-wrap sort-tab-wrap2">
                      <div className="sort-by-box-wrap">
                        <Select
                          options={
                            (nullCheck &&
                              searchInfo.dataNft?.length > 0 &&
                              nullCheck &&
                              searchInfo.dataCreator?.length > 0) ||
                            (nullCheck &&
                              searchInfo.dataNft?.length > 0 &&
                              nullCheck &&
                              searchInfo.dataCollection?.length > 0)
                              ? sortOptionAll
                              : (nullCheck &&
                                  searchInfo.dataCollection?.length > 0) ||
                                (nullCheck &&
                                  searchInfo.dataCreator?.length > 0)
                              ? sortOptionCreator
                              : nullCheck && searchInfo.dataNft?.length > 0
                              ? sortOptions
                              : sortOptionCreator
                          }
                          onChange={(e) => handleSort(e)}
                          value={sort}
                          styles={customStyles}
                          isSearchable={false}
                          placeholder="Sort By"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className>
                  {(nullCheck && searchInfo.dataNft.length > 0) ||
                  (nullCheck && searchInfo.dataCollection.length > 0) ||
                  (nullCheck && searchInfo.dataCreator.length > 0) ? (
                    <>
                      {loader ? (
                        <Loader />
                      ) : (
                        <>
                          {nullCheck && searchInfo.dataNft.length > 0 && (
                            <div className="row mt-4">
                              <div className="col-md-12">
                                <h3 className="mb-3">NFTs</h3>
                              </div>
                              {loader ? (
                                <Loader />
                              ) : (
                                <>
                                  {nullCheck &&
                                    searchInfo.dataNft.length > 0 &&
                                    searchInfo.dataNft
                                      .slice(0, nftSize)
                                      .map((data) => {
                                        return (
                                          <HomeCard
                                            key={data._id}
                                            id={data._id}
                                            featureImg={data.preview_image}
                                            likes={
                                              data?.likeCountData
                                                ? data?.likeCountData
                                                    ?.like_count
                                                : 0
                                            }
                                            viewCount={
                                              data?.views_count?.view_count
                                                ? data?.views_count?.view_count
                                                : 0
                                            }
                                            title={data.nft_name}
                                            creator={
                                              data.creator_data &&
                                              data.creator_data.name
                                            }
                                            ethPrice={
                                              (data?.sold_nft &&
                                                data?.sold_nft?.price) ||
                                              "Not On Sale"
                                            }
                                            page
                                          />
                                        );
                                      })}
                                  {nullCheck &&
                                    searchInfo.dataNft.length > 12 &&
                                    searchInfo.dataNft.length >= nftSize && (
                                      <div className="col-md-12 text-center content-wrap">
                                        <a
                                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                          onClick={() =>
                                            setNftSize(nftSize + 12)
                                          }
                                        >
                                          See More
                                        </a>
                                      </div>
                                    )}
                                </>
                              )}
                            </div>
                          )}
                          {nullCheck && searchInfo.dataCollection.length > 0 && (
                            <div className="row mt-3">
                              <div className="col-md-12">
                                <h3 className="mb-3">Collections</h3>
                              </div>

                              {nullCheck &&
                                searchInfo.dataCollection.length > 0 &&
                                searchInfo.dataCollection
                                  .slice(0, collectionSize)
                                  .map((data) => {
                                    return (
                                      <div className="col-md-3">
                                        <div className="digital-architecture-box">
                                          <div className="digital-architecture-img browse-collections-img">
                                            <img
                                              src={data.collection_thumbnail}
                                            />
                                          </div>
                                          <Link to={`/collection/${data._id}`}>
                                            <p>{data.name}</p>
                                          </Link>
                                        </div>
                                      </div>
                                    );
                                  })}

                              {nullCheck &&
                                searchInfo.dataCollection.length > 12 &&
                                searchInfo.dataCollection.length >=
                                  collectionSize && (
                                  <div className="col-md-12 text-center content-wrap">
                                    <a
                                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                      onClick={() =>
                                        setCollectionSize(collectionSize + 12)
                                      }
                                    >
                                      See More
                                    </a>
                                  </div>
                                )}
                            </div>
                          )}

                          {nullCheck && searchInfo.dataCreator.length > 0 && (
                            <div className="row mt-3">
                              <div className="col-md-12">
                                <h3 className="mb-3">Creators</h3>
                              </div>

                              {nullCheck &&
                                searchInfo.dataCreator.length > 0 &&
                                searchInfo.dataCreator
                                  .slice(0, creatorSize)
                                  .map((data) => {
                                    return (
                                      <div className="col-md-3 all-search-box-wrapper my-1">
                                        <div
                                          className="digital-architecture-box"
                                          style={{ width: "96%" }}
                                        >
                                          <div className="digital-architecture-img">
                                            <img src={data.banner_image} />
                                          </div>
                                          <div className="created-box-wrapper">
                                            <div
                                              className="feature-icon-box"
                                              style={{
                                                background: `url(${FILE_IMG})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                bottom: "30px",
                                              }}
                                            >
                                              <img src={data.company_sign} />
                                            </div>
                                            <div className="feature-name-wrap">
                                              {data.name}{" "}
                                              <img src={BLUE_TICK} />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}

                              {nullCheck && searchInfo.dataCreator.length > 4 && (
                                <div className="col-md-12 text-center content-wrap">
                                  <a
                                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                    onClick={() =>
                                      setCreatorSize(creatorSize + 4)
                                    }
                                  >
                                    See More
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <h4 className="d-flex align-item-center justify-content-center mt-5 w-100">
                      No Result Found
                    </h4>
                  )}
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

export default Search;
