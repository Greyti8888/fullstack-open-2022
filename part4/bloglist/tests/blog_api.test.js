const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'title1',
    'author': 'a1',
    'url': 'url1',
    'likes': 0
  },
  {
    'title': 'title2',
    'author': 'a2',
    'url': 'url2',
    'likes': 5
  },
  {
    'title': 'title3',
    'author': 'a3',
    'url': 'url3',
    'likes': 10
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

const api = supertest(app)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have "id" property', async () => {
  const response = await api.get('/api/blogs')
  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

afterAll(async () => {
  mongoose.connection.close()
})