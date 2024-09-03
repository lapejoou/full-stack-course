import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      author: author,
      title: title,
      url: url
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={createBlog}>
      <h1>Create a new blog</h1>
      <div>
            title
        <input
          type="text"
          value={title}
          id = 'title-input'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
            author
        <input
          type="text"
          value={author}
          id = 'author-input'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
            url
        <input
          type="text"
          value={url}
          id = 'url-input'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
