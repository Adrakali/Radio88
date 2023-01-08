import React, { useEffect, useState, useRef, useContext } from "react";
import { StreamContext } from "../App";

export default function Player() {
  const { stream, setStream, setStreamTitle, streamTitle, handleSourceChange, audio } = useContext(StreamContext);
  

  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeIcon, setVolumeIcon] = useState("fa-solid fa-volume-low");
  const [display, setDisplay] = useState(false);
  
  // PLAY RADIO ========================
  
  function playRadio() {
    setIsPlaying((play) => !play);
  }
  useEffect(() => {
    isPlaying ? audio.current.play() : audio.current.pause();
  }, [isPlaying, stream]);

  // DISPLAY ========================

  useEffect(() => {
    if (stream !== "https://streaming.943.se/radio88") {
      setDisplay(true);
    }
  }, [stream]);
  
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

  return (
    <div className="player">
      <button onClick={playRadio} className="play-btn">
        {isPlaying ? (
          <i className="fa-solid fa-pause"></i>
        ) : (
          <i className="fa-solid fa-play"></i>
        )}
      </button>
      <div className="player__title">
        <p className="secondary-txt-clr">{streamTitle}</p>
        <button
          className="player__live-button"
          onClick={playRadio}
          style={{ display: { display } }}
        >
          Lyssna Live
        </button>
      </div>
      <div className="player__vol-container">
        <button className="volume-btn">
          <i className={volumeIcon}></i>
        </button>
        <input id="player__vol" type="range" onChange={changeVolume} />
      </div>
    </div>
  );
}
