import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = (e) => {
    e.preventDefault()
    dispatch(add(e.target.anecdote.value))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div><input name='anecdote' /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm