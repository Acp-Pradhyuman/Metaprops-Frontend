import React, { useState, useEffect } from "react";
import HomeCard from "../../HomeCards/HomeCard";
import FilterImg from "../../../assets/img/user/fillter-head.svg";
import Select from "react-select";
import {
  setSoldSortInfo,
  setSoldSearchInfo,
  setNftOfOnSold,
} from "../../../redux/Slice/CreatorProfile";

import { handleApiCall } from "../../../api";
import { endpoints } from "../../../utils/endpoints";
import { useDispatch, useSelector } from "react-redux";

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

const Sold = () => {
  const dispatch = useDispatch();
  const [saleSeeMore, setSaleSeeMore] = useState(1);
  const [sort, setSort] = useState("");
  const [loader, setLoader] = useState(true);

  const [sortOptions, setSortOptions] = useState([
    { value: "-1", label: "Favourited" },
    { value: "-1", label: "Created At" },
    { value: "-1", label: "Price (High to Low)" },
    { value: "1", label: "Price (Low to High)" },
  ]);
  const [saleSearchData, setSaleSearchData] = useState(null);

  const onSaleData = useSelector(
    (state) => state.creatorProfileInfo.creatorSoldInfo
  );

  useEffect(() => {
    handleSaleNftSearch();
  }, [saleSearchData]);

  useEffect(() => {
    dispatch(setNftOfOnSold(1));
  }, []);

  useEffect(() => {
    handleSaleSort();
  }, [sort]);

  useEffect(() => {
    handleOnSale();
  }, [saleSeeMore]);

  const handleOnSale = async () => {
    const response = await handleApiCall(
      "post",
      `${endpoints.soldApi}?page=${saleSeeMore}`,
      { id: "6221c5beb3335952393175be" }
    );
    // setNoSeeMore(response?.data?.next_page);
    if (response.data.success) {
      saleSeeMore >= 1 && dispatch(setNftOfOnSold(response?.data?.data));
    }
  };

  const handleSaleNftSearch = async () => {
    const response = await handleApiCall("post", `${endpoints.soldApi}`, {
      id: "6221c5beb3335952393175be",
      keyword: saleSearchData,
    });
    if (response?.data?.success) {
      saleSearchData !== null &&
        dispatch(setSoldSearchInfo(response?.data?.data));
      setLoader(false);
    } else {
      dispatch(setSoldSearchInfo([]));
    }
  };

  const handleSaleSort = async () => {
    let resEnd;
    if (sort.label === "Favourited") {
      resEnd = `${endpoints.soldApi}?favourite=${-1}`;
    } else if (sort.label === "Created At") {
      resEnd = `${endpoints.soldApi}?createdAt=${-1}`;
    } else if (sort.label === "Price (High to Low)") {
      resEnd = `${endpoints.soldApi}?price=${-1}`;
    } else if (sort.label === "Price (Low to High)") {
      resEnd = `${endpoints.soldApi}?price=${1}`;
    }
    const response = await handleApiCall("post", resEnd, {
      id: "6221c5beb3335952393175be",
    });
    if (response?.data?.success) {
      dispatch(setSoldSortInfo(response?.data?.data));
      setLoader(false);
    }
  };

  const handleSort = (e) => {
    setSort(e);
  };

  // console.log('first sold', onSaleData);

  return (
    <>
      {/* <div className="row all-marketplace-wrap">
        <div className="col-md-3">
          <div className="d-flex">
            <div className="fillter-top-area">
              <img src={FilterImg} />
              <span>Filter by</span>
              <i className="fas fa-arrow-down" />
            </div>
          </div>
        </div>
        <div className="col-md-6 left-side-top-head">
          <div className="input-group">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search Creator NFTs"
              aria-label="Search"
              aria-describedby="search-addon"
              //   disabled={status === undefined}
              onChange={(e) => setSaleSearchData(e.target.value)}
            />
            <i className="fas fa-search" />
          </div>
        </div>
        <div className="col-md-3" />
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
      </div> */}
      {onSoldData && onSoldData.length > 0 ? (
        <div className="row mt-4">
          {onSoldData.length > 0 &&
            onSoldData.map((data) => {
              return (
                <HomeCard
                  key={data._id}
                  id={data._id}
                  featureImg={data.preview_image}
                  likes={652}
                  viewCount={data.likeCountData.like_count}
                  title={data.nft_name}
                  creator={data.user_data.name}
                  ethPrice={data.token_owner ? data.token_owner.price : 0}
                  allMarket
                />
              );
            })}

          <div className="col-md-12 text-center mb-4 content-wrap">
            <a
              className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
              onClick={() => setSaleSeeMore(saleSeeMore + 1)}
            >
              See More
            </a>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-12">
            <div className="profile-item-display-box text-center my-4">
              <h3>No items to display</h3>
              <p>Once NFTs have been purchased, they will appear here.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sold;
