const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = req.body
  if (!blog.title || !blog.url) {
    return res.status(400).json('Bad Request')
  }
  const newBlog = new Blog(blog)
  const result = await newBlog.save()
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