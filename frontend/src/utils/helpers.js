export const formatCurrency = (amount) => {
  return '₹' + Number(amount || 0).toLocaleString('en-IN')
}

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

export const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export const QUOTES = [
  "તમે સારું કરી રહ્યા છો! — You're doing great!",
  "નાની બચત, મોટું ભવિષ્ય — Small savings, big future.",
  "Paisa bachao, sapna pura karo!",
  "Every rupee saved is a rupee earned.",
  "Consistency is the key to financial freedom.",
]

export const CAT_COLORS = {
  Emergency: 'bg-green-100 text-green-700',
  Vacation: 'bg-blue-100 text-blue-700',
  Investment: 'bg-yellow-100 text-yellow-700',
  Shopping: 'bg-red-100 text-red-700',
  Food: 'bg-purple-100 text-purple-700',
  Other: 'bg-gray-100 text-gray-700',
}