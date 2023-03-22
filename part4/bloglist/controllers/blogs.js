const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const blog = req.body
  const user = req.user
  if (!blog.title) {
    return res.status(400).json({ error: 'missing title' })
  }
  if (!blog.url) {
    return res.status(400).json({ error: 'missing url' })
  }

  blog.user = user.id

  const newBlog = new Blog(blog)
  const result = await newBlog.save()

  await User.updateOne({ _id: user.id }, { blogs: [...user.blogs, result.id] })

  res.status(201).json(result)
})

blogsRouter.put('/:id', userExtractor, async (req, res) => {
  const blogId = req.params.id
  const user = req.user

  const blog = await Blog.findById(blogId)
  if (!blog) {
    res.status(404).json({ error: 'blog not found' })
  }

  const validUser = blog.user.toString() === user.id
  if (!validUser) {
    return res.status(401).json({ error: 'invalid user' })
  }

  await Blog.findOneAndUpdate(req.params.id, req.body)
  res.status(204).end()
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const blogId = req.params.id
  const user = req.user

  const blog = await Blog.findById(blogId)
  if (!blog) {
    res.status(404).json({ error: 'blog not found' })
  }

  const validUser = blog.user.toString() === user.id
  if (!validUser) {
    return res.status(401).json({ error: 'invalid user' })
  }
  await Blog.findByIdAndRemove(blogId)
  res.status(204).end()
})

module.exports = blogsRouter