import { useState } from 'react'

const Votes = ({ votes }) => <div>has {votes} votes</div>
const Anecdote = ({ anecdote }) => <div>{anecdote}</div>

const rng = (max) => Math.floor(Math.random() * max)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(rng(anecdotes.length))
  const [poins, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [top, setTop] = useState(rng(anecdotes.length))

  const handleNext = () => {
    let newSelected
    do {
      newSelected = rng(anecdotes.length)
    } while (newSelected === selected)
    setSelected(newSelected)
  }

  const handleVote = () => {
    const newPoints = [...poins]
    newPoints[selected] += 1
    setPoints(newPoints)
    const max = Math.max(...newPoints)
    const newTop = newPoints.indexOf(max)
    setTop(newTop)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} />
      <Votes votes={poins[selected]} />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[top]} />
      <Votes votes={poins[top]} />
    </>
  )
}

export default App