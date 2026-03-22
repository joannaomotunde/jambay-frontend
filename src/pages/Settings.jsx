import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings, MdChevronRight } from 'react-icons/md'
import './Settings.css'
import './Dashboard.css'

function Settings() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const menuItems = [
    { id: 1, label: 'Notification Settings' },
    { id: 2, label: 'Payment Settings' },
    { id: 3, label: 'Support' },
    { id: 4, label: 'Legal' },
    { id: 5, label: 'Help Center' },
    { id: 6, label: 'Our Blogs' },
    { id: 7, label: 'About Us' },
    { id: 8, label: 'Contact Us' },
    { id: 9, label: 'Updates' },
  ]

  return (
    <div className="auth-container" style={{ justifyContent: 'flex-start' }}>
      <div className="st-wrapper">

        {/* Menu Items */}
        <div className="st-menu">
          {menuItems.map(item => (
            <div key={item.id} className="st-menu-item">
              <p className="st-menu-label">{item.label}</p>
              <div className="st-menu-arrow">
                <MdChevronRight size={20} color="#1E293B" />
              </div>
            </div>
          ))}

          {/* Log Out */}
          <div className="st-menu-item" onClick={handleLogout}>
            <p className="st-menu-label st-logout-label">Log Out</p>
            <div className="st-menu-arrow">
              <MdChevronRight size={20} color="#1E293B" />
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="db-bottom-nav">
          <button className="db-nav-btn" onClick={() => navigate('/dashboard')}>
            <div className="db-nav-icon-circle"><MdHome size={22} /></div>
            <p>Home</p>
          </button>
          <button className="db-nav-btn" onClick={() => navigate('/events-browse')}>
            <div className="db-nav-icon-circle"><MdEvent size={22} /></div>
            <p>Events</p>
          </button>
          <button className="db-nav-btn" onClick={() => navigate('/search')}>
            <div className="db-nav-icon-circle"><MdSearch size={22} /></div>
            <p>Search</p>
          </button>
          <button className="db-nav-btn" onClick={() => navigate('/profile')}>
            <div className="db-nav-icon-circle"><MdPerson size={22} /></div>
            <p>Profile</p>
          </button>
          <button className="db-nav-btn active">
            <div className="db-nav-icon-circle"><MdSettings size={22} /></div>
            <p>Settings</p>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Settings