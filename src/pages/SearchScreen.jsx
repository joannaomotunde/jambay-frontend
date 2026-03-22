import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings } from 'react-icons/md'
import { HiAdjustments } from 'react-icons/hi'
import './SearchScreen.css'
import './Dashboard.css'

// Our Top Picks
import trendingEvents from '../assets/images/Trending events.png'
import ticketsOnSale from '../assets/images/Tickets on sale.png'
import lostBoys from '../assets/images/Lost boys.png'

// Last Minute Plans
import eigth from '../assets/images/Eigth.jpeg'
import baDeals from '../assets/images/BA Deals.jpeg'
import nflDeals from '../assets/images/NFL Deals.jpeg'

function SearchScreen() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState(null)

  const filters = ['Quantity', 'Perks', 'Price excl. fees', 'Seat']

  const topPicks = [
    { id: 1, title: 'Trending Events', img: trendingEvents },
    { id: 2, title: 'Tickets on Sale', img: ticketsOnSale },
    { id: 3, title: 'Lost Boys', img: lostBoys },
  ]

  const lastMinute = [
    { id: 1, title: 'Bruno Mars', img: eigth },
    { id: 2, title: 'NBA', img: baDeals },
    { id: 3, title: 'NFL', img: nflDeals },
  ]

  return (
    <div className="auth-container" style={{ justifyContent: 'flex-start' }}>
      <div className="ss-wrapper">

        {/* Location */}
        <div className="ss-location-row">
          <span className="ss-location-icon">📍</span>
          <p className="ss-location-text">Lagos</p>
        </div>

        {/* Search Bar */}
        <div className="ss-search-bar">
          <MdSearch size={18} color="#94A3B8" />
          <input
            className="ss-search-input"
            type="text"
            placeholder="Search events, places and artists"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Row */}
        <div className="ss-filter-row">
          <HiAdjustments size={20} color="#1E293B" />
          <div className="ss-filters">
            {filters.map(f => (
              <button
                key={f}
                className={`ss-filter-pill${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Recents */}
        <div className="ss-section">
          <h3 className="ss-section-title">Recents</h3>
          <p className="ss-section-sub">There are no recent searches.</p>
        </div>

        {/* Our Top Picks */}
        <div className="ss-section">
          <div className="ss-section-header">
            <div>
              <h3 className="ss-section-title">Our top picks</h3>
              <p className="ss-section-sub">Check out all the latest on the scene.</p>
            </div>
            <button className="ss-see-all">see all &rsaquo;</button>
          </div>
          <div className="ss-scroll-row">
            {topPicks.map(e => (
              <div key={e.id} className="ss-card">
                <img src={e.img} alt={e.title} className="ss-card-img" />
              </div>
            ))}
          </div>
        </div>

        {/* Last Minute Plans */}
        <div className="ss-section">
          <div className="ss-section-header">
            <div>
              <h3 className="ss-section-title">Last minute plans</h3>
              <p className="ss-section-sub">Grab tickets for today or tomorrow.</p>
            </div>
            <button className="ss-see-all">see all &rsaquo;</button>
          </div>
          <div className="ss-scroll-row">
            {lastMinute.map(e => (
              <div key={e.id} className="ss-card">
                <img src={e.img} alt={e.title} className="ss-card-img" />
              </div>
            ))}
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
          <button className="db-nav-btn active">
            <div className="db-nav-icon-circle"><MdSearch size={22} /></div>
            <p>Search</p>
          </button>
          <button className="db-nav-btn" onClick={() => navigate('/profile')}>
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

export default SearchScreen