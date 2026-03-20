import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings } from 'react-icons/md'
import { MdChevronLeft, MdInfo, MdKeyboardArrowDown } from 'react-icons/md'
import arenaImg from '../assets/images/Rectangle 380.png'
import seat115 from '../assets/images/Rectangle 386.png'
import seat107 from '../assets/images/Rectangle new.png'
import seat135 from '../assets/images/Rectangle 389.png'
import seat97 from '../assets/images/Rectangle 391.png'
import seat155 from '../assets/images/Rectangle 393.png'
import './SeatBooking.css'
import './Dashboard.css'

const BASE_URL = 'https://jambay-backend.onrender.com'

const staticListings = [
  { id: 1, section: 'Section 115', row: 'Row 11, 10-15', price: '$150', badge: 'Amazing', img: seat115 },
  { id: 2, section: 'Section 107', row: 'Row 5, 20-25', price: '$171', badge: 'Amazing', img: seat107 },
  { id: 3, section: 'Section 135', row: 'Row 10, 1-5', price: '$121', badge: 'Amazing', img: seat135 },
  { id: 4, section: 'Section 97', row: 'Row 2, 11-15', price: '$245', badge: 'Amazing', img: seat97 },
  { id: 5, section: 'Section 155', row: 'Row 25, 5', price: '$97', badge: 'Amazing', img: seat155 },
]

const seatImgs = [seat115, seat107, seat135, seat97, seat155]

function SeatBooking() {
  const navigate = useNavigate()
  const location = useLocation()
  const event = location.state?.event || null
  const [activeFilter, setActiveFilter] = useState(null)
  const [seating, setSeating] = useState(null)
  const [loading, setLoading] = useState(true)

  const filters = ['Quantity', 'Perks', 'Price excl. fees', 'Seat']

  useEffect(() => {
    const fetchSeating = async () => {
      if (!event?._id) {
        setLoading(false)
        return
      }
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}/api/v1/events/${event._id}/seating`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await response.json()
        console.log('Seating data:', data)
        if (data.seating) setSeating(data.seating)
      } catch (err) {
        console.error('Error fetching seating:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSeating()
  }, [event])

  // Build listings from real seating or fallback to static
  const listings = seating?.sections
    ? seating.sections.map((section, i) => ({
        id: i + 1,
        section: section.name,
        row: `${section.rows} rows, ${section.seatsPerRow} seats per row`,
        price: `$${event?.ticketCategories?.[0]?.basePrice || 150}`,
        badge: 'Amazing',
        img: seatImgs[i % seatImgs.length],
        seatIds: [],
      }))
    : staticListings

  return (
    <div className="auth-container" style={{ justifyContent: 'flex-start' }}>
      <div className="sb-wrapper">

        {/* Top Bar */}
        <div className="sb-top-bar">
          <button className="sb-back-btn" onClick={() => navigate(-1)}>
            <MdChevronLeft size={20} color="white" />
          </button>
          <div className="sb-top-center">
            <p className="sb-event-name">{event?.name || 'New York Knicks at Utah Jazz'}</p>
            <p className="sb-event-date">
              {event?.date
                ? new Date(event.date).toLocaleDateString('en', { month: 'long', day: 'numeric', weekday: 'short', year: 'numeric' })
                : 'March 26 · Thu · 9:30PM · 2026'}
            </p>
          </div>
          <button className="sb-info-btn">
            <MdInfo size={20} color="white" />
          </button>
        </div>

        {/* Venue */}
        <div className="sb-venue">
          <p className="sb-venue-text">📍 {event?.venue || 'Delta Center, Salt Lake City, Utah, USA'}</p>
        </div>

        {/* Filter Pills */}
        <div className="sb-filters">
          <button className="sb-filter-icon">⚙️</button>
          {filters.map(f => (
            <button
              key={f}
              className={`sb-filter-pill${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Arena Image */}
        <div className="sb-arena">
          <img src={arenaImg} alt="arena" className="sb-arena-img" />
        </div>

        {/* Listings Header */}
        <div className="sb-listings-header">
          <p className="sb-listings-count">
            {seating ? `${seating.capacity} seats` : '1,165 listings'}
          </p>
          <button className="sb-sort-btn">Sort by <MdKeyboardArrowDown size={16} /></button>
        </div>

        {/* Listing Cards */}
        {loading ? (
          <p style={{ color: 'white', textAlign: 'center' }}>Loading seats...</p>
        ) : (
          listings.map(seat => (
            <div
              key={seat.id}
              className="sb-listing-card"
              onClick={() => navigate('/ticket-detail', { state: { event, seat } })}
            >
              <img src={seat.img} alt={seat.section} className="sb-seat-img" />
              <div className="sb-seat-info">
                <p className="sb-seat-section">{seat.section}</p>
                <p className="sb-seat-row">{seat.row}</p>
                <span className="sb-badge">⭐ {seat.badge}</span>
              </div>
              <div className="sb-seat-price">
                <p className="sb-price">{seat.price}</p>
                <p className="sb-price-sub">incl. fees</p>
              </div>
            </div>
          ))
        )}

        {/* Confirm Button */}
        <button
          className="sb-confirm-btn"
          onClick={() => navigate('/ticket-detail', { state: { event } })}
        >
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

export default SeatBooking