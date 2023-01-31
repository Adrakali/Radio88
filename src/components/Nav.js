import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Player from "./Player";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  // if e.target is not nav__links, then close menu
  useEffect(() => {
    const closeMenu = (e) => {
      if (e.target !== document.querySelector(".nav")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="bg-black sticky top-0 right-0 left-0 z-50">
      <Player />
      <div className="border z-10 bg-primary border-primary-500">
        <div className="xl:container flex justify-between">
          <Link to="/" className="w-40">
            <img
              src="/images/radio88-hemsida.png"
              id="nav__logo"
              alt="logo"
              className="max-h-24 p-2 h-full"
            />
          </Link>
          <nav
            onClick={toggleMenu}
            className="nav cursor-pointer flex items-center justify-end">
            <li className="fa-solid fa-bars px-10 text-2xl xl:hidden pointer-events-none"></li>
            <ul
              className={`${isOpen ? "flex-col" : "hidden"}
               bg-primary font-sans w-full text-2xl xl:h-full top-full xl:relative
              xl:top-0 left-0 absolute xl:flex xl:gap-6
              justify-end items-center`}>
              <Link
                to="/"
                className="xl:w-auto w-full cursor-pointer h-full xl:px-4 p-4 flex items-center hover:text-primary hover:bg-accent">
                <li className="h-full flex items-center">Hem</li>
              </Link>
              <Link
                to="/tabla"
                className="xl:w-auto w-full cursor-pointer h-full xl:px-4 p-4 flex items-center hover:text-primary hover:bg-accent">
                <li className="h-full flex items-center">Tablå</li>
              </Link>
              <Link
                to="/program"
                className="xl:w-auto w-full cursor-pointer h-full xl:px-4 p-4 flex items-center hover:text-primary hover:bg-accent">
                <li className="h-full flex items-center">Program</li>
              </Link>
              <Link
                to="/om"
                className="xl:w-auto w-full cursor-pointer h-full xl:px-4 p-4 flex items-center hover:text-primary hover:bg-accent">
                <li className="hover:text-primary hover:bg-accent">Om oss</li>
              </Link>
              <Link
                to="/kontakt"
                className="xl:w-auto w-full cursor-pointer h-full xl:px-4 p-4 flex items-center hover:text-primary hover:bg-accent">
                <li className="h-full flex items-center">Kontakt</li>
              </Link>
              <Link
                to="/annonsera"
                className="xl:w-auto w-full cursor-pointer h-full xl:px-4 p-4 flex items-center hover:text-primary hover:bg-accent">
                <li className="h-full flex items-center">Annonsera</li>
              </Link>
              <Link
                to="/support"
                className="xl:w-auto w-full cursor-pointer h-full xl:px-4 p-4 flex items-center hover:text-primary hover:bg-accent">
                <li className="h-full flex items-center">Supporterklubben</li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
