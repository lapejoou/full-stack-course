import { useState } from 'react'

const Blog = ({ blog, addLike, handleRemove }) => {
  const [viewVisible, setViewVisible] = useState(false)

  const likeBlog = (event) => {
    event.preventDefault()
    addLike(blog)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleRemove(blog)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!blog.user || !blog.user.username) {
    return null
  }

  const isOwner = () => {
    return (
      blog.user.username ===
      JSON.parse(window.localStorage.getItem('loggedBlogappUser'))?.username
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setViewVisible(!viewVisible)}> {viewVisible ? 'hide' : 'view'}</button>
      </div>

      {viewVisible &&  (
        <div>
          <p>{blog.url}</p>
          <p> likes {blog.likes} <button onClick={likeBlog}>Like</button></p>
          <p>{blog.user.name}</p>
          {isOwner() && <button onClick={removeBlog}>Remove</button>}
        </div>
      )}
    </div>
  )
}

export default Blog