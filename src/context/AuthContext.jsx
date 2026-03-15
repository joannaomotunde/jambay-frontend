import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
 const [token, setToken] = useState(undefined);

  // Load token & user from localStorage on mount
    useEffect(() => {
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');

  if (storedToken && storedUser) {
    try {
      const payload = JSON.parse(atob(storedToken.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired) {
        logout();
      } else {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch {
      logout();
    }
  } else {
    setToken(null); // token is null after checking
  }
}, []);

  const login = (userData, userToken) => {
    const userWithRole = { ...userData, role: userData.role || "user" };
    setUser(userWithRole);
    setToken(userToken);
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userWithRole));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
