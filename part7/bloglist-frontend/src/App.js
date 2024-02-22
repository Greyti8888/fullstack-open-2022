import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

import {
  Container,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  AppBar,
  Toolbar,
  Box,
  List,
  Typography
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

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
  removeBlog,
  comment
} from './reducers/blogsReducer'
import { userLogin, logout, setInintialUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const timeout = 5

const loginFormMargin = { marginBottom: '10px' }

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const notification = useSelector(state => state.notification)

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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = async e => {
    e.preventDefault()
    try {
      dispatch(userLogin({ username, password }))
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      dispatch(setNotification(errMsg, 'error', timeout))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const addBlog = async blog => {
    try {
      dispatch(createBlog(blog, user))
      newBlogFormRef.current.toggleVisibility()
      dispatch(setNotification('New blog added', 'success', timeout))
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      dispatch(setNotification(errMsg, 'error', timeout))
    }
  }

  const addLike = async blog => {
    try {
      dispatch(increaseLikes(blog))
      dispatch(setNotification(`Liked ${blog.title}`, 'success', timeout))
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      dispatch(setNotification(errMsg, 'error', timeout))
    }
  }

  const deleteBlog = async id => {
    try {
      dispatch(removeBlog(id))
      dispatch(setNotification('Blog deleted', 'success', timeout))
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      dispatch(setNotification(errMsg, 'error', timeout))
    }
  }

  const addComment = async (blogId, text) => {
    try {
      dispatch(comment(blogId, text))
      dispatch(setNotification('Comment added', 'success', timeout))
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      dispatch(setNotification(errMsg, 'error', timeout))
    }
  }
  if (!user.username) {
    return (
      <Container maxWidth='xs'>
        {notification.message && <Notification {...notification} />}
        <h2>Log in to application</h2>
        <form
          onSubmit={handleLogin}
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <TextField
            style={loginFormMargin}
            id='username'
            type='text'
            label='username'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            style={loginFormMargin}
            label='password'
            id='password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={handleClickShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            id='login-button'
            variant='contained'
            color='primary'
            type='submit'
          >
            login
          </Button>
        </form>
      </Container>
    )
  } else {
    return (
      <Container>
        <AppBar position='static' sx={{ marginBottom: '10px' }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Button color='inherit' component={Link} to='/'>
                home
              </Button>
              <Button color='inherit' component={Link} to='/users'>
                users
              </Button>
            </Box>
            <span>
              {user.username} logged in{' '}
              <button onClick={handleLogout}>logout</button>
            </span>
          </Toolbar>
        </AppBar>
        {notification.message && <Notification {...notification} />}
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
                addComment={addComment}
                username={user.username}
              />
            }
          />
          <Route
            path='/'
            element={
              <>
                <Typography variant='h2' gutterBottom={true}>
                  blogs
                </Typography>
                <Togglable ref={newBlogFormRef} buttonLabel='new blog'>
                  <Typography variant='h5' gutterBottom={true}>
                    create new
                  </Typography>
                  <NewBlogForm addBlog={addBlog} />
                </Togglable>
                <List>
                  {[...blogs]
                    .sort((a, b) => b.likes - a.likes)
                    .map(blog => (
                      <Blog key={blog.id} blog={blog} />
                    ))}
                </List>
              </>
            }
          />
        </Routes>
      </Container>
    )
  }
}

export default App
