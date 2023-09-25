import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const { isLoading, isError, error, data: anecdotes, } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
    retry: false,
  })

  const quaryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.vote,
    onSuccess: () => {
      quaryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const notificationDispatch = useNotificationDispatch()

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote.id)
    notificationDispatch({ type: 'VOTE', payload: anecdote.content })
  }

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
