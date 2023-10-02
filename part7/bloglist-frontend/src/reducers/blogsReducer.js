import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    add: (state, action) => [...state, action.payload],
    setBlogs: (state, action) => action.payload
  }
})

export const { add, setBlogs } = blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const create = (content, user) => {
  return async dispatch => {
    const blog = await blogsService.create(content)
    blog.user = {
      id: user.id,
      username: user.username,
      name: user.name
    }
    dispatch(add(blog))
  }
}

export default blogsSlice.reducer
