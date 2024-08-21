"use client";

import { deleteSessionId } from "@/lib/cookies";
import { AuthContextType } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERNAME_KEY = "username";
const ACCOUNT_ID_KEY = "accountId";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUserName] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    // 브라우저 환경에서만 실행되도록 보장
    const storedUsername = localStorage.getItem(USERNAME_KEY);
    const storedAccountId = localStorage.getItem(ACCOUNT_ID_KEY);

    if (storedUsername) setUserName(storedUsername);
    if (storedAccountId) setAccountId(storedAccountId);
  }, []);

  useEffect(() => {
    // username 상태가 변경될 때 로컬 스토리지 업데이트
    if (username) {
      localStorage.setItem(USERNAME_KEY, username);
    } else {
      localStorage.removeItem(USERNAME_KEY);
    }
  }, [username]);

  useEffect(() => {
    // accountId 상태가 변경될 때 로컬 스토리지 업데이트
    if (accountId) {
      localStorage.setItem(ACCOUNT_ID_KEY, accountId);
    } else {
      localStorage.removeItem(ACCOUNT_ID_KEY);
    }
  }, [accountId]);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("/api/getUserInfo");

      if (response.ok) {
        const data = await response.json();
        setUserName(data.username);
        setAccountId(data.id);
      } else {
        console.error("Failed to fetch user info:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const signOut = () => {
    setUserName(null);
    setAccountId(null);
    deleteSessionId();
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ACCOUNT_ID_KEY);
  };
  return (
    <AuthContext.Provider
      value={{ username, fetchUserInfo, signOut, accountId }}
    >
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
