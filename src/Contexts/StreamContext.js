import { createContext, useState, useRef, useEffect } from "react";

export const StreamContext = createContext();

export function StreamProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [streamSrc, setStreamSrc] = useState(
    "https://streaming.943.se/radio88"
  );
  const [streamSrcTitle, setStreamSrcTitle] = useState(
    "Radio 88 Partille"
  );

  const liveStream = "https://streaming.943.se/radio88";

  const audio = useRef(new Audio());

  useEffect(() => {
    audio.current.src = streamSrc;
    audio.current.load();
    streamSrc !== liveStream
      ? setIsPlaying(true)
      : setStreamSrcTitle("Radio 88 Partille");
  }, [streamSrc]);

  useEffect(() => {
    audio.current.addEventListener("loadstart", () => setIsLoading(true));
    audio.current.addEventListener("canplay", () => setIsLoading(false));
  }, [audio]);


  // PLAY RADIO ========================
  function playRadio() {
    setStreamSrc(audio.current.src);
    setIsPlaying((play) => !play);
  }

  function playLive() {
    setStreamSrc(liveStream);
    setIsPlaying(true);
  }

  useEffect(() => {
    isPlaying ? audio.current.play() : audio.current.pause();
  }, [isPlaying, streamSrc]);

  return (
    <StreamContext.Provider
      value={{
        isLoading,
        playRadio,
        playLive,
        audio,
        liveStream,
        isPlaying,
        setIsPlaying,
        isLive,
        setIsLive,
        isCancelled,
        setIsCancelled,
        streamSrc,
        setStreamSrc,
        streamSrcTitle,
        setStreamSrcTitle,
      }}>
      {children}
    </StreamContext.Provider>
  );
}
