import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'userInformation',
	initialState: {
		userInformation: {},
		userOwnedInfo: []
	},
	reducers: {
		setUserData: (state, action) => {
			state.userInformation = action.payload;
		},
		setUserOwned: (state, action) => {
			state.userOwnedInfo = action.payload;
		},
		setUserSort: (state, action) => {
			state.userOwnedInfo = action.payload;
		}
	}
});

export const { setUserData, setUserOwned, setUserSort } = userSlice.actions;

export default userSlice.reducer;
