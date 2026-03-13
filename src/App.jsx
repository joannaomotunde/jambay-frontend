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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/403" element={<NotAuthorized />} />

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
        <Route path="/operator" element={
          <ProtectedRoute allowedRoles={['admin']}><OperatorDashboard /></ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute><SalesAnalytics /></ProtectedRoute>
        } />
        <Route path="/fraud-alert" element={
          <ProtectedRoute><FraudAlert /></ProtectedRoute>
        } />
        <Route path="/attendance" element={
          <ProtectedRoute><Attendance /></ProtectedRoute>
        } />
        <Route path="/search" element={
  <ProtectedRoute><SearchScreen /></ProtectedRoute>
} />
<Route path="/profile/edit" element={
  <ProtectedRoute><EditProfile /></ProtectedRoute>
} />
<Route path="/settings" element={
  <ProtectedRoute><Settings /></ProtectedRoute>
} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";
// import Dashboard from "./pages/Dashboard";
// import VerifyOTP from "./pages/VerifyOTP";
// import ProtectedRoute from "./components/ProtectedRoute";
// import ResetPassword from "./pages/ResetPassword";
// import Profile from "./pages/Profile";
// import Ticketing from "./pages/Ticketing";
// import Concessions from "./pages/Concessions";
// import Loyalty from "./pages/Loyalty";
// import OperatorDashboard from "./pages/OperatorDashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Auth Routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/verify-otp" element={<VerifyOTP />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         {/* User Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Profile */}
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         {/* Event Ticketing (Seat Selection Page) */}
//         <Route
//           path="/event/:eventId"
//           element={
//             <ProtectedRoute>
//               <Ticketing />
//             </ProtectedRoute>
//           }
//         />

//         {/* Concessions */}
//         <Route
//           path="/concessions"
//           element={
//             <ProtectedRoute>
//               <Concessions />
//             </ProtectedRoute>
//           }
//         />

//         {/* Loyalty */}
//         <Route
//           path="/loyalty"
//           element={
//             <ProtectedRoute>
//               <Loyalty />
//             </ProtectedRoute>
//           }
//         />

//         {/* Operator Dashboard */}
//         <Route
//           path="/operator"
//           element={
//             <ProtectedRoute>
//               <OperatorDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
