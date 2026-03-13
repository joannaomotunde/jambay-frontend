import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { token, user } = useAuth()

  // Still loading from localStorage
  if (token === undefined) {
    return null;
  }

  // No token — redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Role check — if allowedRoles is specified and user role not included
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/403" replace />
  }

  return children
}

export default ProtectedRoute;
