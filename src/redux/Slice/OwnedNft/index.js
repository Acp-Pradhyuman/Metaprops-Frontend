import { createSlice } from "@reduxjs/toolkit";

export const getOwnedNftSlice = createSlice({
  name: "ownedNftInfo",
  initialState: {
    ownedNftInfo: {},
    favoritedNftInfo: {},
  },
  reducers: {
    setOwnedNft: (state, action) => {
      state.ownedNftInfo = action.payload;
    },
    setFavoritedNft: (state, action) => {
      state.favoritedNftInfo = action.payload;
    },
  },
});

export const { setOwnedNft, setFavoritedNft } = getOwnedNftSlice.actions;

export default getOwnedNftSlice.reducer;
