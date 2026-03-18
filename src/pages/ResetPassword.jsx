import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { resetPassword } from "../services/auth";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import "../App.css";

function ResetPassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    return <Navigate to="/forgot-password" replace />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one lowercase letter";
    } else if (!/[!@#$%^&*]/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one special character";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    if (loading) return;
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setServerError("");
    try {
      setLoading(true);
      await resetPassword({
        email,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });
      setSuccess(true);
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
          "Password reset failed, please try again",
      );
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-form-wrapper">
          <div className="success-screen">
            <FaCheckCircle size={60} color="#166534" />
            <h2 className="auth-title">Password Updated</h2>
            <p className="auth-subtitle">
              Your password has been successfully updated.
            </p>
            <button className="auth-button" onClick={() => navigate('/login')}>
              Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">

        {/* Back button */}
        <button className="back-button" onClick={() => navigate(-1)}>‹</button>

        <h2 className="auth-title">New Credentials</h2>

        {/* Password rules */}
        <div className="password-rules">
          <p>Password must be at least 6 characters long</p>
          <p>Password must contain at least one upper case</p>
          <p>Password must contain at least one lower case</p>
          <p>Password must contain one special character</p>
        </div>

        {serverError && <p className="server-error">{serverError}</p>}

        <label className="input-label">New Password</label>
        <div className="password-wrapper">
          <input
            className="auth-input"
            type={showPassword ? "text" : "password"}
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.newPassword && <p className="field-error">{errors.newPassword}</p>}

        <label className="input-label">Confirm Password</label>
        <div className="password-wrapper">
          <input
            className="auth-input"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}

        <button className="auth-button" onClick={handleSubmit} disabled={loading}>
          {loading ? "Resetting..." : "Submit"}
        </button>

        <button className="cancel-button" onClick={() => navigate('/login')}>
          Cancel
        </button>

      </div>
    </div>
  );
}

export default ResetPassword;