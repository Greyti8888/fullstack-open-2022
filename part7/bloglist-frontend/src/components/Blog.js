import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { ListItemText, ListItemButton } from '@mui/material'

const Blog = ({ blog }) => {
  if (Object.keys(blog).length === 0) return null

  return (
    <ListItemButton
      divider={true}
      component={Link}
      to={`/blogs/${blog.id}`}
      style={{ textDecoration: 'none' }}
    >
      <ListItemText primary={blog.title} secondary={blog.author} />
    </ListItemButton>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
