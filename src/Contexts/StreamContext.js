import { createContext } from "react";

export const StreamContext = createContext({
  streamSrc: "https://streaming.943.se/radio88",
  streamSrcTitle: "Vi spelar musiken som du glömt att du kommer ihåg",
  setStreamSrc: () => {},
  setStreamSrcTitle: () => {},
});
