import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const timeout = 5000

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const newBlogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      setNotification(errMsg)
      setTimeout(() => {
        setNotification(null)
      }, timeout)
    }

  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const addBlog = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog)
      createdBlog.user = { id: createdBlog.user, username: user.username, name: user.name }
      setBlogs([...blogs, createdBlog])
      newBlogFormRef.current.toggleVisibility()
      setNotification('New blog added')
      setTimeout(() => {
        setNotification(null)
      }, timeout)

    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      setNotification(errMsg)
      setTimeout(() => {
        setNotification(null)
      }, timeout)
    }
  }

  const addLike = async (blog) => {
    try {
      const blogCopy = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      await blogService.update(blogCopy)
      blog.likes += 1
      setNotification('Like added')
      setTimeout(() => {
        setNotification(null)
      }, timeout)
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      setNotification(errMsg)
      setTimeout(() => {
        setNotification(null)
      }, timeout)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      const blogsCopy = blogs.filter(blog => blog.id !== id)
      setBlogs(blogsCopy)
      setNotification('Blog deleted')
      setTimeout(() => {
        setNotification(null)
      }, timeout)
    } catch (err) {
      console.log(err)
      const errMsg = err.response.data.error
      setNotification(errMsg)
      setTimeout(() => {
        setNotification(null)
      }, timeout)
    }
  }

  if (user === null) {
    return (
      <div>
        {notification && <Notification message={notification} />}
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  } else {
    return (
      <>
        <div>
          <h2>blogs</h2>
          {notification && <Notification message={notification} />}

          <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable ref={newBlogFormRef} buttonLabel="new blog">
            <h2>create new</h2>
            <NewBlogForm addBlog={addBlog} />
          </Togglable>
          <ul>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog => <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} username={user.username} />
              )}
          </ul>
        </div>
      </>

    )
  }


}

export default App