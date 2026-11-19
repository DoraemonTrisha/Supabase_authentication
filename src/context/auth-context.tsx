// src/context/auth-context.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define the AuthContext type
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsAuthenticated(true); // If token exists, user is authenticated
    } else {
      setIsAuthenticated(false); // Otherwise, not authenticated
    }
  }, []);

  const login = (token: string) => {
    setIsAuthenticated(true);
    localStorage.setItem("auth_token", token); // Store the token
    router.push("/"); // Redirect to home after login
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth_token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
