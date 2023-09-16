import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, username }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    padding: 10,
    border: 'solid',
    margin: '5px 0px'
  }

  const deleteButtonStyle = {
    display: blog.user.username === username ? '' : 'none'
  }

  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  if (showDetails) {
    return (
      <div style={blogStyle}>
        <div>{blog.title} - {blog.author} <button onClick={() => setShowDetails(false)}>hide</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={() => addLike(blog)}>like</button></div>
        <div>{blog.user.username}</div>
        <button style={deleteButtonStyle} onClick={handleDelete}>delete</button>

      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>{blog.title} - {blog.author} <button onClick={() => setShowDetails(true)}>view</button></div>
      </div >
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog