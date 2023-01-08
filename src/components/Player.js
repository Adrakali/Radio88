import React from "react";
import useRadio from "../Hooks/useRadio";

export default function Player() {
  const {
    streamSrc,
    streamSrcTitle,
    display,
    playRadio,
    isPlaying,
    changeVolume,
    volumeIcon,
  } = useRadio();

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
        <p className="secondary-txt-clr">{streamSrcTitle}</p>
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
