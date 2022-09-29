require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const mongoose = require('mongoose')

const Person = require('./models/person')

const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const customError = (name, message) => {
  const err = new Error(message)
  err.name = name
  return err
}

app.get('/', (req, res) => res.send("App in running"))

app.get('/api/persons', async (req, res, next) => {
  try {
    await Person
      .find({})
      .then(persons => {
        return res.json(persons)
      })
  } catch (err) {
    next(err)
  }
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    await Person.findById(req.params.id)
      .then(person => {
        if (person) return res.json(person)
        else throw Error('No person found')
      })
  } catch (err) {
    next(err)
  }
})

app.post('/api/persons', async (req, res, next) => {
  try {
    const { name, number } = req.body

    if (!name) throw Error('Missing name')
    if (!number) throw Error('Missing number')

    await Person
      .find({ name: name })
      .then(person => {
        if (person[0]) throw Error('Person already exists')
      })

    const person = new Person({
      name,
      number
    })

    await person.save().then(person => res.json(person))
  } catch (err) {
    next(err)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const { name, number } = req.body

    if (!name) throw Error('Missing name')
    if (!number) throw Error('Missing number')

    const person = {
      name,
      number
    }

    await Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
      .then(updatedPerson => {
        if (updatedPerson) res.json(updatedPerson)
        else throw Error('No person to update')
      })
  } catch (err) {
    next(err)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    await Person.findByIdAndRemove(req.params.id)
      .then(() => res.status(204).end())
  } catch (err) {
    next(err)
  }
})

app.get('/info', async (req, res) => {
  try {
    await Person
      .find({})
      .then(persons => {
        return res.send(
          `<div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
          </div>`
        )
      })
  } catch (err) {
    next(err)
  }
})

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.message === 'Missing name') res.status(400).json({ error: 'name missing' })
  else if (err.message === 'Missing number') res.status(400).json({ error: 'number missing' })
  else if (err.message === 'Person already exists') res.status(400).json({ error: 'person already exists' })
  else if (err.message === 'No person to update') res.status(400).json({ error: 'no person to update' })
  else if (err.name === 'CastError') res.status(400).json({ error: 'malformatted id' })
  else if (err.name === 'ValidationError') res.status(400).json({ error: err.message })
  else next(err)

}

app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})