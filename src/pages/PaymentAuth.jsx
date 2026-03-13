import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings, MdLock, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import './PaymentAuth.css'

function PaymentAuth() {
  const navigate = useNavigate()

  const [expanded, setExpanded] = useState({
    seats: false,
    perks: false,
    loyalty: false,
  })

  const [form, setForm] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardPin: '',
    otp: '',
  })

  const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }))

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const accordions = [
    { key: 'seats', label: 'Your seats' },
    { key: 'perks', label: 'Perks' },
    { key: 'loyalty', label: 'Loyalty Points' },
  ]

  return (
    <div className="auth-container" style={{ justifyContent: 'flex-start' }}>
      <div className="pa-wrapper">

        {/* Event Summary Card */}
        <div className="pa-event-card">
          <div className="pa-event-img" />
          <div className="pa-event-info">
            <p className="pa-event-title">New York Knicks at Utah Jazz</p>
            <p className="pa-event-date">Thu March 28 at 9:30PM</p>
            <p className="pa-event-venue">Delta Center,</p>
            <p className="pa-event-venue">Salt Lake City, Utah, USA</p>
            <div className="pa-event-seat">
              <span>🎫</span>
              <p>Section 115, Row 15</p>
            </div>
          </div>
        </div>

        {/* Accordions */}
        {accordions.map(item => (
          <div key={item.key} className="pa-accordion">
            <button className="pa-accordion-header" onClick={() => toggle(item.key)}>
              <div className="pa-accordion-left">
                <span className="pa-accordion-check">✅</span>
                <p className="pa-accordion-label">{item.label}</p>
              </div>
              {expanded[item.key]
                ? <MdKeyboardArrowUp size={20} color="#64748B" />
                : <MdKeyboardArrowDown size={20} color="#64748B" />
              }
            </button>
            {expanded[item.key] && (
              <div className="pa-accordion-body">
                <p className="pa-accordion-content">Section 115, Row 15 — Seats 4-9</p>
              </div>
            )}
          </div>
        ))}

        {/* Payment Section */}
        <div className="pa-payment-section">
          <p className="pa-payment-title">Payment</p>
          <MdLock size={20} color="#1E293B" style={{ alignSelf: 'center' }} />

          <div className="pa-secure-card">
            <div className="pa-secure-header">
              <p className="pa-secure-title">Secure Credit Card Payment</p>
              <button className="pa-security-btn">🔒 Security Information</button>
            </div>

            {/* Card Logos */}
            <div className="pa-card-logos">
              <span className="pa-card-logo">AMEX</span>
              <span className="pa-card-logo">MC</span>
              <span className="pa-card-logo">VISA</span>
              <span className="pa-card-logo">DISC</span>
            </div>

            {/* Form */}
            <input
              className="pa-input"
              type="text"
              name="cardholderName"
              placeholder="Cardholder Name"
              value={form.cardholderName}
              onChange={handleChange}
            />
            <input
              className="pa-input"
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={form.cardNumber}
              onChange={handleChange}
              maxLength={19}
            />
            <div className="pa-input-row">
              <input
                className="pa-input pa-input-half"
                type="text"
                name="expiryDate"
                placeholder="Expiry Date"
                value={form.expiryDate}
                onChange={handleChange}
              />
              <input
                className="pa-input pa-input-half"
                type="password"
                name="cvv"
                placeholder="CVV2"
                value={form.cvv}
                onChange={handleChange}
                maxLength={4}
              />
            </div>
            <input
              className="pa-input"
              type="password"
              name="cardPin"
              placeholder="Card Pin"
              value={form.cardPin}
              onChange={handleChange}
              maxLength={4}
            />

            {/* Pay Now */}
            <button className="pa-pay-btn">
              Pay Now
            </button>

            {/* OTP */}
            <p className="pa-otp-label">Enter One Time Passcode sent to the number attached to this card</p>
            <input
              className="pa-input pa-otp-input"
              type="text"
              name="otp"
              placeholder="OTP"
              value={form.otp}
              onChange={handleChange}
              maxLength={6}
            />

            {/* Confirm / Cancel */}
            <button className="pa-confirm-btn" onClick={() => navigate('/payment-success')}>
              Confirm
            </button>
            <button className="pa-cancel-btn" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentAuth