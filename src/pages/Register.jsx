import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ScreenLayout from '../layout/ScreenLayout'; // Wrap page in ScreenLayout
import '../App.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', role: 'attendee',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setServerError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (formData.phone && !/^\+?[0-9]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number e.g. +2348012345678';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    setServerError('');
    try {
      setLoading(true);
      await registerUser({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout>
      <div className="auth-container register-container">
        <div className="auth-form-wrapper">

          <button className="back-button" onClick={() => navigate('/login')}>‹</button>

          <h2 className="auth-title">Create an account</h2>

          {serverError && <p className="server-error">{serverError}</p>}

          <label className="input-label">First Name</label>
          <input className="auth-input" type="text" name="firstName"
            placeholder="First..."
            value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <p className="field-error">{errors.firstName}</p>}

          <label className="input-label">Last Name</label>
          <input className="auth-input" type="text" name="lastName"
            placeholder="Last..."
            value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <p className="field-error">{errors.lastName}</p>}

          <label className="input-label">Email Address</label>
          <input className="auth-input" type="email" name="email"
            placeholder="eg. address@email.abc"
            value={formData.email} onChange={handleChange} />
          {errors.email && <p className="field-error">{errors.email}</p>}

          <label className="input-label">Phone number</label>
          <input className="auth-input" type="tel" name="phone"
            placeholder="Phone number"
            value={formData.phone} onChange={handleChange} />
          {errors.phone && <p className="field-error">{errors.phone}</p>}

          <label className="input-label">Password</label>
          <div className="password-wrapper">
            <input
              className="auth-input"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter password..."
              value={formData.password}
              onChange={handleChange}
            />
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className="field-error">{errors.password}</p>}

          <p className="auth-link-text">
            Already have an account? <a href="/login" className="signup-link">Log in</a>
          </p>

          <button className="auth-button" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

        </div>
      </div>
    </ScreenLayout>
  );
}

export default Register;