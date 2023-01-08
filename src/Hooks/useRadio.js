import { useState, useEffect, useRef } from "react";

function useRadio() {
  const [streamSrc, setStreamSrc] = useState(
    "https://streaming.943.se/radio88"
  );
  const [streamSrcTitle, setStreamSrcTitle] = useState(
    "Vi spelar musiken som du glömt att du kommer ihåg"
  );

  const audio = useRef(new Audio(streamSrc));

  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeIcon, setVolumeIcon] = useState("fa-solid fa-volume-low");
  const [display, setDisplay] = useState(false);

  // PLAY RADIO ========================

  function playRadio() {
    setIsPlaying((play) => !play);
  }
  useEffect(() => {
    isPlaying ? audio.current.play() : audio.current.pause();
  }, [isPlaying, streamSrc]);

  // DISPLAY ========================

  useEffect(() => {
    if (streamSrc !== "https://streaming.943.se/radio88") {
      setDisplay(true);
    }
  }, [streamSrc]);

  // VOLUME ========================

  function changeVolume(e) {
    audio.current.volume = e.currentTarget.value / 100;
    adjustVolumeIcon(audio.current.volume);
  }

  function adjustVolumeIcon(volume) {
    if (volume >= 0.75) {
      setVolumeIcon("fa-solid fa-volume-high");
    }
    if (volume < 0.75 && volume >= 0.2) {
      setVolumeIcon("fa-solid fa-volume-low");
    }
    if (volume < 0.2 && volume > 0) {
      setVolumeIcon("fa-solid fa-volume-off");
    }
    if (volume === 0) {
      setVolumeIcon("fa-solid fa-volume-xmark");
    }
  }
  return {
    streamSrc,
    streamSrcTitle,
    display,
    playRadio,
    isPlaying,
    changeVolume,
    volumeIcon,
  };
}

export default useRadio;
