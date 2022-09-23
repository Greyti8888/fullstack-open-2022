import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setPersons([...persons, { name: newName }])
    setNewName('')
  }

  const handleInput = (e) => {
    setNewName(e.target.value)
  }

  const contacts = () => {
    const output = persons.map(person => <div key={person.name}>{person.name}</div>)
    return (
      <div>
        {output}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {contacts()}
    </div>
  )
}

export default App