import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { user, logout } = useContext(AppContext)

  return (
    <div className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      <div className="text-sm font-medium text-gray-700">
        Finance<span className="text-green-600">.com</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">{user?.name}</span>
        <button
          onClick={logout}
          className="text-sm text-red-400 hover:text-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar