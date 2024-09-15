import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializedBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const dispatch = useDispatch()

  const noteFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializedBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => {
    const blogs = state.blogs
    return [...blogs]
      .sort((a, b) => b.likes - a.likes)
  })

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error'))
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <div>
        username
        <input
          type="text"
          value={username}
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  )

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
    noteFormRef.current.toggleVisibility()
    dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'info'))
  }

  const addLike = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      }

      const updatedBlogCopy = {
        ...updatedBlog,
      }

      delete updatedBlogCopy.user

      dispatch(likeBlog(blog.id))
      dispatch(setNotification(`blog ${updatedBlog.title} by ${updatedBlog.author} liked`, 'info'))
    } catch (error) {
      dispatch(setNotification('like failed', 'error'))
    }
  }

  const handleRemove = async (blog) => {
    try {
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`blog ${blog.title} by ${blog.author} deleted`, 'info'))
    } catch (error) {
      dispatch(setNotification('deleting failed', 'error'))
    }
  }

  return (
    <div>
      <Notification/>
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button
              onClick={() =>
                window.localStorage.removeItem('loggedBlogappUser')
              }
            >
              Log out
            </button>
          </p>
          <Togglable buttonLabel="create new blog" ref={noteFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              handleRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
