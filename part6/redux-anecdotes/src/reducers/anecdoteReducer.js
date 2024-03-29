import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes"

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    add: (state, action) => [...state, action.payload],
    increaseVote: (state, action) => state.map(anecdote => anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote),
    setAnecdotes: (state, action) => action.payload
  }
})


export const { add, increaseVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const create = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.add(content)
    dispatch(add(anecdote))
  }
}

export const vote = (id) => {
  return async (dispatch) => {
    await anecdotesService.vote(id)
    dispatch(increaseVote(id))
  }
}

export default anecdoteSlice.reducer