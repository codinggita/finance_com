import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Register = () => {
  const { register } = useContext(AppContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(form.name, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError('Registration failed. Try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Create account 🎉</h1>
        <p className="text-sm text-gray-400 mb-6">Start tracking your savings</p>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Name</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors mt-2"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Already have account?{' '}
          <Link to="/login" className="text-green-600 font-medium">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register