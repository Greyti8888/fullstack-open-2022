const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = req.body
  if (!blog.title || !blog.url) {
    return res.status(400).json('Bad Request')
  }
  const user = await User.findOne({})
  blog.user = user.id

  const newBlog = new Blog(blog)
  const result = await newBlog.save()

  await User.updateOne({ _id: user.id }, { blogs: [...user.blogs, result.id] })

  res.status(201).json(result)
})

blogsRouter.patch('/:id', async (req, res) => {
  await Blog.findOneAndUpdate(req.params.id, req.body)
  res.status(204).end()
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter