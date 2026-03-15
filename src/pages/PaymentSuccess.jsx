import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout'
import './PaymentSuccess.css'

function PaymentSuccess() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [navigate])

  return (
    <ScreenLayout title="Payment Successful" backTo="/dashboard">
      <div className="ps-wrapper max-w-xl mx-auto w-full px-4 sm:px-6 lg:px-0">

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
        <div className="ps-action-row flex flex-col sm:flex-row gap-2">
          <button className="ps-action-btn">
            🖨️ Print<br />Receipt
          </button>
          <button className="ps-action-btn">
            📧 Send<br />E-Receipt
          </button>
        </div>

        {/* Add Extras */}
        <button className="ps-extras-btn mt-4 w-full sm:w-auto">
          Add Extras to Your Event
        </button>
        <p className="ps-powered mt-2">Powered by</p>

        {/* Thank You Message */}
        <div className="ps-thankyou mt-4">
          <p>Thank you for your purchase.</p>
          <p>You will receive an email with details of the event and your tickets including QR code. You will also find the QR code of your purchased tickets in my tickets page.</p>
        </div>

        {/* Redirect Banner */}
        <div className="ps-redirect-banner mt-4 text-center">
          Redirecting Home in {countdown}s
        </div>

      </div>
    </ScreenLayout>
  )
}

export default PaymentSuccess