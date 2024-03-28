import { useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'

import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { updateCache } from '../helpers'

const Books = (props) => {
  const [genre, setGenre] = useState(undefined)
  const [allGenres, setAllGenres] = useState([])
  const { refetch: filterBooks, ...booksData } = useQuery(ALL_BOOKS, {
    onError: (err) => console.log(err),
    onCompleted: (data) => {
      if (!allGenres.length) {
        const genres = new Set()
        data.allBooks.forEach((book) =>
          book.genres.forEach((genre) => genres.add(genre))
        )
        setAllGenres(genres)
      }
    }
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      if (addedBook.genres.includes(genre) || genre === undefined) {
        updateCache(
          client.cache,
          { query: ALL_BOOKS, variables: { genre } },
          addedBook
        )
      }
    },
    onError: (err) => console.log(err)
  })

  if (!props.show) {
    return null
  }

  if (booksData.loading) {
    return 'Loading...'
  }

  const books = booksData.data.allBooks

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
          onClick={(e) => {
            setGenre(e.target.value)
            filterBooks({ genre: e.target.value })
          }}
        >
          {genre}
        </button>
      ))}
      <button
        onClick={(e) => {
          setGenre(undefined)
          filterBooks({ genre: undefined })
        }}
      >
        all genres
      </button>
    </div>
  )
}

export default Books
