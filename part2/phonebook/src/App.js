import { useState } from 'react'

const Contacts = ({ persons, filter }) => {
  const output = persons.reduce((valid, person) => {
    const filterPassed = !filter || person.name.toLowerCase().includes(filter)
    if (filterPassed) valid.push(<div key={person.name}>{person.name} {person.number}</div>)
    return valid
  }, [])

  return (
    <div>
      {output}
    </div>
  )
}

const Filter = ({ filter, handleFilter }) => {
  return (
    <input value={filter} onChange={handleFilter} />
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const exists = persons.find(person => person.name === newName)
    if (exists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
    setNewNumber('')
  }

  const handleName = (e) => {
    setNewName(e.target.value)
  }

  const handlePhone = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    console.log(typeof e.target.value);
    setFilter(e.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handlePhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts persons={persons} filter={filter} />
    </div>
  )
}

export default App