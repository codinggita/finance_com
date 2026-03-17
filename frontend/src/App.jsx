import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppProvider, AppContext } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import AddEntry from './pages/AddEntry'
import History from './pages/History'
import Goals from './pages/Goals'
import SIPCalc from './pages/SIPCalc'
import Achievements from './pages/Achievements'
import Login from './pages/Login'
import Register from './pages/Register'

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AppContext)
  return user ? children : <Navigate to="/login" />
}

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><Layout><AddEntry /></Layout></PrivateRoute>} />
          <Route path="/history" element={<PrivateRoute><Layout><History /></Layout></PrivateRoute>} />
          <Route path="/goals" element={<PrivateRoute><Layout><Goals /></Layout></PrivateRoute>} />
          <Route path="/sip" element={<PrivateRoute><Layout><SIPCalc /></Layout></PrivateRoute>} />
          <Route path="/achievements" element={<PrivateRoute><Layout><Achievements /></Layout></PrivateRoute>} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
