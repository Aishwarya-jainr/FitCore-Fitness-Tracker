import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { useExercises } from '../hooks/useExercises'
import { useSessions, useCreateSession, useDeleteSession } from '../hooks/useSessions'
import { formatDateTime, toISO, getDateInputValue } from '../utils/date'

export default function Sessions() {
  const { data: users } = useUsers()
  const { data: exercises } = useExercises()
  const [selectedUserId, setSelectedUserId] = useState('')
  
  const { data: sessions, isLoading, error } = useSessions(selectedUserId)
  const createSession = useCreateSession()
  const deleteSession = useDeleteSession()
  
  const [formData, setFormData] = useState({
    ownerId: '',
    date: getDateInputValue(),
    durationMin: '',
    notes: '',
    items: []
  })
  const [successMessage, setSuccessMessage] = useState('')

  const addExercise = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { exerciseId: '', sets: [] }]
    })
  }

  const removeExercise = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    })
  }

  const updateExercise = (index, exerciseId) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], exerciseId }
    setFormData({ ...formData, items: newItems })
  }

  const addSet = (exerciseIndex) => {
    const newItems = [...formData.items]
    newItems[exerciseIndex].sets.push({ reps: '', weightKg: '', rpe: '' })
    setFormData({ ...formData, items: newItems })
  }

  const removeSet = (exerciseIndex, setIndex) => {
    const newItems = [...formData.items]
    newItems[exerciseIndex].sets = newItems[exerciseIndex].sets.filter((_, i) => i !== setIndex)
    setFormData({ ...formData, items: newItems })
  }

  const updateSet = (exerciseIndex, setIndex, field, value) => {
    const newItems = [...formData.items]
    newItems[exerciseIndex].sets[setIndex][field] = value
    setFormData({ ...formData, items: newItems })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.ownerId || !formData.durationMin) return

    try {
      const sessionData = {
        ownerId: formData.ownerId,
        date: toISO(new Date(formData.date + 'T12:00:00')),
        durationMin: parseInt(formData.durationMin),
        notes: formData.notes.trim(),
        items: formData.items.filter(item => item.exerciseId && item.sets.length > 0)
      }

      await createSession.mutateAsync(sessionData)
      
      setFormData({
        ownerId: '',
        date: getDateInputValue(),
        durationMin: '',
        notes: '',
        items: []
      })
      setSuccessMessage('Session created successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error creating session:', error)
    }
  }

  const handleDelete = async (sessionId) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        await deleteSession.mutateAsync(sessionId)
      } catch (error) {
        console.error('Error deleting session:', error)
      }
    }
  }

  const getExerciseName = (exerciseId) => {
    const exercise = exercises?.find(ex => ex.id === exerciseId)
    return exercise?.name || 'Unknown Exercise'
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Workout Sessions</h2>
      
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

      {/* Create Form */}
      {selectedUserId && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Log New Session</h3>
          
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg">
              {successMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.durationMin}
                  onChange={(e) => setFormData({ ...formData, durationMin: e.target.value })}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              />
            </div>

            {/* Exercises */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-gray-900">Exercises</h4>
                <button
                  type="button"
                  onClick={addExercise}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Add Exercise
                </button>
              </div>

              {formData.items.map((item, exerciseIndex) => (
                <div key={exerciseIndex} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <select
                      value={item.exerciseId}
                      onChange={(e) => updateExercise(exerciseIndex, e.target.value)}
                      className="flex-1 mr-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select exercise...</option>
                      {exercises?.map(exercise => (
                        <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeExercise(exerciseIndex)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium text-gray-700">Sets</h5>
                      <button
                        type="button"
                        onClick={() => addSet(exerciseIndex)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Add Set
                      </button>
                    </div>

                    {item.sets.map((set, setIndex) => (
                      <div key={setIndex} className="flex gap-2 items-center">
                        <span className="text-sm font-medium text-gray-500 w-8">#{setIndex + 1}</span>
                        <input
                          type="number"
                          placeholder="Reps"
                          min="1"
                          value={set.reps}
                          onChange={(e) => updateSet(exerciseIndex, setIndex, 'reps', e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          placeholder="Weight (kg)"
                          min="0"
                          step="0.5"
                          value={set.weightKg}
                          onChange={(e) => updateSet(exerciseIndex, setIndex, 'weightKg', e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          placeholder="RPE"
                          min="1"
                          max="10"
                          value={set.rpe}
                          onChange={(e) => updateSet(exerciseIndex, setIndex, 'rpe', e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeSet(exerciseIndex, setIndex)}
                          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              type="submit"
              disabled={createSession.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {createSession.isPending ? 'Creating...' : 'Log Session'}
            </button>
          </form>
        </div>
      )}

      {/* Sessions List */}
      {selectedUserId && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Sessions ({sessions?.length || 0})</h3>
          </div>
          <div className="p-6">
            {isLoading ? (
              <p className="text-center py-4">Loading sessions...</p>
            ) : error ? (
              <p className="text-center py-4 text-red-600">Error: {error.message}</p>
            ) : sessions?.length > 0 ? (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{formatDateTime(session.date)}</h4>
                        <p className="text-sm text-gray-600">{session.durationMin} minutes</p>
                        {session.notes && (
                          <p className="text-sm text-gray-600 mt-1">{session.notes}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(session.id)}
                        disabled={deleteSession.isPending}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {session.items?.map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded p-3">
                          <h5 className="font-medium text-gray-800 mb-2">
                            {getExerciseName(item.exerciseId)}
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {item.sets?.map((set, setIndex) => (
                              <span key={setIndex} className="inline-block bg-white px-2 py-1 rounded text-sm">
                                {set.reps} × {set.weightKg}kg {set.rpe && `(RPE ${set.rpe})`}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No sessions yet. Log your first workout above!</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}