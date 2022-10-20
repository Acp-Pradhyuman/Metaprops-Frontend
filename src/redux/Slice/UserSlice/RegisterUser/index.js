import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
	name: 'registerUser',
	initialState: {
		roleData: [],
		currentRole: '',
		userTokens: {}
	},
	reducers: {
		setRoleData: (state, action) => {
			state.roleData = action.payload;
		},
		setCurrentRole: (state, action) => {
			state.currentRole = action.payload;
		},
		setUserToken: (state, action) => {
			state.userTokens = action.payload;
		}
	}
});

export const { setRoleData, setCurrentRole, setUserToken } =
	registerSlice.actions;

export default registerSlice.reducer;
