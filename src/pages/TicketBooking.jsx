import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings } from 'react-icons/md'
import { MdChevronLeft } from 'react-icons/md'
import './TicketBooking.css'

function TicketBooking() {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('Cards')

  const perks = [
    'Mobile & Offline ticket',
    'Aerial view',
    "You'll be seated together",
    'Can relist, sell if plans change',
  ]

  return (
    <div className="auth-container" style={{ justifyContent: 'flex-start' }}>
      <div className="tb-wrapper">

        {/* Top Bar */}
        <div className="tb-top-bar">
          <button className="tb-back-btn" onClick={() => navigate(-1)}>
            <MdChevronLeft size={20} color="white" />
          </button>
          <div className="tb-top-right">
            <button className="tb-icon-btn">🛒</button>
            <button className="tb-icon-btn">🤍</button>
          </div>
        </div>

        {/* Venue Image */}
        <div className="tb-venue-img">
          <div className="tb-venue-label">Estimated View</div>
        </div>

        {/* Section Info */}
        <div className="tb-section-info">
          <p className="tb-section-title">Section 115 | Row 15</p>
          <p className="tb-section-sub">Seats 4 - 9</p>
          <p className="tb-section-link">Aerial Viewers</p>
          <p className="tb-section-see">See all tickets in this section</p>
        </div>

        {/* Perks */}
        <div className="tb-panel">
          <p className="tb-panel-title">Perks</p>
          {perks.map((perk, i) => (
            <div key={i} className="tb-perk-row">
              <span className="tb-perk-check">✓</span>
              <p className="tb-perk-text">{perk}</p>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="tb-panel">
          <p className="tb-panel-title">Price Breakdown</p>
          <div className="tb-price-row">
            <p className="tb-price-label">Price per ticket</p>
            <p className="tb-price-value">$170.00+</p>
          </div>
          <div className="tb-price-row">
            <p className="tb-price-label">Fees</p>
            <p className="tb-price-value">$25.45</p>
          </div>
          <div className="tb-price-row">
            <p className="tb-price-label">Taxes</p>
            <p className="tb-price-value">$1.55</p>
          </div>
          <div className="tb-divider" />
          <div className="tb-price-row">
            <p className="tb-price-total-label">per ticket incl. fees</p>
            <p className="tb-price-total">$1047.00</p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="tb-panel">
          <p className="tb-panel-title">You can pay with</p>
          <div className="tb-payment-tabs">
            <button
              className={`tb-payment-tab${paymentMethod === 'Cards' ? ' active' : ''}`}
              onClick={() => setPaymentMethod('Cards')}
            >
              <span>💳</span>
              <p>Cards</p>
              <div className="tb-tab-logos">
                <span>VISA</span><span>MC</span><span>AMEX</span>
              </div>
            </button>
            <button
              className={`tb-payment-tab${paymentMethod === 'Banks' ? ' active' : ''}`}
              onClick={() => setPaymentMethod('Banks')}
            >
              <span>🏦</span>
              <p>Banks</p>
              <div className="tb-tab-logos">
                <span>GTB</span><span>UBA</span><span>Skrill</span>
              </div>
            </button>
            <button
              className={`tb-payment-tab${paymentMethod === 'Wallets' ? ' active' : ''}`}
              onClick={() => setPaymentMethod('Wallets')}
            >
              <span>👛</span>
              <p>Wallets</p>
              <div className="tb-tab-logos">
                <span>GPay</span><span>Apple</span><span>PayPal</span>
              </div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <button className="tb-proceed-btn" onClick={() => navigate('/payment-auth')}>
          Proceed to checkout
        </button>
        <button className="tb-cart-btn">
          Add to cart 🛒
        </button>

        {/* Bottom Nav */}
        <div className="db-bottom-nav">
          <button className="db-nav-btn" onClick={() => navigate('/dashboard')}>
            <div className="db-nav-icon-circle"><MdHome size={22} /></div>
            <p>Home</p>
          </button>
          <button className="db-nav-btn active" onClick={() => navigate('/events-browse')}>
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

export default TicketBooking