import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import BlogDetailed from './components/BlogDetailed'

import { setNotification } from './reducers/notificationReducer'
import {
  createBlog,
  initializeBlogs,
  increaseLikes,
  removeBlog
} from './reducers/blogsReducer'
import { userLogin, logout, setInintialUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const timeout = 5

const navigationStyle = { padding: '5px' }

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const notification = useSelector(state => state.notification.message)

  const newBlogFormRef = useRef()
  const dispatch = useDispatch()

  const personMatch = useMatch('/users/:id')
  const personData = personMatch
    ? users.find(user => user.id === personMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blogData = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  useEffect(() => {
    dispatch(setInintialUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs(user))
  }, [user])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      dispatch(userLogin({ username, password }))
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      dispatch(setNotification(errMsg, timeout))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const addBlog = async blog => {
    try {
      dispatch(createBlog(blog, user))
      newBlogFormRef.current.toggleVisibility()
      dispatch(setNotification('New blog added', timeout))
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      dispatch(setNotification(errMsg, timeout))
    }
  }

  const addLike = async blog => {
    try {
      dispatch(increaseLikes(blog))
      dispatch(setNotification(`Liked ${blog.title}`, timeout))
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      dispatch(setNotification(errMsg, timeout))
    }
  }

  const deleteBlog = async id => {
    try {
      dispatch(removeBlog(id))
      dispatch(setNotification('Blog deleted', timeout))
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      dispatch(setNotification(errMsg, timeout))
    }
  }
  if (!user.username) {
    return (
      <div>
        {notification && <Notification message={notification} />}
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='Username'>username </label>
            <input
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor='Password'>password </label>
            <input
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type='submit'>
            login
          </button>
        </form>
      </div>
    )
  } else {
    return (
      <>
        <div>
          <Link style={navigationStyle} to='/'>
            Home
          </Link>
          <Link style={navigationStyle} to='/users'>
            Users
          </Link>
          <h2>blogs</h2>
          {notification && <Notification message={notification} />}

          <p>
            {user.username} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>
          <Routes>
            <Route path='/users/:id' element={<User user={personData} />} />
            <Route path='/users' element={<Users />} />
            <Route
              path='/blogs/:id'
              element={
                <BlogDetailed
                  blog={blogData || {}}
                  addLike={addLike}
                  deleteBlog={deleteBlog}
                  username={user.username}
                />
              }
            />
            <Route
              path='/'
              element={
                <>
                  <Togglable ref={newBlogFormRef} buttonLabel='new blog'>
                    <h2>create new</h2>
                    <NewBlogForm addBlog={addBlog} />
                  </Togglable>
                  <ul>
                    {[...blogs]
                      .sort((a, b) => b.likes - a.likes)
                      .map(blog => (
                        <Blog
                          key={blog.id}
                          blog={blog}
                          addLike={addLike}
                          deleteBlog={deleteBlog}
                          username={user.username}
                        />
                      ))}
                  </ul>
                </>
              }
            />
          </Routes>
        </div>
      </>
    )
  }
}

export default App
