import { createSlice } from "@reduxjs/toolkit";

export const getHomeSearchSlice = createSlice({
  name: "homeSearch",
  initialState: {
    homeSearchInfo: {},
    homSearchKeyword: ""
  },
  reducers: {
    setHomeSearch: (state, action) => {
      state.homeSearchInfo = action.payload;
    },
    setHomeSearchKeyword: (state, action) => {
      state.homSearchKeyword = action.payload;
    },
  },
});

export const { setHomeSearch, setHomeSearchKeyword } = getHomeSearchSlice.actions;

export default getHomeSearchSlice.reducer;
