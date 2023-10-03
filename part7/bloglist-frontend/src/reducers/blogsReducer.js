import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    add: (state, action) => {
      const blog = action.payload
      return [...state, blog]
    },
    setBlogs: (state, action) => action.payload,
    likes: (state, action) => {
      const updatedBlog = action.payload
      const newState = state.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
      return newState
    },
    remove: (state, action) => {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

const { add, setBlogs, likes, remove } = blogsSlice.actions

export const initializeBlogs = user => {
  return async dispatch => {
    if (user) {
      const blogs = await blogsService.getAll()
      dispatch(setBlogs(blogs))
    }
  }
}

export const createBlog = (content, user) => {
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

export const increaseLikes = blog => {
  return async dispatch => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    await blogsService.update({ ...updatedBlog, user: blog.user.id })
    dispatch(likes(updatedBlog))
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogsService.deleteBlog(id)
    dispatch(remove(id))
  }
}

export default blogsSlice.reducer
