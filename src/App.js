import "./Styles/Global.css";
import React from "react";
import Nav from "./Components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Shows from "./Pages/Shows";
import Show from "./Pages/Show";
import Schedule from "./Pages/Schedule";
import { StreamProvider } from "./Contexts/StreamContext";
import { TimeProvider } from "./Contexts/TimeContext";
import About from "./Pages/About";
import Ads from "./Pages/Ads";
import Support from "./Pages/Support";

function App() {
  return (
    <BrowserRouter>
      <TimeProvider>
        <StreamProvider>
          <Nav />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="program" element={<Shows />} />
              <Route path="kontakt" element={<Contact />} />
              <Route path="tabla" element={<Schedule />} />
              <Route path="om" element={<About />} />
              <Route path="annonsera" element={<Ads />} />
              <Route path="supporterklubben" element={<Support />} />
              <Route path="/program/:id" element={<Show />} />
            </Routes>
          </main>
        </StreamProvider>
      </TimeProvider>
    </BrowserRouter>
  );
}
export default App;
