import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    add: (state, action) => [...state, action.payload],
    vote: (state, action) => state.map(anecdote => anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote),
    setAnecdotes: (state, action) => action.payload
  }
})

export const { add, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer