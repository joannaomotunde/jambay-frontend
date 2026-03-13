import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      try {
        const payload = JSON.parse(atob(storedToken.split('.')[1]))
        const isExpired = payload.exp * 1000 < Date.now()

        if (isExpired) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setToken(null)
          setUser(null)
        } else {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
        }
      } catch {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
      }
    } else {
      setToken(null);
    }
  }, []);

  const login = (userData, userToken) => {
    // Save role from response — role is either 'user' or 'admin'
    const userWithRole = {
      ...userData,
      role: userData.role || 'user' // default to 'user' if role is missing
    }
    setUser(userWithRole)
    setToken(userToken)
    localStorage.setItem('token', userToken)
    localStorage.setItem('user', JSON.stringify(userWithRole))
  }

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Helper to check if current user is admin
  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
