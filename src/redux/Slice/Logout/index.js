import { createSlice } from '@reduxjs/toolkit';

export const logoutSlice = createSlice({
	name: 'logout',
	initialState: {
		value: 0
	},
	reducers: {
		logout: (state) => {
			// From here we can take action only at this "counter" state
			// But, as we have taken care of this particular "logout" action
			// in rootReducer, we can use it to CLEAR the complete Redux Store's state
		}
	}
});

export const { logout } = logoutSlice.actions;

export default logoutSlice.reducer;
