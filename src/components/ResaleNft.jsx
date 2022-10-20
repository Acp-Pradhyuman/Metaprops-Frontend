import React, { useState, useEffect } from "react";
import Modal from "../components/commons/Modal/Modal";
import Select from "react-select";
import SellNftModal from "./SellNftModal/index.jsx";
import CreatableSelect from "react-select/creatable";
import Loader from "./commons/Loader";

import { useSelector } from "react-redux";
import { useParams, Link, Navigate } from "react-router-dom";

import { PopUp } from "../utils/utility.js";
import { handleApiCall } from "../api/index.js";
import { endpoints, abi } from "../utils/endpoints.js";

import { useNavigate } from "react-router-dom";

import { resaleApprove, resaleNFT } from "../utils/functions/resaleNft";

import { resaleStartAuction } from "../utils/functions/resaleStartAuction";
import Header from "./Header";
import Footer from "./Home/HomePageFooter";

const BLUE_TICK = require("../assets/img/home/blue-check.png");
const FILE_PREVIEW = require("../assets/img/folder.png");
const SALE_IMG = require("../assets/img/section-image/round-check.png");

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
    margin: "10px 0px",
    border: "0px solid",
    borderRadius: "0px",
    outline: "none",
    boxShadow: "none",
    height: 45,
    minHeight: 45,
  }),
  // input: () => ({
  //   margin: "0px",
  // }),
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

const ResaleNft = () => {
  const nftDetail = useSelector((state) => state.nftDetail.currentNFT);
  const wallet = useSelector(
    (state) => state?.registerUser?.userTokens?.data?.wallet_address
  );

  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showNested, setShowNested] = useState(false);
  const [type, setType] = useState("Fixed");
  const [currencyOptions, setCurrencyOptions] = useState([
    { value: "Eth", label: "Eth on Polygon" },
    { value: "Matic", label: "Matic" },
  ]);
  const [currency, setCurrency] = useState("");
  const [royality, setRoyality] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [address, setAddress] = useState([]);
  const [isBuying, setIsBuying] = useState(false);
  const [fee, setFee] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState({ label: "1 day", value: "1 day" });
  const [durationOptions, setDurationOptions] = useState([
    { label: "1 day", value: "1 day" },
    { label: "3 days", value: "3 days" },
    { label: "1 month", value: "1 month" },
    { label: "3 months", value: "3 months" },
    { label: "6 months", value: "6 months" },
  ]);
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [payload, setPayload] = useState({});
  const [showApprove, setShowApprove] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleType = (selection) => {
    setType(selection);
  };

  useEffect(() => {
    getCommision();
  }, []);

  useEffect(() => {
    const today = new Date();
    if (duration?.value === "1 day") {
      const priorDate = new Date().setDate(today.getDate() + 1);
      const date = new Date(priorDate);
      const start = today.toLocaleDateString("en-US").split("/");
      const end = date.toLocaleDateString("en-US").split("/");
      setStartingDate(`${start[1]}/${start[0]}/${start[2]}`);
      setEndingDate(`${end[1]}/${end[0]}/${end[2]}`);
    } else if (duration?.value === "3 days") {
      const priorDate = new Date().setDate(today.getDate() + 3);
      const date = new Date(priorDate);
      const start = today.toLocaleDateString("en-US").split("/");
      const end = date.toLocaleDateString("en-US").split("/");
      setStartingDate(`${start[1]}/${start[0]}/${start[2]}`);
      setEndingDate(`${end[1]}/${end[0]}/${end[2]}`);
    } else if (duration?.value === "1 month") {
      const priorDate = new Date().setDate(today.getDate() + 30);
      const date = new Date(priorDate);
      const start = today.toLocaleDateString("en-US").split("/");
      const end = date.toLocaleDateString("en-US").split("/");
      setStartingDate(`${start[1]}/${start[0]}/${start[2]}`);
      setEndingDate(`${end[1]}/${end[0]}/${end[2]}`);
    } else if (duration?.value === "3 months") {
      const priorDate = new Date().setDate(today.getDate() + 90);
      const date = new Date(priorDate);
      const start = today.toLocaleDateString("en-US").split("/");
      const end = date.toLocaleDateString("en-US").split("/");
      setStartingDate(`${start[1]}/${start[0]}/${start[2]}`);
      setEndingDate(`${end[1]}/${end[0]}/${end[2]}`);
    } else if (duration?.value === "6 months") {
      const priorDate = new Date().setDate(today.getDate() + 180);
      const date = new Date(priorDate);
      const start = today.toLocaleDateString("en-US").split("/");
      const end = date.toLocaleDateString("en-US").split("/");
      setStartingDate(`${start[1]}/${start[0]}/${start[2]}`);
      setEndingDate(`${end[1]}/${end[0]}/${end[2]}`);
    }
  }, [duration]);
  useEffect(() => {}, []);
  const handleSellFormData = (field, value) => {
    console.table({ field, value });
    if (field === "currency") {
      setCurrency(value);
    }
    if (field === "royality") {
      if (value) {
        if (Number(value) > 100 || Number(value) < 1) {
          PopUp("Invalid Value", "Please Enter Value Between 1 - 100", "error");
          setRoyality("");
        } else {
          setRoyality(Number(value));
        }
      } else {
        setRoyality("");
      }
    }
    if (field === "private") {
      setIsPrivate(value);
    }
    if (field === "Address") {
      setAddress(value);
    }
    if (field === "amount") {
      setAmount(value);
    }
    if (field === "duration") {
      setDuration(value);
    }
    if (field === "starting_date") {
      setStartingDate(value);
    }
    if (field === "ending_date") {
      setEndingDate(value);
    }
  };

  const getTimeInDays = (start = "", end = "") => {
    if (start && end) {
      let startDate = start.split("/");
      let endDate = end.split("/");
      const oneDay = 1000 * 60 * 60 * 24; // hours*minutes*seconds*milliseconds
      const firstDate = new Date(
        `${+startDate[1]}/${+startDate[0]}/${+startDate[2]}`
      );
      const secondDate = new Date(
        `${+endDate[1]}/${+endDate[0]}/${+endDate[2]}`
      );
      let diffDays = secondDate.getTime() - firstDate.getTime();
      diffDays = diffDays / oneDay;

      return diffDays;
    }
  };
  const getCommision = async () => {
    try {
      const response = await handleApiCall("get", `${endpoints.getCommision}`);
      if (response?.data?.success) {
        setFee(response?.data?.data?.fees);
      }
    } catch (error) {
      PopUp("Something went wrong", "Internal server error", "error");
    }
  };

  const handleSellNFT = async () => {
    if (window.ethereum.isConnected() && window.ethereum.selectedAddress) {
      console.log("Connected");
    } else {
      PopUp("Metamask Error", "Please connect account in metamask", "warning");
      return;
    }
    // console.log('Connected', +window.ethereum.networkVersion === abi.chainId);

    if (+window.ethereum.networkVersion !== abi.chainId) {
      PopUp("Network Error", "Please change your network", "error");
      window.ethereum.request({
        method: "eth_requestAccounts",
        params: [
          {
            chainId: "0x13881",
            //chainId: "0x89",
            rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            chainName: "Polygon Testnet Mumbai",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          },
        ],
      });
      return;
    }
    if (
      window.ethereum.selectedAddress &&
      window.ethereum.selectedAddress !== wallet
    ) {
      PopUp(
        "Account Error",
        `Please change your account to ${wallet}`,
        "error"
      );
      return;
    }
    let data = {
      id,
      type,
      metaprops_fees: fee,
      is_private: isPrivate ? 1 : 0,
    };
    if (nftDetail?.creator_addr) {
      data["creator_addr"] = nftDetail?.creator_addr;
    }
    data["currency"] = currency?.value ? currency?.value : "Eth";
    if (amount) {
      data["price"] = +amount;
    } else {
      PopUp("Invalid Value", "Please Enter Price", "error");
      return;
    }
    if (royality) {
      data["future_royality"] = `${royality}%`;
    }
    if (isPrivate && address && address.length) {
      const temp = [];
      address.map((item) => {
        temp.push(item.value.toLowerCase());
      });
      data["private_address"] = temp;
    } else if (isPrivate && address && address.length === 0) {
      PopUp("Empty Field", "Please Enter Address", "error");
      return;
    }
    if (type === "Auction") {
      if (duration) {
        data["duration"] = duration?.value;
      } else {
        PopUp(
          "Invalid Value",
          "Please Select Starting and Ending Date",
          "error"
        );
        return;
      }
    }
    if (type === "Auction") {
      if (startingDate) {
        data["start_date"] = startingDate;
      }
      if (endingDate) {
        data["end_date"] = endingDate;
      }
    }
    data["token_count"] = nftDetail?.token_owner?.token_count;
    setPayload(data);
  };

  const days = getTimeInDays(payload?.start_date, payload?.end_date);

  const resaleConfirmation = () => {
    handleSellNFT();
    resaleApprove(
      undefined,
      () => setShowApprove(false),
      () => setIsBuying(false),
      () => setIsBuying(true)
    ).then(() => {
      setShowConfirm(true);
    });

    // 	resaleStartAuction(nftDetail?.market_id, days, payload, amount);
  };

  const resaleConfirm = async () => {
    if (type === "Fixed") {
      await resaleNFT(
        nftDetail?.market_id,
        amount,
        () => setShowConfirm(false),
        nftDetail?.token_owner.token_id,
        () => console.log(""),
        () => setIsBuying(false),
        () => setIsBuying(true),
        () => setShowConfirm(false),
        type
      );
      redirectToNftDetailsPage(id);
    } else {
      await resaleStartAuction(
        nftDetail?.market_id,
        days,
        payload,
        amount,
        () => setShowConfirm(false),
        () => redirectToNftDetailsPage(id),
        wallet
      );
    }
  };
  const redirectToNftDetailsPage = (id) => {
    navigate(`/view-nft/${id}`);
  };

  console.log("fghj", payload);

  return (
    <>
      <Header />
      <section className="main-pannel-sec">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="top-heading-are text-center">
                <h2>Sell NFT</h2>
                <p>
                  Please complete the below information to successfully list
                  your NFT for sale. Choose between fixed or auction based sale
                  strategies and whether to sell to a specified wallet address.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="sell-nft-wraaper">
                <div className="sell-nft-box-wrap">
                  <img src={nftDetail && nftDetail?.preview_image} />
                  <div className="sell-nft-name">
                    <h3>{nftDetail && nftDetail?.nft_name}</h3>
                    <span className="second-col">
                      <a href="javascript:void(0);" tabIndex={0}>
                        {nftDetail &&
                          nftDetail?.creatorInfo &&
                          nftDetail?.creatorInfo.length &&
                          nftDetail?.creatorInfo[0]?.name}
                      </a>{" "}
                      <img src={BLUE_TICK} style={{ marginBottom: "3px" }} />
                    </span>
                  </div>
                </div>
                {/* <div className='sell-nft-details'>
									<span>Price</span>
									<h3>7.0154 ETH</h3>
									<span>$20,000 USD</span>
								</div> */}
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="sell-nft-tab">
                <h3>Type</h3>
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a
                      data-toggle="tab"
                      className={type === "Fixed" ? "active" : ""}
                      onClick={() => handleType("Fixed")}
                    >
                      Fixed
                    </a>
                  </li>
                  <li>
                    <a
                      data-toggle="tab"
                      className={type === "Auction" ? "active" : ""}
                      onClick={() => handleType("Auction")}
                    >
                      Auction
                    </a>
                  </li>
                </ul>
                <div>
                  <div id="fixed" className="tab-pane fade in active pt-3">
                    <form className="profile-wrap-form row">
                      <div
                        className="form-group col-md-6"
                        style={{ zIndex: "136" }}
                      >
                        <label>Price</label>
                        <div className="slect-option-wrap">
                          <Select
                            defaultValue={currencyOptions[0]}
                            value={{ value: "Eth", label: "Eth on Polygon" }}
                            onChange={(e) => handleSellFormData("currency", e)}
                            options={currencyOptions}
                            isDisabled={true}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-6 sell-nft-blank">
                        <label>&nbsp;</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          // style={{ borderRadius: "5px", height: "37px" }}
                          value={amount}
                          onChange={(e) =>
                            handleSellFormData("amount", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label>MetaProps Fee (%)</label>
                        <input
                          type="text"
                          value={`${fee}`}
                          className="form-control"
                          placeholder="platform fee"
                          disabled
                        />
                      </div>
                      {/* <div className="form-group col-md-6">
                            <label>Creator Future Royalty (%)</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder
                              disabled
                            //   value={royality}
                            //   onChange={(e) =>
                            //     handleSellFormData("royality", e.target.value)
                            //   }
                            />
                          </div> */}
                      {type === "Auction" && (
                        <>
                          <div
                            className="form-group col-md-12"
                            style={{ zIndex: "125" }}
                          >
                            <label>Duration</label>

                            <div className="slect-option-wrap">
                              <Select
                                defaultValue={
                                  durationOptions &&
                                  durationOptions.length &&
                                  durationOptions[0]
                                }
                                onChange={(e) =>
                                  handleSellFormData("duration", e)
                                }
                                options={durationOptions}
                                styles={customStyles}
                                isSearchable={false}
                              />
                            </div>
                          </div>
                          <div className="form-group col-md-6">
                            <label>Starting Date</label>
                            <input
                              type="text"
                              className="form-control mb-0"
                              placeholder="Flat rate of 5%"
                              value={startingDate}
                              onChange={(e) =>
                                handleSellFormData(
                                  "starting_date",
                                  e.target.value
                                )
                              }
                              disabled
                            />
                            <i className="fas fa-calendar-week" />
                          </div>
                          <div className="form-group col-md-6">
                            <label>Ending Date</label>
                            <input
                              type="text"
                              className="form-control mb-0"
                              placeholder="Flat rate of 5%"
                              value={endingDate}
                              disabled
                              onChange={(e) =>
                                handleSellFormData(
                                  "ending_date",
                                  e.target.value
                                )
                              }
                            />
                            <i className="fas fa-calendar-week" />
                          </div>
                        </>
                      )}
                      {type === "Fixed" && (
                        <>
                          <div className="form-group col-md-12">
                            <div className="make-private-wrap">
                              <label>Make Private</label>
                              <div className="custom-control custom-switch">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customSwitches"
                                  checked={isPrivate}
                                  onChange={(e) =>
                                    handleSellFormData(
                                      "private",
                                      e.target.checked
                                    )
                                  }
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="customSwitches"
                                />
                              </div>
                              {isPrivate && (
                                <div className="mt-3">
                                  <CreatableSelect
                                    isMulti
                                    onChange={(e) =>
                                      handleSellFormData("Address", e)
                                    }
                                    options={address}
                                    placeholder="Add Address"
                                    styles={customStyles}
                                    isSearchable={true}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row sell-nft-tab2">
                <div className="col-md-6 col-sm-6">
                  <div className="blockchain-box">
                    <span>Blockchain Preview Image</span>
                    <img src={nftDetail && nftDetail?.preview_image} />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="blockchain-box1">
                    <span>Blockchain Compressed File</span>
                    <div>
                      <div className="blockchain-wrap">
                        <img src={FILE_PREVIEW} />
                        <div>
                          {" "}
                          {<p>{nftDetail?.zip_names?.zip_name || ""}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 cancel-btn-wrapper">
                  <Link
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn mt-4"
                    to={`/view-nft/${id}`}
                  >
                    Cancel
                  </Link>
                </div>
                <div className="col-md-6 col-sm-6">
                  <a
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn mt-4"
                    onClick={() => setShowApprove(true)}
                  >
                    Sell
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Modal show={show} onClose={() => setShow(false)}>
        <SellNftModal
          showModal={() => setShowNested(true)}
          data={payload}
          royalty={royality}
        />
      </Modal>

      <Modal show={showApprove} onClose={() => setShowApprove(false)}>
        <div>
          <div className="" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="modal-inner-area text-center">
                  <h2>Are you sure you want to approve?</h2>
                  <p>Approval must be given to list the NFT for resale.</p>
                </div>
              </div>
              <div className="d-flex align-items-center" style={{ gap: "1em" }}>
                <a
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  onClick={resaleConfirmation}
                >
                  {isBuying ? (
                    <Loader
                      color="white"
                      width={18}
                      height={18}
                      bgColor="#e2e2e2"
                      // margin="0"
                    />
                  ) : (
                    "Approve"
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal show={showConfirm} onClose={() => setShowConfirm(false)}>
        <div>
          <div className="" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="modal-inner-area text-center">
                  <h2>Are you sure you want to Confirm?</h2>
                </div>
              </div>
              <div className="d-flex align-items-center" style={{ gap: "1em" }}>
                <a
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  onClick={resaleConfirm}
                >
                  {isBuying ? (
                    <Loader
                      color="white"
                      width={18}
                      height={18}
                      bgColor="#e2e2e2"
                      // margin="0"
                    />
                  ) : (
                    "Confirm"
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal show={showNested} onClose={() => setShowNested(false)}>
        <div className="" role="document">
          <div className="">
            <div className="modal-body">
              <div className="modal-inner-area text-center">
                <h2>Your item is ready for sale</h2>
                <p>
                  Thank you for completing the relavant data. Your NFT is now
                  successfully listed.
                </p>
                <img src={SALE_IMG} />
              </div>
            </div>
            <div className="modal-footer">
              <div className="url-link">
                <a
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  to={`/view-nft/${id}`}
                  tabIndex={0}
                >
                  View NFT
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ResaleNft;
