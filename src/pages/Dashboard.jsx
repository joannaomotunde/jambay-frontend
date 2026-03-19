import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings } from 'react-icons/md'

// Upcoming Events
import first from '../assets/images/First.jpeg'

// Trending Events
import second from '../assets/images/Second.jpeg'

// Live Events
import third from '../assets/images/Third.jpeg'

// Featured
import trendingSearches from '../assets/images/Trending searches.jpeg'
import fifth from '../assets/images/Fifth.jpeg'
import sixth from '../assets/images/Sixth.jpeg'

// Festivals
import seventh from '../assets/images/Seventh.jpeg'

// Popular Categories
import eighth from '../assets/images/Eigth.jpeg'
import ticketOnSales from '../assets/images/Tickets on sale.png'
import lostBoys from '../assets/images/Lost boys.png'

// Sponsored
import sip from '../assets/images/Sip.jpeg'

// Entertainment Guides
import broadway from '../assets/images/Broadway.jpeg'
import nflDeals from '../assets/images/NFL Deals.jpeg'
import nbaDeals from '../assets/images/BA Deals.jpeg'

// Popular Cities
import lagos from '../assets/images/Lagos.jpeg'
import newYork from '../assets/images/Newyork.jpeg'
import singapore from '../assets/images/Singapore.jpeg'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('Hotel')

  const filters = ['Hotel', 'VIP', 'Gift cards', 'Sell', 'Help']

  const upcomingEvents = [
    { id: 1, title: 'New York Knicks vs Utah Jazz', subtitle: 'Row 2', price: '$197', img: first },
    { id: 2, title: 'Burna Boy Live', subtitle: 'VIP', price: '$250', img: first },
    { id: 3, title: 'Afrobeats Festival', subtitle: 'General', price: '$80', img: first },
  ]

  const trendingEvents = [
    { id: 1, title: 'Wishbone World Tour', date: '25 MAJ STOCKHOLM', img: second },
    { id: 2, title: 'Conan Gray', date: '20 APR LONDON', img: second },
    { id: 3, title: 'Metro Boomin', date: '15 MAY NEW YORK', img: second },
  ]

  const liveEvents = [
    { id: 1, title: 'The Winter Paralympics', subtitle: 'In One Year', img: third },
    { id: 2, title: 'UEFA Champions League', subtitle: 'Live Now', img: third },
  ]

  const featured = [
    { id: 1, title: 'Trending Searches', img: trendingSearches },
    { id: 2, title: 'Ticket deals', img: fifth },
    { id: 3, title: 'My Tickets', img: sixth },
  ]

  const festivals = [
    { id: 1, title: 'SXSW 2026', date: 'MARCH 12-18, AUSTIN TEXAS', img: seventh },
    { id: 2, title: 'Coachella', date: 'APRIL 11, INDIO CA', img: seventh },
  ]

  const categories = [
    { id: 1, title: 'Concerts', img: eighth },
    { id: 2, title: 'Sports', img: ticketOnSales },
    { id: 3, title: 'Theatre', img: lostBoys },
  ]

  const offers = [
    { id: 1, title: 'Sips & Sounds Music Festival', date: 'MARCH 13-14, 2026 AUDITORIUM SHORES AUSTIN, TEXAS', img: sip },
  ]

  const guides = [
    { id: 1, title: 'Broadway deals', img: broadway },
    { id: 2, title: 'NFL deals', img: nflDeals },
    { id: 3, title: 'NBA deals', img: nbaDeals },
  ]

  const cities = [
    { id: 1, title: 'Lagos', img: lagos },
    { id: 2, title: 'New York', img: newYork },
    { id: 3, title: 'Singapore', img: singapore },
  ]

  return (
    <div className="auth-container" style={{ justifyContent: 'flex-start' }}>
      <div className="db-wrapper">

        {/* First wrapper - filter pills */}
        <div className="db-border-wrapper">
          <div className="db-filters-overlay">
            {filters.map(f => (
              <button
                key={f}
                className={`db-filter-pill ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
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
                  <img src={e.img} alt={e.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <div className="db-event-img-lg">
                  <img src={e.img} alt={e.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <div className="db-event-img-lg">
                  <img src={e.img} alt={e.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <img src={f.img} alt={f.title} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '10px' }} />
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
                <div className="db-event-img-lg">
                  <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <img src={c.img} alt={c.title} className="db-cat-img" style={{ objectFit: 'cover' }} />
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
              <div key={o.id} className="db-event-card" style={{ width: '100%' }}>
                <div className="db-event-img-lg" style={{ height: '160px' }}>
                  <img src={o.img} alt={o.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <img src={g.img} alt={g.title} className="db-cat-img" style={{ objectFit: 'cover' }} />
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
                <img src={c.img} alt={c.title} className="db-cat-img" style={{ objectFit: 'cover' }} />
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
