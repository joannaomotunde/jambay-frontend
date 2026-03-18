import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { MdDashboard, MdEvent, MdShoppingCart, MdBarChart, MdSettings } from 'react-icons/md'
import './Attendance.css'
import frame19 from '../assets/images/Frame 19.png'

const Attendance = () => {
  const navigate = useNavigate()
  const [event, setEvent] = useState('Live Concert Festival')
  const [date, setDate] = useState('March 30, 2026')

  const stats = [
    { label: 'Attendees', value: 920, icon: '👥', color: '#4ECDC4' },
    { label: 'Checked In', value: 710, icon: '✅', color: '#166534' },
    { label: 'Not Checked In', value: 210, icon: '❌', color: '#DC2626' },
    { label: 'Present Now', value: 710, icon: '📍', color: '#166534' },
  ]

  const checkinData = [
    { time: '1PM', checkedIn: 50, notCheckedIn: 200 },
    { time: '2PM', checkedIn: 120, notCheckedIn: 180 },
    { time: '3PM', checkedIn: 200, notCheckedIn: 160 },
    { time: '4PM', checkedIn: 280, notCheckedIn: 140 },
    { time: '5PM', checkedIn: 350, notCheckedIn: 120 },
    { time: '6PM', checkedIn: 400, notCheckedIn: 100 },
    { time: '7PM', checkedIn: 380, notCheckedIn: 80 },
    { time: '8PM', checkedIn: 320, notCheckedIn: 60 },
    { time: '9PM', checkedIn: 280, notCheckedIn: 40 },
    { time: '10PM', checkedIn: 250, notCheckedIn: 20 },
  ]

  const attendees = [
    { name: 'Idara', ticket: 'VIP', status: 'Checked In', time: '5:15pm', action: 'in' },
    { name: 'James', ticket: 'General', status: 'Checked In', time: '6:20pm', action: 'in' },
    { name: 'Shuqrat', ticket: 'VIP', status: 'Checked In', time: '7:10pm', action: 'in' },
    { name: 'Samuel', ticket: 'General', status: 'Absent', time: '', action: 'out' },
    { name: 'David', ticket: 'VIP', status: 'Checked In', time: '8:11pm', action: 'in' },
  ]

  return (
    <div className="auth-container">
      <div className="at-wrapper">

        {/* Header */}
{/* Header */}
<div className="att-header">
  <img src={frame19} alt="Jambay Attendance" className="att-header-img" />
</div>

        {/* Filters */}
        <div className="at-filters">
          <select className="at-select" value={event} onChange={e => setEvent(e.target.value)}>
            <option>Live Concert Festival</option>
            <option>Tech Summit 2026</option>
            <option>Burna Concert</option>
          </select>
          <select className="at-select" value={date} onChange={e => setDate(e.target.value)}>
            <option>March 30, 2026</option>
            <option>March 31, 2026</option>
          </select>
          <button className="at-filter-btn">Filter</button>
        </div>

        {/* Stat Cards */}
        <div className="at-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="at-stat-card">
              <span className="at-stat-icon">{stat.icon}</span>
              <div>
                <p className="at-stat-label">{stat.label}</p>
                <p className="at-stat-value" style={{ color: stat.color }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

       {/* Check-in Chart */}
<div className="at-panel">
  <p className="at-panel-title">Check-in Overview</p>
  <ResponsiveContainer width="100%" height={220}>
    <ComposedChart data={checkinData}>
      <XAxis dataKey="time" tick={{ fontSize: 10 }} />
      <YAxis tick={{ fontSize: 10 }} />
      <Tooltip />
      <Bar dataKey="checkedIn" fill="#4ECDC4" name="Checked In" radius={[4,4,0,0]} />
      <Line type="monotone" dataKey="checkedIn" stroke="#4ECDC4" strokeWidth={2} dot={{ fill: '#4ECDC4', r: 4 }} name="Checked In Line" />
      <Line type="monotone" dataKey="notCheckedIn" stroke="#DC2626" strokeWidth={2} dot={{ fill: '#DC2626', r: 4 }} name="Not Checked In" />
    </ComposedChart>
  </ResponsiveContainer>

  {/* Legend */}
  <div className="at-legend">
    <div className="at-legend-item">
      <div className="at-legend-box" style={{ background: '#4ECDC4' }} />
      <p>Checked In</p>
    </div>
    <div className="at-legend-item">
      <div className="at-legend-box" style={{ background: '#DC2626' }} />
      <p>Not Checked In</p>
    </div>
  </div>
</div>

       {/* Search & Filter Row */}
<div className="at-search-row">
  <select className="at-select-sm">
    <option>All Status</option>
    <option>Checked In</option>
    <option>Not Checked In</option>
  </select>
  <select className="at-select-sm">
    <option>All Ticket Types</option>
    <option>VIP</option>
    <option>Regular</option>
  </select>
  <div className="at-search">
    <input type="text" placeholder="Search..." className="at-search-input" />
  </div>
  <button className="at-qr-btn">
  <div className="at-qr-inner">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a9e8f">
      <path d="M3 3h7v7H3V3zm1 1v5h5V4H4zm1 1h3v3H5V5zM14 3h7v7h-7V3zm1 1v5h5V4h-5zm1 1h3v3h-3V5zM3 14h7v7H3v-7zm1 1v5h5v-5H4zm1 1h3v3H5v-3zM14 14h2v2h-2v-2zm3 0h2v2h-2v-2zm-3 3h2v2h-2v-2zm3 0h2v2h-2v-2z"/>
    </svg>
  </div>
</button>
</div>

        {/* Attendee List */}
        <div className="at-panel">
          <p className="at-panel-title">Attendee List</p>
          <div className="at-table-wrapper">
            <table className="at-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ticket Type</th>
                  <th>Status</th>
                  <th>Checked In Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((row, i) => (
                  <tr key={i}>
                    <td>{row.name}</td>
                    <td>{row.ticket}</td>
                    <td>{row.status}</td>
                    <td>{row.time}</td>
                    <td>
                      <span className={`at-action-badge ${row.action === 'in' ? 'at-badge-in' : 'at-badge-out'}`}>
                        {row.action === 'in' ? 'In' : 'Not In'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="at-pagination">
            <button className="at-page-btn">‹</button>
            <p className="at-page-text">1 / 30</p>
            <button className="at-page-btn">›</button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="op-bottom-nav">
          <button className="op-nav-btn" onClick={() => navigate('/operator')}>
            <div className="op-nav-icon"><MdDashboard size={22} /></div>
            <p>Dashboard</p>
          </button>
          <button className="op-nav-btn" onClick={() => navigate('/operator')}>
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

export default Attendance