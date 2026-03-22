import { useState,useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './OperatorDashboard.css'
import { MdDashboard, MdEvent, MdShoppingCart, MdBarChart, MdAnalytics } from 'react-icons/md'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import mjImg from '../assets/images/Rectangle 312.png'
import titaniqueImg from '../assets/images/Rectangle 313.png'
import aladdinImg from '../assets/images/Rectangle 160.png'
import group1 from '../assets/images/Group 1.png'

const OperatorDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('dashboard')
  const [activeTab, setActiveTab] = useState('Card')

  const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleTimeString())

const refreshData = () => {
  setLastRefresh(new Date().toLocaleTimeString())
}

useEffect(() => {
  const interval = setInterval(() => {
    refreshData()
  }, 5000)
  return () => clearInterval(interval)
}, [])

  const stats = {
    totalTicketSales: 30000,
    ticketChange: '+12.8%',
    activeEvents: 40,
    eventChange: '+3%',
    revenue: '$1,450,230',
    revenueChange: '+8.5%',
  }

  const topEvents = [
    { id: 1, name: 'MJ The Musical', sold: 85, count: '4,250/5000', img: mjImg, barColor: '#4ECDC4' },
    { id: 2, name: 'Titanique', sold: 92, count: '11040/13000', img: titaniqueImg, barColor: '#4ECDC4' },
    { id: 3, name: 'Aladdin 2', sold: 60, count: '1,200/2000', img: aladdinImg, barColor: '#F7C948' },
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
          <div className="op-header-bg">
            <img src={group1} alt="header" className="op-header-img" />
            <div className="op-header-overlay">
              <button className="op-menu-btn">≡</button>
              <h1 className="op-title">JAMBAY</h1>
              <button className="op-profile-btn">👤</button>
            </div>
          </div>
        </div>

        {/* Welcome */}
        <div className="op-welcome">
          <h2>Welcome back {user?.name}!</h2>
        </div>
        
        {/* Stat Cards */}
        <div className="op-stats-row">
          <div
            className="op-stat-card"
            onClick={() => navigate('/sales-analytics')}
            style={{ cursor: 'pointer' }}
          >
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
        <div
          className="op-revenue-card"
          onClick={() => navigate('/analytics')}
          style={{ cursor: 'pointer' }}
        >
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
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip formatter={v => `$${v.toLocaleString()}`} />
              <Line type="monotone" dataKey="sales" stroke="#4ECDC4" strokeWidth={2} dot={{ fill: '#4ECDC4', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Live Event Overview */}
        <div className="op-panel">
          <div className="op-panel-header">
            <p className="op-panel-title">Live Event Overview</p>
            <div className="op-toggle">
              <button className={`op-toggle-btn ${activeTab === 'Card' ? 'active' : ''}`} onClick={() => setActiveTab('Card')}>Card</button>
              <button className={`op-toggle-btn ${activeTab === 'Status' ? 'active' : ''}`} onClick={() => setActiveTab('Status')}>Status</button>
            </div>
          </div>
          <div className="op-event-cols">
            <p className="op-panel-subtitle">Top Event</p>
            <p className="op-panel-subtitle">Status</p>
          </div>
          {topEvents.map(event => (
            <div key={event.id} className="op-event-item">
              <img src={event.img} alt={event.name} className="op-event-thumb" />
              <p className="op-event-name">{event.name}</p>
              <div className="op-event-status">
                <p className="op-event-sold">{event.sold}% Sold {event.count}</p>
                <div className="op-progress-bar">
                  <div className="op-progress-fill" style={{ width: `${event.sold}%`, background: event.barColor }} />
                </div>
              </div>
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
          <button className={`op-nav-btn ${activeNav === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveNav('dashboard'); navigate('/operator') }}>
            <div className="op-nav-icon"><MdDashboard size={22} /></div>
            <p>Dashboard</p>
          </button>

          {/* Events button disabled for now */}
          <button className="op-nav-btn" disabled>
            <div className="op-nav-icon"><MdEvent size={22} /></div>
            <p>Events</p>
          </button>

          <button className={`op-nav-btn ${activeNav === 'orders' ? 'active' : ''}`} onClick={() => { setActiveNav('orders'); navigate('/orders') }}>
            <div className="op-nav-icon"><MdShoppingCart size={22} /></div>
            <p>Orders</p>
          </button>

          <button className={`op-nav-btn ${activeNav === 'analytics' ? 'active' : ''}`}onClick={() => { setActiveNav('analytics'); navigate('/customer-behaviour') }}>
            <div className="op-nav-icon"><MdBarChart size={22} /></div>
            <p>Analytics</p>
          </button>

          {/* Monitoring leads to Attendance */}
          <button className={`op-nav-btn ${activeNav === 'monitoring' ? 'active' : ''}`} onClick={() => { setActiveNav('monitoring'); navigate('/attendance') }}>
            <div className="op-nav-icon"><MdAnalytics size={22} /></div>
            <p>Monitoring</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OperatorDashboard