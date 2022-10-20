import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleApiCall } from "../../../api";
import { endpoints } from "../../../utils/endpoints";
import { setAllCollectionSearch } from "../../../redux/Slice/AllCollection";
import { setAllCreatorSearch } from "../../../redux/Slice/AllCreators";
import { setTypology } from "../../../redux/Slice/Home";
import {
  setAllMarketPlace,
  setSearchTypology,
} from "../../../redux/Slice/AllMarketplace";

//Static
import FilterImg from "../../../assets/img/user/fillter-head.svg";
import { PopUp } from "../../../utils/utility";
const CREATOR_IMG = require("../../../assets/img/user/creator-img.png");
const BLUE_TICK = require("../../../assets/img/home/blue-check.png");

const FilterBox = ({
  searchData,
  filterPayload,
  createApi,
  filter,
  filterSeeMore,
  isFilter = (state) => console.log(state),
  seeMore,
}) => {
  const dispatch = useDispatch();
  const { key } = useParams();

  const [nftDrop, setNftDrop] = useState(true);
  const [priceDrop, setPriceDrop] = useState(true);
  const [creatorDrop, setCreatorDrop] = useState(true);
  const [propertyDrop, setPropertyDrop] = useState(true);
  const [collectionDrop, setCollectionDrop] = useState(true);
  const [typoDrop, setTypoDrop] = useState(true);
  const [infoDrop, setInfoDrop] = useState(true);
  const [drawDrop, setDrawDrop] = useState(true);
  const [compDrop, setCompDrop] = useState(true);
  const [licenseDrop, setLicenseDrop] = useState(true);

  const [optionsDrawingFormat, setOptionsDrawingFormat] = useState([
    { value: "dwg", label: "DWG" },
    { value: "max", label: "MAX" },
    { value: "skp", label: "SKP" },
    { value: "lum", label: "LUM" },
    { value: "rvt", label: "RVT" },
    { value: "pdf", label: "PDF" },
    { value: "glb", label: "GLB" },
    { value: "gltf", label: "GLTF" },
    { value: "dgn", label: "DGN" },
    { value: "dae", label: "DAE" },
    { value: "obj", label: "OBJ" },
    { value: "dxf", label: "DXF" },
    { value: "stl", label: "STL" },
    { value: "fbx", label: "FBX" },
    { value: "3dm", label: "3DM" },
    { value: "ma", label: "MA" },
    { value: "mb", label: "MB" },
    { value: "blend", label: "BLEND" },
  ]);

  //Filter Events States
  const [fixed, setFixed] = useState({
    value: "",
    toggle: false,
  });

  const [auction, setAuction] = useState({
    value: "",
    toggle: false,
  });

  const [twoD, setTwoD] = useState({
    value: "",
    toggle: false,
  });

  const [threeD, setThreeD] = useState({
    value: "",
    toggle: false,
  });

  const [digiDes, setDigiDes] = useState({
    value: "",
    toggle: false,
  });

  const [constructed, setConstructed] = useState({
    value: "",
    toggle: false,
  });

  const [digiEx, setDigiEx] = useState({
    value: "",
    toggle: false,
  });

  const [constructAllowed, setConstructAllowed] = useState({
    value: "",
    toggle: false,
  });

  const [collectionSearch, setCollectionSearch] = useState("");
  const [creatorSearch, setCreatorSearch] = useState("");
  const [drawSearch, setDrawSearch] = useState("");
  const [typoSearch, setTypoSearch] = useState(" ");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [creator, setCreator] = useState([]);
  const [collection, setCollection] = useState([]);
  const [typology, setTypologList] = useState([]);
  const [drawingFormat, setDrawingFormat] = useState([]);
  const [selectedTypo, setSelectedTypo] = useState("");

  const collectionData = useSelector(
    (state) => state.allCollectionInfo.allCollectionInfo
  );
  const typoData = useSelector((state) => state.homeInfo.typologyInfo);
  const creatorData = useSelector(
    (state) => state.AllCreatorInfo.allCreatorInfo
  );

  //Creator API
  useEffect(() => {
    const handleCreators = async () => {
      const response = await handleApiCall(
        "get",
        `${endpoints.getAllCreator}?search=${creatorSearch}`
      );
      if (response.data.success) {
        dispatch(setAllCreatorSearch(response?.data?.data));
      }
    };

    handleCreators();
  }, [creatorSearch]);

  //Collections API
  useEffect(() => {
    const handleCollections = async () => {
      const response = await handleApiCall(
        "get",
        `${endpoints.getAllCollection}?search=${collectionSearch}`
      );
      if (response.data.success) {
        dispatch(setAllCollectionSearch(response?.data?.data));
      }
    };

    handleCollections();
  }, [collectionSearch]);

  useEffect(() => {
    if (
      auction.value ||
      fixed.value ||
      creator.length ||
      minPrice ||
      maxPrice ||
      (collection && collection.length) ||
      (drawingFormat && drawingFormat.length) ||
      (typology && typology.length) ||
      twoD.value ||
      threeD.value ||
      digiDes.value ||
      digiEx.value ||
      constructAllowed.toggle ||
      constructed.toggle
    ) {
      handleFilter();
    } else {
      handleFilter();
    }
  }, [
    auction,
    fixed,
    creator,
    minPrice,
    maxPrice,
    collection,
    drawingFormat,
    typology,
    twoD,
    threeD,
    digiDes,
    digiEx,
    constructAllowed,
    constructed,
  ]);

  //Typology API
  useEffect(() => {
    const handleTypology = async () => {
      const response = await handleApiCall(
        "get",
        `${endpoints.getTypologySearch}?search=${typoSearch}`
      );
      if (response.data.success) {
        dispatch(setTypology(response?.data?.data));
      }
    };

    handleTypology();
  }, [typoSearch]);

  //Add Creators name in one array and remove them also
  const handleCreator = (value, isSelected) => {
    if (isSelected) {
      setCreator((prev) => [...prev, value]);
    } else {
      setCreator(creator.length && creator.filter((item) => item !== value));
    }
  };

  //Add collection name in one array and remove them also
  const handleCollection = (value, isSelected) => {
    if (isSelected) {
      setCollection((prev) => [...prev, value]);
    } else {
      setCollection(
        collection.length && collection.filter((item) => item !== value)
      );
    }
  };

  //Add typology name in one array and remove them also
  const handleTypologyData = (value, isSelected) => {
    if (isSelected) {
      setTypologList((prev) => [...prev, value]);
    } else {
      setTypologList(
        typology.length && typology.filter((item) => item !== value)
      );
    }
  };

  //Add DrawingFormat name in one array and remove them also
  const handleDrawingFormat = (value, isSelected) => {
    if (isSelected) {
      setDrawingFormat((prev) => [...prev, value]);
    } else {
      setDrawingFormat(
        drawingFormat.length && drawingFormat.filter((item) => item !== value)
      );
    }
  };
  const handleFilter = async () => {
    let data = {
      type: [],
      min: "",
      max: "",
      creator_name: [],
      typology: [],
      information_type: [],
      drawing_format: [],
      completion_status: [],
      licence_type: [],
    };
    if (auction.toggle) {
      data["type"] = [...data["type"], auction.value];
    }
    if (fixed.toggle) {
      data["type"] = [...data["type"], fixed.value];
    }
    if (minPrice) data["min"] = minPrice;
    if (maxPrice) data["max"] = maxPrice;
    if (creator.length) data["creator_name"] = creator;
    if (collection.length) data["tags"] = collection;
    if (typology.length) data["typology"] = typology;
    if (twoD.toggle)
      data["information_type"] = [...data["information_type"], twoD.value];
    if (threeD.toggle)
      data["information_type"] = [...data["information_type"], threeD.value];
    if (digiDes.toggle)
      data["completion_status"] = [...data["completion_status"], digiDes.value];
    if (constructed.toggle)
      data["completion_status"] = [
        ...data["completion_status"],
        constructed.value,
      ];
    if (digiEx.toggle)
      data["licence_type"] = [...data["licence_type"], digiEx.value];
    if (constructAllowed.toggle)
      data["licence_type"] = [...data["licence_type"], constructAllowed.value];

    if (drawingFormat.length)
      data["drawing_format"] = [...data["drawing_format"], ...drawingFormat];
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.getSearch}${
          window.location.pathname.split("/").length > 1 &&
          window.location.pathname.split("/")[2]
        }`,
        data
      );
      if (response?.data?.success) {
        filterPayload(data);
        searchData(response?.data);
      }
    } catch (error) {
      PopUp("Internal Server Error", error?.response?.message, "error");
    }
  };

  return (
    <>
      <div className="panel-group" id="accordion">
        <div className="panel panel-default property-type">
          <div
            className="panel-heading"
            onClick={() => setNftDrop(!nftDrop)}
            style={{ cursor: "pointer" }}
          >
            <h3 className="panel-title">
              <a data-toggle="collapse">
                NFT Sale Type{" "}
                {nftDrop ? (
                  <i className="fas fa-angle-up" />
                ) : (
                  <i className="fas fa-angle-down" />
                )}
              </a>
            </h3>
          </div>
          {nftDrop && (
            <div className="panel-collapse collapse in show">
              <div className="panel-body">
                <button
                  type="button"
                  onClick={() =>
                    setFixed({
                      value: "Fixed",
                      toggle: !fixed.toggle,
                    })
                  }
                  style={{
                    background: fixed.toggle && "#4472c7",
                    color: fixed.toggle && "white",
                  }}
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setAuction({
                      value: "Auction",
                      toggle: !auction.toggle,
                    })
                  }
                  style={{
                    background: auction.toggle && "#4472c7",
                    color: auction.toggle && "white",
                  }}
                >
                  On Auction
                </button>
                {/* <button type="button">Has Offers</button> */}
              </div>
            </div>
          )}
        </div>
        <div className="panel panel-default">
          <div
            className="panel-heading"
            onClick={() => setPriceDrop(!priceDrop)}
            style={{ cursor: "pointer" }}
          >
            <h3 className="panel-title">
              <a data-toggle="collapse">
                Price Range{" "}
                {priceDrop ? (
                  <i className="fas fa-angle-up" />
                ) : (
                  <i className="fas fa-angle-down" />
                )}
              </a>
            </h3>
          </div>
          {priceDrop && (
            <div className="panel-collapse collapse in show">
              <div className="panel-body price-range-wrap">
                <select name="dollor" class="united-states-dollor" disabled>
                  <option value="dollor">Eth on polygon</option>
                  <option value="dollor1">United States Dollor (USD)</option>
                  <option value="dollor2">United States Dollor (USD)</option>
                  <option value="dollor3">United States Dollor (USD)</option>
                </select>
                <form className="price-range-form d-flex">
                  <div className="form-group">
                    <input
                      type="number"
                      name="text"
                      placeholder="Min"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <span>to</span>
                  <div className="form-group">
                    <input
                      type="number"
                      name="text"
                      placeholder="Max"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </form>
                <a
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  // onClick={handleFilter}
                  tabIndex={0}
                >
                  Apply
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="panel panel-default">
          <div
            className="panel-heading"
            onClick={() => setCreatorDrop(!creatorDrop)}
            style={{ cursor: "pointer" }}
          >
            <h3 className="panel-title">
              <a data-toggle="collapse">
                Creator{" "}
                {creatorDrop ? (
                  <i className="fas fa-angle-up" />
                ) : (
                  <i className="fas fa-angle-down" />
                )}
              </a>
            </h3>
          </div>
          {creatorDrop && (
            <div className="panel-collapse collapse in show">
              <div className="panel-body">
                <div className="input-group rounded">
                  <i className="fas fa-search" />
                  <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    value={creatorSearch}
                    onChange={(e) => setCreatorSearch(e.target.value)}
                  />
                </div>
                <ul className="creator-list-style">
                  {creatorData.length > 0 ? (
                    creatorData.map((data) => {
                      return (
                        <li key={data._id}>
                          <a>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={data._id}
                                onClick={(e) =>
                                  handleCreator(data?.name, e.target.checked)
                                }
                              />
                              <label
                                className="custom-control-label text-gray h6"
                                htmlFor={data._id}
                              />
                            </div>
                            <img src={CREATOR_IMG} />
                            <span>{data.name}</span>
                            <img src={BLUE_TICK} className="blue-check" />
                          </a>
                        </li>
                      );
                    })
                  ) : (
                    <li
                      className="p-2"
                      style={{
                        fontSize: "14px",
                        textAlign: "center",
                        background: "white",
                      }}
                    >
                      No Result Found
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="panel panel-default property-type">
          <div
            className="panel-heading"
            onClick={() => setPropertyDrop(!propertyDrop)}
            style={{ cursor: "pointer" }}
          >
            <h3 className="panel-title">
              <a className="collapsed">
                Custom Properties{" "}
                {propertyDrop ? (
                  <i className="fas fa-angle-down" />
                ) : (
                  <i className="fas fa-angle-up" />
                )}
              </a>
            </h3>
          </div>
          {propertyDrop && (
            <div className="custom-property-wrap panel-collapse collapse in show">
              <div className="panel-body">
                <div className="input-group rounded">
                  <i className="fas fa-search" />
                  <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                </div>
                <ul className="creator-list-style">
                  <li>
                    <a>
                      <span>Office</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>Residential</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>Building</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>Apartments</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>Villas</span>
                    </a>
                  </li>
                  <li className="custom-property-list">
                    <a
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      href="javascript:void(0);"
                      tabIndex={0}
                    >
                      Office <i className="fas fa-times" />
                    </a>
                  </li>
                  <li className="custom-property-list">
                    <a
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      href="javascript:void(0);"
                      tabIndex={0}
                    >
                      Retail <i className="fas fa-times" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="panel panel-default property-type">
          <div
            className="panel-heading"
            onClick={() => setCollectionDrop(!collectionDrop)}
            style={{ cursor: "pointer" }}
          >
            <h3 className="panel-title">
              <a className="collapsed">
                Collection{" "}
                {collectionDrop ? (
                  <i className="fas fa-angle-down" />
                ) : (
                  <i className="fas fa-angle-up" />
                )}
              </a>
            </h3>
          </div>
          {collectionDrop && (
            <div className="panel-collapse collapse in show">
              <div className="panel-body">
                <div className="input-group rounded">
                  <i className="fas fa-search" />
                  <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    value={collectionSearch}
                    onChange={(e) => setCollectionSearch(e.target.value)}
                  />
                </div>

                <ul className="creator-list-style">
                  {collectionData.length > 0 ? (
                    collectionData.map((data) => {
                      return (
                        <li key={data._id}>
                          <a>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={data._id}
                                onClick={(e) =>
                                  handleCollection(data?.name, e.target.checked)
                                }
                              />
                              <label
                                className="custom-control-label text-gray h6"
                                htmlFor={data._id}
                              />
                            </div>
                            <span>{data.name}</span>
                          </a>
                        </li>
                      );
                    })
                  ) : (
                    <li
                      className="p-2"
                      style={{
                        fontSize: "14px",
                        textAlign: "center",
                        background: "white",
                      }}
                    >
                      No Result Found
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="panel panel-default property-type">
          <div
            className="panel-heading"
            onClick={() => setTypoDrop(!typoDrop)}
            style={{ cursor: "pointer" }}
          >
            <h3 className="panel-title">
              <a className="collapsed">
                Typology{" "}
                {typoDrop ? (
                  <i className="fas fa-angle-down" />
                ) : (
                  <i className="fas fa-angle-up" />
                )}
              </a>
            </h3>
          </div>
          {typoDrop && (
            <div className="panel-collapse collapse in show">
              <div className="panel-body">
                <div className="input-group rounded">
                  <i className="fas fa-search" />
                  <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    value={typoSearch}
                    onChange={(e) => setTypoSearch(e.target.value)}
                  />
                </div>
                <ul className="creator-list-style">
                  {typoData.length > 0 &&
                    typoData.map((data) => {
                      return (
                        <li key={data._id}>
                          <a>
                            <div className="custom-control custom-checkbox">
                              {selectedTypo && selectedTypo === data?._id && (
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={data._id}
                                  onClick={(e) =>
                                    handleTypologyData(
                                      data?._id,
                                      e.target.checked
                                    )
                                  }
                                  checked={
                                    selectedTypo && selectedTypo === data?._id
                                  }
                                />
                              )}
                              {!selectedTypo && (
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={data._id}
                                  onClick={(e) =>
                                    handleTypologyData(
                                      data?._id,
                                      e.target.checked
                                    )
                                  }
                                />
                              )}
                              <label
                                className="custom-control-label text-gray h6"
                                htmlFor={data._id}
                              />
                            </div>
                            <span>{data.name}</span>
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="panel panel-default property-type">
          <div
            className="panel-heading"
            onClick={() => setInfoDrop(!infoDrop)}
            style={{ cursor: "pointer" }}
          >
            <h3 className="panel-title">
              <a
                data-toggle="collapse"
                className="collapsed"
                data-parent="#accordion"
                href="#collapse8"
              >
                Information Type{" "}
                {infoDrop ? (
                  <i className="fas fa-angle-down" />
                ) : (
                  <i className="fas fa-angle-up" />
                )}
              </a>
            </h3>
          </div>
          {infoDrop && (
            <div id="collapse8" className="panel-collapse collapse in show">
              <div className="panel-body">
                <button
                  type="button"
                  onClick={() =>
                    setTwoD({
                      value: "2D",
                      toggle: !twoD.toggle,
                    })
                  }
                  style={{
                    background: twoD.toggle && "#4472c7",
                    color: twoD.toggle && "white",
                  }}
                >
                  2D
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setThreeD({
                      value: "3D",
                      toggle: !threeD.toggle,
                    })
                  }
                  style={{
                    background: threeD.toggle && "#4472c7",
                    color: threeD.toggle && "white",
                  }}
                >
                  3D
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="panel panel-default property-type">
          <div
            className="panel-heading"
            onClick={() => setDrawDrop(!drawDrop)}
            style={{ cursor: "pointer" }}
          >
            <h3 className="panel-title">
              <a className="collapsed">
                Drawing Format{" "}
                {drawDrop ? (
                  <i className="fas fa-angle-down" />
                ) : (
                  <i className="fas fa-angle-up" />
                )}
              </a>
            </h3>
          </div>
          {drawDrop && (
            <div className="panel-collapse collapse in show">
              <div className="panel-body">
                <div className="input-group rounded">
                  <i className="fas fa-search" />
                  <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    value={drawSearch}
                    onChange={(e) => setDrawSearch(e.target.value)}
                  />
                </div>
                <ul className="creator-list-style">
                  {optionsDrawingFormat
                    .filter((element) =>
                      element.label.toLowerCase().includes(drawSearch)
                    )
                    .map((data) => {
                      return optionsDrawingFormat.length > 0 ? (
                        <li key={data.value}>
                          <a>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={data.value}
                                onClick={(e) =>
                                  handleDrawingFormat(
                                    data.value,
                                    e.target.checked
                                  )
                                }
                              />
                              <label
                                className="custom-con
                                trol-label text-gray h6"
                                htmlFor={data.value}
                              />
                            </div>
                            <span>{data.label}</span>
                          </a>
                        </li>
                      ) : (
                        <li
                          className="p-2"
                          style={{
                            fontSize: "14px",
                            textAlign: "center",
                            background: "white",
                          }}
                        >
                          No Result Found
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="panel panel-default property-type">
          <div
            className="panel-heading"
            onClick={() => setCompDrop(!compDrop)}
            style={{ cursor: "pointer" }}
          >
            <h3 className="panel-title">
              <a className="collapsed">
                Construction{" "}
                {compDrop ? (
                  <i className="fas fa-angle-down" />
                ) : (
                  <i className="fas fa-angle-up" />
                )}
              </a>
            </h3>
          </div>
          {compDrop && (
            <div className="panel-collapse collapse in show">
              <div className="panel-body">
                <button
                  type="button"
                  onClick={() =>
                    setDigiDes({
                      value: "Digital Design",
                      toggle: !digiDes.toggle,
                    })
                  }
                  style={{
                    background: digiDes.toggle && "#4472c7",
                    color: digiDes.toggle && "white",
                  }}
                >
                  Digital Design
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setConstructed({
                      value: "Constructed",
                      toggle: !constructed.toggle,
                    })
                  }
                  style={{
                    background: constructed.toggle && "#4472c7",
                    color: constructed.toggle && "white",
                  }}
                >
                  Constructed
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="panel panel-default property-type">
          <div
            className="panel-heading"
            onClick={() => setLicenseDrop(!licenseDrop)}
            style={{ cursor: "pointer" }}
          >
            <h3 className="panel-title">
              <a className="collapsed">
                License Type{" "}
                {licenseDrop ? (
                  <i className="fas fa-angle-down" />
                ) : (
                  <i className="fas fa-angle-up" />
                )}
              </a>
            </h3>
          </div>
          {licenseDrop && (
            <div className="license-type-wrap panel-collapse collapse in show">
              <div className="panel-body">
                <button
                  type="button"
                  onClick={() =>
                    setDigiEx({
                      value: "Digital Experience",
                      toggle: !digiEx.toggle,
                    })
                  }
                  style={{
                    background: digiEx.toggle && "#4472c7",
                    color: digiEx.toggle && "white",
                  }}
                >
                  Digital Experience
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setConstructAllowed({
                      value: "Construction Allowed",
                      toggle: !constructAllowed.toggle,
                    })
                  }
                  style={{
                    background: constructAllowed.toggle && "#4472c7",
                    color: constructAllowed.toggle && "white",
                  }}
                >
                  Construction Allowed
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterBox;
