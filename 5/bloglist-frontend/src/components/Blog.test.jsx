import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Test Blog Title', { exact: false })
  expect(element).toBeDefined()
})

test('renders more content after clicking view', async() => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const urlElement = screen.getByText('http://testurl.com', { exact: false })
  const likeElement = screen.getByText('likes', { exact: false })
  const userElement = screen.getByText('Test User', { exact: false })
  expect(urlElement).toBeDefined()
  expect(likeElement).toBeDefined()
  expect(userElement).toBeDefined()
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

