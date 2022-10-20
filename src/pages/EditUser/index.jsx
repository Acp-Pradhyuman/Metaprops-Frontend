import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import HomePageFooter from "../../components/Home/HomePageFooter";

import { setUserData } from "../../redux/Slice/UserSlice/GetUser";
import { endpoints } from "../../utils/endpoints";
import { handleApiCall } from "./../../api/index";
import { PopUp } from "../../utils/utility";

const BLUE_TICK = require("../../assets/img/home/blue-check.png");
const EDIT_IMG = require("../../assets/img/home/file-type-img1.png");

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(
    (state) => state.userInformation.userInformation
  );
  const user = useSelector((state) => state.registerUser.userTokens);

  const [name, setName] = useState(userData ? userData?.name : "");
  const [email, setEmail] = useState(userData ? userData?.email : "");
  const [number, setNumber] = useState(
    userData?.phone_no !== "" ? userData?.phone_no : "+"
  );
  const [occupation, setOccupation] = useState(
    userData ? userData?.occupation : ""
  );

  const [dob, setDob] = useState(userData ? userData?.date_of_birth : "");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(
    userData ? userData?.display_picture : ""
  );

  const [bannerImage, setBannerImage] = useState("");
  const [bannerImagePreview, setBannerImagePreview] = useState(
    userData ? userData.cover_picture : ""
  );

  useEffect(() => {
    handleGetUserProfile();
  }, []);

  const handleGetUserProfile = async () => {
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.getUserProfile}`,
        {
          id: user?.data?._id,
        }
      );
      if (response.data.success) {
        const {
          cover_picture,
          date_of_birth,
          display_picture,
          email,
          name,
          occupation,
          phone_no,
        } = response?.data?.data[0] || {};
        // console.log('-----------', cover_picture);
        setBannerImagePreview(cover_picture);
        setImagePreview(display_picture);
        setName(name);
        setEmail(email);
        setNumber(phone_no);
        setDob(date_of_birth);
        setOccupation(occupation);
        // dispatch(setUserData(response?.data?.data)); v
      }
    } catch (error) {
      PopUp("Something Went Wrong", error.response.message, "error");
    }
  };

  console.log("first", userData);
  const handleEditUserData = (field, value) => {
    if (field === "name") {
      setName(value);
    } else if (field === "email") {
      setEmail(value);
    } else if (field === "number") {
      setNumber(value);
    } else if (field === "occupation") {
      setOccupation(value);
    } else if (field === "dob") {
      setDob(value);
    } else if (field === "image") {
      let reader = new FileReader();
      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(value);
      setImage(value);
    } else if (field === "bannerImage") {
      let reader = new FileReader();
      reader.onload = function (e) {
        setBannerImagePreview(e.target.result);
      };
      reader.readAsDataURL(value);
      setBannerImage(value);
    }
  };
  const handleClearState = () => {
    setBannerImage("");
    setDob("");
    setEmail("");
    setImage("");
    setName("");
    setNumber("");
    setOccupation("");
    setImagePreview("");
    setBannerImagePreview("");
  };
  const handleCancel = () => {
    navigate("/profile");
  };
  const handleEditUser = async () => {
    let userData = new FormData();
    if (number) userData.append("phone_no", number);
    if (name) userData.append("name", name);
    if (occupation) userData.append("occupation", occupation);
    if (image) userData.append("display_picture", image);
    if (bannerImage) userData.append("cover_picture", bannerImage);
    if (email) userData.append("email", email);
    if (dob) userData.append("date_of_birth", dob);
    const response = await handleApiCall(
      "put",
      `${endpoints.updateUserProfile}`,
      userData
    );
    if (response?.data?.success) {
      dispatch(setUserData(response?.data?.data));
      setTimeout(() => {
        navigate("/profile");
      });
    }
  };
  return (
    <>
      <Header />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12 p-0 mobile-pd-style">
              <div className="top-heading-are text-center">
                <h2>Edit Profile</h2>
                <p>
                  Please complete the below information in order to better
                  compliment your user profile. Your email address, phone
                  number, occupation and date of birth are not displayed on your
                  profile for privacy and security purposes.
                </p>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-5 col-md-5">
              <form className="profile-wrap-form">
                <div className="form-group form-group-wrap">
                  <label>Display name</label>
                  <input
                    type="text"
                    className="form-control placeholder-light"
                    // placeholder="Donald Sanchez"
                    value={name}
                    onChange={(e) => handleEditUserData("name", e.target.value)}
                    maxLength={30}
                  />
                  {/* <img src={BLUE_TICK} /> */}
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-control placeholder-light"
                    maxLength={30}
                    // placeholder="donaldsanchez@email.com"
                    value={email}
                    onChange={(e) =>
                      handleEditUserData("email", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <span></span>
                  <input
                    type="text"
                    className="form-control placeholder-light"
                    value={number}
                    maxLength={16}
                    onChange={(e) =>
                      handleEditUserData("number", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Occupation</label>
                  <input
                    type="text"
                    className="form-control placeholder-light"
                    // placeholder="Marketing Professional"
                    value={occupation}
                    maxLength={30}
                    onChange={(e) =>
                      handleEditUserData("occupation", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <div className="calendar-full">
                    <input
                      type="date"
                      className="form-control bg-transparent placeholder-light"
                      placeholder="dd/mm/yyyy"
                      value={dob}
                      onChange={(e) =>
                        handleEditUserData("dob", e.target.value)
                      }
                      required="required"
                    />
                    <i className="fas fa-calendar-week" />
                  </div>
                </div>
                <div className="button-submit-wrap">
                  <a
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={handleEditUser}
                  >
                    Save
                  </a>
                  <a
                    className="btn btn-block btn-secoundry btn-lg font-weight-medium auth-form-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </a>
                </div>
              </form>
            </div>
            <div className="col-lg-7 col-md-7 edit-user-update">
              <form className="profile-wrap-form">
                <div className="form-group">
                  <label>Profile Image</label>
                  <div className="property-details-wrap property-file-type profile-img-border">
                    {imagePreview ? (
                      <div class="profilePic">
                        <img
                          id="bannerImage"
                          src={imagePreview}
                          alt="your image"
                        />
                      </div>
                    ) : (
                      <img src={EDIT_IMG} />
                    )}
                    <div className="edit">
                      <i className="fas fa-pencil-alt" />
                      <input
                        type="file"
                        name="profile_pic"
                        accept="image/jpeg, image/bmp, image/png,image/svg"
                        onChange={(e) =>
                          handleEditUserData("image", e.target.files[0])
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-4 mb-0">
                  <label>Banner Image</label>
                  <div className="display-picture-wrap">
                    {bannerImagePreview ? (
                      <img
                        id="bannerImage"
                        src={bannerImagePreview}
                        alt="your banner image"
                      />
                    ) : (
                      <div className="img-wrap" />
                    )}
                    <div className="edit">
                      <i className="fas fa-pencil-alt" />
                      <input
                        type="file"
                        name="profile_pic"
                        accept="image/jpeg, image/bmp, image/png,image/svg"
                        onChange={(e) =>
                          handleEditUserData("bannerImage", e.target.files[0])
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <HomePageFooter />
    </>
  );
};

export default EditUser;
