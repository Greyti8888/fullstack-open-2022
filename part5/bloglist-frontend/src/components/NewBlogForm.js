import { useState } from 'react'

import blogService from '../services/blogs';

const NewBlogForm = ({ setNotification, timeout, setVisible }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newBlog = {
        title,
        author,
        url
      }
      await blogService.create(newBlog)
      setVisible(false)
      setTitle('')
      setAuthor('')
      setUrl('')
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>title<input type='text' name='title' onChange={({ target }) => setTitle(target.value)} /></div>
        <div>author<input type='text' name='author' onChange={({ target }) => setAuthor(target.value)} /></div>
        <div>url<input type='text' name='url' onChange={({ target }) => setUrl(target.value)} /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm