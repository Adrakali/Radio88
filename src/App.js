import "./styles/App.css";
import React, { createContext, useState } from "react";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import ShowList from "./Shows";
import ShowDetails from "./Show";

export const StreamContext = createContext({
  stream: "https://streaming.943.se/radio88",
  streamTitle: "Vi spelar musiken som du glömt att du kommer ihåg",
});

function App() {
  const [stream, setStream] = useState("https://streaming.943.se/radio88");
  const [streamTitle, setStreamTitle] = useState(
    "Vi spelar musiken som du glömt att du kommer ihåg"
  );
  console.log(stream, streamTitle);
  return (
    <BrowserRouter>
      <StreamContext.Provider
        value={{ stream, setStream, streamTitle, setStreamTitle }}
      >
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="program" element={<ShowList />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="/program/:id" element={<ShowDetails />} />
        </Routes>
      </StreamContext.Provider>
    </BrowserRouter>
  );
}
export default App;
