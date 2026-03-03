import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../App.css'

function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">My Profile</h2>

        <div className="profile-field">
          <label className="profile-label">Full Name</label>
          <p className="profile-value">{user?.name}</p>
        </div>

        <div className="profile-field">
          <label className="profile-label">Email Address</label>
          <p className="profile-value">{user?.email}</p>
        </div>

        <button className="auth-button" onClick={() => navigate('/edit-profile')}>
          Edit Profile
        </button>

        <button className="auth-button logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Profile