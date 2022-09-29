const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, `Must have length of 3 or more`],
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: (v) => /^\d{2,3}-\d{6,}/.test(v),
      message: 'Must have length of 8 or more, and match pattern 12-123456 or 123-123456'
    },
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)