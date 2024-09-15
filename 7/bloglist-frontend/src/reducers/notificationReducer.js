import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationChange(_, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    },
  },
})

export const { notificationChange, clearNotification } = notificationSlice.actions

export const setNotification = (message, type) => {
  return async (dispatch) => {
    dispatch(notificationChange({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer