import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const add = async (anecdote) => {
  const anecdoteObj = asObject(anecdote)
  const response = await axios.post(baseUrl, anecdoteObj)
  console.log(response)
  return response.data
}

export default { getAll, add }