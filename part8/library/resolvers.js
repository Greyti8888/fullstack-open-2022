const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

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
    allAuthors: async () => Author.find({}).populate('books'),
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

        await Author.findByIdAndUpdate(author._id, {
          $push: { books: book._id }
        })

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error: error.message
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

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  },

  Author: {
    bookCount: async (author) => author.books.length
  }
}

module.exports = resolvers
