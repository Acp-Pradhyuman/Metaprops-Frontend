import React, { useEffect, useState } from "react";
import { handleApiCall } from "../../../api";
import { endpoints } from "../../../utils/endpoints";
import {
  setAllCreator,
  setAllCreatorSearch,
  setAllCreatorSort,
} from "../../../redux/Slice/AllCreators";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../commons/Loader";

//Static
const SLIDE_IMAGE = require("../../../assets/img/section-image/slide-1.png");
const FEATURE_IMAGE = require("../../../assets/img/home/feature2.png");
const BLUE_CHECK = require("../../../assets/img/home/blue-check.png");
const FILE_IMAGE = require("../../../assets/img/home/file-type-img.png");

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

function CreatorLanding() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState("");
  const [seeMore, setSeeMore] = useState(1);
  const [noSeeMore, setNoSeeMore] = useState("");
  const [sortable, setSortable] = useState(null);
  const [loader, setLoader] = useState(true);
  const [creators, setCreators] = useState([]);

  const featureData = useSelector(
    (state) => state.AllCreatorInfo.allCreatorInfo
  );

  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  // UseEffect Initialisation
  useEffect(() => {
    if (searchData !== "") handleSearchData(1);
  }, [searchData]);
  const handleSearchData = async (status) => {
    const response = await handleApiCall(
      "get",
      `${endpoints.getAllCreator}?search=${searchData}`
    );
    if (response.data.success) {
      setNoSeeMore(response?.data?.next_page);

      dispatch(setAllCreatorSearch(response?.data?.data));
      if (status === 1) setCreators(response?.data?.data);
      setLoader(false);
    } else {
      dispatch(setCreators([]));
      setLoader(false);
    }
  };

  useEffect(() => {
    dispatch(setAllCreator(1));
    // handleCreator(1);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // if (sortable === null) handleCreator(2);
      // if (sortable !== null) handleCreatorSortPage(2);
      handleCreator(seeMore);
      if (sortable !== null) handleCreatorSortPage(seeMore);
    }, 50);
  }, [seeMore]);

  const handleCreator = async (status) => {
    const response = await handleApiCall(
      "get",
      `${endpoints.getAllCreator}?page=${seeMore}`
    );
    if (response.data.success) {
      setNoSeeMore(response?.data?.next_page);
      dispatch(setAllCreator(response?.data?.data));
      if (status === seeMore)
        // if(status === 2)
        setCreators((prev) => [...prev, ...response?.data?.data]);
      if (status === 1) setCreators(response?.data?.data);

      setLoader(false);
    }
  };

  useEffect(() => {
    handleCreatorSort();
    setSeeMore(1);
  }, [sortable]);

  const handleCreatorSort = async () => {
    let resEnd;
    if (sortable && sortable.label === "Oldest") {
      resEnd = `${endpoints.getAllCreator}?oldest=${1}&search=${searchData}`;
    } else if (sortable && sortable.label === "Newest") {
      resEnd = `${endpoints.getAllCreator}?oldest=${-1}&search=${searchData}`;
    } else if (sortable && sortable.label === "A-Z") {
      resEnd = `${endpoints.getAllCreator}?name=${1}&search=${searchData}`;
    } else if (sortable && sortable.label === "Z-A") {
      resEnd = `${endpoints.getAllCreator}?name=${-1}&search=${searchData}`;
    }
    const response = await handleApiCall("get", resEnd);
    if (response.data.success) {
      if (sortable !== null) setCreators(response?.data?.data);
      if (sortable !== null) setNoSeeMore(response?.data?.next_page);
      sortable !== null && dispatch(setAllCreatorSort(response?.data?.data));
    }
  };
  const handleCreatorSortPage = async (status) => {
    let resEnd;
    if (sortable && sortable.label === "Oldest") {
      resEnd = `${endpoints.getAllCreator}?oldest=${-1}&page=${seeMore}`;
    } else if (sortable && sortable.label === "Newest") {
      resEnd = `${endpoints.getAllCreator}?oldest=${1}&page=${seeMore}`;
    } else if (sortable && sortable.value === "A-Z") {
      resEnd = `${endpoints.getAllCreator}?name=${1}&page=${seeMore}`;
    } else if (sortable && sortable.value === "Z-A") {
      resEnd = `${endpoints.getAllCreator}?name=${1}&page=${seeMore}`;
    }
    const response = await handleApiCall("get", resEnd);
    if (response.data.success) {
      if (status === 2 && seeMore > 1) {
        if (sortable !== null)
          setCreators((prev) => [...prev, ...response?.data?.data]);
        if (sortable !== null) setNoSeeMore(response?.data?.next_page);
        sortable !== null && dispatch(setAllCreatorSort(response?.data?.data));
      }
    }
  };

  console.log("first", sortable && sortable.label);

  return (
    <div>
      <section class="main-pannel-sec">
        <div class="container">
          <div class="row mb-4">
            <div class="col-md-12">
              <div class="top-heading-are text-center">
                <h2>Creators</h2>
                <p>
                  The Creators listed on this page are the best digital NFT
                  architecture designers in the world. They specialize in
                  different sectors and typologies. Browse through their work to
                  learn more about their creations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid px-5">
          <div class="row">
            {loader ? (
              <Loader />
            ) : (
              <div class="col-lg-12">
                <div class="left-side-column">
                  <div class="row all-marketplace-wrap creter-page-wrap">
                    <div class="col-md-6 col-sm-12 left-side-top-head px-10">
                      <div class="input-group">
                        <input
                          type="search"
                          className="form-control rounded"
                          placeholder="Search Creators"
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
                    <div class="col-md-3 blank-column"></div>
                    <div class="col-md-3 col-sm-6 col-6 blank-column"></div>
                    <div class="col-md-3 col-sm-6 col-6 slect-option-wrap">
                      <Select
                        options={[
                          { value: -1, label: "Newest" },
                          { value: 1, label: "Oldest" },
                          { value: 1, label: "A-Z" },

                          { value: -1, label: "Z-A" },
                        ]}
                        onChange={(e) => setSortable(e)}
                        defaultValue={{ value: "", label: "Sort By" }}
                        styles={customStyles}
                        isSearchable={false}
                      />
                    </div>
                  </div>
                  <div class="">
                    <div class="row mt-4">
                      {creators && creators.length > 0 ? (
                        creators.map((data) => {
                          return (
                            <>
                              <div
                                class="marketplace-box-wrapper px-10 mb-4"
                                style={{ cursor: "pointer" }}
                              >
                                <a
                                  style={{ textDecoration: "none" }}
                                  href={`/view-creator/${data.user_id}`}
                                >
                                  <div class="digital-architecture-box">
                                    <div class="digital-architecture-img">
                                      <img src={data.banner_image} />
                                    </div>
                                    <div class="created-box-wrapper">
                                      <div
                                        class="feature-icon-box small-img"
                                        style={{
                                          background: `url(${
                                            data?.profile_image
                                              ? data?.profile_image
                                              : FILE_IMAGE
                                          })`,
                                          backgroundSize: "cover",
                                          backgroundPosition: "center",
                                        }}
                                      >
                                        {/* <img src={data.company_stamp} /> */}
                                      </div>
                                      <a
                                        href={`/view-creator/${data.user_id}`}
                                        class="text-dark no-hover-line"
                                        style={{ textDecoration: "none" }}
                                      >
                                        <div class="feature-name-wrap feature-name-wrap1">
                                          <span>{data.name}</span>{" "}
                                          {data.is_verify === 1 && (
                                            <img src={BLUE_CHECK} />
                                          )}
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </>
                          );
                        })
                      ) : (
                        <div
                          className="w-100 py-0 px-2 no-result-found"
                          style={{ textAlign: "center" }}
                        >
                          <h2>No Search Result Found!</h2>
                        </div>
                      )}

                      {creators.length > 14 &&
                        noSeeMore !== null &&
                        searchData === "" && (
                          <div class="col-md-12 text-center content-wrap">
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
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreatorLanding;
