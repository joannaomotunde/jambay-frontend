import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './PaymentSuccess.css'

function PaymentSuccess() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    if (countdown === 0) {
      navigate('/dashboard')
      return
    }
    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [countdown, navigate])

  return (
    <div className="auth-container" style={{ justifyContent: 'flex-start' }}>
      <div className="ps-wrapper">

        {/* Success Icon */}
        <div className="ps-success-icon">✓</div>
        <p className="ps-success-title">Payment Successful</p>

        {/* Card Used */}
        <div className="ps-card-panel">
          <p className="ps-card-label">VISA</p>
        </div>

        {/* Event Card */}
        <div className="ps-event-card">
          <div className="ps-event-img" />
          <div className="ps-event-details">
            <p className="ps-amount">$1047.00</p>
            <p className="ps-transaction">Transaction ID: XXXXX</p>
            <button className="ps-view-btn">View Details</button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="ps-action-row">
          <button className="ps-action-btn">
            🖨️ Print<br />Receipt
          </button>
          <button className="ps-action-btn">
            📧 Send<br />E-Receipt
          </button>
        </div>

        {/* Add Extras */}
        <button className="ps-extras-btn">
          Add Extras to Your Event
        </button>
        <p className="ps-powered">Powered by</p>

        {/* Thank You Message */}
        <div className="ps-thankyou">
          <p>Thank you for your purchase.</p>
          <p>You will receive an email with details of the event and your tickets including QR code. You will also find the QR code of your purchased tickets in my tickets page.</p>
        </div>

        {/* Redirect Banner */}
        <div className="ps-redirect-banner">
          Redirecting Home in {countdown}s
        </div>

      </div>
    </div>
  )
}

export default PaymentSuccess