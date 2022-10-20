import { createSlice } from '@reduxjs/toolkit';

export const creatorSlice = createSlice({
	name: 'creatorInformation',
	initialState: {
		creartorInformation: {}
	},
	reducers: {
		setCreatorData: (state, action) => {
			state.creartorInformation = action.payload;
		}
	}
});

export const { setCreatorData } = creatorSlice.actions;

export default creatorSlice.reducer;
