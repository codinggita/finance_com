const StatCard = ({ label, value, sub, subColor = 'text-gray-400' }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className="text-2xl font-bold text-gray-800 font-mono">
        {value}
      </div>
      {sub && (
        <div className={`text-xs mt-1 ${subColor}`}>{sub}</div>
      )}
    </div>
  )
}

export default StatCard