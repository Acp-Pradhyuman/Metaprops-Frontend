import { createSlice } from '@reduxjs/toolkit';

export const getAllMarketplaceSlice = createSlice({
	name: 'AllMarketplace',
	initialState: {
		allMarketplaceInfo: [],
		allMarketplaceSearchInfo: [],
		searchedTypology: ''
	},
	reducers: {
		setAllMarketPlace: (state, action) => {
			if (action.payload === 1) {
				state.allMarketplaceInfo = [];
			} else {
				state.allMarketplaceInfo = [
					...state.allMarketplaceInfo,
					...action.payload
				];
			}
		},
		setAllMarketPlaceSearch: (state, action) => {
			state.allMarketplaceInfo = action.payload;
		},
		setAllMarketPlaceSort: (state, action) => {
			state.allMarketplaceInfo = action.payload;
		},
		setSearchTypology: (state, action) => {
			state.searchedTypology = action.payload;
		}
	}
});

export const {
	setAllMarketPlace,
	setAllMarketPlaceSearch,
	setAllMarketPlaceSort,
	setSearchTypology
} = getAllMarketplaceSlice.actions;

export default getAllMarketplaceSlice.reducer;
