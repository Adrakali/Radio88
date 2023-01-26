import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Player from "./Player";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
    console.log(isOpen);
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

  return (
    <header className="bg-primary border-b-[3px] border-black sticky top-0 right-0 left-0 z-50">
      <div className="max-w-[1536px] m-auto grid grid-cols-header lg:grid-rows-auto grid-rows-[1fr 1fr]  border-l-[3px] border-black">
        <Link
          to="/"
          className="h-full row-span-1 lg:row-span-2 flex items-center">
          <img
            src="/images/radio88-hemsida.png"
            id="nav__logo"
            alt="logo"
            className="max-h-20 px-2 h-full"
          />
        </Link>

        <nav
          onClick={toggleMenu}
          className="nav cursor-pointer flex items-center justify-end">
          <li className="fa-solid fa-bars px-10 text-2xl lg:hidden pointer-events-none"></li>
          <ul
            className={`${isOpen ? "block" : "hidden"}
             font-sans w-full text-2xl top-full lg:relative
            lg:top-0 absolute lg:flex lg:gap-6 bg-black text-white 
            justify-end items-center col-span-6 px-4`}>
            <Link to="/" className="lg:w-auto w-full">
              <li className="mt-1 -mb-1 hover:bg-primary cursor-pointer p-2">
                Hem
              </li>
            </Link>
            <Link to="/tabla" className="lg:w-auto w-full">
              <li className="mt-1 -mb-1 hover:bg-primary cursor-pointer p-2">
                Tablå
              </li>
            </Link>
            <Link to="/program" className="lg:w-auto w-full">
              <li className="mt-1 -mb-1 hover:bg-primary cursor-pointer p-2">
                Program
              </li>
            </Link>
            <Link to="/om" className="lg:w-auto w-full">
              <li className="mt-1 -mb-1 hover:bg-primary cursor-pointer p-2">
                Om oss
              </li>
            </Link>
            <Link to="/kontakt" className="lg:w-auto w-full">
              <li className="mt-1 -mb-1 hover:bg-primary cursor-pointer p-2">
                Kontakt
              </li>
            </Link>
            <Link to="/annonsera" className="lg:w-auto w-full">
              <li className="mt-1 -mb-1 hover:bg-primary cursor-pointer p-2">
                Annonsera
              </li>
            </Link>
            <Link to="/support" className="lg:w-auto w-full">
              <li className="mt-1 -mb-1 hover:bg-primary cursor-pointer p-2">
                Supporterklubben
              </li>
            </Link>
          </ul>
        </nav>

        <Player />
      </div>
    </header>
  );
}
