import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { USER, ALL_BOOKS } from '../queries'

const FavoriteGenreBooks = (props) => {
  const [genre, setGenre] = useState(null)
  const user = useQuery(USER, {
    onError: (err) => console.log(err)
  })
  const booksData = useQuery(ALL_BOOKS, {
    variables: { genre },
    onError: (err) => console.log(err)
  })

  useEffect(() => {
    const favoriteGenre = user.data?.me?.favoriteGenre
    if (!user.loading && favoriteGenre) {
      setGenre(favoriteGenre)
    }
  }, [user])

  if (!props.show) {
    return null
  }

  if (user.loading || booksData.loading) {
    return 'Loading...'
  }

  const books = booksData.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre: <b>{genre}</b>
      </div>
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
    </div>
  )
}

export default FavoriteGenreBooks
