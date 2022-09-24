import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => setPersons(persons))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newName || !newNumber) {
      alert('Enter name and number')
      return
    }
    const person = persons.find(person => person.name === newName)
    if (person) {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one  ?`)) {
        const changedPerson = { ...person, number: newNumber }
        const id = changedPerson.id
        personsService
          .update(id, changedPerson)
          .then(updatedPerson => {
            const updatedPersons = persons.map(person => person.id !== id ? person : updatedPerson)
            setPersons(updatedPersons)
          })
      }
      return
    }
    const newPerson = { name: newName, number: newNumber }
    personsService
      .add(newPerson)
      .then(addedPerson => {
        setPersons([...persons, addedPerson])
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

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
        .remove(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} handleName={handleName} handlePhone={handlePhone} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App