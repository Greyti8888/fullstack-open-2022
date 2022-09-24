import axios from 'axios'

const getAll = () => {
  return axios
    .get('http://localhost:3001/persons')
    .then(res => res.data)
}

const add = (newPerson) => {
  return axios
    .post('http://localhost:3001/persons', newPerson)
    .then(res => res.data)
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getAll, add }