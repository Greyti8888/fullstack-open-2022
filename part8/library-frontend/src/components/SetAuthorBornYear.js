import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { SET_AUTHOR_BORN_YEAR, ALL_AUTHORS } from '../queries'

const SetAuthorBornYear = () => {
  const [name, setName] = useState('')
  const [bornYear, setBornYear] = useState('')
  const [setYear, { loading, error, data }] = useMutation(
    SET_AUTHOR_BORN_YEAR,
    {
      refetchQueries: [{ query: ALL_AUTHORS }]
    }
  )

  if (loading) console.log('Updating born year...')
  if (data) console.log(data)
  if (error) console.log(error)

  const submit = (e) => {
    e.preventDefault()

    setYear({
      variables: {
        name,
        born: bornYear
      }
    })
  }
  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor='name'>name</label>
          <input
            name='name'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label htmlFor='birthyear'>born</label>
          <input
            name='birthyear'
            value={bornYear}
            type='number'
            onChange={({ target }) => setBornYear(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetAuthorBornYear
