import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './PaymentSuccess.css'

function PaymentSuccess() {
  const navigate = useNavigate()
  const location = useLocation()

  // Get data from PaymentAuth / checkout
  const event = location.state?.event || null
  const totalAmount = location.state?.totalAmount || 0
  const transactionId = location.state?.transactionId || 'XXXXX'
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
            <p className="ps-amount">${totalAmount.toFixed(2)}</p>
            <p className="ps-transaction">Transaction ID: {transactionId}</p>
            <button className="ps-view-btn">View Details</button>
          </div>
        </div>

        {/* Concessions Summary */}
        {concessions.length > 0 && (
          <div className="ps-concessions-card">
            <h3>🧾 Concessions Summary</h3>
            {concessions.map((item, idx) => (
              <div key={idx} className="ps-concession-item">
                <p>{item.name} × {item.qty}</p>
                <p>₦{(item.price * item.qty).toLocaleString()}</p>
              </div>
            ))}
            <div className="ps-concessions-total">
              <p>Total</p>
              <p>₦{concessionsTotal.toLocaleString()}</p>
            </div>
          </div>
        )}

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