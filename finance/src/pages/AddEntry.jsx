import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const AddEntry = () => {
  const { addEntry } = useContext(AppContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    amount: '', description: '', category: 'Other',
    date: new Date().toISOString().split('T')[0], note: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.amount || form.amount <= 0) return
    setLoading(true)
    try {
      await addEntry(form)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Add Savings</h1>
      <p className="text-sm text-gray-400 mb-6">Record your savings entry</p>
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Amount (₹)</label>
            <div className="relative mt-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <input type="number" className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg text-lg font-mono focus:outline-none focus:border-green-400"
                placeholder="0" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required min="0" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Description</label>
            <input type="text" className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400"
              placeholder="e.g. Skipped lunch outside" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Category</label>
            <select className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400"
              value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="Emergency">🛡️ Emergency Fund</option>
              <option value="Vacation">✈️ Vacation</option>
              <option value="Investment">📈 Investment</option>
              <option value="Shopping">🛍️ Shopping Saved</option>
              <option value="Food">🍽️ Food Saved</option>
              <option value="Other">💰 Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Date</label>
            <input type="date" className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400"
              value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Note (optional)</label>
            <input type="text" className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400"
              placeholder="Any additional notes..." value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
          </div>
          <button type="submit" disabled={loading}
            className="bg-green-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors mt-2">
            {loading ? 'Saving...' : '💾 Save Entry'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddEntry