import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link, useMatch } from 'react-router-dom'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import BlogView from './components/BlogView'
import Users from './components/Users'
import UserView from './components/UserView'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializedBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { loginUser, logoutUser, initializeUser } from './reducers/userReducer'

const Menu = () => {
  const padding = { paddingRight: 5 }
  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
    </div>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => [...state.blogs].sort((a, b) => b.likes - a.likes))
  const users = useSelector(state => state.users)

  const dispatch = useDispatch()

  const noteFormRef = useRef()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializedBlogs())
    dispatch(initializeUsers())
  }, [dispatch])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = { username: event.target.username.value, password: event.target.password.value }
      await dispatch(loginUser(credentials))
      dispatch(setNotification('Login successful', 'info'))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error'))
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
      <button type="submit" id="login-button">login</button>
    </form>
  )

  const addBlog = (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
      noteFormRef.current.toggleVisibility()
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'info'))
    } catch (error) {
      dispatch(setNotification('Adding blog failed', 'error'))
    }
  }

  const addLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog.id))
      dispatch(setNotification(`blog ${blog.title} by ${blog.author} liked`, 'info'))
    } catch (error) {
      dispatch(setNotification('Like failed', 'error'))
    }
  }

  const handleRemove = async (blog) => {
    try {
      await dispatch(removeBlog(blog.id))
      dispatch(setNotification(`blog ${blog.title} by ${blog.author} deleted`, 'info'))
    } catch (error) {
      dispatch(setNotification('Deleting failed', 'error'))
    }
  }

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  console.log(blogs)

  const userMatch = useMatch('/users/:id')
  const userDetail = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  return (
    <div>
      <Notification/>
      {!user && loginForm()}
      {user && (
        <div>
          <Menu />
          <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
          <Togglable buttonLabel="create new blog" ref={noteFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <Routes>
            <Route path="/" element={<Blogs blogs={blogs} />} />
            <Route path="/blogs/:id" element={<BlogView blog={blog} addLike={addLike} />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<UserView user={userDetail} />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
