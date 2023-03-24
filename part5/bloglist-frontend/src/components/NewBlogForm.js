import { useState } from 'react'
import PropTypes from 'prop-types'

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
        <div>title<input type='text' name='title' onChange={({ target }) => setTitle(target.value)} value={title} /></div>
        <div>author<input type='text' name='author' onChange={({ target }) => setAuthor(target.value)} value={author} /></div>
        <div>url<input type='text' name='url' onChange={({ target }) => setUrl(target.value)} value={url} /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default NewBlogForm