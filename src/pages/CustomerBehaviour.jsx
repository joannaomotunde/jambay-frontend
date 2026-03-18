import './CustomerBehaviour.css'

import { PieChart, Pie, Cell } from 'recharts'
const data = [
  { name: 'iOS', value: 60 },
  { name: 'Android', value: 30 },
  { name: 'Web', value: 10 },
]

const CustomerBehaviour = () => {
  return (
    <div className="analytics-container">

      <h2>Customer Behavior Analytics</h2>

      {/* Stats Cards */}
        <div className="stats-grid">
            <div className="card">
            <p>Active Sessions Today</p>
            <h2>1.2k</h2>
            <span>+5%</span>
            </div>
            <div className="card">
            <p>Total Ticket Booked</p>
            <h2>1.2k</h2>
            <span>+5%</span>
            </div>
            <div className="card">
            <p>Avg. Session Duration</p>
            <h2>1.2k</h2>
            <span>+5%</span>
            </div>
            <div className="card">
            <p>Bounce Rate</p>
            <h2>1.2k</h2>
            <span>+5%</span>
            </div>
        </div>

      {/* Booking Funnel */}
        <div className="section">
            <h3>Booking Funnel</h3>

            <div className="funnel-row">
                <span>Search Started</span>
                <div className="bar" style={{ width: '90%' }}></div>
            </div>

            <div className="funnel-row">
            <span>Event Viewed</span>
            <div className="bar" style={{ width: '80%' }}></div>
            </div>
        </div>

      {/* Device Breakdown */}
      <div className="section">
        <h3>Device Breakdown</h3>
      </div>

      {/* Traffic Sources */}
        <div className="section">
            <h3>Top Traffic Sources</h3>

            <div className="bar-chart">
                <div className="bar-item" style={{ height: '120px' }}>Social</div>
                <div className="bar-item" style={{ height: '90px' }}>Organic</div>
                <div className="bar-item" style={{ height: '60px' }}>Email</div>
                <div className="bar-item" style={{ height: '40px' }}>Ads</div>
            </div>
        </div>

    </div>
  )
}

export default CustomerBehaviour
