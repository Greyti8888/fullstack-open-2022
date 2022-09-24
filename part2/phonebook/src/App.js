import { useState, useEffect } from 'react'
import axios from 'axios'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newName || !newNumber) {
      alert('Enter name and number')
      return
    }
    const exists = persons.find(person => person.name === newName)
    if (exists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = { name: newName, number: newNumber }
    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(res => {
        console.log(res.data);
        setPersons([...persons, res.data])
        setNewName('')
        setNewNumber('')
      })
  }

  const handleName = (e) => {
    setNewName(e.target.value)
  }

  const handlePhone = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value.toLowerCase())
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} handleName={handleName} handlePhone={handlePhone} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App