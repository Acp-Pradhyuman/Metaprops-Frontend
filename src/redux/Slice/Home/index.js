import { createSlice } from '@reduxjs/toolkit';

export const getHomeSlice = createSlice({
	name: 'home',
	initialState: {
		typologyInfo: {},
		featuredInfo: {},
		collectionInfo: {},
		featureNftInfo: {},
		currentUSDPrice: ''
	},
	reducers: {
		setTypology: (state, action) => {
			state.typologyInfo = action.payload;
		},
		setFeature: (state, action) => {
			state.featuredInfo = action.payload;
		},
		setCollection: (state, action) => {
			state.collectionInfo = action.payload;
		},
		setFeatureNft: (state, action) => {
			state.featureNftInfo = action.payload;
		},
		setCurrentUSDPrice: (state, action) => {
			state.currentUSDPrice = action.payload;
		}
	}
});

export const {
	setTypology,
	setFeature,
	setCollection,
	setFeatureNft,
	setCurrentUSDPrice
} = getHomeSlice.actions;

export default getHomeSlice.reducer;
