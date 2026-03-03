import { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { resetPassword } from '../services/auth'
import '../App.css'

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setServerError('')
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
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
      await resetPassword({ email, password: formData.password })
      navigate('/')
    } catch (err) {
      setServerError(err.response?.data?.message || 'Password reset failed, please try again')
    } finally {
      setLoading(false)
    }
  }

  if (!email) {
    return <Navigate to="/forgot-password" replace />
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">Enter your new password below.</p>

        {serverError && <p className="server-error">{serverError}</p>}

        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="field-error">{errors.password}</p>}

        <input
          className="auth-input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}

        <button className="auth-button" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        <p className="auth-link-text">
          Remember your password? <a href="/">Log in</a>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword