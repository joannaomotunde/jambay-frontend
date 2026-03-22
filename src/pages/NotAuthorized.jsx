import { useNavigate } from 'react-router-dom'

function NotAuthorized() {
  const navigate = useNavigate()

  return (
    <div className="auth-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        padding: '40px 24px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: '#F7C948'
        }}>
          403
        </div>
        <h2 style={{ color: 'white', fontSize: 22, margin: 0 }}>Access Denied</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.6 }}>
          You do not have permission to view this page. Please log in with the correct account.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'linear-gradient(135deg, #F7C948, #e6b800)',
            border: 'none',
            borderRadius: '999px',
            padding: '14px 40px',
            fontSize: 15,
            fontWeight: 'bold',
            color: '#1E293B',
            cursor: 'pointer',
            marginTop: 8
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}

export default NotAuthorized