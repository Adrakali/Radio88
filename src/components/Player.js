import { useState, useEffect, useContext, useRef } from "react";
import { StreamContext } from "../Contexts/StreamContext";

export default function Player() {
  const [volumeIcon, setVolumeIcon] = useState("fa-solid fa-volume-low");
  const [display] = useState(false);
  const {
    playRadio,
    isLoading,
    playLive,
    audio,
    liveStream,
    isPlaying,
    streamSrc,
    streamSrcTitle,
  } = useContext(StreamContext);

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

  // PROGRESS BAR ========================
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [duration, setDuration] = useState(0);
  const progressBar = useRef(null);

  useEffect(() => {
    audio.current.addEventListener("timeupdate", () => {
      setDuration(audio.current.duration);
      setCurrentTime(audio.current.currentTime);
      streamSrc !== liveStream &&
        progressBar.current &&
        (progressBar.current.value = Math.floor(
          (audio.current.currentTime / audio.current.duration) * 100
        ));
    });
  }, [audio?.current?.loadedmetadata, audio?.current?.readyState]);

  function progressBarUpdate() {
    audio.current.currentTime =
      (progressBar.current.value * audio.current.duration) / 100;
  }

  function calcTime(time) {
    const hours = Math.floor(time / 3600);
    time -= hours * 3600;
    const mins = Math.floor(time / 60);
    const formatMins = mins < 10 ? `0${mins}` : mins;
    const secs = Math.floor(time % 60);
    const formatSecs = secs < 10 ? `0${secs}` : secs;
    return `${hours}:${formatMins}:${formatSecs}`;
  }

  return (
    <div className="player border-black lg:border-r-[3px] lg:border-l-[3px] border-t-[3px] text-black h-full col-span-2 lg:col-span-1 flex items-center">
      <button
        onClick={playRadio}
        className="play-box-content-box py-2 px-4 bg-transparent h-full w-[6rem] text-4xl font-medium cursor-pointer border-r-[3px] border-black">
        {isPlaying ? (
          <i className="fa-solid fa-pause"></i>
        ) : (
          <i className="fa-solid fa-play"></i>
        )}
      </button>
      <div className="font-medium h-16 flex justify-between items-center px-4 py-2 flex-grow">
        <div>
          {streamSrc !== liveStream ? (
            <div className="flex-grow">
              <div className="font-bold">Du lyssnar på </div>
              <div className="text-2xl font-sans">{streamSrcTitle}</div>
            </div>
          ) : (
            <div>
              {isPlaying && (
                <div className="bg-accent text-white font-bold text-sm inline py-0 px-1">
                  Du lyssnar LIVE
                </div>
              )}
              <div className="lg:text-lg text-sm hidden lg:block font-bold">{streamSrcTitle}</div>
            </div>
          )}
        </div>

        {/* Progress Bar ========================== */}
        {streamSrc !== liveStream && (
          <div className="player__seek mx-8 flex items-center justify-center w-3/5">
            {isLoading ? (
              <div className="text-left">Laddar...</div>
            ) : (
              <div className="w-full flex items-center">
                <span className="text-sm">{calcTime(currentTime)}</span>
                <input
                  ref={progressBar}
                  defaultValue="0"
                  type="range"
                  className="player__seek w-full mx-2 appearance-none h-1 bg-mbrown cursor-pointer"
                  onChange={progressBarUpdate}
                />
                <span className="text-sm">{calcTime(duration)}</span>
              </div>
            )}
          </div>
        )}
        {streamSrc !== liveStream && (
          <button
            className="text-white btn px-4 py-1 bg-accent shadow-sm"
            onClick={playLive}
            style={{ display: { display } }}>
            Lyssna Live
          </button>
        )}
      </div>

      {/* Volume ========================== */}

      <div className="player__vol-container h-full lg:flex hidden bg-primary box-content-box p-2 pr-4 text-black items-center border-l-[3px] border-black">
        <button className="volume-btn w-6 text-left text-light text-lg bg-transparent cursor-pointer p-2 mr-2">
          <i className={volumeIcon}></i>
        </button>
        <input
          className="appearance-none h-1 bg-mbrown cursor-pointer"
          type="range"
          onChange={changeVolume}
        />
      </div>
    </div>
  );
}
