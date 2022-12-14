const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
]

const listWithSixBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {

  test('when list has no blogs', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs', () => {
    const result = listHelper.totalLikes(listWithSixBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {

  test('when list has no blogs', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({ likes: 0 })
  })

  test('when list has only one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('when list has multiple blogs', () => {
    const result = listHelper.favoriteBlog(listWithSixBlogs)
    expect(result).toEqual(listWithSixBlogs[2])
  })
})

describe('most blogs', () => {

  test('when list has no blogs', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(null)
  })

  test('when list has only one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const controlValue = {
      author: listWithOneBlog[0].author,
      'blogs': 1
    }
    expect(result).toEqual(controlValue)
  })

  test('when list has multiple blogs', () => {
    const result = listHelper.mostBlogs(listWithSixBlogs)
    const controlValue = {
      author: listWithSixBlogs[3].author,
      'blogs': 3
    }
    expect(result).toEqual(controlValue)
  })
})

describe('most likes', () => {

  test('when list has no blogs', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(null)
  })

  test('when list has only one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const controlValue = {
      author: listWithOneBlog[0].author,
      'likes': 5
    }
    expect(result).toEqual(controlValue)
  })

  test('when list has multiple blogs', () => {
    const result = listHelper.mostLikes(listWithSixBlogs)
    const controlValue = {
      author: listWithSixBlogs[1].author,
      'likes': 17
    }
    expect(result).toEqual(controlValue)
  })
})