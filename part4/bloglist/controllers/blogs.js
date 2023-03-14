const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const blog = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = request.body
  if (!blog.title || !blog.url) {
    return response.status(400).json('Bad Request')
  }
  const newBlog = new Blog(blog)
  const result = await newBlog.save()
  response.status(201).json(result)
})

blogsRouter.patch('/:id', async (request, response) => {
  await Blog.findOneAndUpdate(request.params.id, request.body)
  response.status(204).end()
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter