import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import registerSlice from './Slice/UserSlice/RegisterUser/index';
import userSlice from './Slice/UserSlice/GetUser';
import creatorSlice from './Slice/UserSlice/Creator/GetCreator';
import EditCreator from './Slice/UserSlice/Creator/EditCreator';
// import creatorSlice from './Slice/UserSlice/GetCreator';
import getTermsSlice from './Slice/GetTerms';
import getHomeSlice from './Slice/Home';
import getAllCreatorSlice from './Slice/AllCreators';
import getAllCollectionSlice from './Slice/AllCollection';
import getAllMarketplaceSlice from './Slice/AllMarketplace';
import getNftCollectionSlice from './Slice/AllNftCollection';
import getCollectionDetailSlice from './Slice/CollectionDetail';
import getBannerImageSlice from './Slice/BannerImage';
import getHomeSearchSlice from './Slice/HomeSearch';
import getCreatorRankSlice from './Slice/CreatorRanking';
import getOwnedNftSlice from './Slice/OwnedNft';
import getNftDetails from './Slice/NftDetails';
import userProfileSlice from './Slice/ViewCreator';
import getNftOfCreatorSlice from './Slice/NftOfCreator';
import getCreatorProfileSlice from './Slice/CreatorProfile';
import getNotificationSlice from './Slice/Notifications';
import Logout from './Slice/Logout';

const reducers = combineReducers({
	registerUser: registerSlice,
	userInformation: userSlice,
	creatorInformation: creatorSlice,
	creatorEditInformation: EditCreator,
	termsInfo: getTermsSlice,
	homeInfo: getHomeSlice,
	AllCreatorInfo: getAllCreatorSlice,
	allCollectionInfo: getAllCollectionSlice,
	allMarketplaceInfo: getAllMarketplaceSlice,
	nftCollectionInfo: getNftCollectionSlice,
	collectionDetailInfo: getCollectionDetailSlice,
	bannerImageInfo: getBannerImageSlice,
	homeSearchInfo: getHomeSearchSlice,
	creatorRankInfo: getCreatorRankSlice,
	ownedNftInfo: getOwnedNftSlice,
	nftDetail: getNftDetails,
	userProfileInfo: userProfileSlice,
	nftOfCreators: getNftOfCreatorSlice,
	creatorProfileInfo: getCreatorProfileSlice,
  allNotifications: getNotificationSlice,
	logout: Logout
});

const rootReducer = (state, action) => {
	if (action.type === 'logout/logout') {
		state = undefined;
	}
	return reducers(state, action);
};

const persistConfig = {
	key: 'root',
	storage,
	transforms: [
		encryptTransform({
			secretKey: 'my-super-secret-keyForMeta@Prop@$S',
			onError: function (error) {
				console.warn(error);
			}
		})
	]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer
});

export default store;
