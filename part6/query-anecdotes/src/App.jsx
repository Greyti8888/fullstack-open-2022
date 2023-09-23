import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  /* const anecdotes = [
    {
      content: 'If it hurts, do it more often',
      id: '47145',
      votes: 0,
    },
  ]; */

  const { isLoading, isError, error, data: anecdotes, } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then((res) => res.data),
    retry: false,
  })

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    console.log('Error: ', error.message)
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
