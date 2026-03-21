import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings } from 'react-icons/md'
import { MdChevronLeft, MdShare, MdKeyboardArrowDown, MdInfo } from 'react-icons/md'
import './TicketDetail.css'

function TicketDetail() {
  const navigate = useNavigate()
  const location = useLocation()

  // Dynamic data from SeatMap
  const event = location.state?.event || null
  const selectedSeats = location.state?.selectedSeats || []
  const totalAmount = location.state?.totalAmount || 0
  const seatCount = selectedSeats.length
  const seatNumbersStr = selectedSeats.map(s => s.id).join(',')

  const [loyaltyChecked, setLoyaltyChecked] = useState(false)
  const [showConcessionPopup, setShowConcessionPopup] = useState(false)

  return (
    <div className="auth-container" style={{ justifyContent: 'flex-start' }}>
      <div className="td-wrapper">

        {/* Top Bar */}
        <div className="td-top-bar">
          <button className="td-back-btn" onClick={() => navigate(-1)}>
            <MdChevronLeft size={20} color="white" />
          </button>
          <button className="td-share-btn">
            <MdShare size={18} color="white" />
          </button>
        </div>

        {/* Image Carousel */}
        <div className="td-carousel">
          <div className="td-img-main" />
          <div className="td-img-side">
            <div className="td-img-small" />
            <div className="td-img-small td-img-overlay">
              <span>🔍 View all</span>
            </div>
          </div>
        </div>

        {/* Event Info */}
        <div className="td-event-info">
          <p className="td-event-title">
            {event?.name || 'New York Knicks at Utah Jazz'}, Row {selectedSeats[0]?.row || '2'}
          </p>
          <p className="td-event-price">
            ${seatCount ? (totalAmount / seatCount).toFixed(2) : 0} 
            <span className="td-price-sub">each incl. fees</span>
          </p>
          <p className="td-affirm">
            as low as $2/mo or 1.2% APR with <strong>affirm</strong>{' '}
            <span className="td-view-more">view more</span>
          </p>
        </div>

        {/* Badges */}
        <div className="td-badges">
          <div className="td-badge">
            <span>⚡</span>
            <div>
              <p className="td-badge-title">Instant purchase & delivery</p>
              <p className="td-badge-sub">Mobile tickets</p>
            </div>
            <MdInfo size={16} color="#64748B" />
          </div>
        </div>

        {/* Official Marketplace */}
        <div className="td-marketplace">
          <div className="td-marketplace-left">
            <p className="td-marketplace-title">Official Ticket Marketplace</p>
            <p className="td-marketplace-sub">
              Tickets are reviewed and verified by the NBA
            </p>
          </div>
          <div className="td-nba-logo">NBA</div>
        </div>

        {/* Quantity */}
        <div className="td-dropdown">
          <p className="td-dropdown-label">Quantity</p>
          <div className="td-dropdown-value">
            <span>{seatCount} tickets</span>
            <MdKeyboardArrowDown size={18} color="#64748B" />
          </div>
        </div>

        {/* Seat Numbers */}
        <div className="td-dropdown">
          <p className="td-dropdown-label">Seat numbers</p>
          <div className="td-dropdown-value">
            <span>{seatNumbersStr}</span>
            <MdKeyboardArrowDown size={18} color="#64748B" />
          </div>
        </div>

        {/* Loyalty Points */}
        <div
          className="td-dropdown"
          onClick={() => setLoyaltyChecked(!loyaltyChecked)}
          style={{ cursor: 'pointer' }}
        >
          <p className="td-dropdown-label">Loyalty points</p>
          <div className={`td-loyalty-check ${loyaltyChecked ? 'checked' : ''}`}>
            {loyaltyChecked && <span>✓</span>}
          </div>
        </div>

        {/* Confirm Button */}
        <button
          className="td-confirm-btn"
          onClick={() => setShowConcessionPopup(true)}
        >
          Confirm
        </button>

        {/* Bottom Nav */}
        <div className="db-bottom-nav">
          <button className="db-nav-btn" onClick={() => navigate('/dashboard')}>
            <div className="db-nav-icon-circle"><MdHome size={22} /></div>
            <p>Home</p>
          </button>

          <button
            className="db-nav-btn active"
            onClick={() => navigate('/events-browse')}
          >
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

        {/* Concession Popup */}
        {showConcessionPopup && (
          <div
            className="td-popup-overlay"
            onClick={() => setShowConcessionPopup(false)}
          >
            <div
              className="td-popup"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="td-popup-handle" />
              <p className="td-popup-title">🍔 Add Concessions?</p>
              <p className="td-popup-sub">
                Would you like to add food & drinks to your order before checkout?
              </p>

              <button
                className="td-popup-yes"
                onClick={() => navigate('/concessions', {
                  state: { event, selectedSeats, totalAmount, loyaltyChecked }
                })}
              >
                Yes, Add Concessions
              </button>

              <button
                className="td-popup-skip"
                onClick={() => navigate('/payment-auth', {
                  state: { event, selectedSeats, totalAmount, loyaltyChecked }
                })}
              >
                Skip
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default TicketDetail