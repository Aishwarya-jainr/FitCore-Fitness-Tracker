import { useState } from 'react'
import { useExercises, useCreateExercise } from '../hooks/useExercises'

const categories = [
  { value: 'strength', label: 'Strength', icon: '💪', color: 'from-red-500 to-orange-500' },
  { value: 'cardio', label: 'Cardio', icon: '❤️', color: 'from-pink-500 to-rose-500' },
  { value: 'mobility', label: 'Mobility', icon: '🧘', color: 'from-green-500 to-emerald-500' },
  { value: 'other', label: 'Other', icon: '⚡', color: 'from-purple-500 to-indigo-500' }
]

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

  const getCategoryData = (category) => {
    return categories.find(cat => cat.value === category) || categories[0]
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <p className="text-white text-lg">Loading your exercises...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass backdrop-blur-xl bg-red-500/10 rounded-3xl p-8 border border-red-500/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-400 text-lg font-semibold">Error loading exercises</p>
          <p className="text-red-300 text-sm mt-2">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-white mb-4">Exercise Library</h2>
        <p className="text-white/80 text-xl">Build your perfect workout arsenal</p>
      </div>
      
      {/* Create Form */}
      <div className="glass backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 overflow-hidden">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Add New Exercise</h3>
              <p className="text-white/60">Expand your training possibilities</p>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          {successMessage && (
            <div className="mb-6 p-4 glass-dark backdrop-blur-lg bg-green-500/20 border border-green-500/30 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-green-500 rounded-full">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-green-400 font-medium">{successMessage}</span>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                Exercise Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-4 glass-dark backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g. Barbell Bench Press"
                required
              />
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.value })}
                    className={`p-4 rounded-2xl border transition-all duration-300 hover-lift ${
                      formData.category === cat.value
                        ? `bg-gradient-to-r ${cat.color} border-white/30 shadow-lg`
                        : 'glass-dark backdrop-blur-lg bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <div className="text-white font-semibold text-sm">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                Primary Muscles
              </label>
              <input
                type="text"
                value={formData.primaryMuscles}
                onChange={(e) => setFormData({ ...formData, primaryMuscles: e.target.value })}
                className="w-full px-4 py-4 glass-dark backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g. chest, shoulders, triceps"
              />
            </div>
            
            <button
              type="submit"
              disabled={createExercise.isPending}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-bold text-lg hover-lift disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
            >
              {createExercise.isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Exercise...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Exercise</span>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Exercise List */}
      <div className="glass backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 overflow-hidden">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">Your Exercise Arsenal</h3>
              <p className="text-white/60 mt-1">{exercises?.length || 0} exercises ready for action</p>
            </div>
            <div className="flex items-center space-x-2">
              {categories.map(cat => {
                const count = exercises?.filter(ex => ex.category === cat.value).length || 0
                return (
                  <div key={cat.value} className="flex items-center space-x-1">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-white/60 text-sm">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        
        <div className="p-8">
          {exercises?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise, index) => {
                const categoryData = getCategoryData(exercise.category)
                return (
                  <div key={exercise.id} className="glass-dark backdrop-blur-lg bg-white/5 rounded-2xl p-6 hover-lift group animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${categoryData.color} group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-xl">{categoryData.icon}</span>
                      </div>
                      <div className="px-3 py-1 glass-dark backdrop-blur-lg bg-white/10 rounded-full border border-white/20">
                        <span className="text-white/70 text-xs font-medium uppercase tracking-wide">{categoryData.label}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-white font-bold text-lg mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                      {exercise.name}
                    </h4>
                    
                    {exercise.primaryMuscles && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exercise.primaryMuscles.split(',').map((muscle, i) => (
                          <span key={i} className="px-2 py-1 glass-dark backdrop-blur-lg bg-white/10 rounded-lg text-white/80 text-xs font-medium border border-white/10">
                            {muscle.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-500 rounded-3xl flex items-center justify-center mx-auto mb-6 opacity-50">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <p className="text-white/60 text-xl font-semibold">No exercises yet</p>
              <p className="text-white/40 text-sm mt-2">Add your first exercise above to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}