import { Link, useLocation } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Exercises', href: '/exercises' },
  { name: 'Sessions', href: '/sessions' },
  { name: 'Progress', href: '/progress' },
  { name: 'Users', href: '/users' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-white shadow-sm border-r border-gray-200">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = item.href === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(item.href)
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}