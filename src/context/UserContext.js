import { createContext, useContext } from "react";
export const UserContext = createContext({
  uid: null,
  setUser: () => {},
});
export const UserProvider = UserContext.Provider;
export default function useTask() {
  return useContext(UserContext);
}
