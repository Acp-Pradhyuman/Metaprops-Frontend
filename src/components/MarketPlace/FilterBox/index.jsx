import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
	marketPlace,
	createApi,
	filter,
	filterSeeMore,
	isFilter = (state) => console.log(state),
	seeMore,
	privateNftFIlter,
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

	const [searchCustomName, setSearchCustomName] = useState("");
	const [searchCustomType, setSearchCustomType] = useState("");

	const [optionsDrawingFormat, setOptionsDrawingFormat] = useState([
		{ id: 1, isChecked: false, value: "3dm", label: "3DM" },
		{ id: 2, isChecked: false, value: "3ds", label: "3DS" },
		{ id: 3, isChecked: false, value: "3mf", label: "3MF" },
		{ id: 4, isChecked: false, value: "amf", label: "AMF" },
		{ id: 5, isChecked: false, value: "blend", label: "BLEND" },
		{ id: 6, isChecked: false, value: "dae", label: "DAE" },
		{ id: 7, isChecked: false, value: "dgn", label: "DGN" },
		{ id: 8, isChecked: false, value: "dwf", label: "DWF" },
		{ id: 9, isChecked: false, value: "dwg", label: "DWG" },
		{ id: 10, isChecked: false, value: "dxf", label: "DXF" },
		{ id: 11, isChecked: false, value: "exl", label: "EXL" },
		{ id: 12, isChecked: false, value: "fbx", label: "FBX" },
		{ id: 13, isChecked: false, value: "glb", label: "GLB" },
		{ id: 14, isChecked: false, value: "gltf", label: "GLTF" },
		{ id: 15, isChecked: false, value: "iam", label: "IAM" },
		{ id: 16, isChecked: false, value: "ifc", label: "IFC" },
		{ id: 17, isChecked: false, value: "iges", label: "IGES" },
		{ id: 18, isChecked: false, value: "ipt", label: "IPT" },

		{ id: 19, isChecked: false, value: "jpg", label: "JPG" },
		{ id: 20, isChecked: false, value: "ma", label: "MA" },
		{ id: 21, isChecked: false, value: "max", label: "MAX" },
		{ id: 22, isChecked: false, value: "obj", label: "OBJ" },
		{ id: 23, isChecked: false, value: "pdf", label: "PDF" },
		{ id: 24, isChecked: false, value: "ply", label: "PLY" },
		{ id: 25, isChecked: false, value: "png", label: "PNG" },
		{ id: 26, isChecked: false, value: "rfa", label: "RFA" },
		{ id: 27, isChecked: false, value: "rft", label: "RFT" },
		{ id: 28, isChecked: false, value: "rte", label: "RTE" },
		{ id: 29, isChecked: false, value: "rvt", label: "RVT" },
		{ id: 30, isChecked: false, value: "sat", label: "SAT" },
		{ id: 31, isChecked: false, value: "skp", label: "SKP" },
		{ id: 32, isChecked: false, value: "sldasm", label: "SLDASM" },
		{ id: 33, isChecked: false, value: "sldprt", label: "SLDPRT" },
		{ id: 34, isChecked: false, value: "step", label: "STEP" },
		{ id: 35, isChecked: false, value: "stl", label: "STL" },
		{ id: 36, isChecked: false, value: "stp", label: "STP" },

		{ id: 38, isChecked: false, value: "text", label: "TXT" },
		{ id: 39, isChecked: false, value: "uasset", label: "UASSET" },
		{ id: 40, isChecked: false, value: "unity", label: "UNITY" },
		{ id: 41, isChecked: false, value: "x3d", label: "X3D" },
		{ id: 42, isChecked: false, value: "xsi", label: "XSI" },
		{ id: 43, isChecked: false, value: "usd", label: "USD" },
		{ id: 44, isChecked: false, value: "vox", label: "VOX" },
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
	const [creatorData, setCreatorData] = useState([]);
	const [creatorDataFilter, setCreatorDataFilter] = useState([]);

	const [collectionDataFilter, setCollectionDataFilter] = useState([]);
	const [collectionData, setCollectionData] = useState([]);
	const [typoDataFilter, setTypoDataFilter] = useState([]);
	const [drawFilter, setDrawFilter] = useState([]);

	const [typoData, setTypoData] = useState([]);
	const [customNameData, setCustomNameData] = useState([]);
	const [customNameArr, setCustomNameArr] = useState([]);
	const [customTypeData, setCustomTypeData] = useState([]);
	const [customTypeArr, setCustomTypeArr] = useState([]);
	const [customTypeArrFilter, setCustomTypeArrFilter] = useState([]);
	const [customNameArrFilter, setCustomNameArrFilter] = useState([]);

	//Routed TypologyFromHome
	useEffect(() => {
		if (marketPlace) {
			setTypologList(
				typoData &&
					typoData.length &&
					typoData
						.map((item) => {
							if (item?.name === marketPlace) {
								setSelectedTypo(item?._id);
								return item?._id;
							}
						})
						.filter(Boolean)
			);
		}
		dispatch(setSearchTypology(""));
	}, []);

	useEffect(() => {
		handleCreatorData();
		handleCollectionData();
		handleTypoData();
	}, []);

	const handleCreatorData = async () => {
		try {
			const response = await handleApiCall("get", `${endpoints.getAllCreator}`);
			// console.log('%%%%%%----->', response?.data?.data);
			if (response?.data?.success) {
				const newData = response?.data?.data.map((item) => {
					item.isChecked = false;
					return item;
				});
				setCreatorData(newData);
			} else {
			}
		} catch (error) {
			PopUp("Internal Server Error", error.response.message, "error");
		}
	};
	const handleCollectionData = async () => {
		try {
			const response = await handleApiCall(
				"get",
				`${endpoints.getAllCollection}`
			);
			// console.log('%%%%%%----->', response?.data?.data);
			if (response?.data?.success) {
				const newData = response?.data?.data.map((item) => {
					item.isChecked = false;
					return item;
				});
				setCollectionData(newData);
			} else {
			}
		} catch (error) {
			PopUp("Internal Server Error", error.response.message, "error");
		}
	};

	const handleTypoData = async () => {
		try {
			const response = await handleApiCall("get", `${endpoints.getTypology}`);
			// console.log('%%%%%%----->', response?.data?.data);
			if (response?.data?.success) {
				const newData = response?.data?.data.map((item) => {
					item.isChecked = false;
					return item;
				});
				setTypoData(newData);
			} else {
			}
		} catch (error) {
			PopUp("Internal Server Error", error.response.message, "error");
		}
	};

	//Creator API
	useEffect(() => {
		const handleCreators = async () => {
			const response = await handleApiCall(
				"get",
				`${endpoints.getAllCreator}?search=${creatorSearch}`
			);
			if (response.data.success) {
				setCreatorData(response?.data?.data);
			} else {
				setCreatorData([]);
			}
		};

		handleCreators();
	}, [creatorSearch]);

	useEffect(() => {
		const newData = creator.map((item) => item.value);
		setCreatorDataFilter(newData);
	}, [creator]);

	useEffect(() => {
		const newData = collection.map((item) => item.value);
		setCollectionDataFilter(newData);
	}, [collection]);

	useEffect(() => {
		const newData = typology.map((item) => item.value);
		setTypoDataFilter(newData);
	}, [typology]);

	useEffect(() => {
		const newData = drawingFormat.map((item) => item.value);
		setDrawFilter(newData);
	}, [drawingFormat]);

	useEffect(() => {
		const newData = customNameArr.map((item) => item.value);
		setCustomNameArrFilter(newData);
	}, [customNameArr]);

	useEffect(() => {
		const newData = customTypeArr.map((item) => item.value);
		setCustomTypeArrFilter(newData);
	}, [customTypeArr]);
	//Collections API
	useEffect(() => {
		const handleCollections = async () => {
			const response = await handleApiCall(
				"get",
				`${endpoints.getAllCollection}?search=${collectionSearch}`
			);
			if (response.data.success) {
				setCollectionData(response?.data?.data);
			} else {
				setCollectionData([]);
			}
		};

		handleCollections();
	}, [collectionSearch]);

	useEffect(() => {
		// console.log('auction', auction);
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
			dispatch(setAllMarketPlace(1));
			isFilter(true);
			handleFilter();
		} else {
			dispatch(setAllMarketPlace(1));
			isFilter(false);

			handleFilter();
		}
	}, [
		auction,
		fixed,
		// creator,
		// collection,
		creatorDataFilter,
		collectionDataFilter,
		typoDataFilter,
		// drawingFormat,
		drawFilter,
		// typology,
		customNameArrFilter,
		customTypeArrFilter,
		twoD,
		threeD,
		digiDes,
		digiEx,
		constructAllowed,
		constructed,
	]);

	useEffect(() => {
		handleSearchCustomFilter();
	}, [searchCustomName]);

	useEffect(() => {
		handleSearchCustomTypeFilter();
	}, [searchCustomType]);

	//Typology API
	useEffect(() => {
		const handleTypology = async () => {
			const response = await handleApiCall(
				"get",
				`${endpoints.getTypologySearch}?search=${typoSearch}`
			);
			if (response.data.success) {
				setTypoData(response?.data?.data);
			} else {
				setTypoData([]);
			}
		};

		handleTypology();
	}, [typoSearch]);

	//Add Creators name in one array and remove them also
	const handleCreator = (value, isSelected, id) => {
		// console.log(value, isSelected);
		if (isSelected) {
			const modifyCreatorData = creatorData.map((item) => {
				if (item._id === id) {
					item.isChecked = true;
				}
				return item;
			});
			console.log(modifyCreatorData);
			setCreatorData(modifyCreatorData);
			setCreator((prev) => [...prev, { id, value }]);
		} else {
			const modifyCreatorData = creatorData.map((item) => {
				if (item._id === id) {
					item.isChecked = false;
				}
				return item;
			});
			console.log(modifyCreatorData);
			setCreatorData(modifyCreatorData);
			setCreator(creator.length && creator.filter((item) => item.id !== id));
		}
	};

	const handleCustomName = (value, isSelected, id) => {
		// console.log(value, isSelected);
		if (isSelected) {
			const modifyCreatorData = customNameData.map((item) => {
				if (item._id === id) {
					item.isChecked = true;
				}
				return item;
			});
			setCustomNameData(modifyCreatorData);
			setCustomNameArr((prev) => [...prev, { id, value }]);
		} else {
			const modifyCreatorData = customNameData.map((item) => {
				if (item._id === id) {
					item.isChecked = false;
				}
				return item;
			});
			setCustomNameData(modifyCreatorData);
			setCustomNameArr(
				customNameArr.length && customNameArr.filter((item) => item.id !== id)
			);
		}
	};

	const handleCustomType = (value, isSelected, id) => {
		// console.log(value, isSelected);
		if (isSelected) {
			const modifyCreatorData = customTypeData.map((item) => {
				if (item._id === id) {
					item.isChecked = true;
				}
				return item;
			});
			setCustomTypeData(modifyCreatorData);
			setCustomTypeArr((prev) => [...prev, { id, value }]);
		} else {
			const modifyCreatorData = customTypeData.map((item) => {
				if (item._id === id) {
					item.isChecked = false;
				}
				return item;
			});
			setCustomTypeData(modifyCreatorData);
			setCustomTypeArr(
				customTypeArr.length && customTypeArr.filter((item) => item.id !== id)
			);
		}
	};

	//Add collection name in one array and remove them also
	const handleCollection = (value, isSelected, id) => {
		// console.log(value, isSelected);
		if (isSelected) {
			const modifyCreatorData = collectionData.map((item) => {
				if (item._id === id) {
					item.isChecked = true;
				}
				return item;
			});
			setCollectionData(modifyCreatorData);
			setCollection((prev) => [...prev, { id, value }]);
		} else {
			const modifyCreatorData = collectionData.map((item) => {
				if (item._id === id) {
					item.isChecked = false;
				}
				return item;
			});
			setCollectionData(modifyCreatorData);
			setCollection(
				collection.length && collection.filter((item) => item.id !== id)
			);
		}
	};

	//Add typology name in one array and remove them also
	const handleTypologyData = (value, isSelected, id) => {
		// console.log(value, isSelected);
		if (isSelected) {
			const modifyCreatorData = typoData.map((item) => {
				if (item._id === id) {
					item.isChecked = true;
				}
				return item;
			});
			setTypoData(modifyCreatorData);
			setTypologList((prev) => [...prev, { id, value }]);
		} else {
			const modifyCreatorData = typoData.map((item) => {
				if (item._id === id) {
					item.isChecked = false;
				}
				return item;
			});
			setTypoData(modifyCreatorData);
			setTypologList(
				typology.length && typology.filter((item) => item.id !== id)
			);
		}
	};

	//Add DrawingFormat name in one array and remove them also
	const handleDrawingFormat = (value, isSelected, id) => {
		// console.log(value, isSelected);
		if (isSelected) {
			const modifyCreatorData = optionsDrawingFormat.map((item) => {
				if (item.id === id) {
					item.isChecked = true;
				}
				return item;
			});
			setOptionsDrawingFormat(modifyCreatorData);
			setDrawingFormat((prev) => [...prev, { id, value }]);
		} else {
			const modifyCreatorData = optionsDrawingFormat.map((item) => {
				if (item.id === id) {
					item.isChecked = false;
				}
				return item;
			});
			setOptionsDrawingFormat(modifyCreatorData);
			setDrawingFormat(
				drawingFormat.length && drawingFormat.filter((item) => item.id !== id)
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
			custom_properties_type: [],
			custom_properties_name: [],
		};
		if (auction.toggle) {
			data["type"] = [...data["type"], auction.value];
		}
		if (fixed.toggle) {
			data["type"] = [...data["type"], fixed.value];
		}
		if (minPrice) data["min"] = minPrice;
		if (maxPrice) data["max"] = maxPrice;
		if (creator.length) data["creator_name"] = creatorDataFilter;
		if (collection.length) data["tags"] = collectionDataFilter;
		if (typology.length) data["typology"] = typoDataFilter;
		if (customNameArr.length)
			data["custom_properties_name"] = customNameArrFilter;

		if (customTypeArr.length)
			data["custom_properties_type"] = customTypeArrFilter;

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

		if (drawingFormat.length) data["drawing_format"] = drawFilter;
		// console.log('data>>>>>', data);
		try {
			const response = await handleApiCall(
				"post",
				`${endpoints.marketPlaceFilter}`,
				data
			);
			// console.log('%%%%%%----->', response?.data?.data);
			if (response?.data?.success) {
				const result = privateNftFIlter(response?.data?.data);
				seeMore(1);
				filter(response?.data?.next_page);

				createApi(response?.data?.data);
				filterSeeMore(data);
				dispatch(setAllMarketPlace(response?.data?.data));
			} else {
				dispatch(setAllMarketPlace([]));
				createApi([]);
			}
		} catch (error) {
			PopUp("Internal Server Error", error.response.message, "error");
		}
	};

	const handleDeleteFilterItem = (value, id) => {
		if (value === 1) {
			const newCreatordata = creator.filter((item) => item.id !== id);
			setCreator(newCreatordata);
			const modifyCreatorData = creatorData.map((item) => {
				if (item._id === id) {
					item.isChecked = false;
				}
				return item;
			});
			console.log(modifyCreatorData);
			setCreatorData(modifyCreatorData);
		} else if (value === 2) {
			const newCreatordata = collection.filter((item) => item.id !== id);
			setCollection(newCreatordata);
			const modifyCreatorData = collectionData.map((item) => {
				if (item._id === id) {
					item.isChecked = false;
				}
				return item;
			});
			setCollectionData(modifyCreatorData);
		}
	};

	const handleTypoDeleteFilter = (id) => {
		let newCreatordata = typology.filter((item) => item.id !== id);
		setTypologList(newCreatordata);
		const modifyCreatorData = typoData.map((item) => {
			if (item._id === id) {
				item.isChecked = false;
			}
			return item;
		});
		setTypoData(modifyCreatorData);
		console.log("sdfghj", id);
	};

	const handleDrawDeleteFilter = (id) => {
		let newCreatordata = drawingFormat.filter((item) => item.id !== id);
		setDrawingFormat(newCreatordata);
		const modifyCreatorData = optionsDrawingFormat.map((item) => {
			if (item.id === id) {
				item.isChecked = false;
			}
			return item;
		});
		setOptionsDrawingFormat(modifyCreatorData);
		console.log("sdfghj", id);
	};

	const handleCustomNameDeleteFilter = (id) => {
		let newCreatordata = customNameArr.filter((item) => item.id !== id);
		setCustomNameArr(newCreatordata);
		const modifyCreatorData = customNameData.map((item) => {
			if (item._id === id) {
				item.isChecked = false;
			}
			return item;
		});
		setCustomNameData(modifyCreatorData);
	};

	const handleCustomTypeDeleteFilter = (id) => {
		let newCreatordata = customTypeArr.filter((item) => item.id !== id);
		setCustomTypeArr(newCreatordata);
		const modifyCreatorData = customTypeData.map((item) => {
			if (item._id === id) {
				item.isChecked = false;
			}
			return item;
		});
		setCustomTypeData(modifyCreatorData);
	};

	const handleSearchCustomFilter = async () => {
		try {
			const response = await handleApiCall(
				"get",
				`${endpoints.searchCustomProps}?keyword=${searchCustomName}&searchType=1`
			);
			// console.log('%%%%%%----->', response?.data?.data);
			if (response?.data?.success) {
				setCustomNameData(response?.data?.data);
			} else {
			}
		} catch (error) {
			PopUp("Internal Server Error", error.response.message, "error");
		}
	};

	const handleSearchCustomTypeFilter = async () => {
		try {
			const response = await handleApiCall(
				"get",
				`${endpoints.searchCustomProps}?keyword=${searchCustomType}&searchType=`
			);
			// console.log('%%%%%%----->', response?.data?.data);
			if (response?.data?.success) {
				setCustomTypeData(response?.data?.data);
			} else {
				setCustomTypeData([]);
			}
		} catch (error) {
			PopUp("Internal Server Error", error.response.message, "error");
		}
	};

	console.log("@@@@@@@@@@@@2", customTypeArr);

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
											min="0"
											onChange={(e) => setMinPrice(e.target.value)}
										/>
									</div>
									<span>to</span>
									<div className="form-group">
										<input
											type="number"
											name="text"
											placeholder="Max"
											min="0"
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
								{creatorSearch !== "" && (
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
																	checked={data.isChecked}
																	onClick={(e) =>
																		handleCreator(
																			data?.name,
																			e.target.checked,
																			data._id
																		)
																	}
																/>
																<label
																	className="custom-control-label text-gray h6"
																	htmlFor={data._id}
																/>
															</div>
															<img
																src={data.profile_image && data.profile_image}
																style={{ height: "15px", width: "15px" }}
															/>
															<span>{data.name}</span>
															{data.is_verify === 1 && (
																<img src={BLUE_TICK} className="blue-check" />
															)}
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
								)}
								<ul>
									{creator &&
										creator.length > 0 &&
										creator.map((item) => {
											return (
												<li className="custom-property-list" key={item.id}>
													<a
														className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
														href="javascript:void(0);"
														tabIndex={0}
													>
														{item.value}{" "}
														<i
															className="fas fa-times"
															onClick={() => handleDeleteFilterItem(1, item.id)}
														/>
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
								<div class="mb-3">
									<div className="input-group rounded">
										<i className="fas fa-search" />
										<input
											type="search"
											className="form-control rounded"
											placeholder="Search Type"
											aria-label="Search"
											aria-describedby="search-addon"
											value={searchCustomType}
											onChange={(e) => setSearchCustomType(e.target.value)}
										/>
									</div>
									{searchCustomType !== "" && (
										<>
											<ul className="creator-list-style">
												{customTypeData.length > 0 &&
													customTypeData.map((data) => {
														return (
															<li key={data._id}>
																<a>
																	<div className="custom-control custom-checkbox">
																		<input
																			type="checkbox"
																			className="custom-control-input"
																			id={data._id}
																			checked={data.isChecked}
																			onClick={(e) =>
																				handleCustomType(
																					data?.type,
																					e.target.checked,
																					data._id
																				)
																			}
																		/>
																		<label
																			className="custom-control-label text-gray h6"
																			htmlFor={data._id}
																		/>
																	</div>
																	<span>{data.type}</span>
																</a>
															</li>
														);
													})}
											</ul>
											<ul>
												{customTypeArr.length > 0 &&
													customTypeArr.map((item) => {
														return (
															<li
																className="custom-property-list"
																key={item._id}
															>
																<a
																	className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
																	href="javascript:void(0);"
																	tabIndex={0}
																>
																	{item.value}{" "}
																	<i
																		className="fas fa-times"
																		onClick={() =>
																			handleCustomTypeDeleteFilter(item.id)
																		}
																	/>
																</a>
															</li>
														);
													})}
											</ul>
										</>
									)}
								</div>
								<div>
									<div className="input-group rounded">
										<i className="fas fa-search" />
										<input
											type="search"
											className="form-control rounded"
											placeholder="Search Name"
											aria-label="Search"
											aria-describedby="search-addon"
											value={searchCustomName}
											onChange={(e) => setSearchCustomName(e.target.value)}
										/>
									</div>
									{searchCustomName !== "" && (
										<>
											<ul className="creator-list-style">
												{customNameData.length > 0 &&
													customNameData.map((data) => {
														return (
															<li key={data._id}>
																<a>
																	<div className="custom-control custom-checkbox">
																		<input
																			type="checkbox"
																			className="custom-control-input"
																			id={data._id}
																			checked={data.isChecked}
																			onClick={(e) =>
																				handleCustomName(
																					data?.name,
																					e.target.checked,
																					data._id
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
											<ul>
												{customNameArr.length > 0 &&
													customNameArr.map((item) => {
														return (
															<li
																className="custom-property-list"
																key={item._id}
															>
																<a
																	className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
																	href="javascript:void(0);"
																	tabIndex={0}
																>
																	{item.value}{" "}
																	<i
																		className="fas fa-times"
																		onClick={() =>
																			handleCustomNameDeleteFilter(item.id)
																		}
																	/>
																</a>
															</li>
														);
													})}
											</ul>
										</>
									)}
								</div>
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
																checked={data.isChecked}
																onClick={(e) =>
																	handleCollection(
																		data?.name,
																		e.target.checked,
																		data._id
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
								<ul>
									{collection &&
										collection.length > 0 &&
										collection.map((item) => {
											return (
												<li className="custom-property-list" key={item.id}>
													<a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
														{item.value}{" "}
														<i
															className="fas fa-times"
															onClick={() => handleDeleteFilterItem(2, item.id)}
														/>
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
																			data?.name,
																			e.target.checked,
																			data._id
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
																	checked={data.isChecked}
																	onClick={(e) =>
																		handleTypologyData(
																			data?.name,
																			e.target.checked,
																			data._id
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
								<ul className="mt-3">
									{typology &&
										typology.length > 0 &&
										typology.map((item) => {
											return (
												<li className="custom-property-list" key={item.id}>
													<a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
														{item.value}{" "}
														<i
															className="fas fa-times"
															onClick={() => handleTypoDeleteFilter(item.id)}
														/>
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
																checked={data.isChecked}
																onClick={(e) =>
																	handleDrawingFormat(
																		data.value,
																		e.target.checked,
																		data.id
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
								<ul>
									{drawingFormat &&
										drawingFormat.length > 0 &&
										drawingFormat.map((item) => {
											return (
												<li className="custom-property-list" key={item.id}>
													<a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
														{item.value}{" "}
														<i
															className="fas fa-times"
															onClick={() => handleDrawDeleteFilter(item.id)}
														/>
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
						onClick={() => setCompDrop(!compDrop)}
						style={{ cursor: "pointer" }}
					>
						<h3 className="panel-title">
							<a className="collapsed">
								IRL Completion{" "}
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
