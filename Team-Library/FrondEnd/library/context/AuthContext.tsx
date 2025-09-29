"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

type AuthContextType = {
  isLoggedIn: boolean;
  username: string | null;
  fullName: string | null;
  login: (userName: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  console.log("AuthProvider mounted");
  
  useEffect(() => {
    console.log("AuthContext useEffect running...");
    const token = Cookies.get("loginAccessToken");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Account/GetDetailsUser`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
       console.log("API status:",res.status);
      if (!res.ok) throw new Error("Failed to fetch user profile");
     
      const data = await res.json();
      setUsername(data?.data?.user?.userName || null);
      setFullName(data?.data?.user?.fullName || null) ;
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      logout();
    }
  };

  const login = async (userName: string, password: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Account/Login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      }
    );

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    const token = data?.data?.token;

    if (token) {
      Cookies.set("loginAccessToken", token, { path: "/" });
      await fetchUserProfile(token); 
    }
  };

  const logout = () => {
    Cookies.remove("loginAccessToken");
    setIsLoggedIn(false);
    setUsername(null);
    setFullName(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, username, fullName, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};