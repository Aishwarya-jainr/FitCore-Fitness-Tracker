import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-700 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-pattern"></div>
      <div className="floating-orbs absolute inset-0"></div>
      
      {/* Main layout */}
      <div className="relative z-10">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8 ml-80 mt-20 min-h-screen">
            <div className="animate-fadeInUp">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}