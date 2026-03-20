import { useNavigate } from 'react-router-dom'
import { MdDashboard, MdEvent, MdShoppingCart, MdBarChart, MdAnalytics } from 'react-icons/md'
import { PieChart, Pie, Cell } from 'recharts'
import './CustomerBehaviour.css'
import './OperatorDashboard.css'

const data = [
  { name: 'iOS', value: 60 },
  { name: 'Android', value: 30 },
  { name: 'Web', value: 10 },
]

const COLORS = ['#4ECDC4', '#F7C948', '#1a9e8f']

const CustomerBehaviour = () => {
  const navigate = useNavigate()

  return (
    <div className="auth-container">
      <div className="op-wrapper">

        <h2 style={{ color: '#1E293B', textAlign: 'center', marginBottom: 16 }}>
          Customer Behavior Analytics
        </h2>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="card">
            <p>Active Sessions Today</p>
            <h2>1.2k</h2>
            <span>+5%</span>
          </div>
          <div className="card">
            <p>Total Ticket Booked</p>
            <h2>450</h2>
            <span>+12%</span>
          </div>
          <div className="card">
            <p>Avg. Session Duration</p>
            <h2>4.15 min</h2>
            <span style={{ color: '#ef4444' }}>-3%</span>
          </div>
          <div className="card">
            <p>Bounce Rate</p>
            <h2>22%</h2>
            <span style={{ color: '#ef4444' }}>-1%</span>
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
          <div className="funnel-row">
            <span>Seat Selected</span>
            <div className="bar" style={{ width: '65%' }}></div>
          </div>
          <div className="funnel-row">
            <span>Checkout Started</span>
            <div className="bar" style={{ width: '50%' }}></div>
          </div>
          <div className="funnel-row">
            <span>Purchase Complete</span>
            <div className="bar" style={{ width: '40%' }}></div>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="section">
          <h3>Device Breakdown</h3>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
            <PieChart width={160} height={160}>
              <Pie data={data} cx={75} cy={75} innerRadius={40} outerRadius={70} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {data.map((entry, index) => (
                <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: COLORS[index] }} />
                  <span style={{ fontSize: 13 }}>{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
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

        {/* Bottom Nav */}
        <div className="op-bottom-nav">
          <button className="op-nav-btn" onClick={() => navigate('/operator')}>
            <div className="op-nav-icon"><MdDashboard size={22} /></div>
            <p>Dashboard</p>
          </button>
          <button className="op-nav-btn" disabled>
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
          <button className="op-nav-btn" onClick={() => navigate('/attendance')}>
            <div className="op-nav-icon"><MdAnalytics size={22} /></div>
            <p>Monitoring</p>
          </button>
        </div>

      </div>
    </div>
  )
}

export default CustomerBehaviour