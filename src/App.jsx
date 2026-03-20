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
import SalesAnalytics from './pages/SalesAnalytics'
import FraudAlert from './pages/FraudAlert'
import Attendance from './pages/Attendance'
import EventsBrowse from './pages/EventsBrowse'
import SearchScreen from './pages/SearchScreen'
import EditProfile from './pages/EditProfile'
import Settings from './pages/Settings'
import SeatBooking from './pages/SeatBooking'
import EventDetails from './pages/EventDetails'
import TicketDetail from './pages/TicketDetail'
import TicketBooking from './pages/TicketBooking'
import PaymentAuth from './pages/PaymentAuth'
import PaymentSuccess from './pages/PaymentSuccess'
import SeatMap from './pages/SeatMap'
import CustomerBehaviour from './pages/CustomerBehaviour'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/403" element={<NotAuthorized />} />

        {/* User Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
        <Route path="/events" element={
          <ProtectedRoute><Ticketing /></ProtectedRoute>
        } />
        <Route path="/events-browse" element={
          <ProtectedRoute><EventsBrowse /></ProtectedRoute>
        } />
        <Route path="/concessions" element={
          <ProtectedRoute><Concessions /></ProtectedRoute>
        } />
        <Route path="/loyalty" element={
          <ProtectedRoute><Loyalty /></ProtectedRoute>
        } />

        {/* Operator Dashboard Routes */}
        <Route path="/operator" element={
          <ProtectedRoute allowedRoles={['admin']}><OperatorDashboard /></ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute allowedRoles={['admin']}><SalesAnalytics /></ProtectedRoute>
        } />
        <Route path="/fraud-alert" element={
          <ProtectedRoute allowedRoles={['admin']}><FraudAlert /></ProtectedRoute>
        } />
        <Route path="/attendance" element={
          <ProtectedRoute allowedRoles={['admin']}><Attendance /></ProtectedRoute>
        } />

        {/* Other Protected Routes */}
        <Route path="/search" element={
          <ProtectedRoute><SearchScreen /></ProtectedRoute>
        } />
        <Route path="/profile/edit" element={
          <ProtectedRoute><EditProfile /></ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute><Settings /></ProtectedRoute>
        } />
        <Route path="/seat-booking" element={
          <ProtectedRoute><SeatBooking /></ProtectedRoute>
        } />
        <Route path="/event-details" element={
          <ProtectedRoute><EventDetails /></ProtectedRoute>
        } />
        <Route path="/ticket-detail" element={
          <ProtectedRoute><TicketDetail /></ProtectedRoute>
        } />
        <Route path="/ticket-booking" element={
          <ProtectedRoute><TicketBooking /></ProtectedRoute>
        } />
        <Route path="/payment-auth" element={
          <ProtectedRoute><PaymentAuth /></ProtectedRoute>
        } />
        <Route path="/payment-success" element={
          <ProtectedRoute><PaymentSuccess /></ProtectedRoute>
        } />
        <Route path="/seat-map" element={<ProtectedRoute><SeatMap /></ProtectedRoute>} />
        <Route path="/customer-behaviour" element={<ProtectedRoute><CustomerBehaviour /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

