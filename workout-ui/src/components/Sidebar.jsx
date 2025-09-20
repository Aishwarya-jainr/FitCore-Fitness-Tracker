import { Link, useLocation } from 'react-router-dom'

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
      </svg>
    )
  },
  { 
    name: 'Exercises', 
    href: '/exercises',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    )
  },
  { 
    name: 'Sessions', 
    href: '/sessions',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  { 
    name: 'Progress', 
    href: '/progress',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  { 
    name: 'Users', 
    href: '/users',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    )
  },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="fixed left-0 top-20 h-full w-80 z-40">
      <div className="glass backdrop-blur-xl bg-white/10 h-full border-r border-white/20">
        <div className="p-6">
          {/* Profile section */}
          <div className="mb-8 p-4 glass-dark rounded-2xl hover-lift">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold">Fitness Pro</p>
                <p className="text-white/60 text-sm">Level 5 Athlete</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigation.map((item, index) => {
              const isActive = item.href === '/' 
                ? location.pathname === '/' 
                : location.pathname.startsWith(item.href)
              
              return (
                <div key={item.name} className="animate-slideInLeft" style={{ animationDelay: `${index * 100}ms` }}>
                  <Link
                    to={item.href}
                    className={`group flex items-center space-x-4 px-4 py-4 text-sm font-medium rounded-2xl transition-all duration-300 hover-lift ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-white/20 shadow-lg'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg' 
                        : 'bg-white/10 group-hover:bg-white/20'
                    }`}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* Stats section */}
          <div className="mt-8 p-4 glass-dark rounded-2xl">
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-sm">This Week</span>
                <span className="text-white font-semibold">5 workouts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-sm">Streak</span>
                <span className="text-white font-semibold">12 days 🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}