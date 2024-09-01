const User = require('../models/user')
const Blog = require('../models/blog')

const initialUsers = [
  {
    username: 'root',
    passwordHash: 'sekret' 
  }
]

const initialBlogs = async () => {
  const user = await User.findOne({ username: 'root' })

  return [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: user._id, 
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      user: user._id, 
      __v: 0
    }
  ]
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialUsers, initialBlogs, usersInDb, blogsInDb
}
