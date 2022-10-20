import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import Header from "../../components/Header";
import Footer from "../../components/Home/HomePageFooter";
import FilterBox from "../../components/MarketPlace/FilterBox";
import FilterImg from "../../assets/img/user/fillter-head.svg";
import { handleApiCall } from "../../api";
import { endpoints } from "../../utils/endpoints";
import { checkIfWalletIsConnected } from "../../utils/utility";
import { useDispatch, useSelector } from "react-redux";
import { CommonLoading } from "react-loadingg";
import Loader from "../../components/commons/Loader";
import {
  setAllMarketPlace,
  setAllMarketPlaceSearch,
  setAllMarketPlaceSort,
} from "../../redux/Slice/AllMarketplace";
import HomeCard from "../../components/HomeCards/HomeCard";

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
  //   placeholder: () => ({
  //     color: "black",
  //   }),
};

const MarketPlace = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector(
    (state) => state.registerUser.userTokens?.data?.wallet_address
  );
  const [collapse, setCollapse] = useState(true);
  const [searchData, setSearchData] = useState("");
  const [seeMore, setSeeeMore] = useState(1);
  const [sort, setSort] = useState("");
  const [noSeeMore, setNoSeeMore] = useState("");

  const [loader, setLoader] = useState(true);
  const [marketplaceData, setMarketplaceData] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectedAddress, setConnectedAddress] = useState("");

  // const marketplaceData = useSelector(
  // 	(state) => state.allMarketplaceInfo.allMarketplaceInfo
  // );
  const searchedTypology = useSelector(
    (state) => state.allMarketplaceInfo.searchedTypology
  );
  const [sortOptions, setSortOptions] = useState([
    { value: "-1", label: "Most Favourited" },
    { value: "1", label: "Oldest" },
    { value: "-1", label: "Newest" },
    { value: "-1", label: "Price (High to Low)" },
    { value: "1", label: "Price (Low to High)" },
  ]);

  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  useEffect(() => {
    handleMarketSearch();
  }, [searchData]);
  useEffect(() => {
    if (isFilter) setSort({ value: "0", label: "Sort By" });
  }, [isFilter]);

  useEffect(() => {
    seeMore > 1 && dispatch(setAllMarketPlace(1));
    window.scrollTo(0, 0);
    checkMetamask();
  }, []);

  async function checkMetamask() {
    let address = await checkIfWalletIsConnected();
    if (address) setConnectedAddress(address);
  }

  useEffect(() => {
    if (sort.label !== "Sort By") handleMarketSort();
  }, [sort]);
  const handleMarketSort = async () => {
    let data = {};
    if (sort && sort?.label === "Most Favourited")
      data["favourite"] = +sort?.value;
    if (sort && sort?.label === "Newest") data["createdAt"] = +sort?.value;
    if (sort && sort?.label === "Oldest") data["createdAt"] = +sort?.value;
    if (sort && sort?.label === "Price (High to Low)")
      data["price"] = +sort?.value;
    if (sort && sort?.label === "Price (Low to High)")
      data["price"] = +sort?.value;
    if (Object.keys(payload).length > 0) {
      data = {
        ...data,
        ...payload,
      };
    }
    if (walletAddress) {
      data = {
        ...data,
        user_address: walletAddress,
      };
    }
    if (searchData) data["keyword"] = searchData;
    setLoader(true);
    const response = await handleApiCall(
      "post",
      `${endpoints.getAllMarketPlace}`,
      data
    );
    if (response?.data?.success) {
      const result = handlePrivateNft(response.data.data);
      setMarketplaceData(response?.data?.data);
      dispatch(setAllMarketPlaceSort(response?.data?.data));
      setLoader(false);
    }
  };
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
          if (item?.token_owner?.private_address?.includes(connectedAddress)) {
            return item;
          }
        });
    }
    result =
      privateNft && privateNft.length
        ? [...notIsPrivate, ...privateNft]
        : [...notIsPrivate];
    return result;
  };

  const handleMarketSearch = async () => {
    setLoader(true);
    let data = {
      keyword: searchData,
    };
    if (Object.keys(payload).length > 0) {
      data = {
        ...data,
        ...payload,
      };
    }
    if (walletAddress) {
      data = {
        ...data,
        user_address: walletAddress,
      };
    }
    setLoader(true);
    const response = await handleApiCall(
      "post",
      `${endpoints.getAllMarketPlace}`,
      data
    );
    if (response?.data?.success) {
      const result = handlePrivateNft(response?.data?.data);
      setMarketplaceData(response?.data?.data);
      setLoader(false);

      dispatch(setAllMarketPlaceSearch(response?.data?.data));
    } else {
      dispatch(setAllMarketPlaceSearch([]));
    }
  };

  useEffect(() => {
    if (!isFilter) handleMarketSeeMore();
    if (isFilter) handleMarketSeeMore(payload);
  }, [seeMore]);
  const handleMarketSeeMore = async (payload = {}) => {
    setLoader(true);
    const response = await handleApiCall(
      "post",
      `${endpoints.getAllMarketPlace}?page=${seeMore}`,
      payload
    );
    setNoSeeMore(response?.data.next_page);
    if (response?.data?.success) {
      if (seeMore > 1) {
        const result = handlePrivateNft(response?.data?.data);
        setMarketplaceData((prev) => [...prev, ...response?.data?.data]);
      }
    }
    setLoader(false);
  };

  const handleSort = (e) => {
    setSort(e);
  };

  return (
    <div>
      <Header />
      <section className="main-pannel-sec pb-4 user-profile-align">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="top-heading-are text-center">
                <h2>Marketplace</h2>
                <p>
                  Browse the full MetaProps marketplace to be exposed the
                  largest collection of high quality digital NFT architecture
                  content available in the world. Use the filter bar to refine
                  your search and find your perfect digital assets.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid px-5">
          <div
            className={
              collapse
                ? "left-side-column fillter-bar-show"
                : "left-side-column fillter-bar-show abc"
            }
          >
            <div className="row">
              <div className="col-lg-3 col-md-3 col-xs-12">
                <div className="right-side-col">
                  <div className="fillter-by-box">
                    <div
                      className="fillter-top-area mobile-filter-hide user-select-none"
                      onClick={() => setCollapse(!collapse)}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={FilterImg} />
                      <span>Filter by</span>
                      {collapse ? (
                        <i className="fas fa-arrow-up" />
                      ) : (
                        <i className="fas fa-arrow-down" />
                      )}
                    </div>
                    {collapse && (
                      <FilterBox
                        marketPlace={searchedTypology}
                        createApi={setMarketplaceData}
                        filter={setNoSeeMore}
                        filterSeeMore={setPayload}
                        isFilter={setIsFilter}
                        seeMore={setSeeeMore}
                        privateNftFIlter={handlePrivateNft}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-9 col-xs-12">
                <div className="left-side-column">
                  <div className="row marketplace-row-box">
                    <div className="col-lg-6 col-md-6 left-side-top-head col-xs-12">
                      <div className="input-group">
                        <input
                          type="search"
                          className="form-control rounded"
                          placeholder="Search Marketplace"
                          aria-label="Search"
                          aria-describedby="search-addon"
                          // name="keyword"
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
                    <div className="col-md-3 hide-div-on-tab"></div>
                    <div className="col-md-3 slect-option-wrap">
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
                  </div>
                  <div className="row free-column">
                    <div className="tab-content tab-content-area">
                      <div
                        className={collapse ? "" : "marketplace-wrapper-row1"}
                      >
                        {loader ? (
                          <Loader />
                        ) : (
                          <div className="row mt-4 marketplace-wrap-row">
                            {marketplaceData.length > 0 ? (
                              marketplaceData.map((data, index) => {
                                return (
                                  <HomeCard
                                    key={index}
                                    id={data._id}
                                    featureImg={data.preview_image}
                                    likes={
                                      !data.likeCountData
                                        ? 0
                                        : data.likeCountData.like_count
                                    }
                                    viewCount={
                                      data?.views_count?.view_count
                                        ? data?.views_count?.view_count
                                        : 0
                                    }
                                    title={data.nft_name}
                                    creator={data.creatorInfo.name}
                                    userId={data?.creatorInfo?.user_id}
                                    ethPrice={data.token_owner.price}
                                    isVerify={data.creatorInfo.is_verify}
                                    page
                                  />
                                );
                              })
                            ) : (
                              <div className="w-100 py-0 px-2 no-result-found">
                                <h2>No Results Found!</h2>
                              </div>
                            )}

                            {marketplaceData.length > 4 && noSeeMore !== null && (
                              <div className="col-md-12 text-center content-wrap">
                                <a
                                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                  name="page"
                                  onClick={() => setSeeeMore(seeMore + 1)}
                                >
                                  See More
                                </a>
                              </div>
                            )}
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
      </section>
      <Footer />
    </div>
  );
};

export default MarketPlace;
