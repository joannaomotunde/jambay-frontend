import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import VerifyOTP from './pages/VerifyOTP'
import ProtectedRoute from './components/ProtectedRoute'
import ResetPassword from './pages/ResetPassword'


import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
         path="/profile"
         element={
         <ProtectedRoute>
         <Profile />
        </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App