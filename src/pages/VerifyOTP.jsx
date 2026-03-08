import { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { verifyOTP, verifyResetOTP } from '../services/auth'
import '../App.css'

function VerifyOTP() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email
  const isPasswordReset = location.state?.isPasswordReset

  if (!email) {
    return <Navigate to="/register" replace />
  }

  const handleSubmit = async () => {
    if (!otp) {
      setError('Please enter the OTP')
      return
    }
    try {
      setLoading(true)
      if (isPasswordReset) {
        await verifyResetOTP({ email, otp })
        navigate('/reset-password', { state: { email, otp } })
      } else {
        await verifyOTP({ email, otp })
        navigate('/')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP, please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Verify Your Email</h2>
        <p className="auth-subtitle">
          We sent a 6-digit OTP to <strong>{email}</strong>. Enter it below.
        </p>

        <input
          className="otp-input"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
        />
        {error && <p className="field-error">{error}</p>}

        <button className="auth-button" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        <p className="auth-link-text">
          Didn't get the code? <a href="/register">Go back</a>
        </p>
      </div>
    </div>
  )
}

export default VerifyOTP