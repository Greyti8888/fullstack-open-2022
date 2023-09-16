import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'title',
  author: 'author',
  url: 'url',
  likes: 0,
  user: {
    username: 'user1'
  }
}

describe('blog tests', () => {
  test('renders blog', () => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />)

    const element = screen.getByText(`${blog.title} - ${blog.author}`)
    expect(element).toBeDefined()
  })

  test('show blog title by default', () => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />)

    const element = screen.getByText(`${blog.title} - ${blog.author}`)
    expect(element).toHaveTextContent(blog.title)
  })

  test('show blog author by default', () => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />)

    const element = screen.getByText(`${blog.title} - ${blog.author}`)
    expect(element).toHaveTextContent(blog.author)
  })

  test('does not show blog url by default', () => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />)

    const element = screen.getByText('title - author')
    expect(element).not.toHaveTextContent(blog.url)
  })

  test('does not show likes by default', () => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />)

    const element = screen.getByText('title - author')
    expect(element).not.toHaveTextContent(blog.likes)
  })
})
