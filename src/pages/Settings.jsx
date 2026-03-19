import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { MdChevronRight } from 'react-icons/md'
import AppLayout from '../layout/AppLayout'

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
    <AppLayout>

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

        </div>
      </div>

    </AppLayout>
  )
}

export default Settings