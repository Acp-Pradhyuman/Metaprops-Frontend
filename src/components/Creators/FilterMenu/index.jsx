import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleApiCall } from "../../../api";
import { endpoints } from "../../../utils/endpoints";
import { setAllCollectionSearch } from "../../../redux/Slice/AllCollection";
import { setAllCreatorSearch } from "../../../redux/Slice/AllCreators";
import { setTypology } from "../../../redux/Slice/Home";
import { setAllMarketPlace } from "../../../redux/Slice/AllMarketplace";

//Static
import FilterImg from "../../../assets/img/user/fillter-head.svg";
import { PopUp } from "../../../utils/utility";
const CREATOR_IMG = require("../../../assets/img/user/creator-img.png");
const BLUE_TICK = require("../../../assets/img/home/blue-check.png");

const FilterMenu = ({
  show,
  sale,
  tab,
  create,
  createdApi,
  id,
  sold,
  soldApi,
  saleApi,
  setPayLoad = (hello) => console.log("hello"),
  setFav,
  callFav = (hello) => console.log("hello"),
}) => {
  const dispatch = useDispatch();

  const [nftDrop, setNftDrop] = useState(false);
  const [priceDrop, setPriceDrop] = useState(false);
  const [creatorDrop, setCreatorDrop] = useState(false);
  const [propertyDrop, setPropertyDrop] = useState(false);
  const [collectionDrop, setCollectionDrop] = useState(false);
  const [typoDrop, setTypoDrop] = useState(false);
  const [infoDrop, setInfoDrop] = useState(false);
  const [drawDrop, setDrawDrop] = useState(false);
  const [compDrop, setCompDrop] = useState(false);
  const [licenseDrop, setLicenseDrop] = useState(false);

  const [optionsDrawingFormat, setOptionsDrawingFormat] = useState([
    { value: "3dm", label: "3DM" },
    { value: "3ds", label: "3DS" },
    { value: "3mf", label: "3MF" },
    { value: "amf", label: "AMF" },
    { value: "blend", label: "BLEND" },
    { value: "dae", label: "DAE" },
    { value: "dgn", label: "DGN" },
    { value: "dwf", label: "DWF" },
    { value: "dwg", label: "DWG" },
    { value: "dxf", label: "DXF" },
    { value: "exl", label: "EXL" },
    { value: "fbx", label: "FBX" },
    { value: "glb", label: "GLB" },
    { value: "gltf", label: "GLTF" },
    { value: "iam", label: "IAM" },
    { value: "ifc", label: "IFC" },
    { value: "iges", label: "IGES" },
    { value: "ipt", label: "IPT" },

    { value: "jpg", label: "JPG" },
    { value: "ma", label: "MA" },
    { value: "max", label: "MAX" },
    { value: "obj", label: "OBJ" },
    { value: "pdf", label: "PDF" },
    { value: "ply", label: "PLY" },
    { value: "png", label: "PNG" },
    { value: "rfa", label: "RFA" },
    { value: "rft", label: "RFT" },
    { value: "rte", label: "RTE" },
    { value: "rvt", label: "RVT" },
    { value: "sat", label: "SAT" },
    { value: "skp", label: "SKP" },
    { value: "sldasm", label: "SLDASM" },
    { value: "sldprt", label: "SLDPRT" },
    { value: "step", label: "STEP" },
    { value: "stl", label: "STL" },
    { value: "stp", label: "STP" },

    { value: "text", label: "TXT" },
    { value: "uasset", label: "UASSET" },
    { value: "unity", label: "UNITY" },
    { value: "x3d", label: "X3D" },
    { value: "xsi", label: "XSI" },
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
      minPrice ||
      maxPrice ||
      collection.length ||
      drawingFormat.length ||
      typology.length ||
      twoD.value ||
      threeD.value ||
      digiDes.value ||
      digiEx.value ||
      constructAllowed.value ||
      constructed.value
    ) {
      handleFilter();
    } else {
      // console.log("!!!!!!")
      if (tab.toLowerCase() === "created") createdApi(1);
      if (tab.toLowerCase() === "sold") soldApi(1);
      if (tab.toLowerCase() === "on sale") saleApi(1);
      if (tab.toLowerCase() === "fav") callFav(1);
    }
    if (
      !auction.toggle &&
      !fixed.toggle &&
      !minPrice &&
      !maxPrice &&
      !drawingFormat.length &&
      !collection.length &&
      !typology.length &&
      !twoD.toggle &&
      !threeD.toggle &&
      !digiDes.toggle &&
      !digiEx.toggle &&
      !constructAllowed.toggle &&
      !constructed.toggle
    ) {
      setPayLoad({});
      // console.log("£££££££")
      if (tab.toLowerCase() === "created") createdApi(1);
      if (tab.toLowerCase() === "sold") soldApi(1);
      if (tab.toLowerCase() === "on sale") saleApi(1);
      if (tab.toLowerCase() === "fav") callFav(1);
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
    // console.log(value, isSelected);
    if (isSelected) {
      setCreator((prev) => [...prev, value]);
    } else {
      setCreator(creator.length && creator.filter((item) => item !== value));
    }
  };

  //Add collection name in one array and remove them also
  const handleCollection = (value, isSelected) => {
    // console.log(value, isSelected);
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
    // console.log(value, isSelected);
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
    // console.log(value, isSelected);
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
      id,
      tab: tab.toLowerCase(),
    };
    if (auction.toggle) {
      data["type"] = [...data["type"], auction.value];
    }
    if (fixed.toggle) {
      data["type"] = [...data["type"], fixed.value];
    }
    if (minPrice) data["min"] = minPrice;
    if (maxPrice) data["max"] = maxPrice;
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

    // console.log('data>>>>>', data);
    try {
      const response = await handleApiCall(
        "post",
        `${
          tab === "Fav" ? endpoints.getFavoritedNft : endpoints.creatorFilter
        }`,
        data
      );
      // console.log("%%%%%%----->", response?.data?.success);
      if (response?.data?.success) {
        setPayLoad(data);
        if (tab.toLowerCase() === "created") create(response?.data?.data);
        if (tab.toLowerCase() === "sold") sold(response?.data?.data);
        if (tab.toLowerCase() === "on sale") sale(response?.data?.data);
        if (tab.toLowerCase() === "fav") setFav(response?.data?.data);
      } else {
        setPayLoad(data);
        if (tab.toLowerCase() === "created") create(1);
        if (tab.toLowerCase() === "sold") sold(1);
        if (tab.toLowerCase() === "on sale") sale(1);
        if (tab.toLowerCase() === "fav") setFav(1);
      }
    } catch (error) {
      PopUp("Internal Server Error", error.response.message, "error");
    }
  };
  // console.log('Filter Collection ', fixed);

  return (
    <>
      <div className="right-side-col">
        <div className="fillter-by-box">
          <div className="fillter-top-area mobile-filter-hide">
            <img src={FilterImg} />
            <span>Filter by</span>
            <i
              className="fas fa-arrow-up"
              style={{ cursor: "pointer" }}
              onClick={tab && tab.toLowerCase() !== "activity" && show}
            />
          </div>
          <div className="panel-group filtter-bar-pannel" id="accordion">
            <div className="panel panel-default property-type">
            <div
                className="panel-heading"
                onClick={() => setNftDrop(!nftDrop)}
                style={{ cursor: "pointer" }}
              >
                 <h3 className="panel-title">
                  <a className="collapsed">
                  NFT Sale Type  <i
                      className={
                        nftDrop ? "fas fa-angle-down" : "fas fa-angle-up"
                      }
                    />
                  </a>
                </h3>
             
              </div>
              {nftDrop && (
                <div id="collapse1" className="panel-collapse">
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
                  <a className="collapsed">
                  Price Range  <i
                      className={
                        priceDrop ? "fas fa-angle-down" : "fas fa-angle-up"
                      }
                    />
                  </a>
                </h3>
             
              </div>
              {/* <div className="panel-heading">
                <h3
                  className="panel-title"
                  onClick={() => setPriceDrop(!priceDrop)}
                  style={{ cursor: "pointer" }}
                >
                  <a
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapse2"
                  >
                    Price Range {
                      priceDrop ? <i className="fas fa-angle-down" /> : <i className="fas fa-angle-up" />
                    }
                  </a>
                </h3>
              </div> */}
              {priceDrop && (
                <div id="collapse2" className="panel-collapse">
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
                      onClick={handleFilter}
                      tabIndex={0}
                    >
                      Apply
                    </a>
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
                    Custom Properties {
                      propertyDrop ? <i className="fas fa-angle-down" /> : <i className="fas fa-angle-up" />
                    }
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
                    Collection {
                      collectionDrop ? <i className="fas fa-angle-down" /> : <i className="fas fa-angle-up" />
                    }
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
                                      handleCollection(
                                        data?.name,
                                        e.target.checked
                                      )
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
                    Typology {
                      typoDrop ? <i className="fas fa-angle-down" /> : <i className="fas fa-angle-up" />
                    }
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
                    // data-toggle="collapse"
                    className="collapsed"
                    // data-parent="#accordion"
                    // href="#collapse8"
                  >
                    Information Type {
                      infoDrop ? <i className="fas fa-angle-down" /> : <i className="fas fa-angle-up" />
                    }
                  </a>
                </h3>
              </div>
              {infoDrop && (
                <div id="collapse8" className="panel-collapse">
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
                    Drawing Format {
                      drawDrop ? <i className="fas fa-angle-down" /> : <i className="fas fa-angle-up" />
                    }
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
                    Completion {
                      compDrop ? <i className="fas fa-angle-down" /> : <i className="fas fa-angle-up" />
                    }
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
                    License Type {
                      licenseDrop ? <i className="fas fa-angle-down" /> : <i className="fas fa-angle-up" />
                    }
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
        </div>
      </div>
    </>
  );
};

export default FilterMenu;
