import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { USER } from '../queries'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    refetchQueries: [{ query: USER }]
  })

  useEffect(() => {
    if (result.data) {
      const newToken = result.data.login.value
      props.setToken(newToken)
      localStorage.setItem('library-token', newToken)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  if (!props.show) {
    return null
  }

  const handleLogin = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  if (props.token) return <div>You are logged in</div>
  else
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
