const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const helper = require('../utils/blog_api')

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

const initialUsers = [
  {
    'username': 'user1',
    'name': 'name1',
    'password': 'password1'
  },
  {
    'username': 'user2',
    'name': 'name2',
    'password': 'password2'
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  for (let user of initialUsers) {
    const saltRounds = 1
    const passwordHash = await bcrypt.hash(user.password, saltRounds)

    const userCopy = { ...user, passwordHash }
    delete userCopy.password

    const userObject = new User(userCopy)
    await userObject.save()
  }

  await Blog.deleteMany({})
  const user = await helper.getUser(initialUsers[0].username)

  for (let blog of initialBlogs) {

    const blogCopy = { ...blog, user: user._id }
    const blogObject = new Blog(blogCopy)
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
    const user = await helper.getUser(initialUsers[0].username)
    const token = helper.getToken(user)

    const newBlog = {
      'title': 'Can create blog(test)',
      'author': 'someAuthor',
      'url': 'someUrl',
      'likes': 0,
      'user': user._id
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(newBlog.title)
  })

  test('fails with missing token', async () => {
    const user = await helper.getUser(initialUsers[0].username)

    const newBlog = {
      'title': 'Fails with missing token',
      'author': 'someAuthor',
      'url': 'someUrl',
      'likes': 0,
      'user': user._id
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('jwt must be provided')

  })

  test('fails with 400 if missing title', async () => {
    const user = await helper.getUser(initialUsers[0].username)
    const token = helper.getToken(user)

    const newBlog = {
      'author': 'someAuthor',
      'url': 'someUrl',
      'likes': 0,
      'user': user._id
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

  })

  test('fails with 400 if missing url', async () => {
    const user = await helper.getUser(initialUsers[0].username)
    const token = helper.getToken(user)

    const newBlog = {
      'title': 'someTitle',
      'author': 'someAuthor',
      'likes': 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

  })

  test('likes defaults to 0 if missing', async () => {
    const user = await helper.getUser(initialUsers[0].username)
    const token = helper.getToken(user)

    const newBlog = {
      'title': 'Missing likes(test)',
      'author': 'someAuthor',
      'url': 'someUrl',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blog = response.body.find(blog => blog.title === newBlog.title)
    expect(blog.likes).toBe(0)
  })
})

describe('deletion of a blog', () => {
  test('succeeds if "id" is valid', async () => {
    const user = await helper.getUser(initialUsers[0].username)
    const token = helper.getToken(user)

    const blog = await Blog.findOne({ user: user._id })

    await api
      .delete(`/api/blogs/${blog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogs = await Blog.find({})
    expect(blogs).toHaveLength(initialBlogs.length - 1)
  })
})

describe('update of a blog', () => {
  test('succeeds if "id" is valid', async () => {
    const user = await helper.getUser(initialUsers[0].username)
    const token = helper.getToken(user)

    const blog = await Blog.findOne({ user: user._id })

    const update = {
      likes: 999
    }

    await api
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(update)
      .expect(204)

    const updatedBlog = await Blog.findOne({ _id: blog.id })
    expect(updatedBlog.likes).toBe(update.likes)
  })
})

afterAll(async () => {
  mongoose.connection.close()
})