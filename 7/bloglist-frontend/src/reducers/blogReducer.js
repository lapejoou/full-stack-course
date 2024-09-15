import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (blog) => {
  return {
    content: blog,
    id: getId(),
    likes: 0
  }
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like(state, action) {
      const id = action.payload
      const blogToLike = state.find(blog => blog.id === id)
      if (blogToLike) {
        const updatedBlog = {
          ...blogToLike,
          likes: blogToLike.likes + 1
        }
        return state.map(blog =>
          blog.id !== id ? blog : updatedBlog
        )
      }
    },
    remove(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  },
})

export const initializedBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObj) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObj)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    const currentBlogs = await blogService.getAll()
    const likedBlog = currentBlogs.find((a) => a.id === id)
    const updatedBlog = {
      ...likedBlog,
      likes: likedBlog.likes + 1,
    }
    await blogService.update(id, updatedBlog)
    dispatch(like(id))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(remove(id))
  }
}

export const { like, setBlogs, appendBlog, remove } = blogSlice.actions
export default blogSlice.reducer
