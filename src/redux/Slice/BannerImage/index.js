import { createSlice } from "@reduxjs/toolkit";

export const getBannerImageSlice = createSlice({
  name: "nftCollection",
  initialState: {
    bannerImageInfo: {},
  },
  reducers: {
    setBannerImage: (state, action) => {
      state.bannerImageInfo = action.payload;
    },
  },
});

export const { setBannerImage } = getBannerImageSlice.actions;

export default getBannerImageSlice.reducer;
