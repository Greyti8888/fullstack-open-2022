const blogsRouter = require('express').Router()
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

module.exports = blogsRouter