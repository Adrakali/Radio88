import "./styles/App.css";
import React, { useState } from "react";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import Shows from "./Shows";
import Show from "./Show";
import Schedule from "./Schedule";
import { StreamContext } from "./Contexts/StreamContext";
import { TimeProvider } from "./Contexts/TimeContext";

function App() {
  const [streamSrc, setStreamSrc] = useState(
    "https://streaming.943.se/radio88"
  );
  const [streamSrcTitle, setStreamSrcTitle] = useState(
    "Vi spelar musiken som du glömt att du kommer ihåg"
  );

  return (
    <TimeProvider>
      <StreamContext.Provider
        value={{ streamSrc, setStreamSrc, streamSrcTitle, setStreamSrcTitle }}>
        <BrowserRouter>
          <Nav />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="program" element={<Shows />} />
              <Route path="kontakt" element={<Contact />} />
              <Route path="tabla" element={<Schedule />} />
              <Route path="/program/:id" element={<Show />} />
            </Routes>
          </main>
        </BrowserRouter>
      </StreamContext.Provider>
    </TimeProvider>
  );
}
export default App;
