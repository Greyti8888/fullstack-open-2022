import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { create, initializeBlogs } from './reducers/blogsReducer'

const timeout = 5

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const notification = useSelector(state => state.notification.message)

  const newBlogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      dispatch(setNotification(errMsg, timeout))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const addBlog = async blog => {
    try {
      dispatch(create(blog, user))
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
      // const blogCopy = {
      //   ...blog,
      //   likes: blog.likes + 1,
      //   user: blog.user.id
      // }
      // await blogService.update(blogCopy)
      // const newBlogs = blogs.map(bl =>
      //   bl.id === blog.id ? { ...blog, likes: blog.likes + 1 } : bl
      // )
      // setBlogs(newBlogs)
      dispatch(setNotification(`Liked ${blog.title}`, timeout))
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      dispatch(setNotification(errMsg, timeout))
    }
  }

  const deleteBlog = async id => {
    try {
      await blogService.deleteBlog(id)
      // const blogsCopy = blogs.filter(blog => blog.id !== id)
      // setBlogs(blogsCopy)
      dispatch(setNotification('Blog deleted', timeout))
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      dispatch(setNotification(errMsg, timeout))
    }
  }

  if (user === null) {
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
          <h2>blogs</h2>
          {notification && <Notification message={notification} />}

          <p>
            {user.username} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>
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
        </div>
      </>
    )
  }
}

export default App
