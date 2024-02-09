import { useEffect, useState } from 'react'
import userServices from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    userServices.getAll().then(users => setUsers(users)).catch((err) => console.log(err))
  }, [])
  if (!users) return <div>hmmm...</div>
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th scope='col'></th>
            <th scope='col'>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <th scope='row'>{user.name}</th>
              <td>{user.blogs.length ? user.blogs.length + 1 : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
