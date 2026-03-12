import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './OperatorDashboard.css'
import { MdDashboard, MdEvent, MdShoppingCart, MdBarChart, MdSettings } from 'react-icons/md'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const OperatorDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('dashboard')
  const [activeTab, setActiveTab] = useState('Card')
  const [showEventsMenu, setShowEventsMenu] = useState(false)

  const stats = {
    totalTicketSales: 30000,
    ticketChange: '+12.8%',
    activeEvents: 40,
    eventChange: '+3%',
    revenue: '$1,450,230',
    revenueChange: '+8.5%',
  }

  const topEvents = [
    { id: 1, name: 'City Music Festival' },
    { id: 2, name: 'Tech Summit 2026' },
    { id: 3, name: 'Burna Concert' },
  ]

  const recentSales = [
    { event: 'City Music', customer: 'Ola Y.', tickets: 3, total: '$300', date: '2 min ago' },
    { event: 'City make', customer: 'Chisom N.', tickets: 2, total: '$100', date: '2 min ago' },
    { event: 'Carnival', customer: 'Amina S.', tickets: 4, total: '$150', date: '3 min ago' },
    { event: 'Tech Summit', customer: 'Debbie F.', tickets: 5, total: '$250', date: '2 min ago' },
    { event: 'Burna Concert', customer: 'Oche K.', tickets: 2, total: '$120', date: '3 min ago' },
  ]

  const salesData = [
    { month: 'Jan', sales: 650000 },
    { month: 'Feb', sales: 750000 },
    { month: 'Mar', sales: 500000 },
    { month: 'Apr', sales: 520000 },
    { month: 'May', sales: 600000 },
    { month: 'Jun', sales: 200000 },
    { month: 'Jul', sales: 480000 },
    { month: 'Aug', sales: 720000 },
    { month: 'Sep', sales: 700000 },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="auth-container">
      <div className="op-wrapper">

        {/* Header */}
        <div className="op-header">
          <button className="op-menu-btn">≡</button>
          <h1 className="op-title">JAMBAY</h1>
          <button className="op-profile-btn">👤</button>
        </div>

        {/* Welcome */}
        <div className="op-welcome">
          <h2>Welcome back {user?.name}!</h2>
        </div>

        {/* Stat Cards */}
        <div className="op-stats-row">
          <div className="op-stat-card">
            <p className="op-stat-label">Total Ticket Sales</p>
            <div className="op-stat-bottom">
              <p className="op-stat-value">{stats.totalTicketSales.toLocaleString()}</p>
              <span className="op-badge">{stats.ticketChange}</span>
            </div>
          </div>
          <div className="op-stat-card">
            <p className="op-stat-label">Active Events</p>
            <div className="op-stat-bottom">
              <p className="op-stat-value">{stats.activeEvents} Active</p>
              <span className="op-badge">{stats.eventChange}</span>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="op-revenue-card">
          <p className="op-stat-label">Revenue</p>
          <div className="op-stat-bottom">
            <p className="op-revenue-value">{stats.revenue}</p>
            <span className="op-badge">{stats.revenueChange}</span>
          </div>
        </div>

        {/* Ticket Sales Performance */}
        <div className="op-panel">
          <p className="op-panel-title">Current Ticket Sales Performance</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis
                tick={{ fontSize: 10 }}
                tickFormatter={v => `$${v / 1000}k`}
              />
              <Tooltip formatter={v => `$${v.toLocaleString()}`} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4ECDC4"
                strokeWidth={2}
                dot={{ fill: '#4ECDC4', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Live Event Overview */}
        <div className="op-panel">
          <div className="op-panel-header">
            <p className="op-panel-title">Live Event Overview</p>
            <div className="op-toggle">
              <button
                className={`op-toggle-btn ${activeTab === 'Card' ? 'active' : ''}`}
                onClick={() => setActiveTab('Card')}>
                Card
              </button>
              <button
                className={`op-toggle-btn ${activeTab === 'Status' ? 'active' : ''}`}
                onClick={() => setActiveTab('Status')}>
                Status
              </button>
            </div>
          </div>
          <p className="op-panel-subtitle">Top Event</p>
          {topEvents.map(event => (
            <div key={event.id} className="op-event-item">
              <div className="op-event-thumb" />
              <p>{event.name}</p>
            </div>
          ))}
        </div>

        {/* Recent Sales Activity */}
        <div className="op-panel">
          <p className="op-panel-title">Recent Sales Activity</p>
          <table className="op-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Customer</th>
                <th>Tickets</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.event}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.tickets}</td>
                  <td>{sale.total}</td>
                  <td>{sale.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Navigation */}
        <div className="op-bottom-nav">
          <button className={`op-nav-btn ${activeNav === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveNav('dashboard')}>
            <div className="op-nav-icon"><MdDashboard size={22} /></div>
            <p>Dashboard</p>
          </button>

          <div style={{ position: 'relative' }}>
            {showEventsMenu && (
              <div className="op-events-popup">
                <button className="op-popup-item" onClick={() => { navigate('/attendance'); setShowEventsMenu(false) }}>
                  📊 Attendance
                </button>
                <button className="op-popup-item" onClick={() => { navigate('/fraud-alert'); setShowEventsMenu(false) }}>
                  🚨 Fraud Alert
                </button>
              </div>
            )}
            <button className={`op-nav-btn ${activeNav === 'events' ? 'active' : ''}`}
              onClick={() => { setActiveNav('events'); setShowEventsMenu(!showEventsMenu) }}>
              <div className="op-nav-icon"><MdEvent size={22} /></div>
              <p>Events</p>
            </button>
          </div>

          <button className={`op-nav-btn ${activeNav === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveNav('orders')}>
            <div className="op-nav-icon"><MdShoppingCart size={22} /></div>
            <p>Orders</p>
          </button>

          <button className={`op-nav-btn ${activeNav === 'analytics' ? 'active' : ''}`}
            onClick={() => { setActiveNav('analytics'); navigate('/analytics') }}>
            <div className="op-nav-icon"><MdBarChart size={22} /></div>
            <p>Analytics</p>
          </button>

          <button className={`op-nav-btn ${activeNav === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveNav('settings'); handleLogout() }}>
            <div className="op-nav-icon"><MdSettings size={22} /></div>
            <p>Settings</p>
          </button>
        </div>

      </div>
    </div>
  )
}

export default OperatorDashboard