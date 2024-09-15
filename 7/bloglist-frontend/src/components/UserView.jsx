const UserView = ({ user }) => {
  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      {user.blogs.map(blog => (
        <div key={blog.id}>{blog.title}</div>
      ))}
    </div>
  )
}

export default UserView
