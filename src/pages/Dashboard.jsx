import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings } from 'react-icons/md'
import border1 from '../assets/images/Border 1.jpeg'
import border2 from '../assets/images/Border 2.jpeg'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('VIP')

  const filters = ['Hotel', 'VIP', 'Gift cards', 'Sell', 'Help']

  const upcomingEvents = [
    { id: 1, title: 'New York Knicks vs Utah Jazz', subtitle: 'Row 2', price: '$197', img: null },
    { id: 2, title: 'Burna Boy Live', subtitle: 'VIP', price: '$250', img: null },
    { id: 3, title: 'Afrobeats Festival', subtitle: 'General', price: '$80', img: null },
  ]

  const trendingEvents = [
    { id: 1, title: 'Wishbone World Tour', date: '25 MAJ STOCKHOLM', img: null },
    { id: 2, title: 'Conan Gray', date: '20 APR LONDON', img: null },
    { id: 3, title: 'Metro Boomin', date: '15 MAY NEW YORK', img: null },
  ]

  const liveEvents = [
    { id: 1, title: 'The Winter Paralympics', subtitle: 'In One Year', img: null },
    { id: 2, title: 'UEFA Champions League', subtitle: 'Live Now', img: null },
  ]

  const featured = [
    { id: 1, title: 'Ticket deals', icon: '🎟️' },
    { id: 2, title: 'Payment Partners', icon: '💳' },
    { id: 3, title: 'My Tickets', icon: '📱' },
  ]

  const festivals = [
    { id: 1, title: 'SXSW 2026', date: 'MARCH 12-18, AUSTIN TEXAS', img: null },
    { id: 2, title: 'Coachella', date: 'APRIL 11, INDIO CA', img: null },
  ]

  const categories = [
    { id: 1, title: 'Concerts', img: null },
    { id: 2, title: 'Sports', img: null },
    { id: 3, title: 'Theatre', img: null },
  ]

  const offers = [
    { id: 1, title: 'Sips & Sounds Music Festival', date: 'MARCH 13-14, 2026 AUDITORIUM SHORES AUSTIN, TEXAS', img: null },
  ]

  const guides = [
    { id: 1, title: 'Broadway deals', img: null },
    { id: 2, title: 'NFL deals', img: null },
    { id: 3, title: 'NBA deals', img: null },
  ]

  const cities = [
    { id: 1, title: 'Lagos', img: null },
    { id: 2, title: 'New York', img: null },
    { id: 3, title: 'Singapore', img: null },
  ]

  return (
    <div className="auth-container" style={{ justifyContent: 'flex-start' }}>
      <div className="db-wrapper">

{/* First wrapper - filter pills */}
<div className="db-border-wrapper">
  <div className="db-filters-overlay">
    <button className="db-filter-pill active">Hotel</button>
    <button className="db-filter-pill">VIP</button>
    <button className="db-filter-pill">Gift cards</button>
    <button className="db-filter-pill">Sell</button>
    <button className="db-filter-pill">Help</button>
  </div>
</div>

{/* Second wrapper - search row */}
<div className="db-border-wrapper">
  <div className="db-search-overlay">
    <div className="db-search-item">
      <span className="db-search-icon">📍</span>
      <div>
        <div className="db-search-label">LOCATION</div>
        <div className="db-search-sub">City or Zip code</div>
      </div>
    </div>
    <div className="db-search-item">
      <span className="db-search-icon">📅</span>
      <div>
        <div className="db-search-label">DATE</div>
        <div className="db-search-sub">All dates</div>
      </div>
    </div>
    <div className="db-search-item">
      <span className="db-search-icon">🔍</span>
      <div>
        <div className="db-search-label">SEARCH</div>
        <div className="db-search-sub">venues, artists or events</div>
      </div>
    </div>
  </div>
</div>

        {/* Upcoming Events */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Upcoming Events</h3>
            <button className="db-view-all" onClick={() => navigate('/events-browse')}>View all &rsaquo;</button>
          </div>
          <div className="db-scroll-row">
            {upcomingEvents.map(e => (
              <div key={e.id} className="db-event-card db-event-card-lg" onClick={() => navigate('/event-details')}>
                <div className="db-event-img-lg">
                  <div className="db-img-placeholder" />
                </div>
                <div className="db-event-info">
                  <p className="db-event-title">{e.title}</p>
                  <p className="db-event-sub">{e.subtitle}</p>
                  <p className="db-event-price">{e.price} each</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Events */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Trending events</h3>
            <button className="db-view-all">View all &rsaquo;</button>
          </div>
          <div className="db-scroll-row">
            {trendingEvents.map(e => (
              <div key={e.id} className="db-event-card db-event-card-lg" onClick={() => navigate('/event-details')}>
                <div className="db-event-img-lg db-img-dark">
                  <div className="db-img-overlay">
                    <p className="db-img-title">{e.title}</p>
                    <p className="db-img-date">{e.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Events */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Live events</h3>
            <button className="db-view-all">View all &rsaquo;</button>
          </div>
          <div className="db-scroll-row">
            {liveEvents.map(e => (
              <div key={e.id} className="db-event-card db-event-card-lg" onClick={() => navigate('/event-details')}>
                <div className="db-event-img-lg db-img-dark">
                  <div className="db-img-overlay">
                    <p className="db-img-title">{e.title}</p>
                    <p className="db-img-date">{e.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Featured</h3>
            <button className="db-view-all">View all &rsaquo;</button>
          </div>
          <div className="db-featured-row">
            {featured.map(f => (
              <div key={f.id} className="db-featured-card">
                <span className="db-featured-icon">{f.icon}</span>
                <p className="db-featured-title">{f.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Festivals */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Festivals</h3>
            <button className="db-view-all">View all &rsaquo;</button>
          </div>
          <div className="db-scroll-row">
            {festivals.map(f => (
              <div key={f.id} className="db-event-card db-event-card-lg">
                <div className="db-event-img-lg db-img-dark">
                  <div className="db-img-overlay">
                    <p className="db-img-title">{f.title}</p>
                    <p className="db-img-date">{f.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Categories */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Popular Categories</h3>
            <button className="db-view-all">View all &rsaquo;</button>
          </div>
          <div className="db-three-row">
            {categories.map(c => (
              <div key={c.id} className="db-cat-card">
                <div className="db-cat-img" />
                <p className="db-cat-title">{c.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsored Presales */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Sponsored Presales and Offers</h3>
            <button className="db-view-all">View all &rsaquo;</button>
          </div>
          <div className="db-scroll-row">
            {offers.map(o => (
              <div key={o.id} className="db-event-card db-event-card-lg">
                <div className="db-event-img-lg db-img-dark">
                  <div className="db-img-overlay">
                    <p className="db-img-title">{o.title}</p>
                    <p className="db-img-date">{o.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Entertainment Guides */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Entertainment Guides</h3>
            <button className="db-view-all">View all &rsaquo;</button>
          </div>
          <div className="db-three-row">
            {guides.map(g => (
              <div key={g.id} className="db-cat-card">
                <div className="db-cat-img" />
                <p className="db-cat-title">{g.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Cities */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Popular Cities</h3>
            <button className="db-view-all">View all &rsaquo;</button>
          </div>
          <div className="db-three-row">
            {cities.map(c => (
              <div key={c.id} className="db-cat-card">
                <div className="db-cat-img" />
                <p className="db-cat-title">{c.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="db-bottom-nav">
          <button className="db-nav-btn active">
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
          <button className="db-nav-btn" onClick={() => navigate('/settings')}>
            <div className="db-nav-icon-circle"><MdSettings size={22} /></div>
            <p>Settings</p>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
