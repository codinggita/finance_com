import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const navItems = [
  { path: '/', icon: '📊', label: 'Dashboard' },
  { path: '/add', icon: '➕', label: 'Add Savings' },
  { path: '/history', icon: '📋', label: 'History' },
  { path: '/goals', icon: '🎯', label: 'Goals' },
  { path: '/sip', icon: '📈', label: 'SIP Calculator' },
  { path: '/achievements', icon: '🏆', label: 'Achievements' },
]

const Sidebar = () => {
  const { user, logout } = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-100 flex flex-col py-6 px-3">
      <div className="text-lg font-semibold text-green-600 px-3 mb-8">
        Finance<span className="text-gray-800">.com</span>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
              ${location.pathname === item.path
                ? 'bg-green-50 text-green-700'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-3 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-400 mb-1">{user?.name}</div>
        <button
          onClick={logout}
          className="text-sm text-red-400 hover:text-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar