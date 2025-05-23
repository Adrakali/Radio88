import "./styles/Global.css";
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
import Footer from "./Components/Footer";
import ScrollToTop from "./scrollToTop";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
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
            <Footer />
          </StreamProvider>
        </TimeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
export default App;
