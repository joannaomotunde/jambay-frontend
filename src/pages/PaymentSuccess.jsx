import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './PaymentSuccess.css'

function PaymentSuccess() {
  const navigate = useNavigate()
  const location = useLocation()

  // Get data from PaymentAuth / checkout
  const event = location.state?.event || null
  const totalAmount = location.state?.totalAmount || 0
  const transactionId =
  location.state?.transactionId ||
  `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
  const concessions = location.state?.concessions || []
  const cardUsed = location.state?.cardUsed || 'VISA'

  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    if (countdown === 0) {
      navigate('/dashboard')
      return
    }
    const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, navigate])

  const concessionsTotal = concessions.reduce((sum, i) => sum + (i.price * i.qty), 0)

  return (
    <div className="auth-container" style={{ justifyContent: 'flex-start' }}>
      <div className="ps-wrapper">

        {/* Success Icon */}
        <div className="ps-success-icon">✓</div>
        <p className="ps-success-title">Payment Successful</p>

        {/* Card Used */}
        <div className="ps-card-panel">
          <p className="ps-card-label">{cardUsed}</p>
        </div>

        {/* Event Card */}
        <div className="ps-event-card">
          <div className="ps-event-img" />
          <div className="ps-event-details">
            <div style={{ width: "100%", marginTop: 6 }}>
  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748B" }}>
    <span>Tickets</span>
    <span>₦{Number(Math.max(totalAmount - concessionsTotal, 0)).toLocaleString()}</span>
  </div>

  {concessions.length > 0 && (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748B", marginTop: 4 }}>
      <span>Concessions</span>
      <span>₦{concessionsTotal.toLocaleString()}</span>
    </div>
  )}
</div>
            <p className="ps-amount">
  ₦{Number(totalAmount).toLocaleString()}
</p>

<p style={{ fontSize: 11, color: "#94A3B8" }}>
  Paid successfully
</p>

<p className="ps-transaction">
  Ref: {transactionId}
</p>
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

        <p className="ps-powered">Powered by</p>

        {/* Thank You Message */}
        <div className="ps-thankyou">
          <p>Thank you for your purchase.</p>
          <p>
            You will receive an email with details of the event and your tickets including QR code.
            You will also find the QR code of your purchased tickets in My Tickets page.
          </p>
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