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

test.only('can create blog', async () => {
  const newBlog = {
    'title': 'Can create blog(test)',
    'author': 'someAuthor',
    'url': 'someUrl',
    'likes': 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response2 = await api.get('/api/blogs')
  const titles = response2.body.map(blog => blog.title)

  expect(response2.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(newBlog.title)
})

afterAll(async () => {
  mongoose.connection.close()
})