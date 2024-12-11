"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";

const Authenticate = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { fetchUserInfo } = useAuth();
  useEffect(() => {
    const fetchSessionId = async () => {
      const token = searchParams.get("token");
      if (!token) return;

      try {
        await fetch("/api/createSession", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
          credentials: "include",
        });
        await fetch("/api/getAccountId");
        await fetchUserInfo();
        router.push("/");
      } catch (error) {
        console.error("Error during session creation:", error);
      }
    };
    fetchSessionId();
  }, [searchParams, router, fetchUserInfo]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0f1114]">
      <p className="text-white text-3xl">로그인 시도 중...</p>
    </div>
  );
};

const AuthenticatePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Authenticate />
    </Suspense>
  );
};

export default AuthenticatePage;
