import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Player from "./Player";
import { StreamContext } from "../Contexts/StreamContext";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [display] = useState("none");
  const { playLive, streamSrc, liveStream } = useContext(StreamContext);

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
    <header className="sticky top-0 right-0 left-0 z-50 bg-black">
      <div className="z-10 flex h-16 items-center bg-primary p-2 lg:h-20">
        <div className="mx-auto flex w-full max-w-[1380px] items-center justify-between">
          <Link to="/" className="w-20 lg:w-32">
            <img
              src="/images/radio88-hemsida.png"
              id="nav__logo"
              alt="logo"
              className="w-full pl-2"
            />
          </Link>
          <div class="flex items-center">
            {streamSrc !== liveStream && (
              <button
                className="btn md:text-md bg-accent px-4 py-2 lg:hidden text-pxs text-primary sm:right-16 md:right-[5rem]"
                onClick={playLive}
                style={{ display: { display } }}>
                Lyssna Live
              </button>
            )}
            <nav
              onClick={toggleMenu}
              className="nav flex cursor-pointer items-center justify-end">
              <li className="fa-solid fa-bars pointer-events-none px-2 text-2xl sm:px-4 md:px-6 lg:px-10 xl:hidden"></li>
              <ul
                className={`${isOpen ? "flex-col" : "hidden"}
                 absolute top-full left-0 w-full items-center justify-end bg-primary
                font-sans text-2xl xl:relative xl:top-0 xl:flex
                xl:h-full xl:gap-2`}>
                <Link
                  to="/"
                  className="flex h-full w-full cursor-pointer items-center border-b border-primary-500 p-4 ease-out hover:bg-accent hover:text-primary hover:transition-colors xl:w-auto xl:border-none xl:px-4">
                  <li className="flex h-full items-center">Hem</li>
                </Link>
                <Link
                  to="/tabla"
                  className="flex h-full w-full cursor-pointer items-center border-b border-primary-500 p-4 hover:bg-accent hover:text-primary xl:w-auto xl:border-none xl:px-4">
                  <li className="flex h-full items-center">Tablå</li>
                </Link>
                <Link
                  to="/program"
                  className="flex h-full w-full cursor-pointer items-center border-b border-primary-500 p-4 hover:bg-accent hover:text-primary xl:w-auto xl:border-none xl:px-4">
                  <li className="flex h-full items-center">Program</li>
                </Link>
                <Link
                  to="/om"
                  className="flex h-full w-full cursor-pointer items-center border-b border-primary-500 p-4 hover:bg-accent hover:text-primary xl:w-auto xl:border-none xl:px-4">
                  <li className="hover:bg-accent hover:text-primary">Om oss</li>
                </Link>
                <Link
                  to="/kontakt"
                  className="flex h-full w-full cursor-pointer items-center border-b border-primary-500 p-4 hover:bg-accent hover:text-primary xl:w-auto xl:border-none xl:px-4">
                  <li className="flex h-full items-center">Kontakt</li>
                </Link>
                <Link
                  to="/annonsera"
                  className="flex h-full w-full cursor-pointer items-center border-b border-primary-500 p-4 hover:bg-accent hover:text-primary xl:w-auto xl:border-none xl:px-4">
                  <li className="flex h-full items-center">Annonsera</li>
                </Link>
                <Link
                  to="/supporterklubben"
                  className="flex h-full w-full cursor-pointer items-center border-b border-primary-500 p-4 hover:bg-accent hover:text-primary xl:w-auto xl:border-none xl:px-4">
                  <li className="flex h-full items-center">Supporterklubben</li>
                </Link>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Player />
    </header>
  );
}
