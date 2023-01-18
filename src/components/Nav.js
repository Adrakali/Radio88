import React from "react";
import { Link } from "react-router-dom";
import Player from "./Player";

export default function Nav() {
  return (
    <nav className="sticky bg-primary text-black border-b-[3px] border-b-black z-50 top-0 right-0 left-0">
      <div className="container grid grid-cols-7 gap-0 border-r-[3px] border-r-black border-l-[3px] border-l-black overflow-hidden">
        <div className="flex justify-center items-center bg-primary py-6 px-8 row-span-2 auto-rows-max  border-r-[3px] border-black">
          <Link to="/">
            <img
              src="/images/radio88-hemsida.png"
              id="nav__logo"
              alt="logo"
              className="max-w-[150px] -ml-2"
            />
          </Link>
        </div>
        <ul className="nav__links font-sans text-2xl flex justify-end items-center col-span-6 px-4 rounded-md">
          <li className="pl-5">
            <Link to="/program">Program</Link>
          </li>
          <li className="pl-5">
            <Link to="/kontakt">Kontakt</Link>
          </li>
          <li className="pl-5">
            <Link to="/tabla">Tablå</Link>
          </li>
        </ul>
        <Player />
      </div>
    </nav>
  );
}
