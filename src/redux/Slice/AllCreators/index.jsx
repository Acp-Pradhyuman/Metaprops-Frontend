import { createSlice } from "@reduxjs/toolkit";

export const getAllCreatorSlice = createSlice({
  name: "AllCollection",
  initialState: {
    allCreatorInfo: [],
    allCreatorSearchInfo: [],
  },
  reducers: {
    setAllCreator: (state, action) => {
      if (action.payload === 1) {
        state.allCreatorInfo = [];
      } else {
        state.allCreatorInfo = [...state.allCreatorInfo, ...action.payload];
      }
    },
    setAllCreatorSearch: (state, action) => {
      state.allCreatorInfo = action.payload;
    },
    setAllCreatorSort: (state, action) => {
      state.allCreatorInfo = action.payload;
    },
  },
});

export const { setAllCreator, setAllCreatorSearch, setAllCreatorSort } = getAllCreatorSlice.actions;

export default getAllCreatorSlice.reducer;
