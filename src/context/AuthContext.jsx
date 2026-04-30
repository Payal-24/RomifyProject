import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const ADMIN_CREDENTIALS = {
  email: import.meta.env.VITE_ADMIN_EMAIL || "admin@example.com",
  password: import.meta.env.VITE_ADMIN_PASSWORD || "change_this_password",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load token and user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, isAdminLogin = false) => {
    try {
      setLoading(true);
      setError(null);

      // Check for admin login
      if (isAdminLogin) {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          const adminUser = {
            id: "admin-001",
            email: ADMIN_CREDENTIALS.email,
            name: "Admin User",
            role: "admin",
          };
          const adminToken = "admin-token-" + Date.now();

          // Store token and user
          localStorage.setItem("authToken", adminToken);
          localStorage.setItem("authUser", JSON.stringify(adminUser));

          setToken(adminToken);
          setUser(adminUser);

          return {
            success: true,
            token: adminToken,
            user: adminUser,
            message: "Admin login successful",
          };
        } else {
          throw new Error("Invalid admin credentials");
        }
      }

      // Regular user login
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      // Add default role if not present
      if (data.user && !data.user.role) {
        data.user.role = "user";
      }

      // Store token and user
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Registration failed");
      }

      // Store token and user
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // socialLogin removed — only local email/password authentication supported

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setToken(null);
    setUser(null);
    setError(null);
  };

  const verifyToken = async () => {
    if (!token) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data.success;
    } catch (err) {
      console.error("Token verification failed:", err);
      logout(); // Clear invalid token
      return false;
    }
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        
        logout,
        verifyToken,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
