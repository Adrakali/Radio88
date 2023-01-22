import { useState, useEffect, useContext, useRef } from "react";
import { StreamContext } from "../Contexts/StreamContext";

export default function Player() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeIcon, setVolumeIcon] = useState("fa-solid fa-volume-low");
  const [display] = useState(false);
  const { streamSrc, setStreamSrc, streamSrcTitle, setStreamSrcTitle } =
    useContext(StreamContext);
  const liveStream = "https://streaming.943.se/radio88";

  const audio = useRef(new Audio());

  useEffect(() => {
    audio.current.src = streamSrc;
    audio.current.load();
    streamSrc !== liveStream
      ? setIsPlaying(true)
      : setStreamSrcTitle("Vi spelar musiken som du glömt att du kommer ihåg");
  }, [streamSrc]);

  useEffect(() => {
    audio.current.readyState !== 4 ? setIsLoading(true) : setIsLoading(false);
  }, [streamSrc, audio.current.readyState]);

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
    <div className="player border-black border-t-[3px] text-black h-full col-span-6 flex items-center">
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
              <div className="text-primary ">Du lyssnar på </div>
              <div className="text-lg font-bold">{streamSrcTitle}</div>
            </div>
          ) : (
            <div>
              {isPlaying && (
                <div className="bg-accent text-white font-bold inline py-1 px-2">
                  Du lyssnar LIVE
                </div>
              )}
              <div className="text-lg font-bold">{streamSrcTitle}</div>
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
                  className="player__seek w-full mx-2 appearance-none h-1 rounded cursor-pointer"
                  onChange={progressBarUpdate}
                />
                <span className="text-sm">{calcTime(duration)}</span>
              </div>
            )}
          </div>
        )}
        {streamSrc !== liveStream && (
          <button
            className="player__live-button text-black btn px-4 py-1"
            onClick={playLive}
            style={{ display: { display } }}>
            Lyssna Live
          </button>
        )}
      </div>

      {/* Volume ========================== */}

      <div className="player__vol-container h-full bg-primary box-content-box p-2 pr-4 text-black flex items-center border-l-[3px] border-black">
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
