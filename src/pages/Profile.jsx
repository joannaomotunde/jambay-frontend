import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings, MdChevronRight } from 'react-icons/md'
import './Profile.css'
import './Dashboard.css'

function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const menuItems = [
    { id: 1, label: 'My Tickets' },
    { id: 2, label: 'Favorites' },
    { id: 3, label: 'Loyalty Points & Merchs' },
    { id: 4, label: 'Saved Events' },
    { id: 5, label: 'My Orders' },
    { id: 6, label: 'Sell Tickets' },
    { id: 7, label: 'History' },
    { id: 8, label: 'Following' },
  ]

  return (
    <div className="auth-container" style={{ justifyContent: 'flex-start', minHeight: '100vh' }}>
      <div className="pf-wrapper">

        {/* Account Title */}
        <div className="pf-account-row">
          <p className="pf-account-label">Account Info</p>
          <div className="pf-avatar">
            <MdPerson size={28} color="#4ECDC4" />
          </div>
        </div>

        {/* User Info Card */}
        <div className="pf-user-card">
          <div className="pf-user-avatar">
            <MdPerson size={36} color="#4ECDC4" />
          </div>
          <div className="pf-user-info">
            <p className="pf-user-name">{user?.name || 'John Anderson'}</p>
            <p className="pf-user-email">{user?.email || 'john.anderson@email.com'}</p>
            <button className="pf-edit-btn" onClick={() => navigate('/profile/edit')}>
              Edit Profile
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="pf-menu">
          {menuItems.map(item => (
            <div key={item.id} className="pf-menu-item">
              <p className="pf-menu-label">{item.label}</p>
              <div className="pf-menu-arrow">
                <MdChevronRight size={20} color="#1E293B" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Nav */}
        <div className="db-bottom-nav" style={{ marginTop: 'auto' }}>
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
          <button className="db-nav-btn active">
            <div className="db-nav-icon-circle"><MdPerson size={22} /></div>
            <p>Profile</p>
          </button>
          <button className="db-nav-btn" onClick={() => navigate('/settings')}>
            <div className="db-nav-icon-circle"><MdSettings size={22} /></div>
            <p>Settings</p>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Profile