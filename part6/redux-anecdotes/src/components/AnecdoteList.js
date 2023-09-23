import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeAnecdotes } from '../reducers/anecdoteReducer'


const Anecdote = (anecdote, handleVote) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter) {
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
    } else return [...state.anecdotes]
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`you voted "${anecdote.content}"`, 5))
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