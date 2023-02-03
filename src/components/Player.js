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
    <div className="player mx-auto flex h-16 max-w-[1380px] items-center text-white lg:h-20">
      <button
        onClick={playRadio}
        className="play-box-content-box h-full w-16 cursor-pointer bg-[#1a1a1a] text-4xl font-medium hover:bg-primary hover:text-accent lg:w-[6rem]">
        {isPlaying ? (
          <i className="fa-solid fa-pause"></i>
        ) : (
          <i className="fa-solid fa-play pl-1"></i>
        )}
      </button>
      <div className="flex-grow items-center justify-between px-4 font-medium sm:flex sm:px-6">
        <div>
          {streamSrc !== liveStream ? (
            <div className="flex flex-grow sm:flex-col">
              <div className="mr-1 text-base font-bold sm:mr-0 sm:text-primary md:block md:text-base">
                Du lyssnar på{" "}
              </div>
              <div className="text-base font-bold sm:font-sans sm:text-2xl sm:font-normal">
                {streamSrcTitle}
              </div>
            </div>
          ) : (
            <div>
              {isPlaying && (
                <div className="inline bg-accent py-0 px-1 text-xs font-bold text-white sm:text-sm">
                  Du lyssnar LIVE
                </div>
              )}
              <div className="font-sans text-sm sm:text-2xl lg:block">
                {streamSrcTitle}
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar ========================== */}
        {streamSrc !== liveStream && (
          <div className="player__seek flex flex-grow items-center justify-center sm:mx-8 sm:w-3/5">
            {isLoading ? (
              <div className="text-left">Laddar...</div>
            ) : (
              <div className="flex w-full items-center">
                <span className="text-sm">{calcTime(currentTime)}</span>
                <input
                  ref={progressBar}
                  defaultValue="0"
                  type="range"
                  className="player__seek mx-2 h-1 w-full cursor-pointer appearance-none bg-[#3f3f3f]"
                  onChange={progressBarUpdate}
                />
                <span className="text-sm">{calcTime(duration)}</span>
              </div>
            )}
          </div>
        )}
        {streamSrc !== liveStream && (
          <button
            className="btn md:text-md absolute top-4 right-14 bg-accent px-4 py-1 text-sm text-white sm:right-16 md:right-[5rem] lg:static"
            onClick={playLive}
            style={{ display: { display } }}>
            Lyssna Live
          </button>
        )}
      </div>

      {/* Volume ========================== */}

      <div className="player__vol hidden h-full items-center border-x border-[#3f3f3f] px-5 text-white lg:flex">
        <button className="volume-btn text-light mr-2 w-7 cursor-pointer bg-transparent text-left text-lg">
          <i className={volumeIcon}></i>
        </button>
        <input
          className="h-1 cursor-pointer appearance-none bg-[#3f3f3f]"
          type="range"
          onChange={changeVolume}
        />
      </div>
    </div>
  );
}
