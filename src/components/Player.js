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
    <div className="player">
      <button onClick={playRadio} className="play-btn">
        {isPlaying ? (
          <i className="fa-solid fa-pause"></i>
        ) : (
          <i className="fa-solid fa-play"></i>
        )}
      </button>
      <div className="player__title flex">
        <div className="secondary-txt-clr">
          {streamSrc !== liveStream ? (
            <div className="flex-grow">
              <div>Du lyssnar på </div>
              <div className="text-lg text-[var(--light)]">
                {streamSrcTitle}
              </div>
            </div>
          ) : (
            <div>
              <div className="">Du lyssnar LIVE</div>
              <div className="text-lg text-[var(--light)]">
                {streamSrcTitle}
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar ========================== */}
        {streamSrc !== liveStream && (
          <div className="player__seek mx-8 flex items-center justify-center w-3/5">
            {isLoading ? (
              <div className="text-left">Loading...</div>
            ) : (
              <div className="w-full flex items-center">
                <span className="text-sm text-[var(--light)]">
                  {calcTime(currentTime)}
                </span>
                <input
                  ref={progressBar}
                  defaultValue="0"
                  type="range"
                  className="player__seek w-full mx-2"
                  onChange={progressBarUpdate}
                />
                <span className="text-sm text-[var(--light)]">
                  {calcTime(duration)}
                </span>
              </div>
            )}
          </div>
        )}
        {streamSrc !== liveStream && (
          <button
            className="player__live-button btn px-4 py-1"
            onClick={playLive}
            style={{ display: { display } }}>
            Lyssna Live
          </button>
        )}
      </div>

      {/* Volume ========================== */}

      <div className="player__vol-container">
        <button className="volume-btn">
          <i className={volumeIcon}></i>
        </button>
        <input id="player__vol" type="range" onChange={changeVolume} />
      </div>
    </div>
  );
}
