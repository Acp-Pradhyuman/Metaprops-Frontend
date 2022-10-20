import React, { useEffect, useState } from "react";
import SliderComponent from "../SliderComponent";
import FeatureCard from "../../FeatureCard";
import { handleApiCall } from "../../../api";
import { endpoints } from "../../../utils/endpoints";
import { setFeature } from "../../../redux/Slice/Home";
import { useDispatch, useSelector } from "react-redux";

const FeatureSlider = () => {
  const dispatch = useDispatch();

  const featureData = useSelector((state) => state.homeInfo.featuredInfo);
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleGetTerms = async () => {
      const response = await handleApiCall("get", `${endpoints.getFeature}`);
      if (response.data.success) {
        setData(response?.data?.data || featureData);
        dispatch(setFeature(response?.data?.data));
      }
    };

    handleGetTerms();
  }, []);

  return (
    <>
      <SliderComponent dots={true}>
        {data.length > 0 &&
          data.map((data) => {
            return (
              <div className="feature_card_width">
                <FeatureCard
                  name={data.name}
                  comapanyImg={data.profile_image}
                  titleImg={data.banner_image}
                  id={data.user_id}
                  isVerify={data.is_verify}
                />
              </div>
            );
          })}
      </SliderComponent>
    </>
  );
};

export default FeatureSlider;
