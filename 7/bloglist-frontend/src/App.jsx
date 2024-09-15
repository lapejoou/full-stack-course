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
import { loginUser, logoutUser, initializeUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const noteFormRef = useRef()

  useEffect(() => {
    dispatch(initializeUser())
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
      const credentials = {
        username: event.target.username.value,
        password: event.target.password.value
      }
      dispatch(loginUser(credentials))
      dispatch(setNotification('Login successful', 'info'))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error'))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(setNotification('Logged out', 'info'))
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
      dispatch(likeBlog(blog.id))
      dispatch(setNotification(`blog ${blog.title} by ${blog.author} liked`, 'info'))
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
            <button onClick={handleLogout}>Log out</button>
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
