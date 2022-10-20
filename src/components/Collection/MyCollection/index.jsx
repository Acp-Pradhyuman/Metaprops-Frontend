import React, { useEffect, useState } from "react";
import { endpoints } from "../../../utils/endpoints";
import { handleApiCall } from "../../../api";
import {
  setAllCollection,
  setAllCollectionSearch,
  setAllCollectionSort,
} from "../../../redux/Slice/AllCollection";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import Loader from "../../commons/Loader";
// import SelectStyle from "../../commons/SelectStyle";

//Static

const SLIDE_IMAGE = require("../../../assets/img/section-image/slide-1.png");

const SelectStyle = {
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

function Collection() {
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState("");
  const [seeMore, setSeeMore] = useState(1);
  const [noSeeMore, setNoSeeMore] = useState("");
  const [sortable, setSortable] = useState(null);
  const [loader, setloader] = useState(true);

  const collectionSearchData = useSelector(
    (state) => state.allCollectionInfo.allCollectionInfo
  );

  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  useEffect(() => {
    handleGetCollections();
  }, [searchData]);

  const handleGetCollections = async () => {
    const response = await handleApiCall(
      "get",
      searchData
        ? `${endpoints.getAllCollection}?search=${searchData}`
        : `${endpoints.getAllCollection}`
    );
    if (response.data.success) {
      dispatch(setAllCollectionSearch(response?.data?.data));
      setloader(false);
    } else {
      dispatch(setAllCollectionSearch([]));
      setloader(false);
    }
  };
  useEffect(() => {
    dispatch(setAllCollection(1));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      seeMore > 1 && handleCollectionPage();
    }, 50);
  }, [seeMore]);

  const handleCollectionPage = async () => {
    const response = await handleApiCall(
      "get",
      `${endpoints.getAllCollection}?page=${seeMore}`
    );
    setNoSeeMore(response?.data?.next_page);
    if (response.data.success) {
      dispatch(setAllCollection(response?.data?.data));
      setloader(false);
    }
  };

  useEffect(() => {
    sortable && handleCollectionSort();
  }, [sortable]);

  const handleCollectionSort = async () => {
    const response = await handleApiCall(
      "get",
      `${endpoints.getAllCollection}?oldest=${sortable}&search=${searchData}`
      // {keyword: searchData}
    );
    if (response.data.success) {
      sortable !== null && dispatch(setAllCollectionSort(response?.data?.data));
      setloader(false);
    }
  };

  return (
    <div>
      <section class="main-pannel-sec">
        <div class="container">
          <div class="row mb-4">
            <div class="col-md-12">
              <div class="top-heading-are text-center">
                <h2>Collections</h2>
                <p>
                  The MetaProps team select the best of what the platform has to
                  offer and arrange them into carefully arranged hand picked
                  collections for review and&nbsp;purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid px-5">
          {loader ? (
            <Loader />
          ) : (
            <div class="row">
              <div class="col-lg-12">
                <div class="">
                  <div class="row collections-box-row">
                    <div class="col-md-6 col-sm-12 left-side-top-head">
                      <div class="input-group">
                        <input
                          type="search"
                          className="form-control rounded"
                          placeholder="Search Collection"
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
                        <i class="fas fa-search"></i>
                      </div>
                    </div>
                    <div class="col-md-3 col-sm-6 col-6 blank-column"></div>
                    <div class="col-md-3 col-sm-6 col-6 slect-option-wrap">
                      <Select
                        options={[
                          { value: -1, label: "Newest" },
                          { value: 1, label: "Oldest" },
                        ]}
                        onChange={(e) => setSortable(e.value)}
                        defaultValue={{ value: "0", label: "Sort By" }}
                        styles={SelectStyle}
                        isSearchable={false}
                      />
                    </div>
                  </div>
                  <div class="collection-main-box">
                    <div class="row mt-4">
                      {collectionSearchData.length > 0 &&
                        collectionSearchData.map((data) => {
                          return (
                            <>
                              <div class="col-lg-3 col-md-4 col-sm-6 col-6">
                                <div class="digital-architecture-box">
                                  <a href={`/collection/${data._id}`}>
                                    <div class="digital-architecture-img browse-collections-img">
                                      <img src={data.cover_picture} />
                                    </div>
                                  </a>

                                  <a href={`/collection/${data._id}`}>
                                    <p>
                                      {data.name.length < 40
                                        ? data.name
                                        : `${data.name.substring(0, 40)}...`}
                                    </p>
                                  </a>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      {collectionSearchData.length === 0 && (
                        <div
                          className="w-100 py-0 px-2 no-result-found"
                          style={{ textAlign: "center" }}
                        >
                          <h2>No Search Result Found!</h2>
                        </div>
                      )}

                      {collectionSearchData.length > 11 && noSeeMore !== null && (
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
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Collection;
