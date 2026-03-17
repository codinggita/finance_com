import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const badges = [
  { id: 1, icon: '🌱', name: 'First Save', desc: 'Add your first entry', condition: (e) => e.length >= 1 },
  { id: 2, icon: '🔥', name: '7 Day Streak', desc: 'Save 7 days in a row', condition: (e) => e.length >= 7 },
  { id: 3, icon: '💰', name: '₹10,000 Saved', desc: 'Save ₹10,000 total', condition: (e, t) => t >= 10000 },
  { id: 4, icon: '🚀', name: '₹50,000 Saved', desc: 'Save ₹50,000 total', condition: (e, t) => t >= 50000 },
  { id: 5, icon: '👑', name: '₹1,00,000 Saved', desc: 'Save ₹1 lakh total', condition: (e, t) => t >= 100000 },
  { id: 6, icon: '📅', name: '30 Entries', desc: 'Add 30 entries', condition: (e) => e.length >= 30 },
]

const Achievements = () => {
  const { entries, getYearTotal } = useContext(AppContext)
  const total = getYearTotal()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Achievements</h1>
      <p className="text-sm text-gray-400 mb-6">Unlock badges as you save more</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map(badge => {
          const unlocked = badge.condition(entries, total)
          return (
            <div key={badge.id} className={`rounded-xl p-5 text-center border transition-all
              ${unlocked ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 opacity-50'}`}>
              <div className="text-3xl mb-2">{badge.icon}</div>
              <div className="text-sm font-semibold text-gray-700">{badge.name}</div>
              <div className="text-xs text-gray-400 mt-1">{badge.desc}</div>
              {unlocked && <div className="text-xs text-green-600 font-medium mt-2">✓ Unlocked!</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Achievements