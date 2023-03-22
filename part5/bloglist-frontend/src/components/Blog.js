import { useState } from "react"

const Blog = ({ blog, addLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    padding: 10,
    border: 'solid',
    margin: '5px 0px'
  }

  if (showDetails) {
    return (
      <div style={blogStyle}>
        <div>{blog.title} <button onClick={() => setShowDetails(false)}>hide</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={() => addLike(blog)}>like</button></div>
        <div>{blog.user.username}</div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>{blog.title} <button onClick={() => setShowDetails(true)}>view</button></div>
      </div >
    )
  }
}

export default Blog