import { createSlice } from '@reduxjs/toolkit';

export const userProfileSlice = createSlice({
	name: 'userInformation',
	initialState: {
		userProfileInfo: {},
	},
	reducers: {
		setUserProfileInfo: (state, action) => {
			state.userProfileInfo = action.payload;
		}
	}
});

export const { setUserProfileInfo } = userProfileSlice.actions;

export default userProfileSlice.reducer;
