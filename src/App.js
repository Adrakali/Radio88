import "./styles/App.css";
import React from "react";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import ShowList from "./ShowList";
import ShowDetails from "./ShowDetails";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="program" element={<ShowList />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/program/:id" element={<ShowDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
