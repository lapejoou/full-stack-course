const BlogView = ({ blog, addLike }) => {
  const userName = blog.user?.name || 'unknown'

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.likes} likes <button onClick={() => addLike(blog)}>Like</button></p>
      <p>Added by {userName}</p>
    </div>
  )
}

export default BlogView
