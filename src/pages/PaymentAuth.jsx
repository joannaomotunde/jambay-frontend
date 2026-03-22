import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import './PaymentAuth.css'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jambay-backend.onrender.com/api'

function PaymentAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  // Get state from previous pages
  const event = location.state?.event || null
  const selectedSeats = location.state?.selectedSeats || []
  const totalAmount = location.state?.totalAmount || 0
  const loyaltyChecked = location.state?.loyaltyChecked || false
  const concessions = location.state?.concessions || []

  // Seat info
  const seatNumbersStr = selectedSeats.map(s => s.id).join(',')
  const seatSection = selectedSeats[0]?.section || 'Section 115'
  const seatRow = selectedSeats[0]?.row || 'Row 15'

  const [expanded, setExpanded] = useState({
    seats: true,
    perks: true,
    loyalty: true,
  })
  const [loading, setLoading] = useState(false)

  const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }))

  const handlePayNow = async () => {
    if (!event?._id) {
      alert('Event not found. Please try again.')
      return
    }

    if (selectedSeats.length === 0) {
      alert('No seats selected.')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      const seatIds = selectedSeats.map(s => s.id)
      const ticketCategoryId = selectedSeats[0]?.ticketCategoryId || ''
      const items = concessions.map(i => ({ product: i.id, qty: i.qty }))

      const response = await fetch(`${BASE_URL}/v1/tickets/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          eventId: event._id, // FIXED: Use _id from backend
          ticketCategoryId,
          seatIds,
          items
        })
      })

      const data = await response.json()

      if (data.paymentLink) {
        window.location.href = data.paymentLink
      } else {
        console.error('Checkout failed:', data)
        alert('Payment link not generated. Please try again.')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const LoadingRow = () => (
    <p>Processing…</p>
  )

  return (
    <div className="auth-container">
      <div className="pa-wrapper">

        {/* Event Summary */}
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

        {/* Seats Accordion */}
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

        {/* Concessions Accordion */}
        <div className="pa-accordion">
          <button className="pa-accordion-header" onClick={() => toggle('perks')}>
            <p>Perks (Concessions)</p>
            {expanded.perks ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </button>
          {expanded.perks && (
            <div className="pa-accordion-body">
              <div className="pa-perks-card">
                <h3 className="pa-perks-title">🧾 Order Summary</h3>
                {concessions.length > 0 ? (
                  concessions.map((item, i) => (
                    <div key={i} className="pa-perks-item">
                      <p>{item.name} × {item.qty}</p>
                      <p>₦{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="pa-empty">No concessions added</p>
                )}
                {concessions.length > 0 && (
                  <>
                    <div className="pa-perks-total">
                      <p>Total</p>
                      <p>₦{concessions.reduce((sum, i) => sum + (i.price * i.qty), 0).toLocaleString()}</p>
                    </div>
                    <div className="pa-perks-pickup">
                      <p className="pa-pickup-title">Pickup Details</p>
                      <p>📍 Concessions Stand C - Gate 5</p>
                      <p>⏱ 1–5 mins after payment</p>
                      <p>📱 Show QR code at pickup</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Loyalty Accordion */}
        {loyaltyChecked && (
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
        )}

        {/* Action Buttons */}
        <div className="pa-actions">
          <button
            className="pa-pay-btn"
            onClick={handlePayNow}
            disabled={loading}
          >
            {loading ? <LoadingRow /> : 'Pay Now'}
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