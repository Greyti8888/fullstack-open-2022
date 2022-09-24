import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState();

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
            setNotification(`Changed ${updatedPerson.name} number`)
            setNotificationType('info')
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(() => {
            setNotification(`Information of ${changedPerson.name} has already been removed from server`)
            const updatedPersons = persons.filter(person => person.id !== id)
            setPersons(updatedPersons)
            setNotificationType('error')
            setTimeout(() => {
              setNotification(null)
            }, 5000)
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
        setNotification(`Added ${addedPerson.name}`)
        setNotificationType('info')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
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
        .then(() => {
          const updatedPersons = persons.filter(person => person.id !== id)
          setPersons(updatedPersons)
          setNotification(`Deleted ${person.name}`)
          setNotificationType('info')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} type={notificationType} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} handleName={handleName} handlePhone={handlePhone} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App