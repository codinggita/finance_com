import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import StatCard from '../components/StatCard'
import { formatCurrency, getGreeting, QUOTES } from '../utils/helpers'

const Dashboard = () => {
  const { user, entries, goal, getTodayTotal, getMonthTotal, getYearTotal } = useContext(AppContext)

  const yearTotal = getYearTotal()
  const goalTarget = goal?.targetAmount || 100000
  const goalPct = Math.min(Math.round((yearTotal / goalTarget) * 100), 100)
  const quote = QUOTES[new Date().getDay() % QUOTES.length]
  const recent = entries.slice(0, 5)

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{getGreeting()}, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="text-sm text-gray-400 mt-1">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 px-4 py-3 rounded-r-lg mb-6 text-sm text-green-700 italic">
        {quote}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Today" value={formatCurrency(getTodayTotal())} />
        <StatCard label="This Month" value={formatCurrency(getMonthTotal())} />
        <StatCard label="This Year" value={formatCurrency(yearTotal)} />
        <StatCard label="Total Entries" value={entries.length} sub="all time" />
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-sm font-medium text-gray-700">Yearly Goal</div>
            <div className="text-xs text-gray-400">{formatCurrency(yearTotal)} of {formatCurrency(goalTarget)}</div>
          </div>
          <div className="text-2xl font-bold text-green-600 font-mono">{goalPct}%</div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div className="bg-green-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${goalPct}%` }} />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <div className="text-sm font-medium text-gray-700 mb-4">Recent Entries</div>
        {recent.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-6">No entries yet. Add your first saving! 💰</div>
        ) : (
          <div className="flex flex-col gap-3">
            {recent.map(entry => (
              <div key={entry._id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <div>
                  <div className="text-sm font-medium text-gray-700">{entry.description}</div>
                  <div className="text-xs text-gray-400">{entry.category}</div>
                </div>
                <div className="text-sm font-bold text-green-600 font-mono">{formatCurrency(entry.amount)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard