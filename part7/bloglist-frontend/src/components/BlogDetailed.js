import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Box,
  Typography,
  TableBody
} from '@mui/material'

const BlogDetailed = ({ blog, addLike, deleteBlog, addComment, username }) => {
  if (Object.keys(blog).length === 0) return null

  const headStyle = { width: '50px', border: '1px solid' }
  const contentStyle = { border: '1px solid' }

  const navigate = useNavigate()

  const deleteButtonStyle = {
    display: blog.user.username === username ? '' : 'none'
  }

  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
      navigate('/')
    }
  }

  const handleComment = e => {
    e.preventDefault()
    const comment = e.target[0].value
    e.target[0].value = ''
    if (comment) addComment(blog.id, comment)
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell variant='head' sx={headStyle}>
                <Typography variant='button'>TITLE</Typography>
              </TableCell>
              <TableCell variant='body' sx={contentStyle}>
                <Typography variant='h6'>{blog.title}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head' sx={headStyle}>
                <Typography variant='button'>AUTHOR</Typography>
              </TableCell>
              <TableCell variant='body' sx={contentStyle}>
                <Typography variant='h6'>{blog.author}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head' sx={headStyle}>
                <Typography variant='button'>LINK</Typography>
              </TableCell>
              <TableCell variant='body' sx={contentStyle}>
                <Typography variant='h6'>{blog.url}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head' sx={headStyle}>
                <Typography variant='button'>LIKES</Typography>
              </TableCell>
              <TableCell variant='body' sx={contentStyle}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant='h6'>{blog.likes}</Typography>
                  <Button variant='contained' onClick={() => addLike(blog)}>
                    LIKE
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head' sx={headStyle}>
                <Typography variant='button'>USER</Typography>
              </TableCell>
              <TableCell variant='body' sx={contentStyle}>
                <Typography variant='h6'>{blog.user.username}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          variant='contained'
          color='error'
          style={deleteButtonStyle}
          onClick={handleDelete}
        >
          delete
        </Button>
      </Box>
      <Typography>comments</Typography>
      <form onSubmit={handleComment}>
        <div>
          <textarea
            style={{ boxSizing: 'border-box', width: '100%', maxWidth: '100%' }}
          />
        </div>
        <div>
          <Button variant='outlined' type='submit'>
            add comment
          </Button>
        </div>
      </form>

      <ul>
        {blog.comments.map((comment, index) => (
          <li key={`${index}+${comment}`}>{comment}</li>
        ))}
      </ul>
    </>
  )
}

BlogDetailed.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default BlogDetailed
