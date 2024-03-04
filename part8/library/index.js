const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Query {
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genre: String) : [Book],
    allAuthors: [Author],
    me: User
  }

  type Book {
    title: String!,
    author: Author!,
    published: Int!,
    id: ID!,
    genres: [String!]!
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int,
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ):Book,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ):Author,
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (_root, { author: authorName, genre }) => {
      if (authorName && genre) {
        const author = await Author.findOne({ name: authorName })
        if (!author) return []
        return Book.find({
          author: author._id,
          genres: { $in: genre }
        }).populate('author')
      } else if (authorName && !genre) {
        const author = await Author.findOne({ name: authorName })
        if (!author) return []
        return Book.find({ author }).populate('author')
      } else if (!authorName && genre) {
        return Book.find({ genres: { $in: genre } }).populate('author')
      } else return Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: async (_root, _args, { currentUser }) => currentUser
  },

  Mutation: {
    addBook: async (_root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      if (args.author.length < 4) {
        throw new GraphQLError('"author" length must greater than 3', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: { author: args.author }
          }
        })
      }
      if (args.title.length < 5) {
        throw new GraphQLError('"title" length must greater than 4', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: { title: args.title }
          }
        })
      }
      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
        const book = new Book({ ...args, author })
        await book.save()
        return book
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }
    },
    editAuthor: async (_root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      let author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      await author.save()
      return author
    },
    createUser: async (_root, args) => {
      if (args.username.length < 4) {
        throw new GraphQLError('"username" length must greater than 3', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: { username: args.username }
          }
        })
      }
      let user = await User.findOne({ username: args.username })
      if (user) return null
      user = new User({
        username: args.username,
        password: 'password',
        favoriteGenre: args.favoriteGenre
      })
      await user.save()
      return user
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') {
        throw new GraphQLError('Wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(userForToken, JWT_SECRET)
      return { value: token }
    }
  },

  Author: {
    bookCount: async (args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      const count = await Book.find({ author: author._id }).countDocuments()
      return count
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
