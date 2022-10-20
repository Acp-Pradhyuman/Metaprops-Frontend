import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import moment from "moment";

//Components
import MainPanel from "./MainPanel";
import Loader from "../../commons/Loader";
import MetaData from "../../../hoc/Helmet";
//Redux
import { handleApiCall } from "../../../api";
import { endpoints } from "../../../utils/endpoints";
import { setCreatorData } from "../../../redux/Slice/UserSlice/Creator/GetCreator";
import { setIsEdit } from "../../../redux/Slice/UserSlice/Creator/EditCreator";
const BLUE_TICK = require("../../../assets/img/home/blue-check.png");

// Static

const BACKGROUND_IMAGE = require("../../../assets/img/creator.png");
const FILE_IMAGE = require("../../../assets/img/home/file-type-img1.png");
const ETH_IMAGE = require("../../../assets/img/section-image/etherim.png");

function CreatorProfile() {
  const userToken = useSelector((state) => state.registerUser.userTokens);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const creatorData = useSelector(
    (state) => state.creatorInformation.creatorInformation
  );

  const [creator, setCreator] = useState(
    creatorData && creatorData.length && creatorData[0]["user_data"]
  );
  const [creatorWallet, setCreatorWallet] = useState(
    creatorData && creatorData.length && creatorData[0]
  );
  const [copy, setCopy] = useState(false);
  const [image, setImage] = useState("");
  const [isImageUploaded, setisImageUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    getCreatorProfile();
    getBannerData();
  }, [userToken]);
  const getCreatorProfile = async () => {
    if (userToken?.data?._id) {
      setIsLoading(true);

      const response = await handleApiCall(
        "post",
        `${endpoints.getUserProfile}`,
        { id: userToken?.data?._id }
      );
      setIsLoading(false);
      if (response?.data?.success) {
        dispatch(setCreatorData(response?.data?.data));
        setCreator(response?.data?.data[0]["user_data"]);

        setCreatorWallet(response?.data?.data[0]);
      }
    }
  };
  const getBannerData = async () => {
    const response = await handleApiCall(
      "post",
      `${endpoints.getFloorPriceCreator}`,
      {
        id: userToken?.data?._id,
      }
    );
    if (response?.data?.success) {
      setBannerData(response?.data);
    }
  };
  const handleEditCreator = () => {
    dispatch(setIsEdit(true));
    navigate("/edit-creator");
  };
  const handleBannerUpload = async (image) => {
    let reader = new FileReader();
    reader.onload = function (e) {};
    reader.readAsDataURL(image);
    setImage(image);
    let form = new FormData();
    form.append("banner_image", image);
    setisImageUploaded(true);
    const response = await handleApiCall(
      "put",
      `${endpoints.updateCreator}`,
      form
    );
    setisImageUploaded(false);

    if (response?.data?.success) {
      getCreatorProfile();
    }
  };
  const handleProfileImage = async (image) => {
    let reader = new FileReader();
    reader.onload = function (e) {};
    reader.readAsDataURL(image);
    setImage(image);
    let form = new FormData();
    form.append("profile_image", image);
    setisImageUploaded(true);

    const response = await handleApiCall(
      "put",
      `${endpoints.updateCreator}`,
      form
    );
    setisImageUploaded(false);

    if (response?.data?.success) {
      getCreatorProfile();
    }
  };

  const pattern = /^((http|https|ftp|www):\/\/)/;

  const gotoSocialPage = (url) => {
    let URL = `https://${url}`;
    window.open(URL, "_blank");
  };

  console.log("creatorrrrrr", creator);
  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <MetaData
            title={creator?.name}
            desc={creator?.creator_desc}
            url={`${endpoints.baseShareUrl}/view-creator/${creator?._id}`}
            image={creator?.profile_image}
          />
          {creator && creator?.status === 1 ? (
            <section
              class="p-0 collections-banner"
              style={{
                backgroundImage: `url(${
                  creator ? creator?.banner_image : BACKGROUND_IMAGE
                })`,
              }}
            >
              <div class="container">
                <div class="edit">
                  <i class="fas fa-pencil-alt"></i>
                  <input
                    type="file"
                    name="profile_pic"
                    accept="image/jpeg, image/bmp, image/png,image/svg"
                    onChange={(e) => handleBannerUpload(e.target.files[0])}
                  />
                </div>
                <div class="edit-creators-btn">
                  <a
                    class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={() => navigate("/add-nft")}
                  >
                    Add NFTs
                  </a>
                  <a
                    class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={handleEditCreator}
                    tabindex="0"
                  >
                    Edit Creator
                  </a>
                </div>
                <ul class="propert-details-list">
                  <li>
                    <span>{bannerData?.createdCount}</span>
                    <p>Items</p>
                  </li>
                  <li>
                    <span>{bannerData?.soldCount}</span>
                    <p>Owners</p>
                  </li>
                  <li>
                    <img src={ETH_IMAGE} />
                    <span>{bannerData?.floorPrice}</span>
                    <p>Floor Price</p>
                  </li>
                  <li>
                    <img src={ETH_IMAGE} />
                    {/* <span>{bannerData?.priceVolume.toFixed(2)}</span> */}
                    <span>
                      {Math.round(bannerData?.priceVolume * 1000) / 1000}
                    </span>
                    <p>Volume Traded</p>
                  </li>
                </ul>
              </div>
            </section>
          ) : (
            <section
              class="p-0 collections-banner"
              style={{
                backgroundImage: `url(${
                  creator ? creator?.banner_image : BACKGROUND_IMAGE
                })`,
              }}
              // style={{ backgroundColor: "#D3D3D3" }}
            >
              <div class="container">
                <div class="edit-creators-btn">
                  {creator && creator?.status === 0 ? (
                    <a
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      disabled={creator && creator?.status}
                    >
                      Approval Pending!
                    </a>
                  ) : (
                    <Link
                      class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      to="/register-creator"
                      tabindex="0"
                    >
                      Register as a Creator
                    </Link>
                  )}
                </div>
              </div>
            </section>
          )}
          <section class="pt-3 pb-4 margin-botom-wrap">
            <div class="container">
              <div class="row">
                <div class="col-lg-2 col-md-3 property-col-wrap">
                  <div class="property-details-wrap creator-property-details">
                    <div class="profilePic">
                      <img src={creator?.profile_image} />
                      {creator && creator?.status === 1 ? (
                        <div class="edit">
                          <i
                            style={{ cursor: "pointer" }}
                            class="fas fa-pencil-alt"
                          ></i>
                          <input
                            type="file"
                            name="profile_pic"
                            accept="image/jpeg, image/bmp, image/png,image/svg"
                            onChange={(e) =>
                              handleProfileImage(e.target.files[0])
                            }
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {creator && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "flex-start",
                          justifyContent: "space-between",
                        }}
                      >
                        <ul class="property-share-link">
                          {creator?.twitter && (
                            <li>
                              <a
                                href={
                                  pattern.test(`${creator && creator?.twitter}`)
                                    ? creator && creator?.twitter
                                    : `https://${creator && creator?.twitter}`
                                }
                                target="_blank"
                                // onClick={() => gotoSocialPage(creator?.twitter)}
                              >
                                <i class="fa-brands fa-twitter text-black"></i>
                              </a>
                            </li>
                          )}
                          {creator?.facebook && (
                            <li>
                              <a
                                href={
                                  pattern.test(
                                    `${creator && creator?.facebook}`
                                  )
                                    ? creator && creator?.facebook
                                    : `https://${creator && creator?.facebook}`
                                }
                                target="_blank"
                              >
                                <i class="fa-brands fa-facebook-f text-black"></i>
                              </a>
                            </li>
                          )}
                          {creator?.linkdin && (
                            <li>
                              <a
                                href={
                                  pattern.test(`${creator && creator?.linkdin}`)
                                    ? creator && creator?.linkdin
                                    : `https://${creator && creator?.linkdin}`
                                }
                                target="_blank"
                              >
                                <i class="fa-brands fa-linkedin-in text-black"></i>
                              </a>
                            </li>
                          )}
                          {creator?.youtube && (
                            <li>
                              <a
                                href={
                                  pattern.test(`${creator && creator?.youtube}`)
                                    ? creator && creator?.youtube
                                    : `https://${creator && creator?.youtube}`
                                }
                                target="_blank"
                              >
                                <i class="fa-brands fa-youtube text-black"></i>
                              </a>
                            </li>
                          )}
                          {creator?.telegram && (
                            <li>
                              <a
                                href={
                                  pattern.test(
                                    `${creator && creator?.telegram}`
                                  )
                                    ? creator && creator?.telegram
                                    : `https://${creator && creator?.telegram}`
                                }
                                target="_blank"
                              >
                                <i class="fa-brands fa-telegram text-black"></i>
                              </a>
                            </li>
                          )}
                          {creator?.instagram && (
                            <li>
                              <a
                                href={
                                  pattern.test(
                                    `${creator && creator?.instagram}`
                                  )
                                    ? creator && creator?.instagram
                                    : `https://${creator && creator?.instagram}`
                                }
                                target="_blank"
                              >
                                <i class="fa-brands fa-instagram text-black"></i>
                              </a>
                            </li>
                          )}
                          {creator?.discord && (
                            <li>
                              <a
                                href={
                                  pattern.test(`${creator && creator?.discord}`)
                                    ? creator && creator?.discord
                                    : `https://${creator && creator?.discord}`
                                }
                                target="_blank"
                              >
                                <i class="fa-brands fa-discord text-black"></i>
                              </a>
                            </li>
                          )}
                          {creator?.medium && (
                            <li>
                              <a
                                href={
                                  pattern.test(`${creator && creator?.medium}`)
                                    ? creator && creator?.medium
                                    : `https://${creator && creator?.medium}`
                                }
                                target="_blank"
                              >
                                <i class="fa-brands fa-medium text-black"></i>
                              </a>
                            </li>
                          )}
                        </ul>
                        <ul class="property-share-link proerty-web-icon">
                          <li>
                            {pattern.test(`${creator?.creator_web}`) && (
                              <a
                                href={
                                  creator?.creator_web && creator.creator_web
                                }
                                target="_blank"
                              >
                                <i class="fas fa-globe"></i>
                              </a>
                            )}
                          </li>

                          {/* {creator?.creator_web && (
                            <li>
                              <a
                                onClick={() =>
                                  gotoSocialPage(creator?.creator_web)
                                }
                              >
                                
                              </a>
                            </li>
                          )} */}
                          {/*  */}
                          <li>
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${creator?.primary_address}`}
                              target="_blank"
                            >
                              <i class="fas fa-map-marker-alt"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-5 col-6 property-details-area">
                  <div class="mobile-edit-creators-btn">
                    <a
                      class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={() => navigate("/add-nft")}
                    >
                      Add NFTs
                    </a>
                    <a
                      class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={handleEditCreator}
                      tabindex="0"
                    >
                      Edit Creator
                    </a>
                  </div>
                  <h3>
                    {/* {creator && creator?.name} */}
                    <span style={{ width: "12rem" }}>
                      {(creator && creator?.status === 1) ||
                      (creator && creator?.status === 0)
                        ? creator && creator?.name.length < 31
                          ? creator?.name
                          : `${creator?.name.substring(0, 31)}...`
                        : "No Name"}
                    </span>

                    <span>
                      {creator && creator.is_verify === 1 ? (
                        <img src={BLUE_TICK} />
                      ) : (
                        ""
                      )}
                    </span>
                  </h3>

                  <form>
                    {creatorWallet && creatorWallet?.wallet_address && (
                      <div
                        className="d-flex mb-3"
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <input
                          type="text"
                          style={{ border: "none", width: "70%" }}
                          placeholder={
                            creatorWallet &&
                            `${creatorWallet?.wallet_address?.substring(
                              0,
                              5
                            )}...${creatorWallet?.wallet_address?.substring(
                              creatorWallet?.wallet_address.length - 4
                            )}`
                          }
                        />
                        <CopyToClipboard
                          text={creatorWallet && creatorWallet?.wallet_address}
                          onCopy={() => setCopy(true)}
                        >
                          {copy ? (
                            <i
                              className="fa-solid fa-check"
                              style={{ cursor: "pointer", color: "#4472c7" }}
                            />
                          ) : (
                            <i
                              className="far fa-copy"
                              style={{ cursor: "pointer" }}
                            />
                          )}
                        </CopyToClipboard>
                      </div>
                    )}
                  </form>
                  <span>
                    Joined:{" "}
                    {moment(creator?.createdAt && creator?.createdAt).format(
                      "DD/MM/YYYY"
                    )}
                  </span>
                  {/* <span>
                    {
                      creator? "Joined: ":""
                    }
                    {creator &&
                      creator?.createdAt &&
                      new Date(creator && creator?.createdAt).toDateString()}
                  </span> */}
                </div>
                <div class="col-lg-7 col-md-12 description-text-wrap">
                  <p>
                    {creator && creator?.status === 1
                      ? creator?.creator_desc
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <MainPanel />
        </div>
      )}
    </>
  );
}

export default CreatorProfile;
