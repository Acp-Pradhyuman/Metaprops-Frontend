import { createSlice } from "@reduxjs/toolkit";

export const getNftCollectionSlice = createSlice({
  name: "nftCollection",
  initialState: {
    nftCollectionInfo: {},
  },
  reducers: {
    setNftCollection: (state, action) => {
      state.nftCollectionInfo = action.payload;
    },
  },
});

export const { setNftCollection } = getNftCollectionSlice.actions;

export default getNftCollectionSlice.reducer;
