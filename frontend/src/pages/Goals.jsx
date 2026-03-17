import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { formatCurrency } from '../utils/helpers'

const Goals = () => {
  const { goal, setGoal, getYearTotal } = useContext(AppContext)
  const [target, setTarget] = useState('')
  const [loading, setLoading] = useState(false)

  const yearTotal = getYearTotal()
  const goalTarget = goal?.targetAmount || 100000
  const goalPct = Math.min(Math.round((yearTotal / goalTarget) * 100), 100)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await setGoal(Number(target))
    setLoading(false)
    setTarget('')
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Goals</h1>
      <p className="text-sm text-gray-400 mb-6">Set and track your savings targets</p>
      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-4">
        <div className="text-sm font-medium text-gray-700 mb-4">Set Yearly Goal</div>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
            <input type="number" className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-green-400"
              placeholder="100000" value={target} onChange={e => setTarget(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading}
            className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            {loading ? '...' : 'Set'}
          </button>
        </form>
      </div>
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <div className="text-center py-4">
          <div className="text-5xl font-bold text-green-600 font-mono mb-2">{goalPct}%</div>
          <div className="text-sm text-gray-400 mb-6">{formatCurrency(yearTotal)} of {formatCurrency(goalTarget)}</div>
          <div className="w-full bg-gray-100 rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full transition-all duration-1000" style={{ width: `${goalPct}%` }} />
          </div>
          <div className="text-xs text-gray-400 mt-3">{formatCurrency(goalTarget - yearTotal)} remaining</div>
        </div>
      </div>
    </div>
  )
}

export default Goals