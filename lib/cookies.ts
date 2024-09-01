"use server";

import { cookies } from "next/headers";

export const getSessionId = () => {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("session_id");
  return sessionId ? sessionId.value : null;
};

export const deleteSessionId = () => {
  const cookieStore = cookies();

  cookieStore.delete("session_id");
};

export const deleteAccountId = () => {
  const cookieStore = cookies();
  cookieStore.delete("account_id");
};
