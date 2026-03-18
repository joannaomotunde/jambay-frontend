import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings } from 'react-icons/md'
import { MdChevronLeft, MdShare, MdKeyboardArrowRight } from 'react-icons/md'
import './EventDetails.css'
import bostonImg from '../assets/images/boston.png'

const BASE_URL = 'https://jambay-backend.onrender.com'

function EventDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const event = location.state?.event || null

  const [activeTab, setActiveTab] = useState('Events')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  const tabs = ['Events', 'Parking', 'Premium']

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
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Fallback static events
  const staticEvents = [
    { date: '26', day: 'Thu', tag: 'ROAD OPENER', title: 'vs Utah Jazz', price: '$15', location: 'Salt Lake City, UT' },
    { date: '28', day: 'Sat', tag: 'AWAY', title: 'vs Indiana Pacers', price: '$20', location: 'Indianapolis, IN' },
    { date: '30', day: 'Mon', tag: 'HOME OPENER', title: 'vs Golden State Warriors', price: '$25', location: 'New York, NY' },
  ]

  const aprilEvents = [
    { date: '03', day: 'Fri', tag: 'HOME', title: 'vs Indiana Pacers', price: '$20', location: 'New York, NY' },
    { date: '05', day: 'Sun', tag: 'AWAY', title: 'vs Brooklyn Nets', price: '$13', location: 'Brooklyn, NY' },
    { date: '07', day: 'Tue', tag: 'HOME', title: 'vs Washington Wizards', price: '$15', location: 'New York, NY' },
  ]

  const EventRow = ({ e, isReal }) => (
    <div
      className="ed-event-row"
      onClick={() => navigate('/ticket-detail', { state: { event: isReal ? e : null } })}
    >
      <div className="ed-date-col">
        <p className="ed-date-num">{isReal ? new Date(e.date).getDate() : e.date}</p>
        <p className="ed-date-day">{isReal ? new Date(e.date).toLocaleDateString('en', { weekday: 'short' }) : e.day}</p>
      </div>
      <div className="ed-event-card">
        <p className="ed-event-tag">{isReal ? 'EVENT' : e.tag}</p>
        <p className="ed-event-title">{isReal ? e.name : e.title}</p>
        <p className="ed-event-info">
          {isReal ? `${e.venue} · ${e.startTime}` : `${e.price} · 9:00PM ET · ${e.location}`}
        </p>
      </div>
      <MdKeyboardArrowRight size={20} color="#64748B" />
    </div>
  )

  return (
    <div className="auth-container" style={{ justifyContent: 'flex-start' }}>
      <div className="ed-wrapper">

        {/* Top Bar */}
        <div className="ed-top-bar">
          <button className="ed-back-btn" onClick={() => navigate(-1)}>
            <MdChevronLeft size={20} color="white" />
          </button>
          <button className="ed-share-btn">
            <MdShare size={18} color="white" />
          </button>
        </div>

        {/* Banner Image */}
       <div className="ed-banner">
  <img src={bostonImg} alt="banner" className="ed-banner-img" />
  <div className="ed-official-badge">
    <span>🏆</span>
    <p>Official Ticket Marketplace</p>
  </div>
        </div>

        {/* Team Title */}
        <p className="ed-team-title">{event?.name || 'New York Knicks'}</p>

        {/* Tabs */}
        <div className="ed-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`ed-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Month Filter */}
        <div className="ed-month-row">
          <p className="ed-month-title">March 2026</p>
          <button className="ed-filter-btn">Home & Away ▾</button>
        </div>

        {/* Event Rows — Real API or static */}
        {loading ? (
          <div className="ed-loading">Loading events...</div>
        ) : events.length > 0 ? (
          events.map(e => <EventRow key={e._id} e={e} isReal={true} />)
        ) : (
          staticEvents.map((e, i) => <EventRow key={i} e={e} isReal={false} />)
        )}

        {/* April Header */}
        {(events.length === 0 || !loading) && (
          <>
            <p className="ed-month-header">April 2026</p>
            {aprilEvents.map((e, i) => <EventRow key={i} e={e} isReal={false} />)}
          </>
        )}

        {/* Confirm Button */}
        <button className="ed-confirm-btn" onClick={() => navigate('/ticket-detail')}>
          Confirm
        </button>

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

export default EventDetails