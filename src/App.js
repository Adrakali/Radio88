import "./styles/App.css";
import React, { createContext, useState, useRef } from "react";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import ShowList from "./Shows";
import ShowDetails from "./Show";
import AudioPlayer from "./AudioPlayer";

export const StreamContext = createContext();

function App() {
  const [stream, setStream] = useState("https://streaming.943.se/radio88");
  const [streamTitle, setStreamTitle] = useState(
    "Vi spelar musiken som du glömt att du kommer ihåg"
  );

  // UPDTADE STREAM ========================
  const audio = useRef(new Audio(stream));
  const handleSourceChange = async (stream, title) => {
    setStream(stream);
    setStreamTitle(title);
    await audio.current.load();
    audio.current.play();
  };

  console.log(stream, streamTitle);

  return (
    <BrowserRouter>
      <StreamContext.Provider
        value={{
          stream,
          setStream,
          streamTitle,
          setStreamTitle,
          handleSourceChange,
          audio,
        }}
      >
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="program" element={<ShowList />} />
            <Route path="kontakt" element={<Contact />} />
            <Route path="player" element={<AudioPlayer />} />
            <Route path="/program/:id" element={<ShowDetails />} />
          </Routes>
        </main>
      </StreamContext.Provider>
    </BrowserRouter>
  );
}
export default App;
