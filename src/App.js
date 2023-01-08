import "./styles/App.css";
import React from "react";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import Shows from "./Shows";
import Show from "./Show";
import AudioPlayer from "./AudioPlayer";

function App() {
  return (
    <BrowserRouter>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="program" element={<Shows />} />
            <Route path="kontakt" element={<Contact />} />
            <Route path="player" element={<AudioPlayer />} />
            <Route path="/program/:id" element={<Show />} />
          </Routes>
        </main>
    </BrowserRouter>
  );
}
export default App;
