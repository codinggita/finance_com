import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { formatCurrency, formatDate, CAT_COLORS } from '../utils/helpers'

const History = () => {
  const { entries, deleteEntry } = useContext(AppContext)
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? entries : entries.filter(e => e.category === filter)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">History</h1>
          <p className="text-sm text-gray-400 mt-1">All your savings entries</p>
        </div>
        <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
          value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Emergency">Emergency</option>
          <option value="Vacation">Vacation</option>
          <option value="Investment">Investment</option>
          <option value="Shopping">Shopping</option>
          <option value="Food">Food</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-8">No entries found</div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(entry => (
              <div key={entry._id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <div className="text-sm font-medium text-gray-700">{entry.description}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CAT_COLORS[entry.category] || 'bg-gray-100 text-gray-600'}`}>
                      {entry.category}
                    </span>
                    <span className="text-xs text-gray-400">{formatDate(entry.date)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm font-bold text-green-600 font-mono">{formatCurrency(entry.amount)}</div>
                  <button onClick={() => deleteEntry(entry._id)} className="text-red-300 hover:text-red-500 text-xs transition-colors">✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default History