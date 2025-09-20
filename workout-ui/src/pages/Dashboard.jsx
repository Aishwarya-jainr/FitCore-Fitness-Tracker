import { useExercises } from '../hooks/useExercises'
import { useSessions } from '../hooks/useSessions'
import { useProgress } from '../hooks/useProgress'
import { useUsers } from '../hooks/useUsers'
import { formatDate } from '../utils/date'

export default function Dashboard() {
  const { data: users } = useUsers()
  const { data: exercises } = useExercises()
  
  const firstUserId = users?.[0]?.id
  const { data: sessions } = useSessions(firstUserId)
  const { data: progress } = useProgress(firstUserId)

  const exerciseCount = exercises?.length || 0
  const lastFiveSessions = sessions?.slice(-5).reverse() || []
  const latestProgress = progress?.[progress.length - 1]

  if (!firstUserId && users?.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="animate-float inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">Welcome to Your Fitness Journey</h2>
          <p className="text-white/80 text-xl mb-8">Ready to transform your workout experience?</p>
        </div>
        
        <div className="glass backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 hover-lift">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Get Started</h3>
            <p className="text-white/70 mb-6">Create your first user profile to begin tracking your fitness progress</p>
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-semibold hover-lift cursor-pointer">
              <span>Create User Profile</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-white mb-4">Fitness Dashboard</h2>
        <p className="text-white/80 text-xl">Track your progress, crush your goals</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Exercise Count */}
        <div className="glass backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 hover-lift group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-white">{exerciseCount}</p>
              <p className="text-white/60 text-sm font-medium">Exercises</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-white/80 text-sm">Total Available</p>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Latest Progress Weight */}
        <div className="glass backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 hover-lift group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-3m3 3l3-3" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-white">
                {latestProgress?.weightKg || '-'}
                {latestProgress?.weightKg && <span className="text-2xl text-white/60 ml-1">kg</span>}
              </p>
              <p className="text-white/60 text-sm font-medium">Current Weight</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-white/80 text-sm">Latest Reading</p>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-blue-400 text-sm font-medium">Tracking</span>
            </div>
          </div>
        </div>

        {/* Latest Progress Body Fat */}
        <div className="glass backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 hover-lift group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-white">
                {latestProgress?.bodyFatPct || '-'}
                {latestProgress?.bodyFatPct && <span className="text-2xl text-white/60 ml-1">%</span>}
              </p>
              <p className="text-white/60 text-sm font-medium">Body Fat</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-white/80 text-sm">Body Composition</p>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-orange-400 text-sm font-medium">Monitor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="glass backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 overflow-hidden">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Recent Workouts</h3>
              <p className="text-white/60">Your latest training sessions</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-8">
          {lastFiveSessions.length > 0 ? (
            <div className="space-y-4">
              {lastFiveSessions.map((session, index) => (
                <div key={session.id} className="glass-dark backdrop-blur-lg bg-white/5 rounded-2xl p-6 hover-lift group" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">#{lastFiveSessions.length - index}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg">{formatDate(session.date)}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-2 text-white/60">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium">{session.durationMin} min</span>
                          </div>
                          <div className="flex items-center space-x-2 text-white/60">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            <span className="text-sm font-medium">{session.items?.length || 0} exercises</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {session.notes && (
                        <p className="text-white/80 text-sm max-w-xs italic">"{session.notes}"</p>
                      )}
                      <div className="flex items-center justify-end mt-2">
                        <div className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
                          <span className="text-green-400 text-xs font-semibold">COMPLETED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-500 rounded-3xl flex items-center justify-center mx-auto mb-4 opacity-50">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white/60 text-lg">No sessions yet</p>
              <p className="text-white/40 text-sm mt-2">Start logging your workouts to see them here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}