import React, { useState, useEffect } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//Components
import Header from "../../components/Header";
import HomePageFooter from "../../components/Home/HomePageFooter";
import Modal from "../../components/commons/Modal/Modal.jsx";
import AddNftModal from "../../components/AddNftModal";
import { PopUp } from "../../utils/utility";
import { handleApiCall } from "../../api";
import { endpoints } from "../../utils/endpoints";
import { setCurrentNft } from "../../redux/Slice/NftDetails";
import Loader from "../../components/commons/Loader";
import CircularProgress from "@mui/material/CircularProgress";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "black",
    // padding: 5,
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
    // height: 45,
    minHeight: 45,
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

const AddNft = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const walletAddress = useSelector(
    (state) => state.registerUser.userTokens?.data?.wallet_address
  );
  const userDetails = useSelector(
    (state) => state.registerUser.userTokens?.data?._id
  );
  const [show, setShow] = useState();
  const [nftResponse, setNftResponse] = useState();
  const [informationType, setInformationType] = useState("1");
  const [informationTypeError, setInformationTypeError] = useState(null);
  const [licenseType, setLicenseType] = useState("");
  const [licenseTypeError, setLicenseTypeError] = useState("");
  const [constructionStatus, setConstructionStatus] = useState("");
  const [constructionStatusError, setConstructionStatusError] = useState("");
  const [creatorCollection, setCreatorCollection] = useState([]);
  const [creatorCollectionList, setCreatorCollectionList] = useState([]);
  const [creatorCollectionError, setCreatorCollectionError] = useState("");
  const [creatorCollectionSelect, setCreatorCollectionSelect] = useState([]);
  const [creatorCollectionSelectError, setCreatorCollectionSelectError] =
    useState("");
  const [blockChain, setBlockChain] = useState("");
  const [blockChainError, setBlockChainError] = useState("");
  const [fileUpload, setFileUpload] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [fileUploadError, setFileUploadError] = useState("");
  const [blockchainImage, setBlockchainImage] = useState([]);
  const [blockchainImagePreview, setBlockchainImagePreview] = useState([]);
  const [blockchainImageError, setBlockchainImageError] = useState("");
  const [blockchainZip, setBlockchainZip] = useState([]);
  const [blockchainZipError, setBlockchainZipError] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftNameError, setNftNameError] = useState("");
  const [externalLinks, setExternalLinks] = useState("");
  const [externalLinksError, setExternalLinksError] = useState("");
  const [description, setDiscription] = useState("");
  const [descriptionError, setDiscriptionError] = useState("");
  const [properties, setProperties] = useState([]);
  const [propertiesError, setPropertiesError] = useState("");
  const [typology, setTypology] = useState([]);
  const [typologyOptions, setTypologyOptions] = useState([]);
  const [typologyError, setTypologyError] = useState("");
  const [drawing, setDrawing] = useState([]);
  const [customDrawing, setCustomDrawing] = useState([]);
  const [drawingError, setDrawingError] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isAgreedError, setIsAgreedError] = useState("");
  const [isProgress, setIsProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
  const optionsLicenseType = [
    { value: "Constructible", label: "Constructible" },
    { value: "Digital Experience", label: "Digital Experience" },
  ];
  const optionsConstructionStatus = [
    { value: "Real World Completed", label: "Real World Completed" },
    { value: "Digital Design", label: "Digital Design" },
  ];
  const optionsForEtherium = [
    { value: "Eth on polygon", label: "ETH on polygon" },
  ];

  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  const allowedZipExtensions = /(\.rar|\.zip)$/i;

  useEffect(() => {
    getTopologyList();
    getCollectionList();
  }, []);

  const clearState = () => {
    setNftNameError("");
    setFileUploadError("");
    setDiscriptionError("");
    setExternalLinksError("");
    setLicenseTypeError("");
    setConstructionStatusError("");
    setCreatorCollectionError("");
    setCreatorCollectionSelectError("");
    setBlockChainError("");
    setBlockchainImageError("");
    setBlockchainZipError("");
    setTypologyError("");
    setDrawingError("");
  };

  const getTopologyList = async () => {
    const response = await handleApiCall("get", `${endpoints.getTypology}`);
    if (response?.data?.success) {
      const finalData = [];
      response?.data?.data.map((item) => {
        finalData.push({
          label: item.name,
          value: item._id,
        });
      });
      setTypologyOptions(finalData);
    } else {
      PopUp("Something Went Wrong", response?.data?.message, "error");
    }
  };

  const getCollectionList = async () => {
    const response = await handleApiCall("get", `${endpoints.getCollection}`);
    if (response?.data?.success) {
      const finalData = [];
      response?.data?.data.map((item) => {
        finalData.push({
          label: item.name,
          value: item._id,
        });
      });
      setCreatorCollectionList(finalData);
    } else {
      PopUp("Something Went Wrong", response?.data?.message, "error");
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleNftData = async (field, value, key, index) => {
    setIsProgress(false);
    clearState();
    if (field === "fileUpload") {
      setFileUpload([]);
      setPreviewImages([]);
      setFileUpload([...fileUpload, ...value]);
      if (value) {
        const arr = Array.from(value);
        let image = arr.filter(
          (file) => !allowedExtensions.exec(file.name.toLowerCase())
        );
        const images = await Promise.all(
          [...value].map((imageInput) =>
            imageInput ? getBase64(imageInput) : null
          )
        );
        setPreviewImages(images);
        PopUp(
          arr.length <= 1 ? "Image uploaded" : "Images uploaded",
          arr.length <= 1
            ? "Image has been uploaded sucessfully."
            : "Images have been uploaded sucessfully.",
          "success"
        );
      }
    } else if (field === "nft-name") {
      setNftName(value);
    } else if (field === "external-links") {
      setExternalLinks(value);
    } else if (field === "description") {
      setDiscription(value);
    } else if (field === "creatorCollectionSelect") {
      setCreatorCollectionSelect(value);
    } else if (field === "licenceType") {
      setLicenseType(value);
    } else if (field === "constructionStatus") {
      setConstructionStatus(value);
    } else if (field === "creatorCollection") {
      setCreatorCollection(value);
    } else if (field === "blockChain") {
      setBlockChain(value);
    } else if (field === "properties") {
      properties.length &&
        properties.map((item, indx) => {
          if (index === indx) {
            properties[indx] = { ...item, [key]: value };
          }
        });
    } else if (field === "typology") {
      setTypology(value);
    } else if (field === "drawing") {
      setDrawing(value);
    } else if (field === "customDrawing") {
      setCustomDrawing(value);
    } else if (field === "blockchainImage") {
      setBlockchainImage([]);
      setBlockchainImage(value);
      if (value) {
        const arr = Array.from(value);
        let image = arr.filter(
          (file) => !allowedExtensions.exec(file.name.toLowerCase())
        );

        arr.map((item) => {
          let reader = new FileReader();

          reader.onloadend = () => {
            setBlockchainImagePreview((prev) => [reader.result]);
          };

          reader.readAsDataURL(item);
        });
      }
      PopUp(
        "Image uploaded",
        "Image has been uploaded sucessfully.",
        "success"
      );
    } else if (field === "blockchainZip") {
      setBlockchainZip([]);
      setBlockchainZip(value);
      PopUp(
        "Zip file uploaded",
        "Zip file has been Uploaded Successfully",
        "success"
      );
    } else if (field === "agree") {
      setIsAgreed(!isAgreed);
    } else if (field === "infoType") {
      setInformationType(value);
    } else if (field === "collection") {
      setCreatorCollectionSelect(value);
    }
  };

  const handleCustomProperties = () => {
    if(properties.length > 9) {
      PopUp("You can not add more than 10 custom properties", "", "error");
      return
    }
    setProperties((prev) => [...prev, { type: "", name: "" }]);
  };


  const handleDrawingFormat = () => {
    if (customDrawing) {
      setOptionsDrawingFormat((prev) => [
        ...prev,
        { value: customDrawing, label: customDrawing },
      ]);
    }
    setCustomDrawing("");
  };

  const handleRemoveCustomProperties = (index) => {
    setProperties(properties.filter((item, indx) => indx !== index));
  };

  const handleSubmit = async (e) => {
    let form = new FormData();
    if (isAgreed) {
      if (walletAddress) {
        form.append("owner_addr", walletAddress);
      } else {
        PopUp("Unauthorized", "Please Login", "error");
        return;
      }
      if (fileUpload.length) {
        const arr = Array.from(fileUpload);
        let image = arr.filter((file) => !allowedExtensions.exec(file.name));
        let size = arr.filter((file) => Math.round(file?.size / 1024) >= 5096);
        if (image.length) {
          PopUp(
            "Only Image Allowed. (JPEG,JPG,PNG,GIF)",
            "Please select allowed image type only.",
            "error"
          );
          return;
        } else if (size.length) {
          PopUp(
            "Image Size Exceed",
            "File is too Big, please select a file less than 5MB",
            "error"
          );
          return;
        } else if (arr.length > 25) {
          PopUp(
            "Image Quantity Exceed",
            "Maximum 25 Image Allowed At Once",
            "error"
          );
          return;
        } else {
          arr.length &&
            arr.map((item) => {
              form.append("nft_media", item, item.name);
            });
        }
      } else {
        setFileUploadError("Please select Preview Files");
        return;
      }
      if (nftName) {
        form.append("nft_name", nftName);
      } else {
        setNftNameError("Please enter NFT name");
        return;
      }
      if (description) {
        form.append("description", description);
      } else {
        setDiscriptionError("Please Enter Description");
        return;
      }
      if (externalLinks) {
        form.append("external_link", externalLinks);
      } else {
        form.append("external_link", "");
      }
      if (licenseType) {
        form.append("licence_type", licenseType.value);
      } else {
        setLicenseTypeError("Please Select License Type");
        return;
      }
      if (constructionStatus) {
        form.append("construction_status", constructionStatus.value);
      } else {
        setConstructionStatusError("Please Select Construction Status");
        return;
      }
      if (
        creatorCollection.length > 0 &&
        creatorCollectionSelect.length === 0
      ) {
        let finalData = [];

        if (creatorCollection.length > 1) {
          creatorCollection.map((item) => {
            form.append("tags", item.value && item.value);
          });
        } else {
          creatorCollection.map((item) => {
            if (item.label) finalData.push(item.value);
          });
          form.append("tags", finalData);
        }
      }
      if (creatorCollectionSelect.length > 0 || creatorCollection.length > 0) {
        let finalData = [];
        if (creatorCollectionSelect.length > 1) {
          creatorCollectionSelect.map((item) => {
            if (item.label) form.append("tags", item.label);
          });
        } else {
          creatorCollectionSelect.map((item) => {
            if (item.label) finalData.push(item.label);
          });
          form.append("tags", finalData);
        }
      } else {
        setCreatorCollectionError("Please Enter or Select Creator Collection");
        return;
      }
      if (blockchainImage.length) {
        const arr = Array.from(blockchainImage);
        let image = arr.filter((file) => !allowedExtensions.exec(file.name));
        let size = arr.filter((file) => Math.round(file?.size / 1024) >= 5096);
        if (image.length) {
          PopUp(
            "Only Image Allowed. (JPEG,JPG,PNG,GIF)",
            "Please select allowed image type only.",
            "error"
          );
          return;
        } else if (size.length) {
          PopUp(
            "Image Size Exceed",
            "File is too Big, please select a file less than 5MB",
            "error"
          );
          return;
        } else {
          arr.length &&
            arr.map((item) => {
              form.append("preview_image", item);
            });
        }
      } else {
        setBlockchainImageError("Please Select Blockchain Preview Image");
        return;
      }
      if (blockchainZip.length) {
        const arr = Array.from(blockchainZip);
        let image = arr.filter((file) => !allowedZipExtensions.exec(file.name));
        let size = arr.filter(
          (file) => Math.round(Math.round(file?.size / 1024) / 1024) >= 1024
        );
        if (image.length) {
          PopUp("Only ZIP Allowed", "Please select zip type only.", "error");
          return;
        } else if (size.length) {
          PopUp(
            "ZIP Size Exceeded",
            "File is too Big, please select a file less than 1GB",
            "error"
          );
          return;
        } else {
          arr.length &&
            arr.map((item) => {
              form.append("nft_zip_files", item);
            });
        }
      } else {
        setBlockchainZipError("Please Select ZIP File.");
        return;
      }
      if (properties.length) {
        form.append("custom_properties", JSON.stringify(properties));
      }
      if (typology.length) {
        const typo = [];
        typology.map((item) => {
          form.append("typology", item.value);
          typo.push(item.value);
        });
      } else {
        setTypologyError("Please Select Typology");
        return;
      }
      if (drawing.length) {
        const draw = [];
        drawing.map((item) => {
          form.append("drawing_format", item.value);

          draw.push(item.value);
        });
      } else {
        setDrawingError("Please Select Drawing Format");
        return;
      }
      if (blockChain) {
        form.append("blockchain", blockChain.value);
      } else {
        setBlockChainError("Please Select A BlockChain");
        return;
      }
      if (informationType) {
        form.append("information_type", informationType === "1" ? "2D" : "3D");
      } else {
        setInformationTypeError("Please Select Information Type");
        return;
      }
      let collect_ion =
        Boolean(creatorCollectionSelect) || Boolean(creatorCollection);
      if (
        fileUpload.length &&
        blockchainImage.length &&
        blockchainZip.length &&
        nftName &&
        description &&
        licenseType &&
        constructionStatus &&
        creatorCollection &&
        typology &&
        informationType &&
        drawing &&
        blockChain &&
        collect_ion
      ) {
        try {
          setIsProgress(true);
          const response = await handleApiCall(
            "post",
            `${endpoints.addNft}`,
            form
          );
          let myData = new FormData();
          const arr = Array.from(blockchainZip);
          arr.length &&
            arr.map((item) => {
              myData.append("nft_zip_files", item);
            });

          if (response?.data?.success) {
            myData.append("id", response?.data?.data?._id);
            if (properties.length) {
              try {
                let prop = [];
                properties.map((item) => {
                  if (item.type && item.name) {
                    prop.push(item);
                  }
                });
                if (prop.length) {
                  await handleApiCall(
                    "post",
                    `${endpoints.addCustomeProperties}`,
                    {
                      id: response?.data?.data?._id,
                      custom_properties: prop,
                    }
                  );
                }
              } catch (error) {
                console.error(error?.message);
              }
            }
            try {
              await handleApiCall("post", `${endpoints.addZip}`, myData);
              setIsProgress(false);
              setShow(true);
              dispatch(setCurrentNft(response?.data?.data));
              setNftResponse(response?.data?.data);
            } catch (error) {
              PopUp("Something Went Wrong", error?.response?.message, "error");
              PopUp(
                "Something Went Wrong",
                "This NFT is deleted. Please try again.",
                "error"
              );
            }
          } else {
            PopUp("Something Went Wrong", response?.data?.message, "error");
            setIsProgress(false);
          }
        } catch (error) {
          PopUp("Internal Server Error", error.response.message, "error");
          setIsProgress(false);
        }
      }
    } else {
      setIsAgreedError("Please Accept The Terms And Conditions");
    }
  };
  const _handleCloseAddNftSuccess = async () => {
    setShow(false);
    navigate("/creator-profile");
  };

  const handleImg = (e, index) => {
    const newList = previewImages.filter((data, i) => i !== index);
    setPreviewImages(newList);
  };

  return (
    <>
      <Header />
      <section className="main-pannel-sec add-nft-wrapper">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12 p-0 mobile-pd-style">
              <div className="top-heading-are text-center">
                <h2>Add NFT</h2>
                <p>
                  Please follow the Instructions provided below for uploading
                  Content required for listing your NFT on the platform. Once
                  completed, the NFT shall be placed on your profile. The NFT
                  will then require listing for sale before it can purchased.
                </p>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6 col-md-6 col-sm-12">
              <form className="profile-wrap-form">
                <div className="form-group">
                  <label htmlFor="email">
                    Preview File Upload <span className="text-danger">*</span>
                  </label>
                  <div className="drag-drop-wrapper">
                    <div
                      className="upload-file flex-fill"
                      style={{
                        border:
                          previewImages.length > 0
                            ? "none"
                            : "2px dashed #dadee2",
                      }}
                    >
                      <input
                        type="file"
                        name={fileUpload}
                        multiple
                        accept="image/png,image/jpeg,image/bmp,image/gif"
                        onChange={(e) =>
                          handleNftData("fileUpload", e.target.files)
                        }
                      />
                      <div className="mt-3 text-gray mb-2 drag-drop-content">
                        <div className="font-12 mb-1 weight-500">
                          {previewImages.length > 0 ? (
                            <div
                              className="block-img-pre"
                              style={{
                                height: "350px",
                                width: "100%",
                                zIndex: "-1",
                              }}
                            >
                              {previewImages.length > 0 &&
                                previewImages.slice(0, 1).map((item) => {
                                  return (
                                    <img
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                      }}
                                      src={item}
                                      alt="images"
                                    />
                                  );
                                })}
                            </div>
                          ) : (
                            <div>
                              Drag &amp; Drop{" "}
                              <span>or browse media from your device</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="upload-img-details mt-2">
                      <span>JPG GIF PNG</span>
                      <span>Max Size: 5MB</span>
                    </div>
                  </div>
                  {previewImages.length > 0 && (
                    <div className="img-box-wrapper">
                      {previewImages.length > 0 &&
                        previewImages.slice(1).map((item, index) => {
                          return (
                            <>
                              <img src={item} alt="images" />
                              <i
                                class="fa-regular fa-x"
                                style={{ cursor: "pointer", marginleft: "-5%" }}
                                onClick={(e) => handleImg(e, index + 1)}
                                id={index}
                              ></i>
                            </>
                          );
                        })}
                    </div>
                  )}

                  {fileUploadError && (
                    <p style={{ color: "red" }}>{fileUploadError}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    NFT Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    // placeholder='Raha Villas'
                    name={nftName}
                    onChange={(e) => handleNftData("nft-name", e.target.value)}
                    maxLength={30}
                  />
                  {nftNameError && (
                    <p style={{ color: "red" }}>{nftNameError}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    NFT Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    name={description}
                    onChange={(e) =>
                      handleNftData("description", e.target.value)
                    }
                    maxLength={1000}
                  />
                  {descriptionError && (
                    <p style={{ color: "red" }}>{descriptionError}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>External Link</label>
                  <input
                    type="text"
                    className="form-control"
                    name={externalLinks}
                    onChange={(e) =>
                      handleNftData("external-links", e.target.value)
                    }
                  />
                  {externalLinksError && (
                    <p style={{ color: "red" }}>{externalLinksError}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    Licence Type <span className="text-danger">*</span>
                  </label>
                  <div className="slect-option-wrap">
                    <Select
                      defaultValue={licenseType}
                      styles={customStyles}
                      isSearchable={false}
                      onChange={(e) => handleNftData("licenceType", e)}
                      options={optionsLicenseType}
                    />
                  </div>
                  {licenseTypeError && (
                    <p style={{ color: "red" }}>{licenseTypeError}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    IRL Construction Status{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <div className="slect-option-wrap">
                    <Select
                      defaultValue={constructionStatus}
                      onChange={(e) => handleNftData("constructionStatus", e)}
                      options={optionsConstructionStatus}
                      styles={customStyles}
                      isSearchable={false}
                    />
                  </div>
                  {constructionStatusError && (
                    <p style={{ color: "red" }}>{constructionStatusError}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    Creator Collection <span className="text-danger">*</span>
                  </label>
                  <div className="creator-collection-box pb-2">
                    <CreatableSelect
                      isMulti
                      onChange={(e) => handleNftData("creatorCollection", e)}
                      options={creatorCollection}
                      placeholder="Enter Collection Name"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          color: "black",
                          padding: 5,
                          margin: "0px",
                          background: "white",
                          ":hover": {
                            background: "#4472c7",
                            color: "white",
                          },
                          boxShadow: "none",
                        }),
                        indicatorSeparator: () => ({
                          border: "none",
                          color: "black",
                          textTransform: "uppercase",
                        }),
                        dropdownIndicator: () => ({
                          color: "black",
                          paddingRight: ".5em",
                          textTransform: "uppercase",
                        }),
                      }}
                    />
                  </div>
                  <div className="creator-collection-box pb-2">
                    <Select
                      isMulti={true}
                      options={creatorCollectionList}
                      onChange={(e) =>
                        handleNftData("creatorCollectionSelect", e)
                      }
                      styles={customStyles}
                      isSearchable={false}
                      value={creatorCollectionSelect}
                      showNewOptionAtTop={true}
                    />
                  </div>
                  {creatorCollectionError && (
                    <p style={{ color: "red" }}>{creatorCollectionError}</p>
                  )}
                </div>
              </form>
            </div>
            <div className="col-md-6 col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-6">
                  <form className="profile-wrap-form">
                    <div className="form-group">
                      <label htmlFor="email">
                        Blockchain Preview{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="drag-drop-wrapper drag-drop-wrapper1">
                        <div
                          className="upload-file flex-fill"
                          style={{
                            border:
                              blockchainImagePreview.length > 0
                                ? "none"
                                : "2px dashed #dadee2",
                          }}
                        >
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/bmp,image/gif"
                            onChange={(e) =>
                              handleNftData("blockchainImage", e.target.files)
                            }
                          />

                          <div className="drag-drop-content">
                            {blockchainImagePreview.length > 0 ? (
                              <div className="block-img-pre">
                                {blockchainImagePreview.length > 0 &&
                                  blockchainImagePreview.map((item) => {
                                    return <img src={item} alt="images" />;
                                  })}
                              </div>
                            ) : (
                              <div>
                                Drag &amp; Drop{" "}
                                <span>or browse media from your device</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="upload-img-details mt-2">
                          <span>JPG GIF PNG</span>
                          <span>Max Size: 5MB</span>
                        </div>
                      </div>
                    </div>
                    {blockchainImageError && (
                      <p style={{ color: "red" }}>{blockchainImageError}</p>
                    )}
                  </form>
                </div>
                <div className="col-md-6">
                  <form className="profile-wrap-form">
                    <div className="form-group">
                      <label htmlFor="email">
                        Blockchain ZIP File{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="drag-drop-wrapper drag-drop-wrapper1">
                        <div
                          className="upload-file flex-fill"
                          style={{ border: "2px dashed #dadee2" }}
                        >
                          <input
                            type="file"
                            accept="application/x-zip-compressed"
                            onChange={(e) =>
                              handleNftData("blockchainZip", e.target.files)
                            }
                          />
                          <div className="drag-drop-content">
                            {blockchainZip.length > 0 ? (
                              <div style={{ margin: "0.7rem" }}>
                                {blockchainZip[0]?.name}
                              </div>
                            ) : (
                              <div>
                                Drag &amp; Drop{" "}
                                <span>or browse media from your device</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="upload-img-details mt-2">
                          <span>ZIP</span>
                          <span>Max Size: 1GB</span>
                        </div>
                      </div>
                    </div>
                    {blockchainZipError && (
                      <p style={{ color: "red" }}>{blockchainZipError}</p>
                    )}
                  </form>
                </div>
              </div>
              <form className="profile-wrap-form">
                <div className="form-group creators-activiti-wrap">
                  <label>Custom Properties</label>
                  <div className="row">
                    {properties.length > 0 &&
                      properties.map((item, indx) => {
                        return (
                          <>
                            <div className="col-md-6">
                              {indx < 1 && <span>Type</span>}
                              <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                  handleNftData(
                                    "properties",
                                    e.target.value,
                                    "type",
                                    indx
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              {indx < 1 && <span>Name</span>}

                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) =>
                                    handleNftData(
                                      "properties",
                                      e.target.value,
                                      "name",
                                      indx
                                    )
                                  }
                                />
                                <i
                                  className="fas fa-times"
                                  onClick={() =>
                                    handleRemoveCustomProperties(indx)
                                  }
                                />
                              </div>
                            </div>
                          </>
                        );
                      })}
                    <a onClick={handleCustomProperties}>Add More</a>
                  </div>
                  {propertiesError && (
                    <p style={{ color: "red" }}>{propertiesError}</p>
                  )}
                </div>
                <div className="form-group" style={{ zIndex: "15" }}>
                  <label>
                    Typology <span className="text-danger">*</span>
                  </label>
                  <div>
                    <Select
                      isMulti={true}
                      options={typologyOptions}
                      onChange={(e) => handleNftData("typology", e)}
                      value={typology}
                      showNewOptionAtTop={true}
                      styles={customStyles}
                      isSearchable={false}
                    />
                  </div>
                  {typologyError && (
                    <p style={{ color: "red" }}>{typologyError}</p>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    Information Type <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex information-wrap">
                    <span
                      style={{ cursor: "pointer" }}
                      className={informationType === "1" ? "blue-color" : ""}
                      onClick={() => handleNftData("infoType", "1")}
                    >
                      2D
                    </span>
                    <span
                      style={{ cursor: "pointer" }}
                      className={informationType === "2" ? "blue-color" : ""}
                      onClick={() => handleNftData("infoType", "2")}
                    >
                      3D
                    </span>
                  </div>
                  {informationTypeError && (
                    <p style={{ color: "red" }}>{informationTypeError}</p>
                  )}
                </div>
                <div className="form-group" style={{ zIndex: "6" }}>
                  <label>
                    Drawing Format <span className="text-danger">*</span>
                  </label>
                  <div className="creator-collection-box1 border-0 p-0">
                    <Select
                      isMulti={true}
                      options={optionsDrawingFormat}
                      onChange={(e) => handleNftData("drawing", e)}
                      value={drawing}
                      showNewOptionAtTop={true}
                      styles={customStyles}
                      isSearchable={false}
                    />
                  </div>
                  {drawingError && (
                    <p style={{ color: "red" }}>{drawingError}</p>
                  )}
                </div>
                <div className="form-group" style={{ zIndex: "5" }}>
                  <label>
                    Blockchain <span className="text-danger">*</span>
                  </label>
                  <div className="slect-option-wrap">
                    <Select
                      defaultValue={blockChain}
                      onChange={(e) => handleNftData("blockChain", e)}
                      options={optionsForEtherium}
                      styles={customStyles}
                      isSearchable={false}
                    />
                  </div>
                  {blockChainError && (
                    <p style={{ color: "red" }}>{blockChainError}</p>
                  )}
                </div>
                <div className>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="defaultUnchecked"
                      onClick={(e) => handleNftData("agree", e.target.checked)}
                      checked={isAgreed}
                    />
                    <label
                      className="custom-control-label text-gray h6"
                      htmlFor="defaultUnchecked"
                    >
                      Agree to{" "}
                      <Link to="/terms" target="_blank">
                        Terms &amp; Conditions{" "}
                        <span className="text-danger">*</span>
                      </Link>
                    </label>
                  </div>
                  {isAgreedError && (
                    <p style={{ color: "red" }}>{isAgreedError}</p>
                  )}
                  <a
                    className="btn mt-4 btn-block btn-primary btn-lg font-weight-medium auth-form-btn pre-loader-btn"
                    onClick={isProgress ? " " : handleSubmit}
                  >
                    {isProgress ? (
                      <Loader
                        color="white"
                        width={18}
                        height={18}
                        bgColor="#e2e2e2"
                      />
                    ) : (
                      "Submit"
                    )}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Modal show={show} onClose={() => _handleCloseAddNftSuccess()}>
        <AddNftModal id={nftResponse?._id} />
      </Modal>
      <HomePageFooter />
    </>
  );
};

export default AddNft;
