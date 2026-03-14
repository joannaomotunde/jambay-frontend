import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../App.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email format is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setServerError("");
    setLoading(true);

    try {
      const data = await loginUser(formData); // API must return { user, token }
      login(data.user, data.token);

      // Redirect based on role
      if (data.user?.role === "admin") navigate("/operator");
      else navigate("/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="screen-wrapper">
        <button className="back-button" onClick={() => navigate("/")}>
          ‹
        </button>
        <h2 className="auth-title">Welcome, please log in</h2>

        {serverError && <p className="server-error">{serverError}</p>}

        <input
          className="auth-input"
          type="text"
          name="email"
          placeholder="Username, ID, Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="field-error">{errors.email}</p>}

        <div className="password-wrapper">
          <input
            className="auth-input"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && <p className="field-error">{errors.password}</p>}

        <div className="login-options">
          <label className="remember-me">
            <input type="checkbox" /> Remember me
          </label>
          <a href="/forgot-password" className="forgot-link">
            Forgot password?
          </a>
        </div>

        <button className="auth-button" onClick={handleSubmit} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="auth-link-text">
          Don't have an account yet? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;