import { createSlice } from "@reduxjs/toolkit";

export const getNftOfCreatorSlice = createSlice({
  name: "AllMarketplace",
  initialState: {
    nftOfCreators: [],
    allMarketplaceSearchInfo: [],
    activityInfo: []
  },
  reducers: {
    setNftOfCreatorsPage: (state, action) => {
      if (action.payload === 1) {
        state.nftOfCreators = [];
      } else {
        state.nftOfCreators = [...state.nftOfCreators, ...action.payload];
      }
    },
    setActivityInfo: (state, action) => {
      if (action.payload === 1) {
        state.activityInfo = [];
      } else {
        state.activityInfo = [
          ...state.activityInfo,
          ...action.payload,
        ];
      }
    },
    setNftOfCreators: (state, action) => {
        state.nftOfCreators = action.payload;
      },
    setNftOfCreatorSearch: (state, action) => {
      state.nftOfCreators = action.payload;
    },
    setNftOfCreatorSort: (state, action) => {
      state.nftOfCreators = action.payload;
    },
  },
});

export const { setNftOfCreators, setNftOfCreatorSearch, setActivityInfo, setNftOfCreatorSort, setNftOfCreatorsPage } =
  getNftOfCreatorSlice.actions;

export default getNftOfCreatorSlice.reducer;
