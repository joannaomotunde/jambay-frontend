import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import './SalesAnalytics.css'
import { MdDashboard, MdEvent, MdShoppingCart, MdBarChart, MdSettings } from 'react-icons/md'

const SalesAnalytics = () => {
  const navigate = useNavigate()
  const [dataRange, setDataRange] = useState('This Quarter Q1 2026')
  const [region, setRegion] = useState('All Regions')
  const [ticketCategory, setTicketCategory] = useState('All Categories')

  const stats = {
    totalRevenue: '$4,120,750',
    revenueChange: '112.9% vs Last 8hrs',
    totalTicketsSold: '25,480',
    ticketsChange: '25.5%',
    avgTicketPrice: '$161.73',
    avgChange: '18.9%',
  }

  const dailySalesData = [
    { day: 'Mon', value: 258000 },
    { day: 'Tue', value: 530000 },
    { day: 'Wed', value: 780000 },
    { day: 'Thu', value: 1300000 },
    { day: 'Fri', value: 1336006 },
    { day: 'Sat', value: 900000 },
    { day: 'Sun', value: 650000 },
  ]

  const revenueByCategory = [
    { name: 'Concerts', value: 400 },
    { name: 'Sport', value: 300 },
    { name: 'Theater', value: 200 },
    { name: 'Festivals', value: 278 },
  ]

  const soldOutEvents = [
    { name: 'Concerts', value: 400, color: '#F7C948' },
    { name: 'Sport', value: 300, color: '#4ECDC4' },
    { name: 'Theater', value: 200, color: '#1a9e8f' },
  ]

  const latestSales = [
    { order: '#001', date: '11/03', event: 'City Music', seat: 'VIP', amount: '$300', status: 'Paid', type: 'E-ticket' },
    { order: '#002', date: '11/03', event: 'Tech Summit', seat: 'Regular', amount: '$100', status: 'Paid', type: 'E-ticket' },
    { order: '#003', date: '11/03', event: 'Carnival', seat: 'VIP', amount: '$150', status: 'Pending', type: 'Physical' },
    { order: '#004', date: '11/03', event: 'Burna Concert', seat: 'Regular', amount: '$120', status: 'Paid', type: 'E-ticket' },
  ]

  return (
    <div className="auth-container">
      <div className="sa-wrapper">

        {/* Back button */}
        <button className="back-button" onClick={() => navigate('/operator')}>‹</button>

        <h2 className="sa-title">Sales & Revenue Analytics</h2>

        {/* Filters */}
        <div className="sa-filters">
          <select className="sa-select" value={dataRange} onChange={e => setDataRange(e.target.value)}>
            <option>This Quarter Q1 2026</option>
            <option>Last Quarter</option>
            <option>This Month</option>
          </select>
          <select className="sa-select" value={region} onChange={e => setRegion(e.target.value)}>
            <option>All Regions</option>
            <option>Lagos</option>
            <option>Abuja</option>
          </select>
          <select className="sa-select" value={ticketCategory} onChange={e => setTicketCategory(e.target.value)}>
            <option>All Categories</option>
            <option>VIP</option>
            <option>Regular</option>
          </select>
        </div>

        {/* Refresh Button */}
        <button className="auth-button">Refresh</button>

        {/* Stat Cards */}
        <div className="sa-stats-row">
          <div className="sa-stat-card">
            <p className="sa-stat-label">Total Revenue</p>
            <p className="sa-stat-value">{stats.totalRevenue}</p>
            <p className="sa-stat-change">{stats.revenueChange}</p>
          </div>
          <div className="sa-stat-card">
            <p className="sa-stat-label">Total Ticket Sold</p>
            <p className="sa-stat-value">{stats.totalTicketsSold}</p>
            <p className="sa-stat-change">{stats.ticketsChange}</p>
          </div>
          <div className="sa-stat-card">
            <p className="sa-stat-label">Average Ticket Price</p>
            <p className="sa-stat-value">{stats.avgTicketPrice}</p>
            <p className="sa-stat-change">{stats.avgChange}</p>
          </div>
        </div>

        {/* Daily Ticket Sales Chart */}
        <div className="sa-panel">
          <p className="sa-panel-title">Daily Ticket Sales Volume (Q1 2026)</p>
          <p className="sa-peak">Peak: $80 Tickets on Feb 18</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dailySalesData}>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#4ECDC4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Category + Sold Out Events */}
        <div className="sa-charts-row">
          <div className="sa-panel sa-half">
            <p className="sa-panel-title">Revenue by Event Category</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={revenueByCategory}>
                <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="value" fill="#F7C948" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="sa-panel sa-half">
            <p className="sa-panel-title">Top 3 Sold-Out Events by Revenue</p>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={soldOutEvents} cx="50%" cy="50%" outerRadius={55} dataKey="value">
                  {soldOutEvents.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latest Ticket Sales */}
        <div className="sa-panel">
          <p className="sa-panel-title">Latest Ticket Sales</p>
          <div className="sa-table-wrapper">
            <table className="sa-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Event</th>
                  <th>Seat</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {latestSales.map((sale, index) => (
                  <tr key={index}>
                    <td>{sale.order}</td>
                    <td>{sale.date}</td>
                    <td>{sale.event}</td>
                    <td>{sale.seat}</td>
                    <td>{sale.amount}</td>
                    <td className={sale.status === 'Paid' ? 'status-paid' : 'status-pending'}>
                      {sale.status}
                    </td>
                    <td>{sale.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
  <button className="op-nav-btn active">
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

export default SalesAnalytics