import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

const blog = {
  title: 'blogTitle',
  author: 'blogAuthor',
  url: 'blogLink',
  likes: 789,
  user: {
    username: 'user1',
  },
}

describe('blog tests', () => {
  describe('default blog view', () => {
    let mockHandler

    beforeEach(() => {
      mockHandler = jest.fn()
      render(
        <Blog
          blog={blog}
          addLike={mockHandler}
          deleteBlog={mockHandler}
          username={blog.user.username}
        />,
      )
    })

    test('renders blog', () => {
      const element = screen.getByRole('listitem')
      expect(element).toBeDefined()
    })

    test('show blog title', () => {
      const element = screen.getByRole('listitem')
      expect(element).toHaveTextContent(blog.title)
    })

    test('show blog author', () => {
      const element = screen.getByRole('listitem')
      expect(element).toHaveTextContent(blog.author)
    })

    test('does not show blog url', () => {
      const element = screen.getByRole('listitem')
      expect(element).not.toHaveTextContent(blog.url)
    })

    test('does not show number of likes', () => {
      const element = screen.getByRole('listitem')
      expect(element).not.toHaveTextContent(blog.likes)
    })
  })

  describe('detailed view', () => {
    let mockHandler
    let user

    beforeEach(() => {
      mockHandler = jest.fn()
      user = userEvent.setup()
      render(
        <Blog
          blog={blog}
          addLike={mockHandler}
          deleteBlog={mockHandler}
          username={blog.user.username}
        />,
      )
    })

    test('show blog url', async () => {
      const element = screen.getByRole('listitem')
      const button = screen.getByRole('button', { name: /view/i })
      await user.click(button)
      expect(element).toHaveTextContent(blog.url)
    })

    test('show number of likes', async () => {
      const element = screen.getByRole('listitem')
      const button = screen.getByRole('button', { name: /view/i })
      await user.click(button)
      expect(element).toHaveTextContent(blog.likes)
    })

    test('when like button clicked 2 times, event handler is called 2 times', async () => {
      const viewButton = screen.getByRole('button', { name: /view/i })
      await user.click(viewButton)
      const likeButton = screen.getByRole('button', { name: /like/i })
      await user.click(likeButton)
      await user.click(likeButton)
      expect(mockHandler.mock.calls).toHaveLength(2)
    })
  })

  describe('new blog form', () => {
    test('call event handler with correct details', async () => {
      const mockAddBlog = jest.fn()
      render(<NewBlogForm addBlog={mockAddBlog} />)
      const user = userEvent.setup()

      const title = screen.getByRole('textbox', { name: 'title' })
      const author = screen.getByRole('textbox', { name: 'author' })
      const url = screen.getByRole('textbox', { name: 'url' })

      await user.type(title, blog.title)
      await user.type(author, blog.author)
      await user.type(url, blog.url)

      const submitButton = screen.getByRole('button', { name: /create/i })
      await user.click(submitButton)

      expect(mockAddBlog.mock.calls[0][0]).toEqual({
        title: blog.title,
        author: blog.author,
        url: blog.url,
      })
    })
  })
})
