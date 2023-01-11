import React from "react";
import { Link } from "react-router-dom";
import Player from "./Player";

export default function Nav() {
  return (
    <nav className="sticky z-50 top-0 right-0 left-0">
      <div className="nav-content container">
        <div id="nav__logo-wrapper">
          <Link to="/">
            <img src="/images/radio88-hemsida.png" id="nav__logo" alt="logo" />
          </Link>
        </div>
        <ul className="nav__links">
          <li>
            <Link to="/program">Program</Link>
          </li>
          <li>
            <Link to="/kontakt">Kontakt</Link>
          </li>
          <li>
            <Link to="/tabla">Tablå</Link>
          </li>
        </ul>
        <Player />
      </div>
    </nav>
  );
}
