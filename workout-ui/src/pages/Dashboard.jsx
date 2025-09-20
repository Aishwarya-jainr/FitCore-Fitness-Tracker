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
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <p className="text-blue-800">
            Create a user first on the Users page to get started with tracking your workouts.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Exercise Count */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Exercises</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{exerciseCount}</p>
        </div>

        {/* Latest Progress Weight */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Current Weight</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {latestProgress?.weightKg ? `${latestProgress.weightKg} kg` : '-'}
          </p>
        </div>

        {/* Latest Progress Body Fat */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Body Fat %</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {latestProgress?.bodyFatPct ? `${latestProgress.bodyFatPct}%` : '-'}
          </p>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Sessions</h3>
        </div>
        <div className="p-6">
          {lastFiveSessions.length > 0 ? (
            <div className="space-y-4">
              {lastFiveSessions.map((session) => (
                <div key={session.id} className="flex justify-between items-start p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">{formatDate(session.date)}</p>
                    <p className="text-sm text-gray-500">{session.durationMin} minutes</p>
                    <p className="text-sm text-gray-500">{session.items?.length || 0} exercises</p>
                  </div>
                  {session.notes && (
                    <p className="text-sm text-gray-600 max-w-xs">{session.notes}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No sessions yet. Start logging your workouts!</p>
          )}
        </div>
      </div>
    </div>
  )
}