import { createSlice } from "@reduxjs/toolkit";

export const getCreatorProfileSlice = createSlice({
  name: "AllMarketplace",
  initialState: {
    creatorProfileInfo: [],
    creatorOnSaleInfo: [],
    creatorSoldInfo: [],
    activityInfo: [],
    creatorCalcInfo: {}
  },
  reducers: {
    setNftOfCreatorsPage: (state, action) => {
      if (action.payload === 1) {
        state.creatorProfileInfo = [];
      } else {
        state.creatorProfileInfo = [
          ...state.creatorProfileInfo,
          ...action.payload,
        ];
      }
    },
    setNftOfOnSale: (state, action) => {
      if (action.payload === 1) {
        state.creatorOnSaleInfo = [];
      } else {
        state.creatorOnSaleInfo = [
          ...state.creatorOnSaleInfo,
          ...action.payload,
        ];
      }
    },
    setNftOfOnSold: (state, action) => {
      if (action.payload === 1) {
        state.creatorSoldInfo = [];
      } else {
        state.creatorSoldInfo = [
          ...state.creatorSoldInfo,
          ...action.payload,
        ];
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
    setCreatorProfileInfo: (state, action) => {
      state.creatorProfileInfo = action.payload;
    },
    setCreatorSearchInfo: (state, action) => {
      state.creatorProfileInfo = action.payload;
    },
    setSaleSearchInfo: (state, action) => {
      state.creatorOnSaleInfo = action.payload;
    },
    setSaleSortInfo: (state, action) => {
      state.creatorOnSaleInfo = action.payload;
    },
    setSoldSearchInfo: (state, action) => {
      state.creatorSoldInfo = action.payload;
    },
    setSoldSortInfo: (state, action) => {
      state.creatorSoldInfo = action.payload;
    },
    setCreatorSortInfo: (state, action) => {
      state.creatorProfileInfo = action.payload;
    },
    setCreatorCalcInfo: (state, action) => {
      state.creatorCalcInfo = action.payload;
    },
  },
});

export const {
  setCreatorProfileInfo,
  setCreatorSearchInfo,
  setCreatorSortInfo,
  setNftOfCreatorsPage,
  setNftOfOnSale,
  setSaleSearchInfo,
  setSaleSortInfo,
  setSoldSortInfo,
  setSoldSearchInfo,
  setNftOfOnSold,
  setActivityInfo,
  setCreatorCalcInfo
} = getCreatorProfileSlice.actions;

export default getCreatorProfileSlice.reducer;
