import SetAuthorBornYear from './SetAuthorBornYear'
import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const authorsData = useQuery(ALL_AUTHORS, {
    onError: (err) => console.log(err)
  })

  if (!props.show) {
    return null
  }

  if (authorsData.loading) {
    return 'Loading...'
  }

  const authors = authorsData.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && <SetAuthorBornYear authors={authors} />}
    </div>
  )
}

export default Authors
