import axios from 'axios'
import { useEffect, useState } from 'react'
export function App() {
  const [users, setUsers] = useState<any[]>([])
  const [name, setName] = useState("")
  const [editId, setEditId] = useState<number | null>(null)
  // READ
  const fetchUsers = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    setUsers(response.data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  // CREATE
  const addUser = async () => {
    if (!name) return
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', { name })
    setUsers([...users, response.data])
    setName("")
  }
  // UPDATE
  const updateUser = async () => {
    if (!name || editId === null) return
    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editId}`, { name })
    setUsers(users.map(user => user.id === editId ? response.data : user))
    setName("")
    setEditId(null)
  }
  // DELETE
  const deleteUser = async (id: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    setUsers(users.filter(user => user.id !== id))
  }
  return (
    <div className="container mt-4">
      <h2>CRUD with Axios</h2>
      <div className="mb-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="form-control"
        />
        <button onClick={editId ? updateUser : addUser} className="btn btn-primary mt-2">
          {editId ? "Update" : "Add"}
        </button>
      </div>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            {user.name}
            <div>
              <button onClick={() => { setName(user.name); setEditId(user.id) }} className="btn btn-sm btn-warning me-2">
                Edit
              </button>
              <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
