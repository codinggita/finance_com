import { formatCurrency, formatDate, CAT_COLORS } from '../utils/helpers'

const EntryItem = ({ entry, onDelete }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
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
        <div className="text-sm font-bold text-green-600 font-mono">
          {formatCurrency(entry.amount)}
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(entry._id)}
            className="text-red-300 hover:text-red-500 text-xs transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default EntryItem