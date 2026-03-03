import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../App.css'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome, {user?.name}! 👋</h2>
        <p className="auth-subtitle">You are logged in successfully.</p>

        <button className="auth-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard