import { useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState(null)

  if (!props.show) {
    return null
  }

  if (props.books.loading) {
    return 'Loading...'
  }

  const books = props.books.data.allBooks
  const genres = new Set()
  books.forEach((book) => book.genres.forEach((genre) => genres.add(genre)))

  return (
    <div>
      <h2>books</h2>
      {filter && (
        <div>
          in genre: <b>{filter}</b>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => (filter ? book.genres.includes(filter) : true))
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {[...genres].map((genre) => (
        <button
          key={genre}
          value={genre}
          onClick={(e) => {
            console.log(e)
            setFilter(e.target.value)
          }}
        >
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Books
