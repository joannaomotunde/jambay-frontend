import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { verifyOTP } from '../services/auth'

function VerifyOTP() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email

  const handleSubmit = async () => {
    if (!otp) {
      setError('Please enter the OTP')
      return
    }
    try {
      setLoading(true)
      await verifyOTP({ email, otp })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP, please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Verify Your Email</h2>
        <p style={styles.subtitle}>
          We sent a 6-digit OTP to <strong>{email}</strong>. Enter it below.
        </p>

        <input
          style={styles.input}
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
        />
        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        <p style={styles.loginText}>
          Didn't get the code? <a href="/register">Go back</a>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#4ECDC4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#4ECDC4',
    padding: '40px 30px',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '360px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '5px',
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: '13px',
    marginBottom: '10px',
  },
  input: {
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: 'white',
    fontSize: '20px',
    outline: 'none',
    textAlign: 'center',
    letterSpacing: '8px',
  },
  button: {
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#F7C948',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  loginText: {
    textAlign: 'center',
    color: 'white',
    fontSize: '13px',
  },
  error: {
    color: '#ff4444',
    fontSize: '12px',
    marginTop: '-8px',
    backgroundColor: 'white',
    padding: '4px 8px',
    borderRadius: '5px',
  },
}

export default VerifyOTP