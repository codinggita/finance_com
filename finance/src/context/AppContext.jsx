import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AppContext = createContext()

const API = 'https://finance-com-3pd2.onrender.com/api'

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [entries, setEntries] = useState([])
  const [goal, setGoalData] = useState(null)
  const [loading, setLoading] = useState(false)

  const token = user?.token
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } }

  const login = async (email, password) => {
    const { data } = await axios.post(`${API}/auth/login`, { email, password })
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
  }

  const register = async (name, email, password) => {
    const { data } = await axios.post(`${API}/auth/register`, { name, email, password })
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const fetchEntries = async () => {
    if (!token) return
    setLoading(true)
    try {
      const { data } = await axios.get(`${API}/entries`, authHeaders)
      setEntries(data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const addEntry = async (entryData) => {
    const { data } = await axios.post(`${API}/entries`, entryData, authHeaders)
    setEntries([data, ...entries])
  }

  const deleteEntry = async (id) => {
    await axios.delete(`${API}/entries/${id}`, authHeaders)
    setEntries(entries.filter(e => e._id !== id))
  }

  const fetchGoal = async () => {
    if (!token) return
    try {
      const { data } = await axios.get(`${API}/goals`, authHeaders)
      setGoalData(data)
    } catch (err) {
      console.error(err)
    }
  }

  const setGoal = async (targetAmount) => {
    const { data } = await axios.post(`${API}/goals`, { targetAmount }, authHeaders)
    setGoalData(data)
  }

  useEffect(() => {
    if (token) {
      fetchEntries()
      fetchGoal()
    }
  }, [token])

  const getTodayTotal = () => {
    const today = new Date().toISOString().split('T')[0]
    return entries.filter(e => e.date?.split('T')[0] === today).reduce((sum, e) => sum + e.amount, 0)
  }

  const getMonthTotal = () => {
    const now = new Date()
    return entries.filter(e => {
      const d = new Date(e.date)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }).reduce((sum, e) => sum + e.amount, 0)
  }

  const getYearTotal = () => {
    const year = new Date().getFullYear()
    return entries.filter(e => new Date(e.date).getFullYear() === year).reduce((sum, e) => sum + e.amount, 0)
  }

  return (
    <AppContext.Provider value={{
      user, login, register, logout,
      entries, addEntry, deleteEntry, fetchEntries,
      goal, setGoal, fetchGoal,
      loading,
      getTodayTotal, getMonthTotal, getYearTotal
    }}>
      {children}
    </AppContext.Provider>
  )
}