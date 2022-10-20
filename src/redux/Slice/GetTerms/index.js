import { createSlice } from '@reduxjs/toolkit';

export const getTermsSlice = createSlice({
	name: 'termsInfo',
	initialState: {
		termsInfo: {},
        privacyInfo: {},
        helpInfo: {},
        faqInfo: {}
	},
	reducers: {
		setTerms: (state, action) => {
			state.termsInfo = action.payload;
		},
        setPrivacy: (state, action) => {
			state.privacyInfo = action.payload;
		},
        setHelp: (state, action) => {
			state.helpInfo = action.payload;
		},
        setFaq: (state, action) => {
			state.faqInfo = action.payload;
		}
	}
});

export const { setTerms, setPrivacy, setFaq, setHelp } = getTermsSlice.actions;

export default getTermsSlice.reducer;