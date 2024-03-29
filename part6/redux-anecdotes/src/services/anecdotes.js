import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
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

const add = async (content) => {
  const anecdote = asObject(content)
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const vote = async (id) => {
  const { data: anecdote } = await axios.get(`${baseUrl}/${id}`)
  const response = await axios.patch(`${baseUrl}/${id}`, { votes: anecdote.votes + 1 })
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, add, vote }