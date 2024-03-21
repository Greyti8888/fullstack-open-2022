import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { USER } from '../queries'

const FavoriteGenreBooks = (props) => {
  const [filter, setFilter] = useState(null)
  const user = useQuery(USER, {
    onError: (err) => console.log(err)
  })

  useEffect(() => {
    const favoriteGenre = user.data?.me?.favoriteGenre
    if (!user.loading && favoriteGenre) {
      setFilter(favoriteGenre)
    }
  }, [user])

  if (!props.show) {
    return null
  }

  if (props.books.loading) {
    return 'Loading...'
  }

  const books = props.books.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre: <b>{filter}</b>
      </div>
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
    </div>
  )
}

export default FavoriteGenreBooks
