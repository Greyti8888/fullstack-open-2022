import { useSelector, useDispatch } from 'react-redux'
import { vote, add } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(vote(id))
  }

  const handleCreate = (e) => {
    e.preventDefault()
    dispatch(add(e.target.anecdote.value))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      <AnecdoteForm handleCreate={handleCreate} />
    </div>
  )
}

export default App