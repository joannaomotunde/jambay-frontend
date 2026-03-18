import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { requestOTP } from '../services/auth'
import ScreenLayout from '../components/ScreenLayout'
import '../App.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}
    if (!email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email format is invalid'
    return newErrors
  }

  const handleSubmit = async () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setServerError('')
    try {
      setLoading(true)
      await requestOTP({ email })
      navigate('/verify-otp', { state: { email, isPasswordReset: true } })
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to send OTP, please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScreenLayout>
      <h2 className="auth-title">Forgot Password</h2>
      <p className="auth-subtitle">
        Provide the email address linked with your account to reset your password.
      </p>

      {serverError && <p className="server-error">{serverError}</p>}

      <label className="input-label">Email Address</label>
      <input
        className="auth-input"
        type="email"
        placeholder="john123@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className="input-helper">Please enter your registered email</p>
      {errors.email && <p className="field-error">{errors.email}</p>}

      <button className="auth-button" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Sending...' : 'Request Password Reset Link'}
      </button>

      <button className="cancel-button" onClick={() => navigate('/login')}>
        Cancel
      </button>
    </ScreenLayout>
  )
}

export default ForgotPassword