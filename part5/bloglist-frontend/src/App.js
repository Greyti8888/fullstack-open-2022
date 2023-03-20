import { useState, useEffect } from 'react'

import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({})

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
      console.log(err.message)
    }

  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const handleBlogCreationChange = (target) => {
    const name = target.name
    const value = target.value

    if (name === 'title') {
      setNewBlog({ ...newBlog, title: value })
    }
    else if (name === 'author') {
      setNewBlog({ ...newBlog, author: value })
    }
    else if (name === 'url') {
      setNewBlog({ ...newBlog, url: value })
    }
  }

  const handleBlogCreation = async (e) => {
    e.preventDefault()
    try {
      await blogService.create(newBlog)
      setNewBlog({})
    } catch (err) {
      console.log(err.message)
    }
  }

  if (user === null) {
    return (
      <div>
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
          <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
        <div>
          <h2>create new</h2>
          <form onSubmit={handleBlogCreation}>

            <div>title<input type='text' name='title' onChange={({ target }) => handleBlogCreationChange(target)} /></div>

            <div>author<input type='text' name='author' onChange={({ target }) => handleBlogCreationChange(target)} /></div>

            <div>url<input type='text' name='url' onChange={({ target }) => handleBlogCreationChange(target)} /></div>
            <button type="submit">create</button>
          </form>
        </div>
      </>

    )
  }


}

export default App