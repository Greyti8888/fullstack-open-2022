import { Typography, List, ListItemButton } from '@mui/material'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) return null
  else
    return (
      <>
        <Typography variant='h2'>{user.name}</Typography>
        <Typography>added blogs</Typography>
        <List>
          {user.blogs.map(blog => (
            <Link
              key={blog.title}
              to={`/blogs/${blog.id}`}
              style={{ textDecoration: 'none' }}
            >
              <ListItemButton divider={true}>{blog.title}</ListItemButton>
            </Link>
          ))}
        </List>
      </>
    )
}

export default User
