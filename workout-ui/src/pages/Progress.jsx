import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useUsers } from '../hooks/useUsers'
import { useProgress, useCreateProgress, useDeleteProgress } from '../hooks/useProgress'
import { formatDate, toISO, getDateInputValue } from '../utils/date'

export default function Progress() {
  const { data: users } = useUsers()
  const [selectedUserId, setSelectedUserId] = useState('')
  
  const { data: progress, isLoading, error } = useProgress(selectedUserId)
  const createProgress = useCreateProgress()
  const deleteProgress = useDeleteProgress()
  
  const [formData, setFormData] = useState({
    ownerId: '',
    date: getDateInputValue(),
    weightKg: '',
    bodyFatPct: '',
    chest: '',
    waist: '',
    hips: '',
    biceps: '',
    thighs: ''
  })
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.ownerId) return

    try {
      const progressData = {
        ownerId: formData.ownerId,
        date: toISO(new Date(formData.date + 'T12:00:00')),
        weightKg: formData.weightKg ? parseFloat(formData.weightKg) : null,
        bodyFatPct: formData.bodyFatPct ? parseFloat(formData.bodyFatPct) : null,
        chest: formData.chest ? parseFloat(formData.chest) : null,
        waist: formData.waist ? parseFloat(formData.waist) : null,
        hips: formData.hips ? parseFloat(formData.hips) : null,
        biceps: formData.biceps ? parseFloat(formData.biceps) : null,
        thighs: formData.thighs ? parseFloat(formData.thighs) : null
      }

      // Remove null values
      Object.keys(progressData).forEach(key => {
        if (progressData[key] === null && key !== 'ownerId' && key !== 'date') {
          delete progressData[key]
        }
      })

      await createProgress.mutateAsync(progressData)
      
      setFormData({
        ownerId: '',
        date: getDateInputValue(),
        weightKg: '',
        bodyFatPct: '',
        chest: '',
        waist: '',
        hips: '',
        biceps: '',
        thighs: ''
      })
      setSuccessMessage('Progress log created successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error creating progress log:', error)
    }
  }

  const handleDelete = async (progressId) => {
    if (window.confirm('Are you sure you want to delete this progress log?')) {
      try {
        await deleteProgress.mutateAsync(progressId)
      } catch (error) {
        console.error('Error deleting progress log:', error)
      }
    }
  }

  // Prepare chart data
  const chartData = progress?.map(entry => ({
    date: formatDate(entry.date),
    weight: entry.weightKg || null
  })).filter(entry => entry.weight !== null) || []

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Progress Tracking</h2>
      
      {/* User Selection */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select User</h3>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Choose a user...</option>
          {users?.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
      </div>

      {/* Weight Chart */}
      {selectedUserId && chartData.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Trend</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Create Form */}
      {selectedUserId && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Log Progress</h3>
          
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg">
              {successMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Owner *
                </label>
                <select
                  value={formData.ownerId}
                  onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select owner...</option>
                  {users?.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.weightKg}
                  onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Body Fat (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.bodyFatPct}
                  onChange={(e) => setFormData({ ...formData, bodyFatPct: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chest (cm)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.chest}
                  onChange={(e) => setFormData({ ...formData, chest: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Waist (cm)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.waist}
                  onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hips (cm)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.hips}
                  onChange={(e) => setFormData({ ...formData, hips: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biceps (cm)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.biceps}
                  onChange={(e) => setFormData({ ...formData, biceps: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thighs (cm)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.thighs}
                  onChange={(e) => setFormData({ ...formData, thighs: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={createProgress.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {createProgress.isPending ? 'Creating...' : 'Log Progress'}
            </button>
          </form>
        </div>
      )}

      {/* Progress List */}
      {selectedUserId && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Progress Logs ({progress?.length || 0})</h3>
          </div>
          <div className="p-6">
            {isLoading ? (
              <p className="text-center py-4">Loading progress logs...</p>
            ) : error ? (
              <p className="text-center py-4 text-red-600">Error: {error.message}</p>
            ) : progress?.length > 0 ? (
              <div className="space-y-4">
                {progress.map((log) => (
                  <div key={log.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{formatDate(log.date)}</h4>
                      </div>
                      <button
                        onClick={() => handleDelete(log.id)}
                        disabled={deleteProgress.isPending}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {log.weightKg && (
                        <div>
                          <span className="text-gray-500">Weight:</span>
                          <span className="ml-2 font-medium">{log.weightKg} kg</span>
                        </div>
                      )}
                      {log.bodyFatPct && (
                        <div>
                          <span className="text-gray-500">Body Fat:</span>
                          <span className="ml-2 font-medium">{log.bodyFatPct}%</span>
                        </div>
                      )}
                      {log.chest && (
                        <div>
                          <span className="text-gray-500">Chest:</span>
                          <span className="ml-2 font-medium">{log.chest} cm</span>
                        </div>
                      )}
                      {log.waist && (
                        <div>
                          <span className="text-gray-500">Waist:</span>
                          <span className="ml-2 font-medium">{log.waist} cm</span>
                        </div>
                      )}
                      {log.hips && (
                        <div>
                          <span className="text-gray-500">Hips:</span>
                          <span className="ml-2 font-medium">{log.hips} cm</span>
                        </div>
                      )}
                      {log.biceps && (
                        <div>
                          <span className="text-gray-500">Biceps:</span>
                          <span className="ml-2 font-medium">{log.biceps} cm</span>
                        </div>
                      )}
                      {log.thighs && (
                        <div>
                          <span className="text-gray-500">Thighs:</span>
                          <span className="ml-2 font-medium">{log.thighs} cm</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No progress logs yet. Add your first measurement above!</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}