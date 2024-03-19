import SetAuthorBornYear from './SetAuthorBornYear'

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  if (props.authors.loading) {
    return 'Loading...'
  }

  const authors = props.authors.data.allAuthors

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
      {props.token ? <SetAuthorBornYear authors={authors} /> : null}
    </div>
  )
}

export default Authors
