import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, addLike, deleteBlog, username }) => {
  if (Object.keys(blog).length === 0) return null
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
      <li className='blog' style={blogStyle}>
        <div>
          {blog.title} - {blog.author}{' '}
          <button onClick={() => setShowDetails(false)}>hide</button>
        </div>
        <a href={`//${blog.url}`}>{blog.url}</a>
        <div>
          {blog.likes} <button onClick={() => addLike(blog)}>like</button>
        </div>
        <div>added by {blog.user.username}</div>
        <button style={deleteButtonStyle} onClick={handleDelete}>
          delete
        </button>
      </li>
    )
  } else {
    return (
      <li className='blog' style={blogStyle}>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} - {blog.author}{' '}
        </Link>
        <button onClick={() => setShowDetails(true)}>view</button>
      </li>
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
