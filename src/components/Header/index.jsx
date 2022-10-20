import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, Router } from "react-router-dom";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import Modal from "../commons/Modal/Modal";
import { CopyToClipboard } from "react-copy-to-clipboard";

// Redux
import { handleApiCall } from "../../api";
import { endpoints } from "../../utils/endpoints";
import { HandleRefreshToken } from "../../utils/utility";
import {
  setHomeSearch,
  setHomeSearchKeyword,
} from "../../redux/Slice/HomeSearch";
import { logout } from "../../redux/Slice/Logout";
import { setCurrentUSDPrice } from "../../redux/Slice/Home";
import { useSelector, useDispatch } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { PopUp } from "../../utils/utility";

//Static Files
import WALLET from "../../assets/img/modal/wallet.svg";
import PROFILE from "../../assets/img/modal/profile.svg";
const LOGO = require("../../assets/img/logo.png");

function Header({ transparent }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { word } = useParams();

  const [show, setShow] = useState(false);

  const [showNested, setShowNested] = useState(false);
  const [balance, setBalance] = useState("");
  const [badgeCount, setBadgeCount] = useState(0);

  const [toggleMenu, setToggleMenu] = useState(false);
  const { account, chainId } = useMetaMask();
  const userToken = useSelector((state) => state.registerUser.userTokens);
  const currentRole = useSelector((state) => state.registerUser.currentRole);

  const userInfo = useSelector((state) => state.registerUser.userTokens);
  const userId = userInfo && userInfo?.data && userInfo?.data?._id;
  const searchInfo = useSelector(
    (state) => state.homeSearchInfo.homeSearchInfo
  );

  const keywordInfo = useSelector(
    (state) => state.homeSearchInfo.homeSearchKeyword
  );

  const walletAddInfo = useSelector(
    (state) => state.registerUser.userTokens.data
  );

  const [walletPopUp, setWalletPopUp] = useState(false);
  const [copy, setCopy] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [loader, setLoader] = useState(true);
  const [searchedWord, setSearchedWord] = useState("");

  let network;
  if (parseInt(chainId, 16) == 4) {
    network = "rinkeby"; //using for rinkeby testnet(Ethereum)
  } else if (parseInt(chainId, 16) == 80001) {
    network = "https://matic-mumbai.chainstacklabs.com/"; //using for mumbai testnet(Polygon)
  } else if (parseInt(chainId, 16) == 1) {
    network = "mainnet"; //using for rinkeby mainnet(Ethereum)
  } else if (parseInt(chainId, 16) == 137) {
    network = "https://rpc-mainnet.matic.network"; //using for mumbai mainnet(Polygon)
  }
  // const provider = ethers.getDefaultProvider(network);

  //const finalBalance = balance;
  // const finalBalance = Math.round(balance * 1) / 1; //use for value in round off
  const finalBalance = balance.substring(0, 6);

  let trimAddress = 0;
  if (account) {
    trimAddress = `${account?.substring(0, 8)}...${account?.substring(
      account.length - 4
    )}`;
  }

  const handleNotification = () => {
    navigate("/notification");
  };

  const handleLogout = async () => {
    let response = await handleApiCall("put", `${endpoints.logout}`);
    if (response?.data?.success) {
      localStorage.clear();
      navigate("/");
      dispatch(logout());

      // setTimeout(() => {
      //   window.location.reload();
      // }, 100);
    }
  };

  const handleDepositModal = () => {
    setShow(false);
    setShowNested(true);
  };

  // HOME Search Functionality RESPONSE -----------
  const handleGetSearch = async () => {
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.getSearch}${searchData}`
      );

      if (response?.data?.success) {
        // let result;
        // if(response?.data?.dataNft.length) result = handlePrivateNft(response?.data?.dataNft);
        // let finalResult = {...response?.data, dataNft:result} ;
        dispatch(setHomeSearch(response?.data));
        setLoader(false);
      }
    } catch (error) {
      PopUp("Internal Server Error", error?.response?.message, "error");
    }
  };

  const getUSDPriceAccordingToCurrency = async (currency = "ETH") => {
    try {
      const response = await handleApiCall(
        "get",
        `${endpoints.getUSDPrice}${currency}`
      );
      if (response?.data?.success) {
        dispatch(setCurrentUSDPrice(response?.data?.data));
      }
    } catch (error) {
      PopUp("Internal Server Error", error.response.message, "error");
    }
  };

  // HOME Search Functionality OnChange -----------
  const handleSearch = (evt) => {
    setSearchData(evt.target.value);
    setSearchedWord(evt.target.value);
  };

  useEffect(() => {
    dispatch(setHomeSearchKeyword(searchData));
    handleGetSearch();
  }, [searchData]);

  useEffect(() => {
    // localStorage.setItem('metamask', true);

    const provider = ethers.getDefaultProvider(network);
    provider.getBalance(account).then((balance) => {
      const balanceInEth = ethers.utils.formatEther(balance);
      setBalance(balanceInEth);
    });
    let path = window.location.pathname;
    path = path.split("/");
    if (path[1] === "search") {
      setSearchedWord(path[2]);
    } else {
      setSearchedWord(keywordInfo);
    }
    getUSDPriceAccordingToCurrency();
  }, []);

  // const handleKeyPress = (event) => {
  // 	if (event.key === 'Enter') {
  // 		navigate(`/search/${searchData}`);
  // 	}
  // };

  const handleCross = () => {
    setSearchData("");
    setSearchedWord("");
  };

  return (
    <>
      <div class={transparent ? "home-page-nav" : "header-main-wrapper"}>
        <nav
          class={`navbar navbar-expand-lg header-menu-wrap navbar-light bg-transparent ${
            transparent ? " " : "internal-head"
          }`}
        >
          <div class="container container1 mobile-menu-wrap">
            <a class="navbar-brand mr-md-5" href="/">
              <img src={LOGO} height="60" />
            </a>
            <div class="input-group rounded mr-auto mobile-view-search">
              <i class="fas fa-search"></i>
              <input
                type="search"
                class="form-control rounded"
                placeholder="Search Marketplace, Collections & Creators"
                name={searchData}
                onChange={handleSearch}
              />
              <ul class="search-bar-result"></ul>
            </div>
            <button
              class="navbar-toggler"
              // data-toggle="collapse"
              // data-target="#navbar"
              // aria-expanded="false"
              // aria-label="Toggle navigation"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              {toggleMenu ? (
                <i class="fa fa-times"></i>
              ) : (
                <>
                  <span></span>
                  <span></span>
                  <span></span>
                </>
              )}
            </button>
            <div
              class={`collapse navbar-collapse ml-md-51 ${
                toggleMenu ? "show" : "hide"
              }`}
              id="navbar"
            >
              <div class="input-group rounded mr-auto">
                <i class="fas fa-search"></i>
                <input
                  type="search"
                  class="form-control rounded"
                  placeholder="Search Marketplace, Collections & Creators"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  value={searchedWord}
                  onChange={handleSearch}
                />
                {searchData && (
                  <i
                    class="fa-regular fa-x"
                    style={{ cursor: "pointer" }}
                    onClick={handleCross}
                  ></i>
                )}
                {searchData && (
                  <ul class="search-bar-item">
                    {loader ? (
                      <li>Loading...</li>
                    ) : (
                      <>
                        {Object.keys(searchInfo).length !== 0 && (
                          <>
                            {searchInfo.dataCollection.length > 0 && (
                              <li>Collections</li>
                            )}
                            <ul class="search-bar-inner">
                              {searchInfo.dataCollection.length > 0 &&
                                searchInfo.dataCollection
                                  .slice(0, 4)
                                  .map((data) => {
                                    return (
                                      <>
                                        <li>
                                          <Link to={`/collection/${data?._id}`}>
                                            {data.name}
                                            {/* <span>{data.description}</span> */}
                                          </Link>
                                        </li>
                                      </>
                                    );
                                  })}
                            </ul>
                            {searchInfo.dataCreator.length !== 0 && (
                              <li>Creators</li>
                            )}
                            <ul class="search-bar-inner">
                              {searchInfo.dataCreator.length > 0 &&
                                searchInfo.dataCreator
                                  .slice(0, 4)
                                  .map((data) => {
                                    return (
                                      <>
                                        <li>
                                          <Link
                                            to={`/view-creator/${data?.user_id}`}
                                          >
                                            {data.name}
                                            {/* <span>{data.description}</span> */}
                                          </Link>
                                        </li>
                                      </>
                                    );
                                  })}
                            </ul>
                            {searchInfo.dataNft.length !== 0 && <li>NFTs</li>}
                            <ul class="search-bar-inner">
                              {searchInfo.dataNft.length > 0 &&
                                searchInfo.dataNft.slice(0, 4).map((data) => {
                                  return (
                                    <>
                                      <li>
                                        <Link to={`/view-nft/${data?._id}`}>
                                          {data.nft_name}
                                          {/* <span>{data.description}</span> */}
                                        </Link>
                                      </li>
                                    </>
                                  );
                                })}
                            </ul>
                            {searchInfo.dataCollection.length === 0 &&
                              searchInfo.dataCreator.length === 0 &&
                              searchInfo.dataNft.length === 0 && (
                                <li>
                                  <a>No Result Found!</a>
                                </li>
                              )}
                          </>
                        )}
                      </>
                    )}
                  </ul>
                )}
              </div>
              {/* {localStorage && (
								<ul class='navbar-nav space ml-auto'>
									<li class='nav-item active'>
										<Link class='nav-link' to='/marketplace'>
											Marketplace
										</Link>
									</li>
									<li class='nav-item'>
										<Link class='nav-link' to='/collection'>
											Collections
										</Link>
									</li>
									<li class='nav-item'>
										<Link class='nav-link' to='/creators'>
											Creators
										</Link>
									</li>
									<li class='nav-item contect-btn-wrap'>
										<Link
											class='btn nav-link btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
											to='/connect-wallet'
										>
											CONNECT
										</Link>
									</li>
								</ul>
							)} */}
              {userToken?.accessToken ? (
                <ul class="navbar-nav space ml-auto">
                  <li class="nav-item active">
                    <Link class="nav-link" to="/marketplace">
                      Marketplace
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/collection">
                      Collections
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/creators">
                      Creators
                    </Link>
                  </li>
                  <li
                    class="nav-item wallet dekstop-wallet-wrap"
                    id="wallet-logo"
                  >
                    <a
                      class="nav-link"
                      onClick={() => setWalletPopUp(!walletPopUp)}
                    >
                      <img src={WALLET} />
                    </a>
                  </li>
                  <li class="nav-item wallet mobile-wallet-wrap">
                    <a class="nav-link">
                      <img src={WALLET} /> My Wallet
                    </a>
                    <div class="mobile-wallet-wrap2">
                      <form class="form-group">
                        <input type="text" placeholder="0x595Cb9420d584u45d3" />
                        <CopyToClipboard
                          text={account}
                          onCopy={() => setCopy(true)}
                        >
                          <i
                            className={`far fa-copy ${
                              copy ? "text-success" : " "
                            }`}
                            style={{ cursor: "pointer" }}
                          />
                        </CopyToClipboard>
                      </form>
                      <div class="my-wallet-box">
                        <span>Total Balance</span>
                        <h3>
                          {finalBalance == NaN ? "0" : finalBalance}
                          {parseInt(chainId, 16) == 80001 ||
                          parseInt(chainId, 16) == 137
                            ? " MATIC"
                            : " ETH"}
                        </h3>
                        <a
                          class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn mt-4"
                          onClick={() => setShow(true)}
                        >
                          Add Funds
                        </a>
                      </div>
                    </div>
                  </li>
                  <li class="nav-item dekstop-block">
                    <a class="nav-link">
                      <img src={PROFILE} />
                    </a>
                    <ul class="profile-inner-dropdown">
                      <li class="nav-item">
                        {currentRole === "Creator" ? (
                          <Link
                            class="nav-link user-dropdown"
                            to="/creator-profile"
                            style={{ cusror: "pointer" }}
                          >
                            <i class="fas fa-user"></i> My Profile
                          </Link>
                        ) : (
                          <Link
                            class="nav-link user-dropdown"
                            to="/profile"
                            style={{ cusror: "pointer" }}
                          >
                            <i class="fas fa-user"></i> My Profile
                          </Link>
                        )}
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link user-dropdown"
                          onClick={handleNotification}
                          style={{ cursor: "pointer" }}
                        >
                          <i class="fas fa-bell"></i> Notifications
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link user-dropdown"
                          onClick={handleLogout}
                          style={{ cursor: "pointer" }}
                        >
                          <i class="fas fa-sign-out-alt"></i> Log Out
                        </a>
                      </li>
                    </ul>
                  </li>
                  {/* {<li class='nav-item mobile-block'>
										<a class='nav-link' href='javascript:void(0);'>
											<img src={PROFILE} /> Profile
										</a>
									</li>
									<li class='nav-item mobile-block'>
										<a class='nav-link' href='notifications.html'>
											<i class='fas fa-bell'></i> Notifications
										</a>
									</li>
									<li class='nav-item mobile-block'>
										<a class='nav-link' href='index.html'>
											<i class='fas fa-sign-out-alt'></i> Log Out
										</a>
									</li>} */}
                </ul>
              ) : (
                <ul class="navbar-nav space ml-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="/marketplace">
                      Marketplace
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/collection">
                      Collections
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/creators">
                      Creators
                    </a>
                  </li>
                  <li class="nav-item contect-btn-wrap">
                    <Link
                      class="btn nav-link btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      to="/connect-wallet"
                    >
                      CONNECT
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
      <div
        className={
          walletPopUp ? "sidear-hide my-wallet-wrapper" : "my-wallet-wrapper"
        }
      >
        <h3>
          My Wallet <i class="fas fa-angle-down"></i>
        </h3>
        <form class="form-group">
          <input
            type="text"
            placeholder={
              trimAddress !== "undefined...undefined"
                ? trimAddress
                : "Connect Metamask"
            }
            disabled
            style={{ background: "transparent" }}
          />
          {trimAddress !== "undefined...undefined" && (
            <CopyToClipboard text={account} onCopy={() => setCopy(true)}>
              {copy ? (
                <i
                  className="fa-solid fa-check"
                  style={{ cursor: "pointer", color: "#4472c7" }}
                />
              ) : (
                <i className="far fa-copy" style={{ cursor: "pointer" }} />
              )}
            </CopyToClipboard>
          )}
        </form>
        <div class="my-wallet-box">
          <span>Total Balance</span>
          <h3>
            {finalBalance == NaN ? "0" : finalBalance}
            {parseInt(chainId, 16) == 80001 || parseInt(chainId, 16) == 137
              ? " MATIC"
              : " ETH"}
          </h3>
          <a
            class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn mt-4"
            onClick={() => setShow(true)}
          >
            Add Funds
          </a>
        </div>
      </div>
      <div>
        <div
          className="modal fade"
          id="share-new-modal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <button
                type="button"
                className="close modal-close-btn"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i className="fas fa-times" />
              </button>
              <div className="modal-body">
                <div className="modal-inner-area text-center">
                  <h2>Share</h2>
                  <p>
                    Share content via social media platforms or copy a link to
                    send directly.
                  </p>
                  <ul className="modal-share-icon-slider">
                    <li>
                      <a>
                        <img src="./assets/img/modal/facebook.png" />
                      </a>
                    </li>
                    <li>
                      <a>
                        <img src="./assets/img/modal/linkdin.png" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <img src="./assets/img/modal/instagram.png" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <img src="./assets/img/modal/youtube.png" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <img src="./assets/img/modal/whatsapp.png" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <img src="./assets/img/modal/telegram.png" />
                      </a>
                    </li>
                  </ul>
                  <div className="line-box-wrap">
                    <span>or</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <span>Share the link :</span>
                <div className="url-link">
                  <div className="input-group mr-2">
                    <input
                      type="mail"
                      name="mail"
                      placeholder="https://www.metaprops.com/dummylinkgenerate/NFT1"
                      className="form-control"
                    />
                  </div>
                  <a
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    href="javascript:void(0);"
                    tabIndex={0}
                  >
                    Copy Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="add-wallet-modal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <button
                type="button"
                className="close modal-close-btn"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i className="fas fa-times" />
              </button>
              <div className="modal-body">
                <div className="modal-inner-area text-center">
                  <h2>Add ETH to your wallet</h2>
                  <p>
                    Add Ethereum Cryptocurrency to your digital wallet to
                    continue trading on the platform.
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                {/* <a
                  className="btn btn-block  btn-primary btn-lg font-weight-medium auth-form-btn"
                  href="javascript:void(0);"
                  id="js-ready-sell-modal2"
                >
                  Deposit from an exchange
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="deposit-exchange-modal"
          data-backdrop="static"
          data-keyboard="false"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <button
                type="button"
                className="close modal-close-btn"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i className="fas fa-times" />
              </button>
              <div className="modal-body">
                <div className="modal-inner-area text-center">
                  <h2>Deposit ETH from your exchange</h2>
                  <p>Confirm Credit of Ethereum into your digital wallet.</p>
                </div>
                <div className="form-group">
                  <label>Wallet Address</label>
                  <div className="copy-box-wrap">
                    <input type="text" placeholder="0x595Cb94202CD03F2213dc" />
                    <i className="far fa-copy" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <a
                  className="btn btn-block btn-secoudray btn-lg font-weight-medium auth-form-btn"
                  href
                  tabIndex={0}
                  id="modal-backdrop-remove"
                >
                  Back
                </a>
                <a
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  href
                  id="modal-backdrop-remove"
                >
                  Deposit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onClose={() => setShow(false)}>
        <div style={{ textAlign: "center", padding: "1em" }}>
          <h2 style={{ fontSize: "27px" }}>Add ETH to your wallet</h2>
          <p>
            Add Ethereum Cryptocurrency to your digital wallet to continue
            trading on the platform.
          </p>
          <div className="modal-footer">
            {/* <a
              className="btn btn-block  btn-primary btn-lg font-weight-medium auth-form-btn"
              onClick={handleDepositModal}
              id="js-ready-sell-modal2"
            >
              Deposit from an exchange
            </a> */}
          </div>
        </div>
      </Modal>
      <Modal show={showNested} onClose={() => setShowNested(false)}>
        <div style={{ padding: "1em" }}>
          <h2 style={{ textAlign: "center", fontSize: "27px" }}>
            Deposit ETH from your exchange
          </h2>
          <p style={{ textAlign: "center" }}>
            Confirm Credit of Ethereum into your digital wallet.
          </p>
          <div className="form-group">
            <label
              style={{
                fontWeight: "600",
                paddingBottom: "5px",
                textAlign: "left !important",
              }}
            >
              Wallet Address
            </label>
            <div className="copy-box-wrap deposit_input_box mb-2">
              <input
                type="text"
                placeholder={account}
                style={{ width: "80%" }}
              />
              <CopyToClipboard text={account} onCopy={() => setCopy(true)}>
                <i
                  className={`far fa-copy ${copy ? "text-success" : " "}`}
                  style={{ cursor: "pointer" }}
                />
              </CopyToClipboard>
            </div>
            <div className="deposit_all_btn">
              <a
                className="btn btn-block btn-secoudray btn-lg font-weight-medium auth-form-btn deposit_back_btn"
                id="modal-backdrop-remove"
                style={{ marginTop: "8px" }}
                onClick={() => setShowNested(false)}
              >
                Back
              </a>
              <a
                className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                id="modal-backdrop-remove"
              >
                Deposit
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Header;
