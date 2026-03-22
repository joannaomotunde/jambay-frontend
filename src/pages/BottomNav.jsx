// BottomNav.jsx
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export default function BottomNav({ active }) {
  const navigate = useNavigate()
  const navItems = [
    { key: 'home', label: 'Home', icon: <MdHome size={22} />, path: '/dashboard' },
    { key: 'events', label: 'Events', icon: <MdEvent size={22} />, path: '/events-browse' },
    { key: 'search', label: 'Search', icon: <MdSearch size={22} />, path: '/search' },
    { key: 'profile', label: 'Profile', icon: <MdPerson size={22} />, path: '/profile' },
    { key: 'settings', label: 'Settings', icon: <MdSettings size={22} />, path: '/settings' },
  ]

  return (
    <div className="bottom-nav w-full flex justify-around border-t bg-white py-2">
      {navItems.map(item => (
        <button
          key={item.key}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center text-xs ${
            active === item.key ? 'text-blue-600 font-semibold' : 'text-gray-600'
          }`}
        >
          <div className="mb-1">{item.icon}</div>
          {item.label}
        </button>
      ))}
    </div>
  )
}