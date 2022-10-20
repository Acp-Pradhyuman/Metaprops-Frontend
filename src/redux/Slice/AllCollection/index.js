import { createSlice } from "@reduxjs/toolkit";

export const getAllCollectionSlice = createSlice({
  name: "AllCollection",
  initialState: {
    allCollectionInfo: [],
  },
  reducers: {
    setAllCollection: (state, action) => {
      if(action.payload === 1){
      state.allCollectionInfo = [];
      }else{

        state.allCollectionInfo = [...state.allCollectionInfo,...action.payload];
      }
    },
    setAllCollectionSearch: (state, action) => {
      state.allCollectionInfo = action.payload;
    },
    setAllCollectionSort: (state, action) => {
      state.allCollectionInfo = action.payload;
    },
  },
});

export const { setAllCollection, setAllCollectionSearch, setAllCollectionSort } = getAllCollectionSlice.actions;

export default getAllCollectionSlice.reducer;
