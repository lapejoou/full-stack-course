const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = request.user

    if (!title || !url) {
      return response.status(400).json({ error: 'title or url missing' })
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
    
  })

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user 

    const blog = await Blog.findById(request.params.id)
    
    if (!blog.user) {
      return response.status(400).json({ error: 'blog has no user' })
    }

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(403).json({ error: 'permission denied' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    const blogObj = {
      title,
      author,
      url,
      likes: likes || 0,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogObj, { new: true});

    return response.status(204).json(updatedBlog)
  })


module.exports = blogsRouter