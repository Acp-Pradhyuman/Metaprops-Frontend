import React, { useState, useEffect } from "react";
import { handleApiCall } from "../../../api";
import { endpoints } from "../../../utils/endpoints";
import { useSelector, useDispatch } from "react-redux";
import { setCreatorRank } from "../../../redux/Slice/CreatorRanking";
import { Link } from "react-router-dom";

//Static
import SHAPE_IMAGE from "../../../assets/img/home/mdi-shape.svg";
const CREATOR_IMAGE = require("../../../assets/img/home/creator-icon1.png");
const ETH_IMAGE = require("../../../assets/img/section-image/etherim.png");
const FILE_IMAGE = require("../../../assets/img/home/file-type-img.png");

function CreatorRanking() {
  const dispatch = useDispatch();
  const [showCreatorRank, setShowCreatorRank] = useState(false);
  const [showRank, setShowRank] = useState("7days");
  const creatorRankData = useSelector(
    (state) => state.creatorRankInfo.creatorRankingInfo
  );
  const handleCreatorRank = (value) => {
    setShowRank(value);
  };
  const handleGetTerms = async () => {
    const response = await handleApiCall(
      "get",
      `${endpoints.getCreatorRank}=${showRank}`
    );
    if (response.data.success) {
      dispatch(setCreatorRank(response?.data?.data));
    }
  };
  useEffect(() => {
    handleGetTerms();
  }, [showRank]);

  return (
    <div>
      <section class="py-0">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="top-heading-are text-center">
                <h2>
                  Creator Ranking over
                  <span
                    class="all-categorys ml-2"
                    onClick={() => setShowCreatorRank(!showCreatorRank)}
                  >
                    last{" "}
                    {showRank === "30days"
                      ? `${showRank?.substring(0, 2)} ${showRank?.substring(
                          showRank.length - 4
                        )}`
                      : `${showRank?.substring(0, 1)} ${showRank?.substring(
                          showRank.length - 4
                        )}`}
                    {showCreatorRank ? (
                      <i className="fas fa-angle-up"></i>
                    ) : (
                      <i class="fas fa-angle-down"></i>
                    )}
                    {showCreatorRank && (
                      <ul className="categorys-lists">
                        <div>
                          <li onClick={() => handleCreatorRank("7days")}>
                            <div>
                              <img src={SHAPE_IMAGE} />
                              <span>7 Days</span>
                            </div>
                          </li>
                          <li onClick={() => handleCreatorRank("30days")}>
                            <div>
                              <img src={SHAPE_IMAGE} />
                              <span>30 Days</span>
                            </div>
                          </li>
                          <li onClick={() => handleCreatorRank("1year")}>
                            <div>
                              <img src={SHAPE_IMAGE} />
                              <span>1 Year</span>
                            </div>
                          </li>
                        </div>
                      </ul>
                    )}
                  </span>
                </h2>
                <p>
                  The following list is a ranking of the top performing creators
                  on the platform. These are ranked by sales volume and sales
                  value. Adjust the timescale to compare over different
                  durations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row mt-3">
            {creatorRankData.length > 0 &&
              creatorRankData.map((data, index) => {
                return (
                  <>
                    <div class="col-lg-3 col-md-4 col-sm-6 col-6">
                      {/* <a href={`/view-creator/${data._id}`}> */}
                      <div class="creator-ranking-box">
                        <div
                          class="creator-icon"
                          style={{
                            background: `url(${FILE_IMAGE})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <img
                            src={
                              !data.creator_info
                                ? CREATOR_IMAGE
                                : data.creator_info.profile_image
                            }
                          />
                        </div>
                        <div class="creator-ranking-details">
                          <Link
                            to={`/view-creator/${data?.creator_info?.user_id}`}
                          >
                            <h3>
                              {data?.creator_info?.name.length < 13
                                ? data?.creator_info?.name
                                : `${data?.creator_info?.name.substring(
                                    0,
                                    13
                                  )}...`}
                              {/* {`${(data.creator_info.name).substring(0,14)}...`} */}
                            </h3>{" "}
                          </Link>
                          <span
                            style={{
                              position: "absolute",
                              top: "-3%",
                              left: "92%",
                              fontWeight: "700",
                              opacity: "0.7",
                              fontSize: "1.3rem",
                            }}
                          >
                            {index + 1}
                          </span>

                          <div class="creator-details">
                            <img src={ETH_IMAGE} className="mr-1" width="15" />
                            <span>{data.price.toFixed(4)}</span>
                            <span class="rating-percentage">
                              {data.percentage > 0
                                ? `+${data.percentage.toFixed(2)}%`
                                : data.percentage < 0
                                ? `${data.percentage.toFixed(2)}%`
                                : "0.00%"}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* </a> */}
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreatorRanking;
