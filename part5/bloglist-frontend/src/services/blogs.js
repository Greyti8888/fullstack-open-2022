import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blog) => {
  const config = { headers: { Authorization: token }, }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog) => {
  const { id, ...blodWithoutId } = blog
  const config = { headers: { Authorization: token }, }
  await axios.put(`${baseUrl}/${id}`, blodWithoutId, config)
}

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token }, }
  await axios.delete(`${baseUrl}/${id}`, config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create, update, deleteBlog }