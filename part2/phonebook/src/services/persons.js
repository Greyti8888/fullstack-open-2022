import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(res => res.data)
}

const add = (newPerson) => {
  return axios
    .post(baseUrl, newPerson)
    .then(res => res.data)
}

const update = (id, changedPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, changedPerson)
    .then(res => res.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getAll, add, update, remove }