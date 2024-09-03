import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [info, setInfo] = useState({ message: null })
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

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
    const initial = async () => {
      try {
        const blogs = await blogService.getAll()
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      } catch (error) {
        console.log(error?.response?.data?.error)
      }
    }
    initial()
  }, [user])

  const notifyWith = (message, type='info') => {
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null } )
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
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
          id = 'username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          id = 'password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id ='login-button'>login</button>
    </form>
  )

  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notifyWith(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      })
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

      await blogService.update(blog.id, updatedBlogCopy)

      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)))

      notifyWith(`blog ${updatedBlog.title} by ${updatedBlog.author} liked`)
    } catch (error) {
      notifyWith('like failed', 'error')
    }
  }

  const handleRemove = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      notifyWith(`blog ${blog.title} by ${blog.author} deleted`)
    } catch (error) {
      notifyWith('deleting failed', 'error')
    }
  }

  return (
    <div>
      <Notification info={info} />
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in
          <button onClick={() => window.localStorage.removeItem('loggedBlogappUser')}>Log out</button>
        </p>
        <Togglable buttonLabel='create new blog' ref={noteFormRef}>
          <BlogForm addBlog={addBlog}/>
        </Togglable>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} handleRemove={handleRemove}/>
        )}
      </div>
      }
    </div>
  )
}

export default App