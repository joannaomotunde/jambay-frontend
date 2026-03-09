import { useNavigate } from 'react-router-dom'

function NotAuthorized() {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>403 — Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <button onClick={() => navigate('/')}>Back to Login</button>
    </div>
  )
}

export default NotAuthorized