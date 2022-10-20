import { createSlice } from "@reduxjs/toolkit";

export const getCreatorRankSlice = createSlice({
  name: "creatorRanking",
  initialState: {
    creatorRankingInfo: {},
  },
  reducers: {
    setCreatorRank: (state, action) => {
      state.creatorRankingInfo = action.payload;
    },
  },
});

export const { setCreatorRank } = getCreatorRankSlice.actions;

export default getCreatorRankSlice.reducer;
