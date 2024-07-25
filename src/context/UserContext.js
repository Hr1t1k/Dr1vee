import { createContext, useContext } from "react";
export const AuthContext = createContext({
  authLoaded: null,
  setAuthLoaded: () => {},
});
export const UserProvider = AuthContext.Provider;
export default function useAuth() {
  return useContext(AuthContext);
}
