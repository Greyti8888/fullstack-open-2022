import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, { data }] = useMutation(LOGIN)

  useEffect(() => {
    if (data) {
      props.setToken(data.login.value)
      localStorage.setItem('library-token', data.login.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (!props.show) {
    return null
  }

  const handleLogin = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <label>
        username{' '}
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        password
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button type='submit'>login</button>
    </form>
  )
}

export default Login
