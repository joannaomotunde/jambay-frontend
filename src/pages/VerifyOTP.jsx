import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { verifyOTP, verifyResetOTP } from "../services/auth";
import "../App.css";

function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(180)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef([])
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const isPasswordReset = location.state?.isPasswordReset;

  if (!email) {
    return <Navigate to="/register" replace />;
  }

  useEffect(() => {
    if (timer === 0) { setCanResend(true); return }
    const interval = setInterval(() => setTimer(t => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError('')
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleResend = () => {
    setTimer(180)
    setCanResend(false)
    setOtp(['', '', '', '', '', ''])
    setError('')
  }

  const handleSubmit = async () => {
    const otpString = otp.join('')
    if (otpString.length < 6) {
      setError("Please enter the complete OTP");
      return;
    }
    try {
      setLoading(true);
      if (isPasswordReset) {
        await verifyResetOTP({ email, otp: otpString });
        navigate("/reset-password", { state: { email } });
      } else {
        await verifyOTP({ email, otp: otpString });
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">

        <button className="back-button" onClick={() => navigate(-1)}>‹</button>

        <h2 className="auth-title">Code Verification</h2>
        <p className="auth-subtitle">
          Enter OTP (One time password) sent to <strong>{email}</strong>
          If you don't see it, please check your spam folder.
        </p>

        <div className="otp-boxes">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              className="otp-box"
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <p className="otp-timer">{formatTime(timer)}</p>

        {error && <p className="field-error">{error}</p>}

        <button className="auth-button" onClick={handleSubmit} disabled={loading}>
          {loading ? "Verifying..." : "Verify Code"}
        </button>

        <button
          className="resend-button"
          onClick={handleResend}
          disabled={!canResend}
        >
          Resend Code
        </button>

      </div>
    </div>
  );
}

export default VerifyOTP;