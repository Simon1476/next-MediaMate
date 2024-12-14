import { deleteAccountId, deleteSessionId } from "@/lib/cookies";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type AuthState = {
  username: string | null;
};

export type AuthActions = {
  fetchUserInfo: () => Promise<void>;
  signOut: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  username: null,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()(
    persist(
      (set, get) => ({
        ...initState,
        fetchUserInfo: async () => {
          try {
            const response = await fetch("/api/getUserInfo");

            if (!response.ok) {
              console.error("Failed to fetch user info:", response.statusText);
              return;
            }

            const data = await response.json();
            set(() => ({ username: data?.username ?? null }));
          } catch (error) {
            console.error("Error fetching user info:", error);
          }
        },
        signOut: () => {
          deleteSessionId();
          deleteAccountId();
          set(() => ({ username: null }));
        },
      }),
      {
        name: "auth-storage",
      }
    )
  );
};
