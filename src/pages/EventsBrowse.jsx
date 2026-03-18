import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings } from 'react-icons/md'
import { HiAdjustments } from 'react-icons/hi'
import './EventsBrowse.css'
import './Dashboard.css'

const BASE_URL = 'https://jambay-backend.onrender.com'

function EventsBrowse() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('Explore')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const filters = ['Explore', 'Favorites', 'Wallet', 'Saved', 'My Tickets']

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}/api/v1/events/all_events`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        setEvents(data.events || [])
      } catch (err) {
        console.error('Error fetching events:', err)
        setError('Failed to load events')
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Static fallbacks for sections without API yet
  const trendingSearches = [
    { id: 1, title: 'Tokyo 2026' },
    { id: 2, title: 'Bar Event' },
    { id: 3, title: 'Winter Sports' },
  ]

  const popularNearYou = [
    { id: 1, title: 'MCS Schedule' },
    { id: 2, title: 'Sips & Sounds' },
    { id: 3, title: 'Win a Trip' },
  ]

  const concerts = [
    { id: 1, title: 'Lady Gaga' },
    { id: 2, title: 'Night Show' },
    { id: 3, title: 'Zach Bryan' },
  ]

  const sports = [
    { id: 1, title: 'Miami Open' },
    { id: 2, title: 'Sonoma' },
    { id: 3, title: 'MLB' },
  ]

  const arts = [
    { id: 1, title: 'Hamilton' },
    { id: 2, title: 'Titanique' },
    { id: 3, title: 'The Great Gatsby' },
  ]

  const sponsored = [
    { id: 1, title: 'Sponsored 1' },
    { id: 2, title: 'SXSW' },
    { id: 3, title: 'Sponsored 3' },
  ]

  // Event card component — real or placeholder
  const EventCard = ({ event, isReal }) => (
    <div
      className="eb-card"
      onClick={() => isReal && navigate(`/ticket-detail`, { state: { event } })}
      style={{ cursor: isReal ? 'pointer' : 'default' }}
    >
      {isReal && event.eventImage
        ? <img src={event.eventImage} alt={event.name} className="eb-card-img" style={{ objectFit: 'cover' }} />
        : <div className="eb-card-img" />
      }
      <p className="eb-card-title">{isReal ? event.name : event.title}</p>
      {isReal && <p className="eb-card-date">{event.venue}</p>}
    </div>
  )

  // Loading state
  const LoadingRow = () => (
    <div className="eb-scroll-row">
      {[1, 2, 3].map(i => (
        <div key={i} className="eb-card">
          <div className="eb-card-img eb-card-loading" />
          <p className="eb-card-title">Loading...</p>
        </div>
      ))}
    </div>
  )

  return (
    <div className="auth-container" style={{ justifyContent: 'flex-start' }}>
      <div className="eb-wrapper">

        {/* Filter Pills */}
        <div className="eb-filter-wrapper">
          <div className="eb-filters">
            {filters.map(f => (
              <button
                key={f}
                className={`eb-filter-pill${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="eb-error">
            <p>{error}</p>
          </div>
        )}

        {/* Upcoming Events — REAL API DATA */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Upcoming Events</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          {loading ? <LoadingRow /> : (
            <div className="eb-scroll-row">
              {events.length > 0
                ? events.slice(0, 5).map(e => <EventCard key={e._id} event={e} isReal={true} />)
                : [{ id: 1, title: 'Bruno Mars' }, { id: 2, title: 'Tickets on Sale' }, { id: 3, title: 'Lost Boys' }]
                    .map(e => <EventCard key={e.id} event={e} isReal={false} />)
              }
            </div>
          )}
        </div>

        {/* Just for you — REAL API DATA */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Just for you</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          {loading ? <LoadingRow /> : (
            <div className="eb-scroll-row">
              {events.length > 0
                ? events.slice(0, 5).map(e => <EventCard key={e._id} event={e} isReal={true} />)
                : [{ id: 1, title: 'Tennis Paradise' }, { id: 2, title: 'Lion King' }, { id: 3, title: 'More' }]
                    .map(e => <EventCard key={e.id} event={e} isReal={false} />)
              }
            </div>
          )}
        </div>

        {/* Trending Events — REAL API DATA */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Trending events</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          {loading ? <LoadingRow /> : (
            <div className="eb-scroll-row">
              {events.length > 0
                ? events.slice(0, 5).map(e => <EventCard key={e._id} event={e} isReal={true} />)
                : [{ id: 1, title: 'Winter Adventures' }, { id: 2, title: 'Aladdin' }, { id: 3, title: 'Conan Gray' }]
                    .map(e => <EventCard key={e.id} event={e} isReal={false} />)
              }
            </div>
          )}
        </div>

        {/* Trending Searches — static */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Trending searches</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          <div className="eb-scroll-row">
            {trendingSearches.map(e => (
              <div key={e.id} className="eb-card">
                <div className="eb-card-img eb-card-dark" />
                <p className="eb-card-title">{e.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Near You — static */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Popular near you</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          <div className="eb-scroll-row">
            {popularNearYou.map(e => (
              <div key={e.id} className="eb-card">
                <div className="eb-card-img eb-card-dark" />
                <p className="eb-card-title">{e.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location Bar */}
        <div className="eb-location-bar">
          <div>
            <p className="eb-location-city">Lagos, NG</p>
            <p className="eb-location-date">All dates</p>
          </div>
          <HiAdjustments size={20} color="#1E293B" />
        </div>

        {/* City Image */}
        <div className="eb-city-img" />

        {/* Concerts — static */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Concerts</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          <div className="eb-scroll-row">
            {concerts.map(e => (
              <div key={e.id} className="eb-card">
                <div className="eb-card-img" />
                <p className="eb-card-title">{e.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sports — static */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Sports</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          <div className="eb-scroll-row">
            {sports.map(e => (
              <div key={e.id} className="eb-card">
                <div className="eb-card-img" />
                <p className="eb-card-title">{e.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Arts, Theatre & Comedy — static */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Arts, theatre & comedy</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          <div className="eb-scroll-row">
            {arts.map(e => (
              <div key={e.id} className="eb-card">
                <div className="eb-card-img" />
                <p className="eb-card-title">{e.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsored — static */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Sponsored</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          <div className="eb-scroll-row">
            {sponsored.map(e => (
              <div key={e.id} className="eb-card">
                <div className="eb-card-img" />
                <p className="eb-card-title">{e.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Discover More */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Discover more</h3>
            <HiAdjustments size={18} color="white" />
          </div>
          <div className="eb-discover-banner" />
        </div>

        {/* Bottom Nav */}
        <div className="db-bottom-nav">
          <button className="db-nav-btn" onClick={() => navigate('/dashboard')}>
            <div className="db-nav-icon-circle"><MdHome size={22} /></div>
            <p>Home</p>
          </button>
          <button className="db-nav-btn active">
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

export default EventsBrowse