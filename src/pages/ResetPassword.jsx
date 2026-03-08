import { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { resetPassword } from '../services/auth'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import '../App.css'

function ResetPassword() {
  const [formData, setFormData] = useState({ otp: '', newPassword: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email

  if (!email) {
    return <Navigate to="/forgot-password" replace />
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setServerError('')
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.otp) newErrors.otp = 'OTP is required'
    if (!formData.newPassword) {
      newErrors.newPassword = 'Password is required'
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters'
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    return newErrors
  }

  const handleSubmit = async () => {
    if (loading) return  // prevent double submit
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setErrors({})
    setServerError('')
    try {
      setLoading(true)
      await resetPassword({ email, otp: Number(formData.otp), newPassword: formData.newPassword })
      navigate('/')
    } catch (err) {
      setServerError(err.response?.data?.message || 'Password reset failed, please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">Enter the OTP sent to <strong>{email}</strong> and your new password.</p>

        {serverError && <p className="server-error">{serverError}</p>}

        <input className="otp-input" type="text" name="otp" placeholder="Enter OTP"
          value={formData.otp} onChange={handleChange} maxLength={6} />
        {errors.otp && <p className="field-error">{errors.otp}</p>}

        <div className="password-wrapper">
          <input
            className="auth-input"
            type={showPassword ? 'text' : 'password'}
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.newPassword && <p className="field-error">{errors.newPassword}</p>}

        <div className="password-wrapper">
          <input
            className="auth-input"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}

        <button className="auth-button" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        <p className="auth-link-text">Remember your password? <a href="/">Log in</a></p>
      </div>
    </div>
  )
}

export default ResetPassword