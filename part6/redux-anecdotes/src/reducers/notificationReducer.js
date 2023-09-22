import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => action.payload,
    removeNotification: (state, action) => ''
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer