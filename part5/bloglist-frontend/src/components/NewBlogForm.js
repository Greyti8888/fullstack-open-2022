import { useState } from 'react'

const NewBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    addBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
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