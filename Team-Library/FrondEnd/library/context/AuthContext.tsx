"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  username: string | null;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    const savedName = localStorage.getItem("username");
    if (savedLogin === "true" && savedName) {
      setIsLoggedIn(true);
      setUsername(savedName);
    }
  }, []);

  const login = (name: string) => {
    setIsLoggedIn(true);
    setUsername(name);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    localStorage.removeItem("isLoggedIn");
    // localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};