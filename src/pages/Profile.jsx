import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { updateProfile } from '../services/auth'
import '../App.css'

function Profile() {
  const { user, login, token, logout } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    dateOfBirth: user?.dateOfBirth || '',
    location: user?.location || '',
  })

  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setServerError('')
    setSuccess('')
  }

  const validate = () => {
    const newErrors = {}
    if (formData.name && formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters'
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid'
    }
    if (formData.phone && !/^\+?[0-9]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number e.g. +2348012345678'
    }
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth)
      const age = (new Date() - dob) / (1000 * 60 * 60 * 24 * 365)
      if (age < 13) newErrors.dateOfBirth = 'You must be at least 13 years old'
    }
    if (formData.location && formData.location.length < 2) {
      newErrors.location = 'Location must be at least 2 characters'
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

    const payload = {}
    Object.keys(formData).forEach((key) => {
      if (formData[key]) payload[key] = formData[key]
    })

    try {
      setLoading(true)
      const data = await updateProfile(payload)
      login(data.user, token)
      setSuccess('Profile updated successfully!')
    } catch (err) {
      setServerError(err.response?.data?.message || 'Update failed, please try again')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">My Profile</h2>

        {serverError && <p className="server-error">{serverError}</p>}
        {success && <p className="success-text">{success}</p>}

        <input
          className="auth-input"
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}

        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="field-error">{errors.email}</p>}

        <input
          className="auth-input"
          type="text"
          name="phone"
          placeholder="Phone e.g. +2348012345678"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="field-error">{errors.phone}</p>}

        <select
          className="auth-input"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="prefer not to say">Prefer not to say</option>
        </select>
        {errors.gender && <p className="field-error">{errors.gender}</p>}

        <input
          className="auth-input"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        {errors.dateOfBirth && <p className="field-error">{errors.dateOfBirth}</p>}

        <input
          className="auth-input"
          type="text"
          name="location"
          placeholder="City or Region"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && <p className="field-error">{errors.location}</p>}

        <button className="auth-button" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>

        <button className="auth-button logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Profile