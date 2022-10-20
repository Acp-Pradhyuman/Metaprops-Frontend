import { createSlice } from "@reduxjs/toolkit";

export const getNotificationSlice = createSlice({
  name: "AllMarketplace",
  initialState: {
    allNotifications: [],
  },
  reducers: {
    setNotificationPage: (state, action) => {
      if (action.payload === 1) {
        state.allNotifications = [];
      } else {
        state.allNotifications = [...state.allNotifications, ...action.payload];
      }
    },
    setNotifications: (state, action) => {
        state.allNotifications = action.payload;
      },
  },
});

export const { setNotifications, setNotificationPage } =
getNotificationSlice.actions;

export default getNotificationSlice.reducer;
