import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings } from 'react-icons/md'
import { HiAdjustments } from 'react-icons/hi'
import './EventsBrowse.css'
import './Dashboard.css'

// Upcoming Events
import eigth from '../assets/images/Eigth.jpeg'
import ticketsOnSale from '../assets/images/Tickets on sale.png'
import lostBoys from '../assets/images/Lost boys.png'

// Just for you
import justForYou1 from '../assets/images/Just for you 1.png'
import justForYou2 from '../assets/images/Just for you 2.png'
import justForYou3 from '../assets/images/Just for you 3.png'

// Trending Events
import third from '../assets/images/Third.jpeg'
import broadway from '../assets/images/Broadway.jpeg'
import second from '../assets/images/Second.jpeg'

// Trending Searches
import tokyo from '../assets/images/Tokyo.jpeg'
import trendingSearches1 from '../assets/images/Trending searches.jpeg'
import trendingSearches2 from '../assets/images/Trending searches 2.png'

// Popular Near You
import rect303 from '../assets/images/Rectangle 303.png'
import rect304 from '../assets/images/Rectangle 304.png'
import rect305 from '../assets/images/Rectangle 305.png'

// City
import lagos from '../assets/images/Lagos.png'

// Concerts
import rect306 from '../assets/images/Rectangle 306.png'
import rect307 from '../assets/images/Rectangle 307.png'
import rect308 from '../assets/images/Rectangle 308.png'

// Sports
import rect309 from '../assets/images/Rectangle 309.png'
import rect310 from '../assets/images/Rectangle 310.png'
import rect311 from '../assets/images/Rectangle 311.png'

// Arts, Theatre & Comedy
import rect312 from '../assets/images/Rectangle 312.png'
import rect313 from '../assets/images/Rectangle 313.png'
import rect314 from '../assets/images/Rectangle 314.png'

// Sponsored
import rect315 from '../assets/images/Rectangle 315.png'
import rect316 from '../assets/images/Rectangle 316.png'
import rect317 from '../assets/images/Rectangle 317.png'

// Discover More
import rect284 from '../assets/images/Rectangle 284.png'

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
          headers: { 'Authorization': `Bearer ${token}` }
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

  const upcomingFallback = [
    { id: 1, title: 'Bruno Mars', img: eigth },
    { id: 2, title: 'Tickets on Sale', img: ticketsOnSale },
    { id: 3, title: 'Lost Boys', img: lostBoys },
  ]

  const justForYouFallback = [
    { id: 1, title: 'Tennis Paradise', img: justForYou1 },
    { id: 2, title: 'Lion King', img: justForYou2 },
    { id: 3, title: 'More', img: justForYou3 },
  ]

  const trendingFallback = [
    { id: 1, title: 'Winter Adventures', img: third },
    { id: 2, title: 'Aladdin', img: broadway },
    { id: 3, title: 'Conan Gray', img: second },
  ]

  const trendingSearches = [
    { id: 1, title: 'Tokyo 2026', img: tokyo },
    { id: 2, title: 'Bar Event', img: trendingSearches1 },
    { id: 3, title: 'Winter Sports', img: trendingSearches2 },
  ]

  const popularNearYou = [
    { id: 1, title: 'MCS Schedule', img: rect303 },
    { id: 2, title: 'Sips & Sounds', img: rect304 },
    { id: 3, title: 'Win a Trip', img: rect305 },
  ]

  const concerts = [
    { id: 1, title: 'Lady Gaga', img: rect306 },
    { id: 2, title: 'Night Show', img: rect307 },
    { id: 3, title: 'Zach Bryan', img: rect308 },
  ]

  const sports = [
    { id: 1, title: 'Miami Open', img: rect309 },
    { id: 2, title: 'Sonoma', img: rect310 },
    { id: 3, title: 'MLB', img: rect311 },
  ]

  const arts = [
    { id: 1, title: 'Hamilton', img: rect312 },
    { id: 2, title: 'Titanique', img: rect313 },
    { id: 3, title: 'The Great Gatsby', img: rect314 },
  ]

  const sponsored = [
    { id: 1, title: 'Sponsored 1', img: rect315 },
    { id: 2, title: 'SXSW', img: rect316 },
    { id: 3, title: 'Sponsored 3', img: rect317 },
  ]

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

        {error && <div className="eb-error"><p>{error}</p></div>}

        {/* Upcoming Events */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Upcoming Events</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          {loading ? <LoadingRow /> : (
            <div className="eb-scroll-row">
              {upcomingFallback.map((e, i) => (
                <div
                  key={e.id}
                  className="eb-card"
                  onClick={() => navigate('/event-details', { state: { event: events[i] } })}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={e.img} alt={e.title} className="eb-card-img" style={{ objectFit: 'cover' }} />
                  <p className="eb-card-title">{e.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Just for you */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Just for you</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          {loading ? <LoadingRow /> : (
            <div className="eb-scroll-row">
              {justForYouFallback.map((e, i) => (
                <div
                  key={e.id}
                  className="eb-card"
                  onClick={() => navigate('/event-details', { state: { event: events[i] } })}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={e.img} alt={e.title} className="eb-card-img" style={{ objectFit: 'cover' }} />
                  <p className="eb-card-title">{e.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Trending Events */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Trending events</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          {loading ? <LoadingRow /> : (
            <div className="eb-scroll-row">
              {trendingFallback.map((e, i) => (
                <div
                  key={e.id}
                  className="eb-card"
                  onClick={() => navigate('/event-details', { state: { event: events[i] } })}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={e.img} alt={e.title} className="eb-card-img" style={{ objectFit: 'cover' }} />
                  <p className="eb-card-title">{e.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Trending Searches */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Trending searches</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          <div className="eb-scroll-row">
            {trendingSearches.map(e => (
              <div key={e.id} className="eb-card">
                <img src={e.img} alt={e.title} className="eb-card-img" style={{ objectFit: 'cover' }} />
                <p className="eb-card-title">{e.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Near You */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Popular near you</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          <div className="eb-scroll-row">
            {popularNearYou.map(e => (
              <div key={e.id} className="eb-card">
                <img src={e.img} alt={e.title} className="eb-card-img" style={{ objectFit: 'cover' }} />
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
        <div className="eb-city-img">
          <img src={lagos} alt="Lagos" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
        </div>

        {/* Concerts */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Concerts</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          <div className="eb-scroll-row">
            {concerts.map(e => (
              <div key={e.id} className="eb-card">
                <img src={e.img} alt={e.title} className="eb-card-img" style={{ objectFit: 'cover' }} />
                <p className="eb-card-title">{e.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sports */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Sports</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          <div className="eb-scroll-row">
            {sports.map(e => (
              <div key={e.id} className="eb-card">
                <img src={e.img} alt={e.title} className="eb-card-img" style={{ objectFit: 'cover' }} />
                <p className="eb-card-title">{e.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Arts, Theatre & Comedy */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Arts, theatre & comedy</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          <div className="eb-scroll-row">
            {arts.map(e => (
              <div key={e.id} className="eb-card">
                <img src={e.img} alt={e.title} className="eb-card-img" style={{ objectFit: 'cover' }} />
                <p className="eb-card-title">{e.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsored */}
        <div className="eb-section">
          <div className="eb-section-header">
            <h3 className="eb-section-title">Sponsored</h3>
            <button className="eb-view-all">View all &rsaquo;</button>
          </div>
          <div className="eb-scroll-row">
            {sponsored.map(e => (
              <div key={e.id} className="eb-card">
                <img src={e.img} alt={e.title} className="eb-card-img" style={{ objectFit: 'cover' }} />
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
          <div className="eb-discover-banner">
            <img src={rect284} alt="Discover more" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
          </div>
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