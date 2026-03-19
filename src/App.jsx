import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import VerifyOTP from './pages/VerifyOTP'
import ProtectedRoute from './components/ProtectedRoute'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'
import Ticketing from './pages/Ticketing'
import Concessions from './pages/Concessions'
import Loyalty from './pages/Loyalty'
import OperatorDashboard from './pages/OperatorDashboard'
import NotAuthorized from './pages/NotAuthorized'
import Onboarding from './pages/Onboarding'
import SeatSelection from './pages/SeatSelection'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* First page users see */}
        <Route path="/" element={<Onboarding />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/403" element={<NotAuthorized />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/events" element={
          <ProtectedRoute>
            <Ticketing />
          </ProtectedRoute>
        } />
        <Route path="/concessions" element={
          <ProtectedRoute>
            <Concessions />
          </ProtectedRoute>
        } />
        <Route path="/loyalty" element={
          <ProtectedRoute>
            <Loyalty />
          </ProtectedRoute>
        } />
        <Route path="/operator" element={
          <ProtectedRoute>
            <OperatorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/seat-selection" element={
          
            <SeatSelection />
          
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App