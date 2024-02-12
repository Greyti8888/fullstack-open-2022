import PropTypes from 'prop-types'

const BlogDetailed = ({ blog, addLike, deleteBlog, username }) => {
  if (Object.keys(blog).length === 0) return null

  const deleteButtonStyle = {
    display: blog.user.username === username ? '' : 'none'
  }

  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}{' '}
      </h2>
      <a href={`//${blog.url}`}>{blog.url}</a>
      <div>
        {blog.likes} <button onClick={() => addLike(blog)}>like</button>
      </div>
      <div>added by {blog.user.username}</div>
      <button style={deleteButtonStyle} onClick={handleDelete}>
        delete
      </button>
      <p style={{ fontWeight: 'bold' }}>comments</p>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={`${index}+${comment}`}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

BlogDetailed.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default BlogDetailed
