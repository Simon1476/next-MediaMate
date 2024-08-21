export type AuthContextType = {
  username: string | null;
  accountId: string | null;
  fetchUserInfo: () => Promise<void>;
  signOut: () => void;
};
