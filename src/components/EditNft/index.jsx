import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDispatch } from "react-redux";

//Components
import Header from "../../components/Header";
import HomePageFooter from "../../components/Home/HomePageFooter";
import Modal from "../../components/commons/Modal/Modal.jsx";
import AddNftModal from "../../components/AddNftModal";
import { PopUp } from "../../utils/utility";
import { handleApiCall } from "../../api";
import { endpoints } from "../../utils/endpoints";
import Loader from "../commons/Loader";

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
    // height: 45,
    minHeight: 45,
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

const EditNft = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState();
  const [showDel, setShowDel] = useState(false);

  const [nftResponse, setNftResponse] = useState();

  const [informationType, setInformationType] = useState("1");
  const [licenseType, setLicenseType] = useState("");
  const [constructionStatus, setConstructionStatus] = useState("");
  const [creatorCollection, setCreatorCollection] = useState([]);
  const [creatorCollectionList, setCreatorCollectionList] = useState([]);
  const [creatorCollectionSelect, setCreatorCollectionSelect] = useState([]);
  const [blockChain, setBlockChain] = useState("");
  const [fileUpload, setFileUpload] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [blockchainImagePreview, setBlockchainImagePreview] = useState([]);

  const [blockchainImage, setBlockchainImage] = useState([]);

  const [blockchainZip, setBlockchainZip] = useState([]);

  const [nftName, setNftName] = useState("");

  const [externalLinks, setExternalLinks] = useState("");

  const [description, setDiscription] = useState("");

  const [properties, setProperties] = useState([]);

  const [typology, setTypology] = useState([]);
  const [typologyOptions, setTypologyOptions] = useState([]);

  const [drawing, setDrawing] = useState([]);
  const [customDrawing, setCustomDrawing] = useState([]);

  const [nftData, setNftData] = useState({});

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
    { value: "Eth", label: "ETH on polygon" },
    // { value: "Matic", label: "Matic" },
  ];
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  const allowedZipExtensions = /(\.rar|\.zip)$/i;
  useEffect(() => {
    getTopologyList();
    getCollectionList();
    getNftDetail();
  }, []);
  useEffect(() => {
    const {
      nft_name,
      description,
      external_link,
      licence_type,
      construction_status,
      tags,
      custom_properties,
      typology,
      information_type,
      drawing_format,
      blockchain,
      nft_media,
      preview_image,
    } = nftData;
    setNftName(nft_name);
    setPreviewImages(nft_media);
    setBlockchainImagePreview([preview_image]);
    setDiscription(description);
    setExternalLinks(external_link);
    setLicenseType({ label: licence_type, value: licence_type });
    setConstructionStatus({
      label: construction_status,
      value: construction_status,
    });
    let result =
      tags &&
      tags.length &&
      tags.filter((item) => {
        if (item) return item;
      });
    let newTAgs = [];
    result &&
      result.length &&
      result.map((item) => {
        if (item) newTAgs.push({ label: item, value: item });
      });
    setCreatorCollectionSelect(newTAgs);

    let customProp = [];
    // custom_properties &&
    //   custom_properties.length &&
    //   custom_properties.map((item) => {
    //     customProp.push(JSON.parse(item));
    //   });
    setProperties(custom_properties);

    setTypology(
      typology &&
        typology.length &&
        typology.map((item) => {
          return { value: item._id, label: item.name };
        })
    );
    setInformationType(information_type === "3D" ? "2" : "1");
    setDrawing(
      drawing_format &&
        drawing_format.length &&
        drawing_format.map((item) => {
          return { value: item, label: item };
        })
    );
    setBlockChain({ label: blockchain, value: blockchain });
  }, [nftData]);

  useEffect(() => {
    setProperties(nftData?.customProperties);
  }, [nftData]);

  console.log(nftData?.customProperties, "NFTTTT");
  console.log(properties, "pppppppppppppppppppppppppp");

  const getNftDetail = async () => {
    const response = await handleApiCall(
      "get",
      `${endpoints.getNFTDetails}${id}`
    );
    if (response?.data?.success) {
      setNftData(response?.data?.data[0]);
    } else {
      navigate("/");
    }
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
        if (item.name) {
          finalData.push({
            label: item.name,
            value: item._id,
          });
        }
      });
      setCreatorCollectionList(finalData);
    } else {
      PopUp("Something Went Wrong", response?.data?.message, "error");
    }
  };

  const handleNftData = (field, value, key, index) => {
    if (field === "fileUpload") {
      setFileUpload([]);
      setPreviewImages([]);

      setFileUpload((prev) => {
        return [...prev, ...value];
      });
      if (value) {
        const arr = Array.from(value);
        let image = arr.filter(
          (file) => !allowedExtensions.exec(file.name.toLowerCase())
        );

        arr.map((item) => {
          let reader = new FileReader();

          reader.onloadend = () => {
            setPreviewImages((prev) => [...prev, reader.result]);
          };

          reader.readAsDataURL(item);
        });
      }
    } else if (field === "nft-name") {
      setNftName(value);
    } else if (field === "external-links") {
      setExternalLinks(value);
    } else if (field === "description") {
      setDiscription(value);
    } else if (field === "creatorCollectionSelect") {
      setCreatorCollectionSelect(value);
    }
    // else if (field === 'completionStatus') {
    // 	setCompletedStatus(value);
    // }
    else if (field === "licenceType") {
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

      setProperties(properties.filter((item) => item));
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
    } else if (field === "blockchainZip") {
      // setBlockchainZip([]);
      setBlockchainZip(value);
    } else if (field === "infoType") {
      setInformationType(value);
    } else if (field === "collection") {
      setCreatorCollectionSelect(value);
    }
  };

  const handleCustomProperties = () => {
    if (properties.length > 9) {
      PopUp("You cannot add more than 10 custom properties", "", "error");
      return;
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
    form.append("id", nftData?._id);
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
      } else if (size.length) {
        PopUp(
          "Image Size Exceed",
          "File is too Big, please select a file less than 5MB",
          "error"
        );
      } else if (arr.length > 25) {
        PopUp(
          "Image Quantity Exceed",
          "Maximum 25 Image Allowed At Once",
          "error"
        );
      } else {
        arr.length &&
          arr.map((item) => {
            form.append("nft_media", item, item.name);
          });
      }
    }
    if (nftName) {
      form.append("nft_name", nftName);
    }
    if (description) {
      form.append("description", description);
    }
    if (externalLinks) {
      form.append("external_link", externalLinks);
    } else {
      form.append("external_link", "");
    }
    if (licenseType) {
      form.append("licence_type", licenseType.value);
    }
    if (constructionStatus) {
      form.append("construction_status", constructionStatus.value);
    }
    if (creatorCollection.length > 0 && creatorCollectionSelect.length === 0) {
      let finalData = [];
      creatorCollection.map((item) => {
        form.append("tags", item.value);
        finalData.push(item.value);
      });
      // if (finalData.length) form.append('tags', finalData);
    }
    if (creatorCollectionSelect.length > 0 || creatorCollection.length > 0) {
      let finalData = [];
      creatorCollectionSelect.map((item) => {
        form.append("tags", item.label);
        finalData.push(item.label);
      });

      // if (finalData.length > 0) form.append('tags', finalData);
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
      } else if (size.length) {
        PopUp(
          "Image Size Exceed",
          "File is too Big, please select a file less than 5MB",
          "error"
        );
      } else {
        arr.length &&
          arr.map((item) => {
            form.append("preview_image", item);
          });
      }
    }

    if (blockchainZip.length) {
      const arr = Array.from(blockchainZip);
      let image = arr.filter((file) => !allowedZipExtensions.exec(file.name));
      let size = arr.filter(
        (file) => Math.round(Math.round(file?.size / 1024) / 1024) >= 1024
      );
      if (image.length) {
        PopUp("Only ZIP Allowed", "Please select zip type only.", "error");
      } else if (size.length) {
        PopUp(
          "ZIP Size Exceeded",
          "File is too Big, please select a file less than 1GB",
          "error"
        );
      }
      arr.length &&
        arr.map((item) => {
          form.append("nft_zip_files", item);
        });
    }
    if (properties) {
      form.append("custom_properties", JSON.stringify(properties));

      // let prop = properties.map((item) => {
      //   if (item?.type) {
      //     form.append("custom_properties", JSON.stringify(item));
      //   }
      // });
    }
    if (typology.length) {
      const typo = [];
      typology.map((item) => {
        form.append("typology", item.value);

        typo.push(item.value);
      });
      setTypology(
        typologyOptions.length &&
          typologyOptions.filter((item) => typology.includes(item.value))
      );
    }
    if (drawing.length) {
      const draw = [];
      drawing.map((item) => {
        form.append("drawing_format", item.value);

        draw.push(item.value);
      });
    }
    if (blockChain) {
      form.append("blockchain", blockChain.value);
    }
    if (informationType) {
      form.append("information_type", informationType === "1" ? "2D" : "3D");
    }
    if (
      fileUpload.length ||
      blockchainImage.length ||
      blockchainZip.length ||
      nftName ||
      description ||
      externalLinks ||
      licenseType ||
      constructionStatus ||
      creatorCollection ||
      properties.length ||
      typology ||
      informationType ||
      drawing ||
      blockChain
    ) {
      try {
        const response = await handleApiCall(
          "put",
          `${endpoints.editNft}`,
          form
        );
        if (response?.data?.success) {
          PopUp("Updated", response?.data?.message, "success");
          navigate(`/view-nft/${id}`);
        } else {
          PopUp("Something Went Wrong", response?.data?.message, "error");
        }
      } catch (e) {
        PopUp("Something Went Wrong", "Internal Server Error", "error");
      }
    }
  };

  const handleImg = (e, index) => {
    const newList = previewImages.filter((data, i) => i !== index);
    setPreviewImages(newList);
  };

  const handleDeleteNftCreator = async () => {
    const response = await handleApiCall(
      "post",
      `${endpoints.removeCreatorNft}`,
      {
        id,
        key: 1,
      }
    );
    if (response?.data?.success) {
      PopUp("NFT Deleted Successful", "", "success");
      navigate("/creator-profile");
    } else {
      PopUp("Something Went Wrong", response?.data?.message, "error");
    }
  };

  return (
    <>
      <Header />
      <section className="main-pannel-sec add-nft-wrapper">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12 p-0 mobile-pd-style">
              <div className="top-heading-are text-center">
                <h2>Edit NFT</h2>
                <p>
                  Please follow the Instructions provided below for uploading
                  Conter required for listing your NFT on the platform. Once
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
                    <div className="upload-file flex-fill">
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
                          {previewImages && previewImages.length > 0 ? (
                            <div
                              className="block-img-pre"
                              style={{
                                height: "350px",
                                width: "100%",
                                zIndex: "-1",
                              }}
                            >
                              {previewImages &&
                                previewImages.length > 0 &&
                                previewImages
                                  .slice(previewImages.length - 1)
                                  .map((item) => {
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
                  {previewImages && previewImages.length > 0 && (
                    <div className="img-box-wrapper">
                      {previewImages &&
                        previewImages.length > 0 &&
                        previewImages
                          .slice(0, -1)
                          .reverse()
                          .map((item, index) => {
                            return (
                              <>
                                <img src={item} alt="images" />
                                <i
                                  class="fa-regular fa-x"
                                  style={{
                                    cursor: "pointer",
                                    marginleft: "-5%",
                                  }}
                                  onClick={(e) => handleImg(e, index + 1)}
                                  id={index}
                                ></i>
                              </>
                            );
                          })}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    NFT Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Raha Villas"
                    value={nftName}
                    onChange={(e) => handleNftData("nft-name", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>
                    NFT Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) =>
                      handleNftData("description", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>External Link</label>
                  <input
                    type="text"
                    className="form-control"
                    // placeholder="https://yoursite.io/item"
                    value={externalLinks}
                    maxLength={75}
                    onChange={(e) =>
                      handleNftData("external-links", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>
                    Licence Type <span className="text-danger">*</span>
                  </label>
                  <div className="slect-option-wrap">
                    <Select
                      defaultValue={licenseType}
                      value={licenseType}
                      onChange={(e) => handleNftData("licenceType", e)}
                      options={optionsLicenseType}
                      styles={customStyles}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Construction Status <span className="text-danger">*</span>
                  </label>
                  <Select
                    defaultValue={constructionStatus}
                    value={constructionStatus}
                    onChange={(e) => handleNftData("constructionStatus", e)}
                    options={optionsConstructionStatus}
                    styles={customStyles}
                  />
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
                      styles={customStyles}
                      value={creatorCollectionSelect}
                    />
                  </div>
                  <div className="creator-collection-box pb-2">
                    <Select
                      isMulti={true}
                      options={creatorCollectionList}
                      styles={customStyles}
                      onChange={(e) =>
                        handleNftData("creatorCollectionSelect", e)
                      }
                      value={creatorCollectionSelect}
                    />
                  </div>
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
                        <div className="upload-file flex-fill">
                          <input
                            type="file"
                            accept="image/png,image/jpg,image/bmp,image/gif"
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
                            <div>
                              {blockchainZip.length > 0 ? (
                                <div>{blockchainZip[0]?.name}</div>
                              ) : (
                                <div>
                                  <span>
                                    {nftData?.zip_names?.zip_name || ""}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="upload-img-details mt-2">
                          <span>ZIP</span>
                          <span>Max Size: 1GB</span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <form className="profile-wrap-form">
                <div className="form-group creators-activiti-wrap">
                  <label>Custom Properties</label>
                  <div className="row">
                    {properties &&
                      properties.length > 0 &&
                      properties.map((item, indx) => {
                        return (
                          <>
                            <div className="col-md-6">
                              {indx < 1 && <span>Type</span>}

                              <input
                                type="text"
                                className="form-control"
                                placeholder="Type"
                                value={item.type}
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
                                  placeholder="Name"
                                  value={item.name}
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
                    <a
                      href="javascript:void(0);"
                      onClick={handleCustomProperties}
                    >
                      Add More
                    </a>
                  </div>
                </div>
                <div className="form-group" style={{ zIndex: "15" }}>
                  <label>
                    Typology <span className="text-danger">*</span>
                  </label>
                  <div className="creator-collection-box1">
                    <Select
                      isMulti={true}
                      options={typologyOptions}
                      styles={customStyles}
                      onChange={(e) => handleNftData("typology", e)}
                      value={typology}
                      showNewOptionAtTop={true}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Information Type <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex information-wrap">
                    <span
                      className={informationType === "1" ? "blue-color" : ""}
                      onClick={() => handleNftData("infoType", "1")}
                    >
                      2D
                    </span>
                    <span
                      className={informationType === "2" ? "blue-color" : ""}
                      onClick={() => handleNftData("infoType", "2")}
                    >
                      3D
                    </span>
                  </div>
                </div>
                <div className="form-group" style={{ zIndex: "6" }}>
                  <label>
                    Drawing Format <span className="text-danger">*</span>
                  </label>
                  <div className="creator-collection-box1">
                    <Select
                      isMulti={true}
                      options={optionsDrawingFormat}
                      onChange={(e) => handleNftData("drawing", e)}
                      value={drawing}
                      showNewOptionAtTop={true}
                      styles={customStyles}
                    />
                  </div>
                </div>
                <div className="form-group" style={{ zIndex: "5" }}>
                  <label>
                    Blockchain <span className="text-danger">*</span>
                  </label>
                  <Select
                    defaultValue={blockChain}
                    value={blockChain}
                    onChange={(e) => handleNftData("blockChain", e)}
                    options={optionsForEtherium}
                    styles={customStyles}
                  />
                </div>
                <div className="col-49 mt-4">
                  <a
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={handleSubmit}
                  >
                    Submit
                  </a>
                  <a
                    className="btn btn-block btn-trinary btn-lg font-weight-medium mt-0"
                    onClick={() => setShowDel(true)}
                  >
                    Delete
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Modal show={show} onClose={() => setShow(false)}>
        <AddNftModal id={nftResponse?._id} />
      </Modal>
      <Modal show={showDel} onClose={() => setShowDel(false)}>
        <div>
          <div className="" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="modal-inner-area text-center">
                  <h2>Delete your NFT?</h2>
                  <p>
                    Are you sure you want to delete your NFT from the platform?
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center" style={{ gap: "1em" }}>
                <a
                  className="btn btn-block buying_decline"
                  onClick={handleDeleteNftCreator}
                >
                  Yes
                </a>
                <a
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  onClick={() => setShowDel(false)}
                >
                  No
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <HomePageFooter />
    </>
  );
};

export default EditNft;
