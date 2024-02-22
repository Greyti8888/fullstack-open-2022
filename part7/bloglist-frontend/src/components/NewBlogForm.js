import { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, TextField } from '@mui/material'

const NewBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlogMargin = { marginBottom: '5px' }

  const handleSubmit = async e => {
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
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <TextField
          style={newBlogMargin}
          type='text'
          name='title'
          label='title'
          onChange={({ target }) => setTitle(target.value)}
          value={title}
        />

        <TextField
          style={newBlogMargin}
          type='text'
          name='author'
          label='author'
          onChange={({ target }) => setAuthor(target.value)}
          value={author}
        />

        <TextField
          style={newBlogMargin}
          type='text'
          name='url'
          label='url'
          onChange={({ target }) => setUrl(target.value)}
          value={url}
        />

        <Button
          style={{ margin: '0 0 5px 0' }}
          variant='contained'
          type='submit'
        >
          create
        </Button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default NewBlogForm
