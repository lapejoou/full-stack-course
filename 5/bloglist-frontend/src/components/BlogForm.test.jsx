import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const addBlog = vi.fn()

  const { container } =  render(<BlogForm addBlog={addBlog} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'example title')
  await user.type(authorInput, 'example author')
  await user.type(urlInput, 'example url')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('example title')
  expect(addBlog.mock.calls[0][0].author).toBe('example author')
  expect(addBlog.mock.calls[0][0].url).toBe('example url')
})