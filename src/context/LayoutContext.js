import { createContext, useContext } from "react";
export const LayoutContext = createContext({
  layout: null,
  setLayout: () => {},
});
export const LayoutProvider = LayoutContext.Provider;
export default function useTask() {
  return useContext(LayoutContext);
}
