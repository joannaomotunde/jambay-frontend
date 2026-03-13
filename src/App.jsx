import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import VerifyOTP from "./pages/VerifyOTP";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Ticketing from "./pages/Ticketing";
import Concessions from "./pages/Concessions";
import Loyalty from "./pages/Loyalty";
import OperatorDashboard from "./pages/OperatorDashboard";

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
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Ticketing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/concessions"
          element={
            <ProtectedRoute>
              <Concessions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loyalty"
          element={
            <ProtectedRoute>
              <Loyalty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator"
          element={
            <ProtectedRoute>
              <OperatorDashboard />
            </ProtectedRoute>
          }
        />
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
