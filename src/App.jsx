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
import TicketBooking from './pages/TicketBooking'
import PaymentAuth from './pages/PaymentAuth'
import PaymentSuccess from './pages/PaymentSuccess'
import TicketDetail from './pages/TicketDetail'

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
        <Route path="/events" element={<ProtectedRoute><Ticketing /></ProtectedRoute>} />
        <Route path="/concessions" element={<ProtectedRoute><Concessions /></ProtectedRoute>} />
        <Route path="/loyalty" element={<ProtectedRoute><Loyalty /></ProtectedRoute>} />
        <Route path="/operator" element={<ProtectedRoute><OperatorDashboard /></ProtectedRoute>} />
        <Route path="/ticket-booking" element={ <ProtectedRoute><TicketBooking /></ProtectedRoute> } />
        <Route path="/payment-auth" element={ <ProtectedRoute><PaymentAuth /></ProtectedRoute>} />
        <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
<Route path="/ticket-detail" element={
  <ProtectedRoute><TicketDetail /></ProtectedRoute>
} />
      </Routes>
    </BrowserRouter>
  )
}

export default App