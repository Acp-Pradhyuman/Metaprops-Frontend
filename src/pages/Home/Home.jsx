import { useState, useEffect } from "react";
import Header from "../../components/Header";
import HomePageBanner from "../../components/Home/HomePageBanner";
import HomePageHero from "../../components/Home/HomePageHero";
import FeaturedCreator from "../../components/Home/HomePageFeaturedCreator";
import MyCollection from "../../components/Home/HomePageMyCollection";
import CreatorRanking from "../../components/Home/HomePageCreatorRanking";
import CreateAndSell from "../../components/Home/HomePageCreateAndSell";
import Typology from "../../components/Home/HomePageTypology";
import BottomBar from "../../components/Home/HomePageBottomBar";
import Footer from "../../components/Home/HomePageFooter";

//Redux
import { setRoleData } from "../../redux/Slice/UserSlice/RegisterUser";
import { useDispatch, useSelector } from "react-redux";
import { handleApiCall } from "../../api/index";
import { endpoints } from "../../utils/endpoints";
import { PopUp } from "../../utils/utility";

function Home_Copy() {
  const roleData = useSelector((state) => state.registerUser.roleData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (roleData.length === 0) {
      getRoleData();
    }
    // slider();
  }, []);
  const getRoleData = async () => {
    let response = await handleApiCall("get", `${endpoints.getRole}`);
    if (response?.data?.success) {
      dispatch(setRoleData(response?.data?.data));
    } else {
      PopUp("Something Went Wrong !", "Internal Server Error", "error");
    }
  };
  return (
    <>
      <Header transparent />
      <HomePageBanner />
      <HomePageHero />
      <FeaturedCreator />
      <MyCollection />
      <CreatorRanking />
      <CreateAndSell />
      <Typology />
      <BottomBar />
      <Footer />
    </>
  );
}

export default Home_Copy;
