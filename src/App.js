import "./Styles/Global.css";
import React from "react";
import Nav from "./Components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import Shows from "./Shows";
import Show from "./Show";
import Schedule from "./Schedule";
import { StreamProvider } from "./Contexts/StreamContext";
import { TimeProvider } from "./Contexts/TimeContext";

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
              <Route path="/program/:id" element={<Show />} />
            </Routes>
          </main>
        </StreamProvider>
      </TimeProvider>
    </BrowserRouter>
  );
}
export default App;
