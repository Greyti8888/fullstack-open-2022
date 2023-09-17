import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'blogTitle',
  author: 'blogAuthor',
  url: 'blogLink',
  likes: 789,
  user: {
    username: 'user1'
  }
}

describe('blog tests', () => {
  test('renders blog', () => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />)

    const element = screen.getByRole('listitem')
    expect(element).toBeDefined()
  })
  describe('default blog view', () => {
    test('show blog title', () => {
      const mockHandler = jest.fn()
      render(<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />)

      const element = screen.getByRole('listitem')
      expect(element).toHaveTextContent(blog.title)
    })

    test('show blog author', () => {
      const mockHandler = jest.fn()
      render(<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />)

      const element = screen.getByRole('listitem')
      expect(element).toHaveTextContent(blog.author)
    })

    test('does not show blog url', () => {
      const mockHandler = jest.fn()
      render(<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />)

      const element = screen.getByRole('listitem')
      expect(element).not.toHaveTextContent(blog.url)
    })

    test('does not show number of likes', () => {
      const mockHandler = jest.fn()
      render(<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />)

      const element = screen.getByRole('listitem')
      expect(element).not.toHaveTextContent(blog.likes)
    })
  })
  describe('detailed view', () => {
    test('show blog url', async () => {
      const mockHandler = jest.fn()
      render(<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />)
      const user = userEvent.setup()

      const element = screen.getByRole('listitem')
      const button = screen.getByRole('button', { name: /view/i })
      await user.click(button)
      expect(element).toHaveTextContent(blog.url)
    })

    test('show number of likes', async () => {
      const mockHandler = jest.fn()
      render(<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />)
      const user = userEvent.setup()

      const element = screen.getByRole('listitem')
      const button = screen.getByRole('button', { name: /view/i })
      await user.click(button)
      expect(element).toHaveTextContent(blog.likes)
    })

    test('when like button clicked 2 times, event handler is called 2 times', async () => {
      const mockHandler = jest.fn()
      render(<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} username={blog.user.username} />)
      const user = userEvent.setup()

      const viewButton = screen.getByRole('button', { name: /view/i })
      await user.click(viewButton)
      const likeButton = screen.getByRole('button', { name: /like/i })
      await user.click(likeButton)
      await user.click(likeButton)
      expect(mockHandler.mock.calls).toHaveLength(2)
    })
  })
})
