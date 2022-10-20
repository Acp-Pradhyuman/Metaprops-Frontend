import { createSlice } from '@reduxjs/toolkit';

export const creatorEditSlice = createSlice({
	name: 'creatorEditInformation',
	initialState: {
		isEdit: false
	},
	reducers: {
		setIsEdit: (state, action) => {
			state.isEdit = action.payload;
		}
	}
});

export const { setIsEdit } = creatorEditSlice.actions;

export default creatorEditSlice.reducer;
