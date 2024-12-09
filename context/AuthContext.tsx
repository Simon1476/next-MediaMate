"use client";

import { deleteSessionId } from "@/lib/cookies";
import { AuthContextType } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERNAME_KEY = "username";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem(USERNAME_KEY);

    if (storedUsername) setUserName(storedUsername);
  }, []);

  useEffect(() => {
    // username 상태가 변경될 때 로컬 스토리지 업데이트
    if (username) {
      localStorage.setItem(USERNAME_KEY, username);
    } else {
      localStorage.removeItem(USERNAME_KEY);
    }
  }, [username]);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("/api/getUserInfo");

      if (response.ok) {
        const data = await response.json();
        setUserName(data.username);
      } else {
        console.error("Failed to fetch user info:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const signOut = () => {
    setUserName(null);
    deleteSessionId();
    localStorage.removeItem(USERNAME_KEY);
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
