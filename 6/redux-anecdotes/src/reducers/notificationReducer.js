import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		notificationChange(_, action) {
            console.log('this is', action.payload)
			return action.payload;
		},
	},
});

export const { notificationChange } = notificationSlice.actions;

export default notificationSlice.reducer;