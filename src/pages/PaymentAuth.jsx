import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import './PaymentAuth.css'

function PaymentAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  // Get state from TicketDetail / SeatMap
  const event = location.state?.event || null
  const selectedSeats = location.state?.selectedSeats || []
  const totalAmount = location.state?.totalAmount || 0
  const loyaltyChecked = location.state?.loyaltyChecked || false

  const [expanded, setExpanded] = useState({
    seats: true,
    perks: true,
    loyalty: true,
  })

  const toggle = (key) => {
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  // Cart Data (concessions)
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
  const cartTotal = cartItems.reduce((sum, i) => sum + (i.price * i.qty), 0)

  const seatNumbersStr = selectedSeats.map(s => s.id).join(',')
  const seatSection = selectedSeats[0]?.section || 'Section 115'
  const seatRow = selectedSeats[0]?.row || 'Row 15'

  return (
    <div className="auth-container">
      <div className="pa-wrapper">

        {/* EVENT SUMMARY */}
        <div className="pa-event-card">
          <div className="pa-event-img" />
          <div className="pa-event-info">
            <p className="pa-event-title">{event?.name || 'New York Knicks at Utah Jazz'}</p>
            <p className="pa-event-date">{event?.date ? new Date(event.date).toDateString() : 'Thu March 28 at 9:30PM'}</p>
            <p className="pa-event-venue">{event?.venue || 'Delta Center'}</p>
            <p className="pa-event-venue">Salt Lake City, Utah</p>
            <div className="pa-event-seat">
              🎫 <span>{seatSection}, {seatRow}</span>
            </div>
          </div>
        </div>

        {/* ACCORDIONS */}

        {/* Seats */}
        <div className="pa-accordion">
          <button className="pa-accordion-header" onClick={() => toggle('seats')}>
            <p>Your Seats</p>
            {expanded.seats ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </button>
          {expanded.seats && (
            <div className="pa-accordion-body">
              <p>{seatSection}, {seatRow} — Seats {seatNumbersStr}</p>
            </div>
          )}
        </div>

        {/* PERKS (Concessions) */}
        <div className="pa-accordion">
          <button className="pa-accordion-header" onClick={() => toggle('perks')}>
            <p>Perks (Concessions)</p>
            {expanded.perks ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </button>
          {expanded.perks && (
            <div className="pa-accordion-body">
              <div className="pa-perks-card">
                <h3 className="pa-perks-title">🧾 Order Summary</h3>
                {cartItems.length > 0 ? (
                  cartItems.map((item, i) => (
                    <div key={i} className="pa-perks-item">
                      <p>{item.name} × {item.qty}</p>
                      <p>₦{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="pa-empty">No concessions added</p>
                )}
                <div className="pa-perks-total">
                  <p>Total</p>
                  <p>₦{cartTotal.toLocaleString()}</p>
                </div>
                <div className="pa-perks-pickup">
                  <p className="pa-pickup-title">Pickup Details</p>
                  <p>📍 Concessions Stand C - Gate 5</p>
                  <p>⏱ 1–5 mins after payment</p>
                  <p>📱 Show QR code at pickup</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* LOYALTY */}
        <div className="pa-accordion">
          <button className="pa-accordion-header" onClick={() => toggle('loyalty')}>
            <p>Loyalty Points</p>
            {expanded.loyalty ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </button>
          {expanded.loyalty && (
            <div className="pa-accordion-body">
              <p>🎉 You will earn {Math.floor(totalAmount / 2)} loyalty points from this purchase</p>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="pa-actions">
          <button
            className="pa-pay-btn"
            onClick={() => navigate('/payment-success', { state: { event, selectedSeats, totalAmount, loyaltyChecked } })}
          >
            Pay Now
          </button>
          <button
            className="pa-cancel-btn"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  )
}

export default PaymentAuth