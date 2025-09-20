import { useState } from 'react'
import { useUsers, useCreateUser, useDeleteUser } from '../hooks/useUsers'

export default function Users() {
  const { data: users, isLoading, error } = useUsers()
  const createUser = useCreateUser()
  const deleteUser = useDeleteUser()
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) return

    try {
      await createUser.mutateAsync({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password
      })
      
      setFormData({ username: '', email: '', password: '' })
      setSuccessMessage('User created successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser.mutateAsync(userId)
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  if (isLoading) return <div className="text-center py-8">Loading users...</div>
  if (error) return <div className="text-center py-8 text-red-600">Error loading users: {error.message}</div>

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Users</h2>
      
      {/* Create Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New User</h3>
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username *
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={createUser.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {createUser.isPending ? 'Creating...' : 'Add User'}
          </button>
        </form>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Users ({users?.length || 0})</h3>
        </div>
        <div className="p-6">
          {users?.length > 0 ? (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-semibold text-gray-900">{user.username}</h4>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={deleteUser.isPending}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  >
                    {deleteUser.isPending ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No users yet. Add your first user above!</p>
          )}
        </div>
      </div>
    </div>
  )
}