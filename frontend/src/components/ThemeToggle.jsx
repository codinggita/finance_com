import { useState, useEffect } from 'react'

const ThemeToggle = () => {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 w-full"
    >
      <span>{dark ? '☀️' : '🌙'}</span>
      <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  )
}

export default ThemeToggle