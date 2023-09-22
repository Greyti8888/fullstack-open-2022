import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = (e) => {
    e.preventDefault()
    dispatch(add(e.target.anecdote.value))
    dispatch(setNotification('new anecdote added'))
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