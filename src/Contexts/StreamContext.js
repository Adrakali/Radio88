import { createContext, useState } from "react";

export const StreamContext = createContext();

export function StreamProvider({ children }) {
  const [streamSrc, setStreamSrc] = useState(
    "https://streaming.943.se/radio88"
  );
  const [streamSrcTitle, setStreamSrcTitle] = useState(
    "Vi spelar musiken som du glömt att du kommer ihåg"
  );
  return (
    <StreamContext.Provider
      value={{ streamSrc, setStreamSrc, streamSrcTitle, setStreamSrcTitle }}>
      {children}
    </StreamContext.Provider>
  );
}
