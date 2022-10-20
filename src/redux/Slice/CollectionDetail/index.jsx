import { createSlice } from "@reduxjs/toolkit";

export const getCollectionDetailSlice = createSlice({
  name: "nftCollection",
  initialState: {
    collectionDetailInfo: {},
  },
  reducers: {
    setCollectionDetail: (state, action) => {
      state.collectionDetailInfo = action.payload;
    },
    setCollectionSearch: (state, action) => {
      state.collectionDetailInfo = action.payload;
    },
    setCollectionSort: (state, action) => {
      state.collectionDetailInfo = action.payload;
    },
  },
});

export const { setCollectionDetail, setCollectionSearch, setCollectionSort } = getCollectionDetailSlice.actions;

export default getCollectionDetailSlice.reducer;
