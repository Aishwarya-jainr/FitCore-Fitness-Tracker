export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center animate-pulse-slow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Workout Planner</h1>
                <p className="text-white/70 text-sm">Transform your fitness journey</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-white/80">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Live</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center hover-lift cursor-pointer">
                <span className="text-white font-semibold text-sm">U</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}