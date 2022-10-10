import "./styles/App.css";
import React, { createContext, useState } from "react";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import ShowList from "./ShowList";
import ShowDetails from "./ShowDetails";

export const StreamContext = createContext("https://streaming.943.se/radio88");

function App() {
  
  const [stream] = useState("https://streaming.943.se/radio88");
  
  return (
    <BrowserRouter>
      <StreamContext.Provider value={stream}>
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
