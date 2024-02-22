import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userServices from '../services/users'

import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  TableHead
} from '@mui/material'

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    userServices
      .getAll()
      .then(users => setUsers(users))
      .catch(err => console.log(err))
  }, [])
  if (!users) return <div>hmmm...</div>
  return (
    <>
      <Typography variant='h2'>users</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell scope='col'>username</TableCell>
              <TableCell scope='col'>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell scope='row'>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length ? user.blogs.length + 1 : 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users
