const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body

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
    response.status(201).json(savedBlog)
    
  })

blogsRouter.delete('/:id', async (request, response) => {
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