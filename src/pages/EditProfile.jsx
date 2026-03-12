import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { MdHome, MdEvent, MdSearch, MdPerson, MdSettings, MdEdit, MdCheck, MdClose } from 'react-icons/md'
import { MdChevronRight } from 'react-icons/md'
import { IoCamera } from 'react-icons/io5'
import { updateProfile } from '../services/auth'
import './EditProfile.css'
import './Dashboard.css'

function EditProfile() {
  const { user, login, token } = useAuth()
  const navigate = useNavigate()

  const [expandedField, setExpandedField] = useState(null)
  const [fieldValues, setFieldValues] = useState({
    phone: user?.phone || '',
    email: user?.email || '',
    gender: user?.gender || '',
    dateOfBirth: user?.dateOfBirth || '',
    address: user?.address || '',
    location: user?.location || '',
    timezone: user?.timezone || '',
  })
  const [tempValue, setTempValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const menuItems = [
    { id: 'phone', label: 'Phone', type: 'tel', placeholder: 'e.g. +2348012345678' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
    { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'] },
    { id: 'dateOfBirth', label: 'Date Of Birth', type: 'date', placeholder: '' },
    { id: 'address', label: 'Address', type: 'text', placeholder: 'Your address' },
    { id: 'location', label: 'Location', type: 'text', placeholder: 'City or Region' },
    { id: 'timezone', label: 'Timezone', type: 'text', placeholder: 'e.g. GMT+1' },
  ]

  const handleExpand = (fieldId) => {
    setExpandedField(fieldId)
    setTempValue(fieldValues[fieldId])
    setError('')
  }

  const handleCancel = () => {
    setExpandedField(null)
    setTempValue('')
    setError('')
  }

  const handleSave = async (fieldId) => {
    try {
      setSaving(true)
      const payload = { [fieldId]: tempValue }
      const data = await updateProfile(payload)
      login(data.user, token)
      setFieldValues({ ...fieldValues, [fieldId]: tempValue })
      setExpandedField(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save, try again')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="auth-container" style={{ justifyContent: 'flex-start' }}>
      <div className="ep-wrapper">

        {/* Top Bar */}
        <div className="ep-top-bar">
          <button className="ep-back-btn" onClick={() => navigate('/profile')}>
            <MdChevronRight size={20} color="white" style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button className="ep-camera-btn">
            <IoCamera size={20} color="white" />
          </button>
        </div>

        {/* User Card */}
        <div className="ep-user-card">
          <div className="ep-user-avatar">
            <MdPerson size={36} color="#4ECDC4" />
          </div>
          <div className="ep-user-info">
            <div className="ep-user-name-row">
              <p className="ep-user-name">{user?.name || 'John Anderson'}</p>
              <MdEdit size={14} color="#64748B" />
            </div>
            <p className="ep-user-joined">Joined Jambay</p>
            <p className="ep-user-date">03 March, 2026</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="ep-menu">
          {menuItems.map(item => (
            <div key={item.id} className="ep-menu-item">
              <div className="ep-menu-top-row">
                <p className="ep-menu-label">{item.label}</p>
                {expandedField !== item.id ? (
                  <button className="ep-menu-arrow" onClick={() => handleExpand(item.id)}>
                    <MdChevronRight size={20} color="#1E293B" />
                  </button>
                ) : (
                  <div className="ep-menu-actions">
                    <button className="ep-action-btn ep-cancel-btn" onClick={handleCancel}>
                      <MdClose size={16} color="white" />
                    </button>
                    <button className="ep-action-btn ep-save-btn" onClick={() => handleSave(item.id)} disabled={saving}>
                      <MdCheck size={16} color="white" />
                    </button>
                  </div>
                )}
              </div>

              {/* Current value preview */}
              {expandedField !== item.id && fieldValues[item.id] && (
                <p className="ep-field-value">{fieldValues[item.id]}</p>
              )}

              {/* Expanded edit field */}
              {expandedField === item.id && (
                <div className="ep-edit-field">
                  {item.type === 'select' ? (
                    <select
                      className="ep-input"
                      value={tempValue}
                      onChange={e => setTempValue(e.target.value)}
                    >
                      <option value="">Select {item.label}</option>
                      {item.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="ep-input"
                      type={item.type}
                      placeholder={item.placeholder}
                      value={tempValue}
                      onChange={e => setTempValue(e.target.value)}
                      autoFocus
                    />
                  )}
                  {error && <p className="ep-error">{error}</p>}
                </div>
              )}
            </div>
          ))}

          {/* Delete Account */}
          <div className="ep-menu-item ep-delete-item">
            <p className="ep-menu-label ep-delete-label">Delete Account</p>
            <div className="ep-menu-arrow">
              <MdChevronRight size={20} color="#1E293B" />
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="db-bottom-nav">
          <button className="db-nav-btn" onClick={() => navigate('/dashboard')}>
            <div className="db-nav-icon-circle"><MdHome size={22} /></div>
            <p>Home</p>
          </button>
          <button className="db-nav-btn" onClick={() => navigate('/events-browse')}>
            <div className="db-nav-icon-circle"><MdEvent size={22} /></div>
            <p>Events</p>
          </button>
          <button className="db-nav-btn" onClick={() => navigate('/search')}>
            <div className="db-nav-icon-circle"><MdSearch size={22} /></div>
            <p>Search</p>
          </button>
          <button className="db-nav-btn active">
            <div className="db-nav-icon-circle"><MdPerson size={22} /></div>
            <p>Profile</p>
          </button>
          <button className="db-nav-btn" onClick={() => navigate('/settings')}>
            <div className="db-nav-icon-circle"><MdSettings size={22} /></div>
            <p>Settings</p>
          </button>
        </div>

      </div>
    </div>
  )
}

export default EditProfile