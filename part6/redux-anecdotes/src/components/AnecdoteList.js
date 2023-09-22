import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = (anecdote, handleVote) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter) {
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
    } else return state.anecdotes
  })

  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(vote(id))
  }

  return (
    <div>
      {anecdotes
        .sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)
        .map(anecdote => Anecdote(anecdote, handleVote))}
    </div>
  )
}

export default AnecdoteList