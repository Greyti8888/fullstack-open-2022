import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(undefined)
  const [allGenres, setAllGenres] = useState([])
  const booksData = useQuery(ALL_BOOKS, {
    variables: { genre },
    onError: (err) => console.log(err)
  })
  const booksDataForGenres = useQuery(ALL_BOOKS, {
    onError: (err) => console.log(err),
    onCompleted: (data) => {
      const genres = new Set()
      data.allBooks.forEach((book) =>
        book.genres.forEach((genre) => genres.add(genre))
      )
      setAllGenres(genres)
    }
  })
  if (!props.show) {
    return null
  }

  if (booksData.loading || booksDataForGenres.loading) {
    return 'Loading...'
  }

  const books = booksData.data.allBooks

  //books.forEach((book) => book.genres.forEach((genre) => genres.add(genre)))

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <div>
          in genre: <b>{genre}</b>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {[...allGenres].map((genre) => (
        <button
          key={genre}
          value={genre}
          onClick={(e) => setGenre(e.target.value)}
        >
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre(undefined)}>all genres</button>
    </div>
  )
}

export default Books
