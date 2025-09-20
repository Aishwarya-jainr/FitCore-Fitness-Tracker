import { useState } from 'react'
import { useExercises, useCreateExercise } from '../hooks/useExercises'

const categories = ['strength', 'cardio', 'mobility', 'other']

export default function Exercises() {
  const { data: exercises, isLoading, error } = useExercises()
  const createExercise = useCreateExercise()
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'strength',
    primaryMuscles: ''
  })
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    try {
      await createExercise.mutateAsync({
        name: formData.name.trim(),
        category: formData.category,
        primaryMuscles: formData.primaryMuscles.trim()
      })
      
      setFormData({ name: '', category: 'strength', primaryMuscles: '' })
      setSuccessMessage('Exercise created successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error creating exercise:', error)
    }
  }

  if (isLoading) return <div className="text-center py-8">Loading exercises...</div>
  if (error) return <div className="text-center py-8 text-red-600">Error loading exercises: {error.message}</div>

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Exercises</h2>
      
      {/* Create Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Exercise</h3>
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Muscles (comma separated)
            </label>
            <input
              type="text"
              value={formData.primaryMuscles}
              onChange={(e) => setFormData({ ...formData, primaryMuscles: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. chest, shoulders, triceps"
            />
          </div>
          
          <button
            type="submit"
            disabled={createExercise.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {createExercise.isPending ? 'Creating...' : 'Add Exercise'}
          </button>
        </form>
      </div>

      {/* Exercise List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Exercises ({exercises?.length || 0})</h3>
        </div>
        <div className="p-6">
          {exercises?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exercises.map((exercise) => (
                <div key={exercise.id} className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
                  <p className="text-sm text-gray-600 capitalize mt-1">{exercise.category}</p>
                  {exercise.primaryMuscles && (
                    <p className="text-sm text-gray-500 mt-2">{exercise.primaryMuscles}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No exercises yet. Add your first exercise above!</p>
          )}
        </div>
      </div>
    </div>
  )
}