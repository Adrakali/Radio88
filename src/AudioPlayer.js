import React, { useRef, useState } from "react";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [audioSource, setAudioSource] = useState(
    "https://streaming.943.se/radio88"
  );

  const handleSourceChange = async (source) => {
    setAudioSource(source);
    await audioRef.current.load();
    audioRef.current.play();
  };

  return (
    <div>
      <audio ref={audioRef} src={audioSource} controls />
      <button
        onClick={() =>
          handleSourceChange(
            "https://radio88.se/wp-content/programs/afternoontea.mp3"
          )
        }
      >
        Play Source 1
      </button>
      <button
        onClick={() =>
          handleSourceChange("https://radio88.se/wp-content/programs/lasse.mp3")
        }
      >
        Play Source 2
      </button>
    </div>
  );
};

export default AudioPlayer;
