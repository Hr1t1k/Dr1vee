import { createContext, useContext } from "react";
export const ProgressContext = createContext({
  downloads: [],
  setDownloads: () => {},
  uploads: [],
  setUploads: () => {},
});
export const ProgressProvider = ProgressContext.Provider;
export default function useProgress() {
  return useContext(ProgressContext);
}
