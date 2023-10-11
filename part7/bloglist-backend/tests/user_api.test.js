const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const initialUsers = [
  {
    'username': 'user1',
    'name': 'someName',
    'passwordHash': 'somePassword'
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  for (let user of initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }
})

const api = supertest(app)

describe('when some users exist', () => {
  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('users have "id" property', async () => {
    const response = await api.get('/api/users')
    for (let user of response.body) {
      expect(user.id).toBeDefined()
    }
  })
})

describe('creating a user', () => {
  test('succeeded with valid data', async () => {
    const newUser = {
      'username': 'user2',
      'name': 'someName',
      'password': 'somePassword'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length + 1)
  })

  test('fails with missing username', async () => {
    const newUser = {
      'name': 'someName',
      'password': 'somePassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('fails with username length less than 3', async () => {
    const newUser = {
      'username': 'us',
      'name': 'someName',
      'password': 'somePassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username')
    expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('fails with non unique username', async () => {
    const newUser = {
      'username': 'user1',
      'name': 'someName',
      'password': 'somePassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('fails with missing password', async () => {
    const newUser = {
      'username': 'user2',
      'name': 'someName'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`password` is missing')

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('fails with password length less than 3', async () => {
    const newUser = {
      'username': 'user2',
      'name': 'someName',
      'password': '12'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`password` length is less than 3')

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
  })
})