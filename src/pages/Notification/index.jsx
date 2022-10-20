import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import HomePageFooter from "../../components/Home/HomePageFooter";
import { handleApiCall } from "../../api";
import { endpoints } from "../../utils/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../../redux/Slice/Notifications";
import moment from "moment";
import { PopUp } from "../../utils/utility";

import ClockImg from "../../assets/img/modal/clock-icon.svg";

const Notification = () => {
  const dispatch = useDispatch();

  const [deleteId, setDeleteId] = useState(null);
  const [viewAll, setViewAll] = useState(10);

  const notificationData = useSelector(
    (state) => state.allNotifications.allNotifications
  );

  const userInfo = useSelector((state) => state.registerUser.userTokens);

  const userId = userInfo && userInfo?.data && userInfo?.data?._id;

  useEffect(() => {
    userId !== undefined && handleNotifications();
  }, []);

  useEffect(() => {
    handleNotifications();
  }, [viewAll]);

  useEffect(() => {
    deleteId !== null && handleDeleteNotification();
    userId !== undefined && handleNotifications();
  }, [deleteId]);

  const handleNotifications = async () => {
    try {
      const response = await handleApiCall(
        "get",
        `${endpoints.getNotification}?userId=${userId}&limit=${viewAll}`
      );
      if (response?.data?.success) {
        dispatch(setNotifications(response?.data?.data));
      }
    } catch (error) {
      PopUp("Something Went Wrong", error.response.message, "error");
    }
  };

  const handleClearAll = async () => {
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.getClearAllNotification}?userId=${userId}`
      );
      if (response?.data?.success) {
        dispatch(setNotifications(response?.data?.data));
      }
    } catch (error) {
      PopUp("Something Went Wrong", error.response.message, "error");
    }
  };

  const handleDeleteNotification = async () => {
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.deleteNotification}?id=${deleteId}`
      );
      if (response?.data?.success) {
        // dispatch(setNotifications(response?.data?.data));
        // window.location.reload();
        userId !== undefined && handleNotifications();
      }
    } catch (error) {
      PopUp("Something Went Wrong", error.response.message, "error");
    }
  };
  return (
    <>
      <Header />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="top-heading-are">
                <h2>Notifications</h2>
                <div className="row">
                  <div className="col-md-7">
                    <p>
                      Please see all notifications from Activity on NFTs that
                      you own or have sold.
                    </p>
                  </div>
                  <div className="col-md-5 privacy-policy-search notificatin-wrap d-flex">
                    <div className="sort-tab-wrap"></div>
                    {notificationData && notificationData.length > 0 && (
                      <div className="clear-all-btn">
                        <a
                          className="btn btn-block btn-secoundry btn-lg font-weight-medium auth-form-btn"
                          onClick={() => handleClearAll()}
                        >
                          Clear All
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              {notificationData && notificationData.length > 0 ? (
                <>
                  <ul className="all-notification-list">
                    {notificationData.length > 0 &&
                      notificationData.map((data) => {
                        return (
                          <>
                            <li className="d-flex read-bead-list">
                              <div className="notification-wrapper">
                                <a href="javascript:void(0);">
                                  {data.notification_activity}
                                </a>
                                <span>{data.receiver_name}</span>
                                <p>{data.description && data.description}</p>
                              </div>
                              <div className="d-flex notification-timing">
                                <img src={ClockImg} />
                                <span>
                                  {data.createdAt &&
                                    moment(data.createdAt).format(
                                      "MMMM DD, YYYY HH:mm"
                                    )}
                                </span>
                              </div>
                              <span
                                className="cross-icon"
                                onClick={() => setDeleteId(data._id)}
                                style={{ cursor: "pointer" }}
                              >
                                <i className="fas fa-times" />
                              </span>
                            </li>
                          </>
                        );
                      })}
                  </ul>
                  {notificationData &&
                    notificationData.length > 9 &&
                    viewAll !== 0 && (
                      <div className="text-center content-wrap mt-5">
                        <a
                          className="btn d-block btn-primary btn-lg font-weight-medium auth-form-btn"
                          onClick={() => setViewAll(0)}
                        >
                          View All
                        </a>
                      </div>
                    )}
                </>
              ) : (
                ""
                // <h4 className="notification-text" style={{ textAlign: "center" }}>
                //   Notifications will appear here.
                // </h4>
              )}
            </div>
          </div>
        </div>
      </section>
      <HomePageFooter />
    </>
  );
};

export default Notification;
