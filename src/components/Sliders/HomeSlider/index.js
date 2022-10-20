import React, { useEffect, useState } from "react";
import SliderComponent from "../SliderComponent";
import HomeCard from "../../HomeCards/HomeCard";
import { handleApiCall } from "../../../api";
import { endpoints } from "../../../utils/endpoints";
import { setFeatureNft } from "../../../redux/Slice/Home";
import { useDispatch, useSelector } from "react-redux";
import { PopUp } from "../../../utils/utility";

const FeaturedImg = require("../../../assets/img/section-image/slide-1.png");

const HomeSlider = () => {
  const [featuredNft, setFeaturedNft] = useState([]);
  const dispatch = useDispatch();

  const featureNftData = useSelector((state) => state.homeInfo.featureNftInfo);

  useEffect(() => {
    handleGetNfts();
  }, []);

  const handleGetNfts = async () => {
    try {
      const response = await handleApiCall(
        "get",
        `${endpoints.getFeaturedNft}`
      );
      if (response.data.success) {
        setFeaturedNft(response?.data?.data || featureNftData);
        dispatch(setFeatureNft(response?.data?.data));
      }
    } catch (error) {
      PopUp("Something Went Wrong", error.response.message, "error");
    }
  };


  return (
    <>
      <SliderComponent dots={false} arrow={true}>
        {featuredNft.length > 0 &&
          featuredNft.map((data) => {
            return (
              <HomeCard
                featureImg={data?.preview_image}
                likes={
                  data?.likeCountData ? data?.likeCountData?.like_count : 0
                }
                viewCount={
                  data?.views_count?.view_count
                    ? data?.views_count?.view_count
                    : 0
                }
                title={data?.nft_name}
                creator={data?.user_data_new && data?.user_data_new.name}
                ethPrice={
                  data?.token_owner?.price
                    ? data?.token_owner?.price
                    : "Not on sale"
                }
                key={data._id}
                id={data._id}
                creatorProfile={
                  data?.user_data_new && data?.user_data_new.user_id
                }
                isVerify={data?.user_data_new.is_verify}
              />
            );
          })}
      </SliderComponent>
    </>
  );
};

export default HomeSlider;
