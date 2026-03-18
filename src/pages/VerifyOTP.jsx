import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { verifyOTP, verifyResetOTP } from "../services/auth";
import ScreenLayout from "../components/ScreenLayout";
import "../App.css";

function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(180);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const isPasswordReset = location.state?.isPasswordReset;

  if (!email) return <Navigate to="/register" replace />;

  useEffect(() => {
    if (timer === 0) { setCanResend(true); return }
    const interval = setInterval(() => setTimer(t => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1].focus();
  };

  const handleResend = () => {
    setTimer(180);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
  };

  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length < 6) { setError("Please enter the complete OTP"); return; }
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
    } finally { setLoading(false); }
  };

  return (
    <ScreenLayout
      title="Code Verification"
      subtitle={`Enter OTP sent to ${email}. If you don't see it, please check your spam folder.`}
      backTo="/login"
    >
      {error && <p className="field-error">{error}</p>}

      <div className="otp-section" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
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
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button className="auth-button" onClick={handleSubmit} disabled={loading}>
          {loading ? "Verifying..." : "Verify Code"}
        </button>
        <button className="resend-button" onClick={handleResend} disabled={!canResend}>
          Resend Code
        </button>
      </div>
    </ScreenLayout>
  );
}

export default VerifyOTP;