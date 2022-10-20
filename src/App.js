import React, { lazy, Suspense, useEffect, useState } from "react";

import "./App.css";
import "./assets/css/custom.css";
import "./assets/css/media.css";
// import './assets/css/slick-theme.css';
// import './assets/css/slick.css';
// import './assets/css/stylesheet.css';
import { Route, Routes, useNavigate } from "react-router-dom";

import Loader from "./components/commons/Loader";
import Home_Copy from "./pages/Home/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import CreatorProtectedRoute from "./hoc/OnlyCreator.jsx";
import CreatorRegisterProtectedRoute from "./hoc/RegisteredCreater";
import CreatorProtectedRouteUnregistered from "./hoc/ShowPageIfCreatorIsNotRegister";
import { handleApiCall } from "./api";
import { endpoints } from "./utils/endpoints";
import { logout } from "./redux/Slice/Logout";
import { useSelector, useDispatch } from "react-redux";
import { useMetaMask } from "metamask-react";
import { PopUp } from "./utils/utility";

const CreatorProfile = lazy(() => import("./pages/CreatorProfile"));
const Collection = lazy(() => import("./pages/Collection"));
const Creator = lazy(() => import("./pages/Creator"));
const ConnectWallet = lazy(() => import("./pages/ConnectWallet"));
const ConnectMetamask = lazy(() => import("./pages/ConnectMetamask"));
const MarketPlace = lazy(() => import("./pages/MarketPlace/index.jsx"));
const RegisterCreator = lazy(() => import("./pages/RegisterCreator"));
// const UserProfile = lazy(() => import('./pages/UserProfile'));
const EditUser = lazy(() => import("./pages/EditUser"));
const AllMarketPlace = lazy(() => import("./pages/AllMarketPlace"));
const EditCreator = lazy(() => import("./pages/EditCreators"));
// import ConnectedUser from './hoc/ConnectedUser'
const UserProfile = lazy(() => import("./pages/UserProfile/index.jsx"));
const Notification = lazy(() => import("./pages/Notification"));
const Terms = lazy(() => import("./pages/Terms"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Help = lazy(() => import("./pages/Help"));
const AddNft = lazy(() => import("./pages/AddNft"));
const Search = lazy(() => import("./pages/Search"));
const SellNft = lazy(() => import("./pages/SellNftPage"));
const ViewNFT = lazy(() => import("./pages/ViewNFT"));
const CollectionDetail = lazy(() => import("./pages/CollectionDetail"));
const EditNft = lazy(() => import("./components/EditNft"));
const ViewCreator = lazy(() => import("./pages/ViewCreator"));
const EditPricePage = lazy(() => import("./pages/EditPricePage"));
const ResaleNft = lazy(() => import("./components/ResaleNft"));


//App files

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState();
  const [expiredNft, setExpiredNft] = useState();
  const account = useMetaMask();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hooksCall = async () => {
    window.ethereum.on("accountsChanged", async (accounts) => {
      if (address && address !== account?.[0]) {
        handleLogout();
      } else if (!account[0] && localStorage.getItem("token")) {
        handleLogout();
      } else {
        setAddress(account[0]);
      }
    });
  };
  useEffect(() => {
    hooksCall();
  }, []);

  const handleLogout = async () => {
    let response = await handleApiCall("put", `${endpoints.logout}`);
    if (response?.data?.success) {
      localStorage.clear();
      dispatch(logout());
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }
  };

  useEffect(() => {
    handleExpiredNft();
  }, []);

  const handleExpiredNft = async () => {
    try {
      const response = await handleApiCall(
        "post",
        `${endpoints.checkExpiredNftSale}`
      );
      if (response?.data?.success) {
        setExpiredNft(response?.data?.data);
      }
    } catch (e) {
      PopUp("Something went wrong", "Internal server error", "error");
    }
  };

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home_Copy />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/creators" element={<Creator />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="/connect-metamask" element={<ConnectMetamask />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/all-marketplace" element={<AllMarketPlace />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help" element={<Help />} />
          <Route path="/search/:string" element={<Search />} />
          <Route path="/view-nft/:id" element={<ViewNFT />} />

          <Route path="/view-creator/:id" element={<ViewCreator />} />

          <Route path="/collection/:id" element={<CollectionDetail />} />

          {/* <Route path='/creator-profile' element={<CreatorProfile />} /> */}
          {/* <Route path='/register-creator' element={<RegisterCreator />} /> */}
          {/* <Route path='/edit-creator' element={<EditCreator />} /> */}
          {/* <Route path='/add-nft' element={<AddNft />} /> */}
          {/* <Route path='/profile' element={<UserProfile />} /> */}

          {/* <Route
						path='/login'
						element={<SignIn onAddressChanged={(address) => {}} />}
					/> */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit-user" element={<EditUser />} />
            <Route path="/resale-nft/:name/:id" element={<ResaleNft />} />

          </Route>
          <Route element={<CreatorProtectedRouteUnregistered />}>
            <Route
              exact
              path="/register-creator"
              element={<RegisterCreator />}
            />
          </Route>
          <Route element={<CreatorProtectedRoute />}>
            <Route path="/creator-profile" element={<CreatorProfile />} />

            <Route element={<CreatorRegisterProtectedRoute />}>
              <Route path="/sell-nft/:id" element={<SellNft />} />
              <Route path="/edit-price/:id" element={<EditPricePage />} />
              <Route path="/edit-price/:id" element={<EditPricePage />} />
              <Route path="/add-nft" element={<AddNft />} />

              <Route path="/edit-nft/:id" element={<EditNft />} />
              <Route path="/edit-creator" element={<EditCreator />} />
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <h2
                className="mt-5"
                style={{
                  display: "grid",
                  placeItems: "center",
                  height: "90vh",
                }}
              >
                URL is Not Found!
              </h2>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
