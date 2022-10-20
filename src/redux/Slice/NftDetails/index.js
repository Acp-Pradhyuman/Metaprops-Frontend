import { createSlice } from '@reduxjs/toolkit';

export const getNftDetails = createSlice({
	name: 'nftDetail',
	initialState: {
		currentNFT: {},
		currentActivity: [],
		sellerAddr: ""
	},
	reducers: {
		setCurrentNft: (state, action) => {
			state.currentNFT = action.payload;
		},
		setCurrentActivity: (state, action) => {
			state.currentActivity = action.payload;
		},
		setNftSellerAddr: (state, action) => {
			state.sellerAddr = action.payload;
		}
	}
});

export const { setCurrentNft, setCurrentActivity, setNftSellerAddr } = getNftDetails.actions;

export default getNftDetails.reducer;
