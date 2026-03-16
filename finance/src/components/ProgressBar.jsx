const ProgressBar = ({ value, max, color = 'bg-green-500' }) => {
  const pct = Math.min(Math.round((value / max) * 100), 100)

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{pct}%</span>
        <span>{max}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div
          className={`${color} h-3 rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar