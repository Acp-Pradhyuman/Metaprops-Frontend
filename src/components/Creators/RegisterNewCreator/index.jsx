import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { handleApiCall } from "../../../api";
import { endpoints } from "../../../utils/endpoints";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import countryList from "react-select-country-list";
import { PopUp } from "../../../utils/utility";
import CircularProgress from "@mui/material/CircularProgress";
import Loader from "../../commons/Loader";
import { set } from "react-hook-form";
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

function RegistorNewCreator({ role }) {
  const navigate = useNavigate();
  const roleData = useSelector((state) => state.registerUser.roleData);
  const isEdit = useSelector((state) => state.creatorEditInformation.isEdit);
  const creatorData = useSelector(
    (state) => state.creatorInformation.creatorInformation
  );

  const [activityField, setActivityField] = useState(false);
  const [activityFieldValue, setActivityFieldValue] = useState([]);
  const [linksField, setLinksField] = useState(false);
  const [linksFieldValue, setLinksFieldValue] = useState([]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [website, setWebsite] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [employees, setEmployees] = useState("");
  const [employeesError, setEmployeesError] = useState("");

  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [number, setNumber] = useState("+");
  const [numberError, setNumberError] = useState("");

  // const [activity, setActivity] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerImageError, setBannerImageError] = useState("");
  const [bannerImagePreview, setBannerImagePreview] = useState("");
  const [primaryAddress, setPrimaryAddress] = useState("");
  const [primaryAddressError, setPrimaryAddressError] = useState("");
  const [primaryAddressName, setPrimaryAddressName] = useState("");
  const [companyStamp, setCompanyStamp] = useState("");
  const [companyStampError, setCompanyStampError] = useState("");
  const [companyStampName, setCompanyStampName] = useState("");
  const [tradeLicense, setTradeLicense] = useState("");
  const [tradeLicenseError, setTradeLicenseError] = useState("");
  const [tradeLicenseName, setTradeLicenseName] = useState("");
  const [document_1, setDocument_1] = useState("");
  const [document_1_Error, setDocument_1_Error] = useState("");
  const [document_1_Name, setDocument_1_Name] = useState("");
  const [document_2, setDocument_2] = useState("");
  const [document_2_Error, setDocument_2_Error] = useState("");
  const [document_2_Name, setDocument_2_Name] = useState("");
  const [document_3, setDocument_3] = useState("");
  const [document_3_Error, setDocument_3_Error] = useState("");
  const [document_3_Name, setDocument_3_Name] = useState("");
  const [CV, setCV] = useState("");
  const [CVError, setCVError] = useState("");
  const [CV_Name, setCV_Name] = useState("");
  const [companySignatory, setCompanySignatory] = useState("");
  // const [companySignatoryError, setCompanySignatoryError] = useState("");
  const [companySignatory_Name, setCompanySignatory_Name] = useState("");
  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  //---------------------------------------------
  const [youtube, setYoutube] = useState("");
  const [insta, setInsta] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkdin, setLinkdin] = useState("");
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [medium, setMedium] = useState("");
  const [isNftCreated, setIsNftCreated] = useState(false);
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

  // const handleToggleActivites = () => {
  //   if (activity) {
  //     setActivityFieldValue((prev) => {
  //       return [...prev, activity];
  //     });
  //   } else {
  //     setActivity("");
  //   }
  //   setActivity("");
  //   setActivityField(!activityField);
  // };
  const handleRemove = (value) => {
    setActivityFieldValue(activityFieldValue.filter((item) => item !== value));
  };
  const handleToggleLinks = () => {
    setLinksFieldValue((prev) => {
      return [...prev, link];
    });
    setTimeout(() => {
      setLinksField(!linksField);
    }, 1000);
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
    } else if (field === "link") {
      setLink(value);
    } else if (field === "image") {
      let img;
      let _URL = window.URL || window.webkitURL;
      if (value) {
        img = new Image();
        img.onload = function () {
          // console.log(this.width, this.height);
          let reader = new FileReader();
          reader.onload = function (e) {
            setImagePreview(e.target.result);
          };
          reader.readAsDataURL(value);
          setImage(value);
        };
        img.onerror = function () {
          PopUp("Invalid File", "Not a file type", "error");
        };
        img.src = _URL.createObjectURL(value);
      }
    } else if (field === "banner") {
      let img;
      let _URL = window.URL || window.webkitURL;
      if (value) {
        img = new Image();
        img.onload = function () {
          // console.log('#####', this.height, this.width);

          let reader = new FileReader();
          reader.onload = function (e) {
            setBannerImagePreview(e.target.result);
          };
          reader.readAsDataURL(value);
          setBannerImage(value);
        };
        img.onerror = function () {
          PopUp("Invalid File", "Not a file type", "error");
        };
        img.src = _URL.createObjectURL(value);
      }
    } else if (field === "primary") {
      setPrimaryAddressName(value);
      setPrimaryAddress(value);
    } else if (field === "stamp") {
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
    } else if (field === "cv") {
      setCV_Name(value?.name);
      setCV(value);
    } else if (field === "sign") {
      setCompanySignatory_Name(value?.name);
      setCompanySignatory(value);
    } else if (field === "term") {
      setTerms(!terms);
    }
  };

  const handleSubmit = async () => {
    if (terms) {
      let roleId =
        roleData.length > 0 &&
        roleData.map((item) => {
          return item.name === role ? item._id : "";
        });
      let form = new FormData();
      if (name) {
        form.append("name", name);
      } else {
        setNameError("Name must not be empty");
        return;
      }
      // if (roleId) {
      // 	form.append('role_id', roleId);
      // }
      if (youtube) {
        form.append("youtube", youtube);
      }
      if (insta) {
        form.append("instagram", insta);
      }
      if (facebook) {
        form.append("facebook", facebook);
      }
      if (twitter) {
        form.append("twitter", twitter);
      }
      if (linkdin) {
        form.append("linkdin", linkdin);
      }
      if (telegram) {
        form.append("telegram", telegram);
      }
      if (discord) {
        form.append("discord", discord);
      }
      if (medium) {
        form.append("medium", medium);
      }

      if (email) {
        form.append("email", email);
      } else {
        setEmailError("Email must not be empty");
        return;
      }
      if (description) {
        form.append("creator_desc", description);
      } else {
        form.append("creator_desc", "");

        // setDescriptionError("Description must not be empty");
        // return;
      }
      if (number) {
        form.append("phone_no", number);
      } else {
        setNumberError("Number must not be empty");
        return;
      }
      if (website) {
        form.append("creator_web", website);
      } else {
        // setWebsiteError("Please Enter Website Detail");
        form.append("creator_web", "");
      }
      if (country) {
        form.append("creator_country", country?.label);
      } else {
        setCountryError("Please Select Country");
        return;
      }

      if (employees) {
        form.append("creator_employees", employees?.value);
      } else {
        form.append("creator_employees", "");
      }
      // if (linksFieldValue.length) {
      // 	form.append('external_link', linksFieldValue);
      // }
      if (image) {
        form.append("profile_image", image);
      } else {
        setImageError("Please Select Image");
        return;
      }
      if (activityFieldValue) {
        form.append("creator_activity", activityFieldValue);
      }
      if (bannerImage) {
        form.append("banner_image", bannerImage);
      } else {
        setBannerImageError("Please Select Banner");
        return;
      }
      if (primaryAddress) {
        form.append("primary_address", primaryAddress);
      } else {
        setPrimaryAddressError("Please Enter Primary Address");
        return;
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
      } else {
        form.append("company_stamp", "");
      }
      if (tradeLicense) {
        form.append("trade_licence", tradeLicense);
      } else {
        form.append("trade_licence", "");
      }
      if (CV) {
        form.append("creator_cv", CV);
      } else {
        form.append("creator_cv", "");
      }
      if (companySignatory) {
        form.append("company_sign", companySignatory);
      }
      // else {
      //   setCompanySignatoryError("Please Upload Company Signatory");
      // }
      setIsNftCreated(true);
      const response = await handleApiCall(
        "post",
        `${endpoints.registerCreator}`,
        form
      );
      setIsNftCreated(false);
      if (response?.data?.success) {
        navigate("/creator-profile");
      }
    } else {
      setTermsError("Please Accept Terms And Conditions");
      return;
    }
  };
  const clearState = async () => {
    setTermsError("");
    setNameError("");
    setEmailError("");
    setWebsiteError("");
    setEmployeesError("");
    setCountryError("");
    setNumberError("");
    setImageError("");
    setBannerImageError("");
    // setCompanySignatoryError("");
    setCompanyStampError("");
    setTradeLicenseError("");
    setCVError("");
    setDescriptionError("");
  };

  return (
    <div>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-md-12 p-0 mobile-pd-style">
              <div class="top-heading-are text-center">
                <h2>{"Register as a Creator"}</h2>
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
                  <label>
                    Creator Name
                    <span className="red">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    // placeholder="OmtoArchitects"
                    value={name}
                    onChange={(e) => handleFormData("name", e.target.value)}
                    maxLength={30}
                  />

                  {nameError && <p style={{ color: "red" }}>{nameError}</p>}
                </div>
                <div class="form-group">
                  <label>
                    Creator Primary Email
                    <span className="red">*</span>
                  </label>
                  <input
                    type="email"
                    class="form-control "
                    maxLength={20}
                    // placeholder="contact@omtoarchitects.com"
                    value={email}
                    onChange={(e) => handleFormData("email", e.target.value)}
                  />
                  {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                </div>
                <div class="form-group" style={{ height: "239px" }}>
                  <label>
                    Creator Description
                    {/* <span className="red">*</span> */}
                  </label>
                  <>
                    <textarea
                      value={description}
                      onChange={(e) =>
                        handleFormData("description", e.target.value)
                      }
                      maxLength={500}
                    >
                      {" "}
                    </textarea>
                  </>
                  {/* {descriptionError && (
                    <p style={{ color: "red" }}>{descriptionError}</p>
                  )} */}
                </div>
                <div class="form-group">
                  <label>
                    Website
                    {/* <span className="red">*</span> */}
                  </label>
                  <>
                    <input
                      type="text"
                      class="form-control"
                      // placeholder="www.omtoarchitects.com"
                      maxLength={30}
                      value={website}
                      onChange={(e) =>
                        handleFormData("website", e.target.value)
                      }
                    />
                  </>

                  {/* {websiteError && (
                    <p style={{ color: "red" }}>{websiteError}</p>
                  )} */}
                </div>
                <br />
                <div class="form-group secound-select-options">
                  <label>
                    Number of Employees
                    {/* <span className="red">*</span> */}
                  </label>
                  <div>
                    <div class="slect-option-wrap" style={{ width: "100%" }}>
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
                        // menuIsOpen={true}
                      />
                    </div>
                  </div>
                  {employeesError && (
                    <p style={{ color: "red" }}>{employeesError}</p>
                  )}
                </div>
                <div class="form-group">
                  <label>
                    Country of Establishment
                    <span className="red">*</span>
                  </label>
                  <>
                    <div class="slect-option-wrap" style={{ width: "100%" }}>
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
                  </>
                  {countryError && (
                    <p style={{ color: "red" }}>{countryError}</p>
                  )}
                </div>
                <div class="form-group">
                  <label>
                    Phone Number
                    <span className="red">*</span>
                  </label>
                  <div>
                    <input
                      type="text"
                      class="form-control"
                      maxLength={16}
                      // placeholder="+971 8849 9744"
                      value={`${number}`}
                      onChange={(e) => handleFormData("number", e.target.value)}
                    >
                      
                    </input>
                  </div>

                  {numberError && <p style={{ color: "red" }}>{numberError}</p>}
                </div>
                {/* <div class="form-group creators-activiti-wrap">
                  <label>Creator Activities</label>
                  <div class="row">
                    <div class="col-md-12">
                      <span>Activity</span>
                      {activityFieldValue &&
                        activityFieldValue.length > 0 &&
                        activityFieldValue.map((item, indx) => {
                          return (
                            <div class="form-group" key={indx}>
                              <div
                                className="Input_As_Div px-3 d-flex align-items-center my-1"
                                style={{ height: "2.5rem" }}
                              >
                                {item}
                              </div>
                              <i
                                class="fas fa-times"
                                onClick={() => handleRemove(item)}
                              ></i>
                            </div>
                          );
                        })}
                    </div>
                    {activityField && (
                      <div className="col-md-12 form-group mb-1">
                        <input
                          type="text"
                          class="Input_As_Div form-control my-1 px-3 shadow-0"
                          placeholder="Play"
                          style={{
                            height: "2.5rem",
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
                  </div>
                </div> */}
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
                                
                                // placeholder="@donaldsanchez"
                                style={{ height: "2.5rem", width: "26.5rem" }}
                                value={item.state}
                                onChange={(e) =>
                                  handleFormData(item.value, e.target.value)
                                }
                              />
                            </span>
                          </div>
                          {/* <a href="javascript:void(0);">
                            <i class="fas fa-link"></i>
                          </a> */}
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
                  <label>
                    Creator Image
                    <span className="red">*</span>
                  </label>
                  <>
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
                  </>
                  {imageError && <p style={{ color: "red" }}>{imageError}</p>}
                </div>
                <div class="form-group mt-4">
                  <label>
                    Creator Banner
                    <span className="red">*</span>
                  </label>
                  <div class="display-picture-wrap display-picture-wrap1">
                    {bannerImagePreview ? (
                      <img class="img-wrap" src={bannerImagePreview} />
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
                  {bannerImageError && (
                    <p style={{ color: "red" }}>{bannerImageError}</p>
                  )}
                </div>
                <div class="form-group">
                  <label>
                    Creator Primary Address
                    <span className="red">*</span>
                  </label>
                  <>
                    <input
                      type="text"
                      class="form-control"
                      // placeholder="123, abc"
                      maxLength={100}
                      value={primaryAddress}
                      style={{ opacity: "1", position: "relative" }}
                      onChange={(e) =>
                        handleFormData("primary", e.target.value)
                      }
                    />
                  </>

                  {primaryAddressError && (
                    <p style={{ color: "red" }}>{primaryAddressError}</p>
                  )}
                </div>

                <div class="form-group">
                  <label>
                    Company Stamp
                    {/* <span className="red">*</span> */}
                  </label>
                  <>
                    <div class="input-area" style={{ width: "100%" }}>
                      <span style={{ padding: "0 1rem", width: "100%" }}>
                        {companyStampName}
                      </span>

                      <input
                        type="file"
                        class="form-control"
                        // placeholder="Unit 1101, Tower B, Business Bay Dubai , UAE"
                        onChange={(e) =>
                          handleFormData("stamp", e.target.files[0])
                        }
                      />

                      <a href="javascript:void(0);" class="btn btn-primary">
                        Upload
                      </a>
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
                  </>

                  {companyStampError && (
                    <p style={{ color: "red" }}>{companyStampError}</p>
                  )}
                </div>
                <div class="form-group">
                  <label>
                    Trade Licence
                    {/* <span className="red">*</span> */}
                  </label>
                  <>
                    <div class="input-area" style={{ width: "100%" }}>
                      <span style={{ padding: "0 1rem", width: "inherit" }}>
                        {tradeLicenseName}
                      </span>
                      <input
                        type="file"
                        class="form-control"
                        placeholder="Unit 1101, Tower B, Business Bay Dubai , UAE"
                        onChange={(e) =>
                          handleFormData("trade", e.target.files[0])
                        }
                      />
                      <a href="javascript:void(0);" class="btn btn-primary">
                        Upload
                      </a>
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
                  </>

                  {tradeLicenseError && (
                    <p style={{ color: "red" }}>{tradeLicenseError}</p>
                  )}
                </div>
                <div class="form-group">
                  <label>Optional Supporting Document 1</label>
                  <div class="input-area">
                    <span style={{ padding: "0 1rem" }}>{document_1_Name}</span>
                    <input
                      type="file"
                      class="form-control"
                      placeholder="Unit 1101, Tower B, Business Bay Dubai , UAE"
                      onChange={(e) =>
                        handleFormData("document_1", e.target.files[0])
                      }
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
                  <label>Optional Supporting Document 2</label>
                  <>
                    <div class="input-area">
                      <span style={{ padding: "0 1rem" }}>
                        {document_2_Name}
                      </span>

                      <input
                        type="file"
                        class="form-control"
                        placeholder="Unit 1101, Tower B, Business Bay Dubai , UAE"
                        onChange={(e) =>
                          handleFormData("document_2", e.target.files[0])
                        }
                      />
                      <a href="javascript:void(0);" class="btn btn-primary">
                        Upload
                      </a>
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
                  </>
                </div>
                <div class="form-group">
                  <label>Optional Supporting Document 3</label>
                  <>
                    <div class="input-area">
                      <span style={{ padding: "0 1rem" }}>
                        {document_3_Name}
                      </span>

                      <input
                        type="file"
                        class="form-control"
                        placeholder="Unit 1101, Tower B, Business Bay Dubai , UAE"
                        onChange={(e) =>
                          handleFormData("document_3", e.target.files[0])
                        }
                      />
                      <a href="javascript:void(0);" class="btn btn-primary">
                        Upload
                      </a>
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
                  </>
                </div>
                <div class="form-group">
                  <label>
                    CV of Creator Principal
                    {/* <span className="red">*</span> */}
                  </label>
                  <div style={{ display: "flex" }}>
                    <div class="input-area" style={{ width: "100%" }}>
                      <span style={{ padding: "0 1rem", width: "inherit" }}>
                        {CV_Name}
                      </span>

                      <input
                        type="file"
                        class="form-control"
                        placeholder="Unit 1101, Tower B, Business Bay Dubai , UAE"
                        onChange={(e) =>
                          handleFormData("cv", e.target.files[0])
                        }
                      />
                      <a href="javascript:void(0);" class="btn btn-primary">
                        Upload
                      </a>
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

                  {CVError && <p style={{ color: "red" }}>{CVError}</p>}
                </div>
                <div class="form-group">
                  <label>
                    Approved Company Signatory
                    {/* <span className="red">*</span> */}
                  </label>
                  <div style={{ display: "flex" }}>
                    <div class="input-area" style={{ width: "100%" }}>
                      <span style={{ padding: "0 1rem" }}>
                        {companySignatory_Name}
                      </span>

                      <input
                        type="file"
                        class="form-control"
                        placeholder="Unit 1101, Tower B, Business Bay Dubai , UAE"
                        onChange={(e) =>
                          handleFormData("sign", e.target.files[0])
                        }
                      />
                      <a href="javascript:void(0);" class="btn btn-primary">
                        Upload
                      </a>
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

                  {/* {companySignatoryError && (
                    <p style={{ color: "red" }}>{companySignatoryError}</p>
                  )} */}
                </div>
                <div class="">
                  <div style={{ display: "flex" }}>
                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="defaultUnchecked"
                        checked={terms}
                        onChange={(e) => handleFormData("term", e.target.value)}
                      />
                      <label
                        class="custom-control-label text-gray h6"
                        for="defaultUnchecked"
                      >
                        Agree to{" "}
                        <a href="/terms" target="_blank">
                          Terms & Conditions
                        </a>
                      </label>
                    </div>
                    <span className="red">*</span>
                  </div>

                  {termsError && (
                    <div
                      class="custom-control custom-checkbox"
                      style={{ color: "red" }}
                    >
                      {termsError}
                    </div>
                  )}
                  <a
                    class="btn mt-4 btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={isNftCreated ? "" : handleSubmit}
                  >
                    {isNftCreated ? (
                      <Loader
                        color="white"
                        width={18}
                        height={18}
                        bgColor="#e2e2e2"
                        // margin="0"
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
    </div>
  );
}

export default RegistorNewCreator;
