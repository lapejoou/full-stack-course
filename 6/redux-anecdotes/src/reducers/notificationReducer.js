import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		notificationChange(_, action) {
            console.log('this is', action.payload)
			return action.payload;
		},
        clearNotification() {
            return ''
          },
	},
});

export const { notificationChange, clearNotification} = notificationSlice.actions;

export const setNotification = (message, timeInSeconds) => {
    return async (dispatch) => {
      dispatch(notificationChange(message))
      setTimeout(() => {
        dispatch(clearNotification())
      }, timeInSeconds * 1000) 
    }
  }

export default notificationSlice.reducer;