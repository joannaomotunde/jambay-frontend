import { useState } from 'react'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email format is invalid'
    }
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>
        <p style={styles.subtitle}>
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {submitted ? (
          <div style={styles.successBox}>
            ✅ Reset link sent! Check your email.
          </div>
        ) : (
          <>
            <input
              style={styles.input}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p style={styles.error}>{errors.email}</p>}

            <button style={styles.button} onClick={handleSubmit}>
              Send Reset Link
            </button>
          </>
        )}

        <p style={styles.loginText}>
          Remember your password? <a href="/">Log in</a>
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
    fontSize: '14px',
    outline: 'none',
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
  successBox: {
    backgroundColor: 'white',
    padding: '14px',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
}

export default ForgotPassword