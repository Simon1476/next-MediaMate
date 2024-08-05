"use client";

import { deleteSessionId } from "@/lib/cookies";
import { AuthContextType } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("/api/getUserInfo");

      if (response.ok) {
        const data = await response.json();
        setUserName(data.username);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const signOut = () => {
    setUserName(null);
    deleteSessionId();
    localStorage.removeItem("username");
  };
  return (
    <AuthContext.Provider value={{ username, fetchUserInfo, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
