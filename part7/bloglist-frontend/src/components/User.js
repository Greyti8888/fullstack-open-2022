const User = ({ user }) => {
  if (!user) return null
  else
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.title}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
}

export default User
