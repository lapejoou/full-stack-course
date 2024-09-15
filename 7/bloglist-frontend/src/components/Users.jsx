import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  console.log(users)
  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.username}</Link>
        </div>
      ))}
    </div>
  )
}

export default Users
