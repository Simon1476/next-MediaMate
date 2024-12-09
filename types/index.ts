export type AuthContextType = {
  username: string | null;
  fetchUserInfo: () => Promise<void>;
  signOut: () => void;
};
