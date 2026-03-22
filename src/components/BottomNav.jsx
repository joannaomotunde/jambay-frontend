import { useNavigate } from 'react-router-dom'
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings } from 'react-icons/md'

function BottomNav() {
  const navigate = useNavigate()

  return (
    <div className="db-bottom-nav w-full">
      <button className="db-nav-btn" onClick={() => navigate('/dashboard')}>
        <div className="db-nav-icon-circle"><MdHome size={22}/></div>
        <p>Home</p>
      </button>

      <button className="db-nav-btn" onClick={() => navigate('/events-browse')}>
        <div className="db-nav-icon-circle"><MdEvent size={22}/></div>
        <p>Events</p>
      </button>

      <button className="db-nav-btn" onClick={() => navigate('/search')}>
        <div className="db-nav-icon-circle"><MdSearch size={22}/></div>
        <p>Search</p>
      </button>

      <button className="db-nav-btn" onClick={() => navigate('/profile')}>
        <div className="db-nav-icon-circle"><MdPerson size={22}/></div>
        <p>Profile</p>
      </button>

      <button className="db-nav-btn" onClick={() => navigate('/settings')}>
        <div className="db-nav-icon-circle"><MdSettings size={22}/></div>
        <p>Settings</p>
      </button>
    </div>
  )
}

export default BottomNav