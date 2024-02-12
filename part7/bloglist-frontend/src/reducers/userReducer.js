import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    logout: () => {
      window.localStorage.removeItem('loggedBloglistUser')
      return {}
    }
  }
})

export const { setUser, logout } = userSlice.actions

export const userLogin = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export const setInintialUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export default userSlice.reducer
