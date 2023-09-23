import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = async (e) => {
    e.preventDefault()
    const anecdoteContent = e.target.anecdote.value
    dispatch(create(anecdoteContent))
    dispatch(setNotification(`new anecdote '${anecdoteContent}'`, 5))
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