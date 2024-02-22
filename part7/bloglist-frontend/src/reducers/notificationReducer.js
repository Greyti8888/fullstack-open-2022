import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', type: '' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      return { message: action.payload.message, type: action.payload.type }
    },
    removeNotification: () => initialState
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions

let timer

export const setNotification = (message, type, seconds) => {
  return async dispatch => {
    clearTimeout(timer)
    dispatch(addNotification({ message, type }))
    timer = setTimeout(() => dispatch(removeNotification()), seconds * 1000)
  }
}

export default notificationSlice.reducer
