import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => action.payload,
    removeNotification: (state, action) => ''
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions

let timer

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    clearTimeout(timer)
    dispatch(addNotification(message))
    timer = setTimeout(() => dispatch(removeNotification()), seconds * 1000)
  }
}

export default notificationSlice.reducer