import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import HomePageFooter from "../../components/Home/HomePageFooter";
import { endpoints } from "../../utils/endpoints";
import { handleApiCall } from "../../api";
import { setFaq } from "../../redux/Slice/GetTerms";
import parser from "html-react-parser";
import * as moment from "moment";

const FAQ = () => {
  const [faq, setFaq] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [accordion, setAccordion] = useState();
  const catData = faq.filter(
    (data) =>
      data.faq_category_id &&
      data.faq_category_id.faq_category_name === "Blockchain:"
  );
  const catData2 = faq.filter(
    (data) =>
      data.faq_category_id &&
      data.faq_category_id.faq_category_name === "Registration & Signups:"
  );
  const catData3 = faq.filter(
    (data) =>
      data.faq_category_id &&
      data.faq_category_id.faq_category_name ===
        "COPYRIGHT, licences & approvals:"
  );
  const catData4 = faq.filter(
    (data) =>
      data.faq_category_id &&
      data.faq_category_id.faq_category_name ===
        "File uploading and approved file types:"
  );
  const catData5 = faq.filter(
    (data) =>
      data.faq_category_id &&
      data.faq_category_id.faq_category_name === "NFT purchases:"
  );
  const catData6 = faq.filter(
    (data) =>
      data.faq_category_id &&
      data.faq_category_id.faq_category_name === "Costs and Fees:"
  );
  const catData7 = faq.filter(
    (data) =>
      data.faq_category_id &&
      data.faq_category_id.faq_category_name === "WHY METAPROPS?:"
  );
  const catData8 = faq.filter(
    (data) =>
      data.faq_category_id &&
      data.faq_category_id.faq_category_name === "Future of MetaProps:"
  );

  useEffect(() => {
    handleFaq();
  }, []);

  const handleFaq = async () => {
    const response = await handleApiCall("get", `${endpoints.getFaq}`);

    if (response.data.success) {
      setFaq(response?.data?.data);
    }
  };
  // const dispatch = useDispatch();

  // const faqData = useSelector((state) => state.termsInfo.faqInfo);

  // useEffect(() => {
  // 	handleGetTerms();
  // }, []);
  // const handleGetTerms = async () => {
  // 	const response = await handleApiCall('get', `${endpoints.getFaq}`);
  // 	if (response.data.success) {
  // 		dispatch(setFaq(response?.data?.data));
  // 	}
  // };

  const handleToggle = (id, e) => {
    setToggle(!toggle);
    setAccordion(e.target.id);
  };

  return (
    <>
      <Header />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="top-heading-are">
                <h2>FAQs</h2>
                <div className="row">
                  <div className="col-md-12">
                    <p>
                      Please find MetaProps Frequently asked questions stated
                      below. Please contact MetaProps Team in case of further
                      queries.
                    </p>
                  </div>
                  <div className="col-md-5 privacy-policy-search">
                    {/* <div className="input-group mr-2">
                      <input
                        type="search"
                        className="form-control rounded"
                        placeholder="FAQs"
                        aria-label="Search"
                        aria-describedby="search-addon"
                      />
                      <i className="fas fa-search" />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12 help-faq-wrapper meta-web-faq">
              <div className="panel-group" id="accordion">
                <p>
                  <strong>Effective:</strong>&nbsp;March 7th, 2022&nbsp;
                </p>
                <p>
                  <strong>Last Updated</strong>:&nbsp;March 7th, 2022
                </p>
                <div>
                  <h4 className="mt-2">Blockchain:</h4>
                  {catData.length > 0 &&
                    catData.map((data, index) => {
                      return (
                        <div
                          key={data._id}
                          className="panel-group"
                          id="accordion"
                        >
                          <div
                            className="panel panel-default"
                            onClick={(e) => handleToggle(data._id, e)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="panel-heading" id={data._id}>
                              <h3 className="panel-title" id={data._id}>
                                <a id={data._id}>
                                  {data.question}

                                  {toggle && data._id == accordion ? (
                                    <i
                                      class="fa fa-angle-up"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  ) : (
                                    <i
                                      class="fa fa-angle-down"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  )}
                                </a>
                              </h3>
                            </div>
                            {toggle && (
                              <div
                                id={data._id}
                                className={`${
                                  data._id == accordion
                                    ? "panel-collapse in collapse show"
                                    : "panel-collapse in collapse"
                                }`}
                                // className="panel-collapse in collapse show"
                              >
                                <div className="panel-body">
                                  <p>{parser(`${data && data?.answer}`)}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div>
                  <br />
                  <h4 className="mt-2">Registration & Signups:</h4>

                  {catData2.length > 0 &&
                    catData2.map((data, index) => {
                      return (
                        <div
                          key={data._id}
                          className="panel-group"
                          id="accordion"
                        >
                          <div
                            className="panel panel-default"
                            onClick={(e) => handleToggle(data._id, e)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="panel-heading" id={data._id}>
                              <h3 className="panel-title" id={data._id}>
                                <a id={data._id}>
                                  {data.question}

                                  {toggle && data._id == accordion ? (
                                    <i
                                      class="fa fa-angle-up"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  ) : (
                                    <i
                                      class="fa fa-angle-down"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  )}
                                </a>
                              </h3>
                            </div>
                            {toggle && (
                              <div
                                id={data._id}
                                className={`${
                                  data._id === accordion
                                    ? "panel-collapse in collapse show"
                                    : "panel-collapse in collapse"
                                }`}
                                // className="panel-collapse in collapse show"
                              >
                                <div className="panel-body">
                                  <p>{parser(`${data && data?.answer}`)}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div>
                  <br />
                  <h4 className="mt-2">Copyright, licences & approvals:</h4>

                  {catData3.length > 0 &&
                    catData3.map((data, index) => {
                      return (
                        <div
                          key={data._id}
                          className="panel-group"
                          id="accordion"
                        >
                          <div
                            className="panel panel-default"
                            onClick={(e) => handleToggle(data._id, e)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="panel-heading" id={data._id}>
                              <h3 className="panel-title" id={data._id}>
                                <a id={data._id}>
                                  {data.question}

                                  {toggle && data._id == accordion ? (
                                    <i
                                      class="fa fa-angle-up"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  ) : (
                                    <i
                                      class="fa fa-angle-down"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  )}
                                </a>
                              </h3>
                            </div>
                            {toggle && (
                              <div
                                id={data._id}
                                className={`${
                                  data._id === accordion
                                    ? "panel-collapse in collapse show"
                                    : "panel-collapse in collapse"
                                }`}
                                // className="panel-collapse in collapse show"
                              >
                                <div className="panel-body">
                                  <p>{parser(`${data && data?.answer}`)}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div>
                  <h4 className="mt-2">
                    <br />
                    File uploading and approved file types:
                  </h4>

                  {catData4.length > 0 &&
                    catData4.map((data, index) => {
                      return (
                        <div
                          key={data._id}
                          className="panel-group"
                          id="accordion"
                        >
                          <div
                            className="panel panel-default"
                            onClick={(e) => handleToggle(data._id, e)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="panel-heading" id={data._id}>
                              <h3 className="panel-title" id={data._id}>
                                <a id={data._id}>
                                  {data.question}

                                  {toggle && data._id == accordion ? (
                                    <i
                                      class="fa fa-angle-up"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  ) : (
                                    <i
                                      class="fa fa-angle-down"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  )}
                                </a>
                              </h3>
                            </div>
                            {toggle && (
                              <div
                                id={data._id}
                                className={`${
                                  data._id === accordion
                                    ? "panel-collapse in collapse show"
                                    : "panel-collapse in collapse"
                                }`}
                                // className="panel-collapse in collapse show"
                              >
                                <div className="panel-body">
                                  <p>{parser(`${data && data?.answer}`)}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div>
                  <br />
                  <h4 className="mt-2">NFT purchases:</h4>

                  {catData5.length > 0 &&
                    catData5.map((data, index) => {
                      return (
                        <div
                          key={data._id}
                          className="panel-group"
                          id="accordion"
                        >
                          <div
                            className="panel panel-default"
                            onClick={(e) => handleToggle(data._id, e)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="panel-heading" id={data._id}>
                              <h3 className="panel-title" id={data._id}>
                                <a id={data._id}>
                                  {data.question}

                                  {toggle && data._id == accordion ? (
                                    <i
                                      class="fa fa-angle-up"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  ) : (
                                    <i
                                      class="fa fa-angle-down"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  )}
                                </a>
                              </h3>
                            </div>
                            {toggle && (
                              <div
                                id={data._id}
                                className={`${
                                  data._id === accordion
                                    ? "panel-collapse in collapse show"
                                    : "panel-collapse in collapse"
                                }`}
                                // className="panel-collapse in collapse show"
                              >
                                <div className="panel-body">
                                  <p>{parser(`${data && data?.answer}`)}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div>
                  <br />
                  <h4 className="mt-2">Costs and Fees:</h4>

                  {catData6.length > 0 &&
                    catData6.map((data, index) => {
                      return (
                        <div
                          key={data._id}
                          className="panel-group"
                          id="accordion"
                        >
                          <div
                            className="panel panel-default"
                            onClick={(e) => handleToggle(data._id, e)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="panel-heading" id={data._id}>
                              <h3 className="panel-title" id={data._id}>
                                <a id={data._id}>
                                  {data.question}

                                  {toggle && data._id == accordion ? (
                                    <i
                                      class="fa fa-angle-up"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  ) : (
                                    <i
                                      class="fa fa-angle-down"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  )}
                                </a>
                              </h3>
                            </div>
                            {toggle && (
                              <div
                                id={data._id}
                                className={`${
                                  data._id === accordion
                                    ? "panel-collapse in collapse show"
                                    : "panel-collapse in collapse"
                                }`}
                                // className="panel-collapse in collapse show"
                              >
                                <div className="panel-body">
                                  <p>{parser(`${data && data?.answer}`)}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div>
                  <br />
                  <h4 className="mt-2">Why MetaProps?:</h4>
                  {catData7.length > 0 &&
                    catData7.map((data, index) => {
                      return (
                        <div
                          key={data._id}
                          className="panel-group"
                          id="accordion"
                        >
                          <div
                            className="panel panel-default"
                            onClick={(e) => handleToggle(data._id, e)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="panel-heading" id={data._id}>
                              <h3 className="panel-title" id={data._id}>
                                <a id={data._id}>
                                  {data.question}

                                  {toggle && data._id == accordion ? (
                                    <i
                                      class="fa fa-angle-up"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  ) : (
                                    <i
                                      class="fa fa-angle-down"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  )}
                                </a>
                              </h3>
                            </div>
                            {toggle && (
                              <div
                                id={data._id}
                                className={`${
                                  data._id === accordion
                                    ? "panel-collapse in collapse show"
                                    : "panel-collapse in collapse"
                                }`}
                                // className="panel-collapse in collapse show"
                              >
                                <div className="panel-body">
                                  <p>{parser(`${data && data?.answer}`)}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div>
                  <br />
                  <h4 className="mt-2">Future of MetaProps:</h4>

                  {catData8.length > 0 &&
                    catData8.map((data, index) => {
                      return (
                        <div
                          key={data._id}
                          className="panel-group"
                          id="accordion"
                        >
                          <div
                            className="panel panel-default"
                            onClick={(e) => handleToggle(data._id, e)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="panel-heading" id={data._id}>
                              <h3 className="panel-title" id={data._id}>
                                <a id={data._id}>
                                  {data.question}

                                  {toggle && data._id == accordion ? (
                                    <i
                                      class="fa fa-angle-up"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  ) : (
                                    <i
                                      class="fa fa-angle-down"
                                      aria-hidden="true"
                                      id={data._id}
                                    ></i>
                                  )}
                                </a>
                              </h3>
                            </div>
                            {toggle && (
                              <div
                                id={data._id}
                                className={`${
                                  data._id === accordion
                                    ? "panel-collapse in collapse show"
                                    : "panel-collapse in collapse"
                                }`}
                                // className="panel-collapse in collapse show"
                              >
                                <div className="panel-body">
                                  <p>{parser(`${data && data?.answer}`)}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HomePageFooter />
    </>
  );
};

export default FAQ;
