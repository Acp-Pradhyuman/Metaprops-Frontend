import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

import { useSelector } from "react-redux";
import { handleApiCall } from "../../../api";
import { endpoints } from "../../../utils/endpoints";
import { useNavigate } from "react-router-dom";

//Static
const YOUTUBE_IMAGE = require("../../../assets/img/modal/youtube.png");
const INSTA_IMAGE = require("../../../assets/img/modal/instagram.png");
const FACEBOOK_IMAGE = require("../../../assets/img/modal/facebook.png");
const TWITTER_IMAGE = require("../../../assets/img/modal/twiter.png");
const LINKDN_IMAGE = require("../../../assets/img/modal/linkdin.png");
const TELEGRAM_IMAGE = require("../../../assets/img/modal/telegram.png");
const HOME_IMAGE = require("../../../assets/img/home/33.png");
const FILE_IMAGE = require("../../../assets/img/home/file-type-img1.png");
const DISCORD_IMAGE = require("../../../assets/img/discord.png");
const MEDIUM_IMAGE = require("../../../assets/img/medium.png");
const options = [
  { value: "1-5", label: "1-5" },
  { value: "5-20", label: "5-20" },
  { value: "20-50", label: "20-50" },
  { value: "50-100", label: "50-100" },

  // { value: "100", label: "10+" },
];

function EditCreatorPage({ role }) {
  const navigate = useNavigate();
  const roleData = useSelector((state) => state.registerUser.roleData);
  const isEdit = useSelector((state) => state.creatorEditInformation.isEdit);
  const creatorData = useSelector((state) => {
    return state.creatorInformation.creartorInformation[0];
  });

  const [activityField, setActivityField] = useState(false);
  const [activityFieldValue, setActivityFieldValue] = useState(
    creatorData
      ? creatorData?.user_data?.creator_activity.length > 0
        ? creatorData?.user_data?.creator_activity[0].split(",")
        : []
      : []
  );
  const [linksField, setLinksField] = useState(false);
  const [linksFieldValue, setLinksFieldValue] = useState(
    creatorData ? creatorData?.user_data?.external_link : []
  );
  const [name, setName] = useState(
    creatorData ? creatorData?.user_data?.name : ""
  );
  const [email, setEmail] = useState(
    creatorData ? creatorData?.user_data?.email : ""
  );
  const [description, setDescription] = useState(
    creatorData ? creatorData?.user_data?.creator_desc : ""
  );
  const [website, setWebsite] = useState(
    creatorData ? creatorData?.user_data?.creator_web : ""
  );
  const [employees, setEmployees] = useState(
    creatorData
      ? {
          label: creatorData?.user_data?.creator_employees,
          value: creatorData?.user_data?.creator_employees,
        }
      : {
          label: "500-1000",
          value: "500-1000",
        }
  );
  const [country, setCountry] = useState(
    creatorData
      ? {
          label: creatorData?.user_data?.creator_country,
          value: creatorData?.user_data?.creator_country,
        }
      : {
          label: "New Delhi, India",
          value: "New Delhi, India",
        }
  );
  const [number, setNumber] = useState(
    creatorData ? `${creatorData?.user_data?.phone_no}` : "+"
  );
  const [activity, setActivity] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(
    creatorData ? creatorData?.user_data?.profile_image : ""
  );
  const [bannerImage, setBannerImage] = useState("");
  const [bannerImagePreview, setBannerImagePreview] = useState(
    creatorData ? creatorData?.user_data?.banner_image : ""
  );
  const [primaryAddress, setPrimaryAddress] = useState("");
  const [primaryAddressName, setPrimaryAddressName] = useState(
    creatorData ? creatorData?.user_data?.primary_address : ""
  );
  const [companyStamp, setCompanyStamp] = useState("");
  const [companyStampName, setCompanyStampName] = useState(
    creatorData ? creatorData?.user_data?.company_stamp : ""
  );
  const [tradeLicense, setTradeLicense] = useState("");
  const [tradeLicenseName, setTradeLicenseName] = useState(
    creatorData ? creatorData?.user_data?.trade_licence : ""
  );
  const [document_1, setDocument_1] = useState("");
  const [document_1_Name, setDocument_1_Name] = useState(
    creatorData ? creatorData?.user_data?.document_1 : ""
  );
  const [document_2, setDocument_2] = useState("");
  const [document_2_Name, setDocument_2_Name] = useState(
    creatorData ? creatorData?.user_data?.document_2 : ""
  );
  const [document_3, setDocument_3] = useState("");
  const [document_3_Name, setDocument_3_Name] = useState(
    creatorData ? creatorData?.user_data?.document_3 : ""
  );
  const [CV, setCV] = useState("");
  const [CV_Name, setCV_Name] = useState(
    creatorData ? creatorData?.user_data?.creator_cv : ""
  );
  const [companySignatory, setCompanySignatory] = useState("");
  const [companySignatory_Name, setCompanySignatory_Name] = useState(
    creatorData ? creatorData?.user_data?.company_sign : ""
  );
  const [terms, setTerms] = useState(isEdit ? true : false);
  const [termsError, setTermsError] = useState(false);

  //---------------------------------------------
  const [youtube, setYoutube] = useState(
    creatorData ? creatorData?.user_data?.youtube : ""
  );
  const [insta, setInsta] = useState(
    creatorData ? creatorData?.user_data?.instagram : ""
  );
  const [facebook, setFacebook] = useState(
    creatorData ? creatorData?.user_data?.facebook : ""
  );
  const [twitter, setTwitter] = useState(
    creatorData ? creatorData?.user_data?.twitter : ""
  );
  const [linkdin, setLinkdin] = useState(
    creatorData ? creatorData?.user_data?.linkdin : ""
  );
  const [telegram, setTelegram] = useState(
    creatorData ? creatorData?.user_data?.telegram : ""
  );
  const [discord, setDiscord] = useState(
    creatorData ? creatorData?.user_data?.discord : ""
  );
  const [medium, setMedium] = useState(
    creatorData ? creatorData?.user_data?.medium : ""
  );
  const countries = useMemo(() => countryList().getData(), []);

  //Static Data
  const linkOptions = [
    { image: YOUTUBE_IMAGE, value: "youtube", state: youtube },
    { image: INSTA_IMAGE, value: "instagram", state: insta },
    { image: FACEBOOK_IMAGE, value: "facebook", state: facebook },
    { image: TWITTER_IMAGE, value: "twitter", state: twitter },
    { image: LINKDN_IMAGE, value: "linkdin", state: linkdin },
    { image: TELEGRAM_IMAGE, value: "telegram", state: telegram },
    { image: DISCORD_IMAGE, value: "discord", state: discord },
    { image: MEDIUM_IMAGE, value: "medium", state: medium },
  ];
  //Functions

  const handleToggleActivites = () => {
    if (activity) {
      setActivityFieldValue((prev) => {
        return [...prev, activity];
      });
    } else {
      setActivity("");
    }

    setActivity("");
    setActivityField(!activityField);
  };

  const handleToggleLinks = () => {
    setLinksFieldValue((prev) => {
      return [...prev, link];
    });
    setTimeout(() => {
      setLinksField(!linksField);
    }, 1000);
  };
  const handleRemove = (value) => {
    setActivityFieldValue(activityFieldValue.filter((item) => item !== value));
  };

  const handleFormData = (field, value) => {
    clearState();
    if (field === "name") {
      setName(value);
    } else if (field === "youtube") {
      setYoutube(value);
    } else if (field === "instagram") {
      setInsta(value);
    } else if (field === "facebook") {
      setFacebook(value);
    } else if (field === "twitter") {
      setTwitter(value);
    } else if (field === "linkdin") {
      setLinkdin(value);
    } else if (field === "telegram") {
      setTelegram(value);
    } else if (field === "discord") {
      setDiscord(value);
    } else if (field === "medium") {
      setMedium(value);
    } else if (field === "email") {
      setEmail(value);
    } else if (field === "description") {
      setDescription(value);
    } else if (field === "website") {
      setWebsite(value);
    } else if (field === "employees") {
      setEmployees(value);
    } else if (field === "country") {
      setCountry(value);
    } else if (field === "number") {
      setNumber(`${value}`);
    } else if (field === "activity") {
      setActivity(value);
    } else if (field === "link") {
      setLink(value);
    } else if (field === "image") {
      let reader = new FileReader();
      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(value);
      setImage(value);
    } else if (field === "banner") {
      let reader = new FileReader();
      reader.onload = function (e) {
        setBannerImagePreview(e.target.result);
      };
      reader.readAsDataURL(value);
      setBannerImage(value);
    } else if (field === "primary_address") {
      setPrimaryAddressName(value);
    } else if (field === "company_stamp") {
      setCompanyStampName(value?.name);
      setCompanyStamp(value);
    } else if (field === "trade") {
      setTradeLicenseName(value?.name);
      setTradeLicense(value);
    } else if (field === "document_1") {
      setDocument_1_Name(value?.name);
      setDocument_1(value);
    } else if (field === "document_2") {
      setDocument_2_Name(value?.name);
      setDocument_2(value);
    } else if (field === "document_3") {
      setDocument_3_Name(value?.name);
      setDocument_3(value);
    } else if (field === "creator_cv") {
      setCV_Name(value?.name);
      setCV(value);
    } else if (field === "company_sign") {
      setCompanySignatory_Name(value?.name);
      setCompanySignatory(value);
    }
  };

  const handleSubmit = async () => {
    let form = new FormData();
    if (name) {
      form.append("name", name);
    }
    form.append("youtube", youtube);
    form.append("instagram", insta);
    form.append("facebook", facebook);
    form.append("twitter", twitter);
    form.append("linkdin", linkdin);
    form.append("telegram", telegram);
    form.append("discord", discord);
    form.append("medium", medium);
    if (email) {
      form.append("email", email);
    }
    if (description) {
      form.append("creator_desc", description);
    } else {
      form.append("creator_desc", "");
    }
    if (number) {
      form.append("phone_no", number);
    } else {
      form.append("phone_no", "");
    }
    if (website) {
      form.append("creator_web", website);
    } else {
      form.append("creator_web", "");
    }
    if (primaryAddressName) {
      form.append("primary_address", primaryAddressName);
    }
    if (country) {
      form.append("creator_country", country?.label);
    }
    if (employees) {
      form.append("creator_employees", employees?.value);
    }
    // if (linksFieldValue.length) {
    // 	form.append('external_link', linksFieldValue);
    // }
    if (image) {
      form.append("profile_image", image);
    }
    if (activityFieldValue) {
      form.append("creator_activity", activityFieldValue);
    }
    if (bannerImage) {
      form.append("banner_image", bannerImage);
    }

    if (document_1) {
      form.append("document_1", document_1);
    }
    if (document_2) {
      form.append("document_2", document_2);
    }
    if (document_3) {
      form.append("document_3", document_3);
    }
    if (companyStamp) {
      form.append("company_stamp", companyStamp);
    }
    if (tradeLicense) {
      form.append("trade_licence", tradeLicense);
    }
    if (CV) {
      form.append("creator_cv", CV);
    }
    if (companySignatory) {
      form.append("company_sign", companySignatory);
    }
    const response = await handleApiCall(
      "put",
      `${endpoints.updateCreator}`,
      form
    );
    if (response?.data?.success) {
      navigate("/creator-profile");
    }
  };
  const clearState = async () => {
    setTermsError("");
  };

  return (
    <div>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-md-12 p-0 mobile-pd-style">
              <div class="top-heading-are text-center">
                <h2>{"Edit Creator"}</h2>
                <p>
                  Complete the creator registration form and provide as much
                  information as possible in order to accelerate the creator
                  verification process. Once submitted, the MetaProps team shall
                  review, approve or reject the application.
                </p>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-lg-5 col-md-5">
              <form class="profile-wrap-form">
                <div class="form-group">
                  <label>Creator Name</label>
                  <input
                    type="text"
                    class="form-control"
                    // placeholder="OmtoArchitects"
                    value={name}
                    onChange={(e) => handleFormData("name", e.target.value)}
                    maxLength={30}
                  />
                </div>
                <div class="form-group">
                  <label>Creator Primary Email</label>
                  <input
                    type="email"
                    class="form-control"
                    // placeholder="contact@omtoarchitects.com"
                    value={email}
                    onChange={(e) => handleFormData("email", e.target.value)}
                    maxLength={30}
                  />
                </div>
                <div class="form-group" style={{ height: "239px" }}>
                  <label>Creator Description</label>

                  <textarea
                    value={description}
                    onChange={(e) =>
                      handleFormData("description", e.target.value)
                    }
                    maxLength={500}
                  ></textarea>
                </div>
                <div class="form-group">
                  <label>Website</label>
                  <input
                    type="text"
                    // maxLength={40}
                    class="form-control"
                    // placeholder="www.omtoarchitects.com"
                    value={website}
                    onChange={(e) => handleFormData("website", e.target.value)}
                  />
                </div>
                <div class="form-group secound-select-options">
                  <label>Number of Employees</label>
                  <div class="slect-option-wrap">
                    <Select
                      defaultValue={employees}
                      onChange={(e) => handleFormData("employees", e)}
                      options={options}
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
                        }),
                        dropdownIndicator: () => ({
                          color: "black",
                          paddingRight: ".5em",
                        }),
                      }}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label>Country of Establishment</label>
                  <div class="slect-option-wrap">
                    <Select
                      options={countries}
                      value={country}
                      onChange={(e) => handleFormData("country", e)}
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
                        }),
                        dropdownIndicator: () => ({
                          color: "black",
                          paddingRight: ".5em",
                        }),
                      }}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    class="form-control"
                    // placeholder="+971 8849 9744"
                    value={number}
                    onChange={(e) => handleFormData("number", e.target.value)}
                    maxLength={16}
                  />
                </div>
                <div class="form-group creators-activiti-wrap">
                  {/* <label>Creator Activities</label> */}
                  {/* <div class="row">
                    <div class="col-md-12">
                      <span>Activity</span>
                      {activityFieldValue &&
                        activityFieldValue.length > 0 &&
                        activityFieldValue.map((item, indx) => {
                          return (
                            <div class="form-group" key={indx}>
                              <div className="Input_As_Div">{item}</div>
                              <i
                                class="fas fa-times"
                                onClick={() => handleRemove(item)}
                              ></i>
                            </div>
                          );
                        })}
                    </div>
                    {activityField && (
                      <div className="col-md-12">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Play"
                          style={{
                            width: "26.5rem",
                          }}
                          value={activity}
                          onChange={(e) =>
                            handleFormData("activity", e.target.value)
                          }
                        />
                      </div>
                    )}
                    <a
                      href="javascript:void(0);"
                      onClick={handleToggleActivites}
                    >
                      Add More
                    </a>
                  </div> */}
                </div>
                <div class="form-group">
                  <label>Links</label>
                  <ul class="register-social-link">
                    {linkOptions.map((item, indx) => {
                      return (
                        <li>
                          <div class="d-flex align-items-center">
                            <img src={item.image} />
                            <span>
                              <input
                                type="text"
                                class="form-control"
                                // placeholder="www.omtoarchitects.com"
                                style={{ height: "2.5rem", width: "26.5rem" }}
                                value={item.state}
                                onChange={(e) =>
                                  handleFormData(item.value, e.target.value)
                                }
                              />
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </form>
            </div>
            <div class="col-lg-7 col-md-7 edit-user-update">
              <form class="profile-wrap-form profile-wrap-form1">
                <div class="form-group">
                  <label>Creator Image</label>
                  <div class="property-details-wrap property-details-img-wrap">
                    {imagePreview ? (
                      <img src={imagePreview} />
                    ) : (
                      <img src={FILE_IMAGE} />
                    )}
                    <div class="edit">
                      <i class="fas fa-pencil-alt"></i>
                      <input
                        type="file"
                        name="profile_pic"
                        accept="image/jpeg, image/bmp, image/png,image/svg"
                        onChange={(e) =>
                          handleFormData("image", e.target.files[0])
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group mt-4">
                  <label>Creator Banner</label>
                  <div class="display-picture-wrap display-picture-wrap1">
                    {bannerImagePreview ? (
                      <img src={bannerImagePreview} />
                    ) : (
                      <div class="img-wrap"></div>
                    )}
                    <div class="edit">
                      <i class="fas fa-pencil-alt"></i>
                      <input
                        type="file"
                        name="profile_pic"
                        accept="image/jpeg, image/bmp, image/png,image/svg"
                        onChange={(e) =>
                          handleFormData("banner", e.target.files[0])
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label>Creator Primary Address</label>
                  <input
                    type="text"
                    class="form-control"
                    maxLength={100}
                    // placeholder="123, abc"
                    value={primaryAddressName}
                    style={{ opacity: "1", position: "relative" }}
                    onChange={(e) =>
                      handleFormData("primary_address", e.target.value)
                    }
                  />
                </div>
                <div class="form-group">
                  <label>Company Stamp</label>
                  <div class="input-area">
                    <span style={{ padding: "0 1rem" }}>
                      {companyStampName.split("/").pop().length < 30
                        ? companyStampName.split("/").pop()
                        : `${companyStampName
                            .split("/")
                            .pop()
                            .substring(0, 54)}...`}
                    </span>
                    <input
                      type="file"
                      class="form-control"
                      // placeholder="Unit 1101, Tower B, Business Bay Dubai , UAE"
                      onChange={(e) =>
                        handleFormData("company_stamp", e.target.files[0])
                      }
                      // disabled
                    />
                    <a class="btn btn-primary">Upload</a>
                  </div>
                  <span
                    style={{ position: "absolute", left: "78%", top: "55%" }}
                  >
                    {companyStampName && (
                      <i
                        class="fa-regular fa-x"
                        style={{ cursor: "pointer" }}
                        onClick={() => setCompanyStampName("")}
                      ></i>
                    )}
                  </span>
                </div>
                <div class="form-group">
                  <label>Trade Licence</label>
                  <div class="input-area">
                    <span style={{ padding: "0 1rem" }}>
                      {/* {tradeLicenseName.split("/").pop()} */}
                      {tradeLicenseName.split("/").pop().length < 30
                        ? tradeLicenseName.split("/").pop()
                        : `${tradeLicenseName
                            .split("/")
                            .pop()
                            .substring(0, 54)}...`}
                    </span>
                    <input
                      type="file"
                      class="form-control"
                      // placeholder="Unit 1101, Tower B, Business Bay Dubai , UAE"
                      onChange={(e) =>
                        handleFormData("trade", e.target.files[0])
                      }
                      // disabled
                    />
                    <a class="btn btn-primary">Upload</a>
                  </div>
                  <span
                    style={{ position: "absolute", left: "78%", top: "55%" }}
                  >
                    {tradeLicenseName && (
                      <i
                        class="fa-regular fa-x"
                        style={{ cursor: "pointer" }}
                        onClick={() => setTradeLicenseName("")}
                      ></i>
                    )}
                  </span>
                </div>
                <div class="form-group">
                  <label>Optional Supporting Document 1</label>
                  <div class="input-area">
                    <span style={{ padding: "0 1rem" }}>
                      {document_1_Name.split("/").pop().length < 30
                        ? document_1_Name.split("/").pop()
                        : `${document_1_Name
                            .split("/")
                            .pop()
                            .substring(0, 54)}...`}
                    </span>
                    <input
                      type="file"
                      class="form-control"
                      // placeholder="Unit 1101, Tower B, Business Bay Dubai , UAE"
                      onChange={(e) =>
                        handleFormData("document_1", e.target.files[0])
                      }
                      // disabled
                    />
                    <a href="javascript:void(0);" class="btn btn-primary">
                      Upload
                    </a>
                  </div>
                  <span
                    style={{ position: "absolute", left: "78%", top: "55%" }}
                  >
                    {document_1_Name && (
                      <i
                        class="fa-regular fa-x"
                        style={{ cursor: "pointer" }}
                        onClick={() => setDocument_1_Name("")}
                      ></i>
                    )}
                  </span>
                </div>
                <div class="form-group">
                  <label>Optional Supporting Document 2 </label>
                  <div class="input-area">
                    <span style={{ padding: "0 1rem" }}>
                      {document_2_Name.split("/").pop().length < 30
                        ? document_2_Name.split("/").pop()
                        : `${document_2_Name
                            .split("/")
                            .pop()
                            .substring(0, 54)}...`}
                    </span>

                    <input
                      type="file"
                      class="form-control"
                      // placeholder="Unit 1101, Tower B, Business Bay Dubai , UAE"
                      onChange={(e) =>
                        handleFormData("document_2", e.target.files[0])
                      }
                      // disabled
                    />
                    <a class="btn btn-primary">Upload</a>
                  </div>
                  <span
                    style={{ position: "absolute", left: "78%", top: "55%" }}
                  >
                    {document_2_Name && (
                      <i
                        class="fa-regular fa-x"
                        style={{ cursor: "pointer" }}
                        onClick={() => setDocument_2_Name("")}
                      ></i>
                    )}
                  </span>
                </div>
                <div class="form-group">
                  <label>Optional Supporting Document 3</label>
                  <div class="input-area">
                    <span style={{ padding: "0 1rem" }}>
                      {document_3_Name.split("/").pop().length < 30
                        ? document_3_Name.split("/").pop()
                        : `${document_3_Name
                            .split("/")
                            .pop()
                            .substring(0, 54)}...`}
                    </span>

                    <input
                      type="file"
                      class="form-control"
                      // placeholder="Unit 1101, Tower B, Business Bay Dubai , UAE"
                      onChange={(e) =>
                        handleFormData("document_3", e.target.files[0])
                      }
                      // disabled
                    />
                    <a class="btn btn-primary">Upload</a>
                  </div>
                  <span
                    style={{ position: "absolute", left: "78%", top: "55%" }}
                  >
                    {document_3_Name && (
                      <i
                        class="fa-regular fa-x"
                        style={{ cursor: "pointer" }}
                        onClick={() => setDocument_3_Name("")}
                      ></i>
                    )}
                  </span>
                </div>
                <div class="form-group">
                  <label>CV of Creator Principal</label>
                  <div class="input-area">
                    <span style={{ padding: "0 1rem" }}>
                      {CV_Name.split("/").pop().length < 30
                        ? CV_Name.split("/").pop()
                        : `${CV_Name.split("/").pop().substring(0, 54)}...`}
                    </span>

                    <input
                      type="file"
                      class="form-control"
                      // placeholder="Unit 1101, Tower B, Business Bay Dubai , UAE"
                      onChange={(e) =>
                        handleFormData("creator_cv", e.target.files[0])
                      }
                      // disabled
                    />
                    <a class="btn btn-primary">Upload</a>
                  </div>
                  <span
                    style={{ position: "absolute", left: "78%", top: "55%" }}
                  >
                    {CV_Name && (
                      <i
                        class="fa-regular fa-x"
                        style={{ cursor: "pointer" }}
                        onClick={() => setCV_Name("")}
                      ></i>
                    )}
                  </span>
                </div>
                <div class="form-group">
                  <label>Approved Company Signatory</label>
                  <div class="input-area">
                    <span style={{ padding: "0 1rem" }}>
                      {companySignatory_Name?.split("/")?.pop().length < 30
                        ? companySignatory_Name?.split("/")?.pop()
                        : `${companySignatory_Name
                            ?.split("/")
                            ?.pop()
                            ?.substring(0, 54)}...`}
                    </span>

                    <input
                      type="file"
                      class="form-control"
                      // placeholder="Unit 1101, Tower B, Business Bay Dubai , UAE"
                      onChange={(e) =>
                        handleFormData("company_sign", e.target.files[0])
                      }
                      // disabled
                    />
                    <a class="btn btn-primary">Upload</a>
                  </div>
                  <span
                    style={{ position: "absolute", left: "78%", top: "55%" }}
                  >
                    {companySignatory_Name && (
                      <i
                        class="fa-regular fa-x"
                        style={{ cursor: "pointer" }}
                        onClick={() => setCompanySignatory_Name("")}
                      ></i>
                    )}
                  </span>
                </div>
                <div>
                  <a
                    class="btn mt-4 btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={handleSubmit}
                  >
                    Submit
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditCreatorPage;
