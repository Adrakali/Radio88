import { createContext, useState } from "react";

export const StatusContext = createContext();

export function StatusProvider({ children }) {
  const [isLive, setIsLive] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  return (
    <StatusContext.Provider
      value={{
        isLive,
        setIsLive,
        isCancelled,
        setIsCancelled,
      }}>
      {children}
    </StatusContext.Provider>
  );
}
