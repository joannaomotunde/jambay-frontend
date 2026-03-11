import { useNavigate } from 'react-router-dom'
import { MdDashboard, MdEvent, MdShoppingCart, MdBarChart, MdSettings } from 'react-icons/md'
import { MdSmartToy, MdLanguage, MdCreditCard, MdAccountCircle, MdWarning, MdLock } from 'react-icons/md'
import './FraudAlert.css'

const FraudAlert = () => {
  const navigate = useNavigate()

  const indicators = [
    { icon: <MdSmartToy size={28} />, label: 'Bot Detection:', status: 'CRITICAL', color: '#DC2626' },
    { icon: <MdLanguage size={28} />, label: 'IP Analysis:', status: 'IRREGULAR', color: '#DC2626' },
    { icon: <MdCreditCard size={28} />, label: 'Payment Integrity:', status: 'FAIL', color: '#DC2626' },
    { icon: <MdAccountCircle size={28} />, label: 'Account Pattern:', status: 'ANOMALOUS', color: '#F7C948' },
  ]

  return (
    <div className="auth-container">
      <div className="fa-wrapper">

        {/* Back button */}
        <button className="back-button" onClick={() => navigate('/operator')}>‹</button>

        <h2 className="fa-title">Ticket Fraud Alert</h2>

        {/* Risk Banner */}
        <div className="fa-risk-banner">
          <MdWarning size={60} color="white" />
          <p className="fa-risk-label">RISK LEVEL: 98%</p>
          <div className="fa-avatars">
            <div className="fa-avatar">👤</div>
            <div className="fa-avatar">👤</div>
          </div>
        </div>

        {/* Indicators */}
        <div className="fa-indicators">
          {indicators.map((item, index) => (
            <div key={index} className="fa-indicator-item">
              <div className="fa-indicator-icon">{item.icon}</div>
              <p className="fa-indicator-label">{item.label}</p>
              <p className="fa-indicator-status" style={{ color: item.color }}>{item.status}</p>
            </div>
          ))}
        </div>

        {/* Action Section */}
        <div className="fa-action-section">
          <p className="fa-action-title">IMMEDIATE ACTION{'\n'}RECOMMENDED</p>
          <button className="fa-action-btn">
            <MdLock size={18} />
            TAKE SECURE ACTION NOW
          </button>
          <p className="fa-action-hint">Tap for details on flagged accounts & fraud types</p>
        </div>

        {/* Bottom Navigation */}
        <div className="op-bottom-nav">
          <button className="op-nav-btn" onClick={() => navigate('/operator')}>
            <div className="op-nav-icon"><MdDashboard size={22} /></div>
            <p>Dashboard</p>
          </button>
          <button className="op-nav-btn" onClick={() => navigate('/events')}>
            <div className="op-nav-icon"><MdEvent size={22} /></div>
            <p>Events</p>
          </button>
          <button className="op-nav-btn" onClick={() => navigate('/orders')}>
            <div className="op-nav-icon"><MdShoppingCart size={22} /></div>
            <p>Orders</p>
          </button>
          <button className="op-nav-btn" onClick={() => navigate('/analytics')}>
            <div className="op-nav-icon"><MdBarChart size={22} /></div>
            <p>Analytics</p>
          </button>
          <button className="op-nav-btn" onClick={() => navigate('/login')}>
            <div className="op-nav-icon"><MdSettings size={22} /></div>
            <p>Settings</p>
          </button>
        </div>

      </div>
    </div>
  )
}

export default FraudAlert