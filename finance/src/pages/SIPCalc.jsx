import { useState } from 'react'
import { formatCurrency } from '../utils/helpers'

const SIPCalc = () => {
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const months = years * 12
  const monthlyRate = rate / 12 / 100
  const futureValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
  const invested = monthly * months
  const profit = futureValue - invested

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">SIP Calculator</h1>
      <p className="text-sm text-gray-400 mb-6">See how your savings grow with compound interest</p>
      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-4">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Monthly Investment (₹)</label>
            <input type="number" className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-green-400"
              value={monthly} onChange={e => setMonthly(Number(e.target.value))} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Expected Return Rate (% / year)</label>
            <input type="number" className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-green-400"
              value={rate} step="0.5" onChange={e => setRate(Number(e.target.value))} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Investment Period (Years)</label>
            <input type="number" className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-green-400"
              value={years} onChange={e => setYears(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="text-xs text-blue-400 mb-1">Amount Invested</div>
          <div className="text-xl font-bold text-blue-600 font-mono">{formatCurrency(invested)}</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="text-xs text-green-400 mb-1">Future Value</div>
          <div className="text-xl font-bold text-green-600 font-mono">{formatCurrency(futureValue)}</div>
        </div>
      </div>
      <div className="bg-white border border-gray-100 rounded-xl p-5 text-center">
        <div className="text-xs text-gray-400 mb-1">Estimated Profit</div>
        <div className="text-3xl font-bold text-green-600 font-mono">{formatCurrency(profit)}</div>
      </div>
    </div>
  )
}

export default SIPCalc