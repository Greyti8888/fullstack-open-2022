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

describe('when some blogs exist', () => {
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
})

describe('creating a blog', () => {
  test('succeeded with valid data', async () => {
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

    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(newBlog.title)
  })

  test('fails with 400 if missing title', async () => {
    const newBlog = {
      'author': 'someAuthor',
      'url': 'someUrl',
      'likes': 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })

  test('fails with 400 if missing url', async () => {
    const newBlog = {
      'title': 'someTitle',
      'author': 'someAuthor',
      'likes': 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('likes defaults to 0 if missing', async () => {
    const newBlog = {
      'title': 'Missing likes(test)',
      'author': 'someAuthor',
      'url': 'someUrl',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blog = response.body.find(blog => blog.title === newBlog.title)
    expect(blog.likes).toBe(0)
  })
})

describe('deletion of a blog', () => {
  test.only('succeeds if "id" is valid', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    await api
      .delete(`/api/blogs/${blog.id}`)
      .expect(204)

    const response2 = await api.get('/api/blogs')
    expect(response2.body).toHaveLength(initialBlogs.length - 1)
  })
})

describe('update of a blog', () => {
  test('succeeds if "id" is valid', async () => {
    const update = {
      likes: 999
    }
    const response = await api.get('/api/blogs')
    const blogToUpdate = response.body[0]

    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .expect(204)

    const response2 = await api.get('/api/blogs')
    const updatedBlog = response2.body.find(blog => blog.id === blogToUpdate.id)
    expect(updatedBlog.likes).toBe(update.likes)
  })
})

afterAll(async () => {
  mongoose.connection.close()
})