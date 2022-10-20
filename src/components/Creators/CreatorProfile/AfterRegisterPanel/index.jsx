import React, {useState} from "react";
import FilterImg from "../../../../assets/img/user/fillter-head.svg"
import Modal from "../../../commons/Modal/Modal";
import SocialShare from "../../../SocialShare/SocialShare";


const TITLE_IMG = require("../../../../assets/img/section-image/slide-1.png")
const BLUE_TICK = require("../../../../assets/img/home/blue-check.png")
const ETH_IMG = require("../../../../assets/img/section-image/etherim.png")
const AfterRegisterPanel = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <section className="main-pannel-sec pt-0 pb-2 user-profile-align ragister-wrapper-sec">
        <div className="container-fluid px-5">
          <div className="row mb-4">
            <div className="col-md-12">
              <ul className="nav nav-tabs collections-list-wrap row">
                <li className="col-md-3">
                  <a data-toggle="tab" href="#home" className="active">
                    Created
                  </a>
                </li>
                <li className="col-md-3">
                  <a data-toggle="tab" href="#menu1">
                    On Sale
                  </a>
                </li>
                <li className="col-md-3">
                  <a data-toggle="tab" href="#menu2">
                    Sold
                  </a>
                </li>
                <li className="col-md-3">
                  <a data-toggle="tab" href="#menu3">
                    Activity
                  </a>
                </li>
                <li className="share-btn-wrap col-md-3" style={{cursor:"pointer"}}>
                  <a
                    onClick={() => {setShow(true)}}
                  >
                    <i className="fas fa-share-alt" />
                    Share
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="left-side-column">
                <div className="row all-marketplace-wrap">
                  <div className="col-md-3">
                    <div className="d-flex">
                      <div className="fillter-top-area">
                        <img src={FilterImg} />
                        <span>Filter by</span>
                        <i className="fas fa-arrow-down" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 left-side-top-head">
                    <div className="input-group">
                      <input
                        type="search"
                        className="form-control rounded"
                        placeholder="Search Creator NFTs"
                        aria-label="Search"
                        aria-describedby="search-addon"
                      />
                      <i className="fas fa-search" />
                    </div>
                  </div>
                  <div className="col-md-3" />
                  <div className="col-md-3 slect-option-wrap">
                    <details className="custom-select1">
                      <summary className="radios">
                        <input
                          type="radio"
                          name="item"
                          id="default"
                          title="Sort by"
                          defaultChecked
                        />
                        <input
                          type="radio"
                          name="item"
                          id="item1"
                          title="Sort by"
                        />
                        <input
                          type="radio"
                          name="item"
                          id="item2"
                          title="Most Viewed"
                        />
                        <input
                          type="radio"
                          name="item"
                          id="item3"
                          title="Most Favourite"
                        />
                      </summary>
                      <ul className="list">
                        <li>
                          <label htmlFor="item1">Sort by</label>
                        </li>
                        <li>
                          <label htmlFor="item2">Most Viewed</label>
                        </li>
                        <li>
                          <label htmlFor="item3">Most Favourite</label>
                        </li>
                      </ul>
                    </details>
                  </div>
                </div>
                <div className="tab-content tab-content-area">
                  <div id="home" className="tab-pane fade in active">
                    <div className="row mt-4">

                      <div className="marketplace-box-wrapper">
                        <div className="digital-architecture-box">
                          <div className="digital-architecture-img">
                            <img src={TITLE_IMG} />
                            <div className="view-details-wrap">
                              <span>
                                <i className="fa fa-eye" />
                                25k
                              </span>
                              <span>
                                <i className="fa fa-heart" />
                                652
                              </span>
                            </div>
                          </div>
                          <div className="box-details-wrap">
                            <h3>NFT 1</h3>
                            <ul className="listing-style-wrap">
                              <li>
                                <span className="first-col">Creator</span>
                                <span className="second-col">
                                  <a href="javascript:void(0);" tabIndex={0}>
                                    Creator!
                                  </a>{" "}
                                  <img src={BLUE_TICK} />
                                </span>
                              </li>
                              <li>
                                <span className="first-col">Price:</span>
                                <span className="second-col">
                                  <img src={ETH_IMG} />
                                  <span>7.0154</span>
                                  <span className="usdet-wrap">
                                    (USD $20,000)
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="marketplace-box-wrapper">
                        <div className="digital-architecture-box">
                          <div className="digital-architecture-img">
                            <img src={TITLE_IMG} />
                            <div className="view-details-wrap">
                              <span>
                                <i className="fa fa-eye" />
                                25k
                              </span>
                              <span>
                                <i className="fa fa-heart" />
                                652
                              </span>
                            </div>
                          </div>
                          <div className="box-details-wrap">
                            <h3>NFT 1</h3>
                            <ul className="listing-style-wrap">
                              <li>
                                <span className="first-col">Creator</span>
                                <span className="second-col">
                                  <a href="javascript:void(0);" tabIndex={0}>
                                    Creator!
                                  </a>{" "}
                                  <img src={BLUE_TICK} />
                                </span>
                              </li>
                              <li>
                                <span className="first-col">Price:</span>
                                <span className="second-col">
                                  <img src={ETH_IMG} />
                                  <span>7.0154</span>
                                  <span className="usdet-wrap">
                                    (USD $20,000)
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="marketplace-box-wrapper">
                        <div className="digital-architecture-box">
                          <div className="digital-architecture-img">
                            <img src={TITLE_IMG} />
                            <div className="view-details-wrap">
                              <span>
                                <i className="fa fa-eye" />
                                25k
                              </span>
                              <span>
                                <i className="fa fa-heart" />
                                652
                              </span>
                            </div>
                          </div>
                          <div className="box-details-wrap">
                            <h3>NFT 1</h3>
                            <ul className="listing-style-wrap">
                              <li>
                                <span className="first-col">Creator</span>
                                <span className="second-col">
                                  <a href="javascript:void(0);" tabIndex={0}>
                                    Creator!
                                  </a>
                                  <img src={BLUE_TICK} />
                                </span>
                              </li>
                              <li>
                                <span className="first-col">Price:</span>
                                <span className="second-col">
                                  <img src={ETH_IMG} />
                                  <span>7.0154</span>
                                  <span className="usdet-wrap">
                                    (USD $20,000)
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="marketplace-box-wrapper">
                        <div className="digital-architecture-box">
                          <div className="digital-architecture-img">
                            <img src={TITLE_IMG} />
                            <div className="view-details-wrap">
                              <span>
                                <i className="fa fa-eye" />
                                25k
                              </span>
                              <span>
                                <i className="fa fa-heart" />
                                652
                              </span>
                            </div>
                          </div>
                          <div className="box-details-wrap">
                            <h3>NFT 1</h3>
                            <ul className="listing-style-wrap">
                              <li>
                                <span className="first-col">Creator</span>
                                <span className="second-col">
                                  <a href="javascript:void(0);" tabIndex={0}>
                                    Creator!
                                  </a>{" "}
                                  <img src={BLUE_TICK} />
                                </span>
                              </li>
                              <li>
                                <span className="first-col">Price:</span>
                                <span className="second-col">
                                  <img src={ETH_IMG} />
                                  <span>7.0154</span>
                                  <span className="usdet-wrap">
                                    (USD $20,000)
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>


                      <div className="marketplace-box-wrapper">
                        <div className="digital-architecture-box">
                          <div className="digital-architecture-img">
                            <img src={TITLE_IMG} />
                            <div className="view-details-wrap">
                              <span>
                                <i className="fa fa-eye" />
                                25k
                              </span>
                              <span>
                                <i className="fa fa-heart" />
                                652
                              </span>
                            </div>
                          </div>
                          <div className="box-details-wrap">
                            <h3>NFT 1</h3>
                            <ul className="listing-style-wrap">
                              <li>
                                <span className="first-col">Creator</span>
                                <span className="second-col">
                                  <a href="javascript:void(0);" tabIndex={0}>
                                    Creator!
                                  </a>{" "}
                                  <img src={BLUE_TICK} />
                                </span>
                              </li>
                              <li>
                                <span className="first-col">Price:</span>
                                <span className="second-col">
                                  <img src={ETH_IMG} />
                                  <span>7.0154</span>
                                  <span className="usdet-wrap">
                                    (USD $20,000)
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 text-center mb-4 content-wrap">
                        <a
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                          href="all-marketplace.html"
                        >
                          See More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div id="menu1" className="tab-pane fade">
                    <div className="row mt-4">

                    <div className="marketplace-box-wrapper">
                        <div className="digital-architecture-box">
                          <div className="digital-architecture-img">
                            <img src={TITLE_IMG} />
                            <div className="view-details-wrap">
                              <span>
                                <i className="fa fa-eye" />
                                25k
                              </span>
                              <span>
                                <i className="fa fa-heart" />
                                652
                              </span>
                            </div>
                          </div>
                          <div className="box-details-wrap">
                            <h3>NFT 1</h3>
                            <ul className="listing-style-wrap">
                              <li>
                                <span className="first-col">Creator</span>
                                <span className="second-col">
                                  <a href="javascript:void(0);" tabIndex={0}>
                                    Creator!
                                  </a>{" "}
                                  <img src={BLUE_TICK} />
                                </span>
                              </li>
                              <li>
                                <span className="first-col">Price:</span>
                                <span className="second-col">
                                  <img src={ETH_IMG} />
                                  <span>7.0154</span>
                                  <span className="usdet-wrap">
                                    (USD $20,000)
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="marketplace-box-wrapper">
                        <div className="digital-architecture-box">
                          <div className="digital-architecture-img">
                            <img src={TITLE_IMG} />
                            <div className="view-details-wrap">
                              <span>
                                <i className="fa fa-eye" />
                                25k
                              </span>
                              <span>
                                <i className="fa fa-heart" />
                                652
                              </span>
                            </div>
                          </div>
                          <div className="box-details-wrap">
                            <h3>NFT 1</h3>
                            <ul className="listing-style-wrap">
                              <li>
                                <span className="first-col">Creator</span>
                                <span className="second-col">
                                  <a href="javascript:void(0);" tabIndex={0}>
                                    Creator!
                                  </a>{" "}
                                  <img src={BLUE_TICK} />
                                </span>
                              </li>
                              <li>
                                <span className="first-col">Price:</span>
                                <span className="second-col">
                                  <img src={ETH_IMG} />
                                  <span>7.0154</span>
                                  <span className="usdet-wrap">
                                    (USD $20,000)
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="marketplace-box-wrapper">
                        <div className="digital-architecture-box">
                          <div className="digital-architecture-img">
                            <img src={TITLE_IMG} />
                            <div className="view-details-wrap">
                              <span>
                                <i className="fa fa-eye" />
                                25k
                              </span>
                              <span>
                                <i className="fa fa-heart" />
                                652
                              </span>
                            </div>
                          </div>
                          <div className="box-details-wrap">
                            <h3>NFT 1</h3>
                            <ul className="listing-style-wrap">
                              <li>
                                <span className="first-col">Creator</span>
                                <span className="second-col">
                                  <a href="javascript:void(0);" tabIndex={0}>
                                    Creator!
                                  </a>{" "}
                                  <img src={BLUE_TICK} />
                                </span>
                              </li>
                              <li>
                                <span className="first-col">Price:</span>
                                <span className="second-col">
                                  <img src={ETH_IMG} />
                                  <span>7.0154</span>
                                  <span className="usdet-wrap">
                                    (USD $20,000)
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>


                     
                      <div className="col-md-12 text-center mb-4 content-wrap">
                        <a
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                          href="all-marketplace.html"
                        >
                          See More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div id="menu2" className="tab-pane fade">
                    <div className="row mt-4">
                    <div className="marketplace-box-wrapper">
                        <div className="digital-architecture-box">
                          <div className="digital-architecture-img">
                            <img src={TITLE_IMG} />
                            <div className="view-details-wrap">
                              <span>
                                <i className="fa fa-eye" />
                                25k
                              </span>
                              <span>
                                <i className="fa fa-heart" />
                                652
                              </span>
                            </div>
                          </div>
                          <div className="box-details-wrap">
                            <h3>NFT 1</h3>
                            <ul className="listing-style-wrap">
                              <li>
                                <span className="first-col">Creator</span>
                                <span className="second-col">
                                  <a href="javascript:void(0);" tabIndex={0}>
                                    Creator!
                                  </a>{" "}
                                  <img src={BLUE_TICK} />
                                </span>
                              </li>
                              <li>
                                <span className="first-col">Price:</span>
                                <span className="second-col">
                                  <img src={ETH_IMG} />
                                  <span>7.0154</span>
                                  <span className="usdet-wrap">
                                    (USD $20,000)
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="marketplace-box-wrapper">
                        <div className="digital-architecture-box">
                          <div className="digital-architecture-img">
                            <img src={TITLE_IMG} />
                            <div className="view-details-wrap">
                              <span>
                                <i className="fa fa-eye" />
                                25k
                              </span>
                              <span>
                                <i className="fa fa-heart" />
                                652
                              </span>
                            </div>
                          </div>
                          <div className="box-details-wrap">
                            <h3>NFT 1</h3>
                            <ul className="listing-style-wrap">
                              <li>
                                <span className="first-col">Creator</span>
                                <span className="second-col">
                                  <a href="javascript:void(0);" tabIndex={0}>
                                    Creator!
                                  </a>{" "}
                                  <img src={BLUE_TICK} />
                                </span>
                              </li>
                              <li>
                                <span className="first-col">Price:</span>
                                <span className="second-col">
                                  <img src={ETH_IMG} />
                                  <span>7.0154</span>
                                  <span className="usdet-wrap">
                                    (USD $20,000)
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 text-center mb-4 content-wrap">
                        <a
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                          href="all-marketplace.html"
                        >
                          See More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div id="menu3" className="tab-pane fade">
                    <div className="row mt-4 mb-4">
                      <div className="col-md-12 activity-table-wrap table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Activity</th>
                              <th>Item</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>From</th>
                              <th>To</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Created</td>
                              <td>Untiled</td>
                              <td>- - -</td>
                              <td>01</td>
                              <td>Address</td>
                              <td>You</td>
                              <td>01/01/2021</td>
                            </tr>
                            <tr>
                              <td>Created</td>
                              <td>Untiled</td>
                              <td>- - -</td>
                              <td>01</td>
                              <td>Address</td>
                              <td>You</td>
                              <td>01/01/2021</td>
                            </tr>
                            <tr>
                              <td>Created</td>
                              <td>Untiled</td>
                              <td>- - -</td>
                              <td>01</td>
                              <td>Address</td>
                              <td>You</td>
                              <td>01/01/2021</td>
                            </tr>
                           
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal show={show} onClose={() => setShow(false)}>
        <SocialShare />
      </Modal>
    </>
  );
};

export default AfterRegisterPanel;
