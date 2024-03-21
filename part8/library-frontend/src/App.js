import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import FavoriteGenreBooks from './components/FavoriteGenreBooks'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const { client, ...authors } = useQuery(ALL_AUTHORS, {
    onError: (err) => console.log(err)
  })
  const books = useQuery(ALL_BOOKS, {
    onError: (err) => console.log(err)
  })

  useEffect(() => {
    const savedToken = localStorage.getItem('library-token')
    if (savedToken) setToken(savedToken)
  }, [])

  const handleLogout = async () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('favoriteGenre')}>
            recommendations
          </button>
        )}
        {token ? (
          <button onClick={handleLogout}>logout</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} authors={authors} token={token} />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} />

      <FavoriteGenreBooks show={page === 'favoriteGenre'} books={books} />

      <Login show={page === 'login'} token={token} setToken={setToken} />
    </div>
  )
}

export default App
