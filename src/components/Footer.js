import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary px-8 py-16 text-black">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-8 sm:flex-row">
        <div className="sm:basis-3/5">
          <Link to="/">
            <img
              src="/images/radio88-hemsida.png"
              id="nav__logo"
              alt="logo"
              className="w-40"
            />
          </Link>
        </div>

        <div className="sm:basis-1/5">
          <h3 className="mb-4 text-p">Kontakta oss</h3>
          <ul>
            <li>
              <a href="tel:+4631261090" className="flex items-center">
                <i className="fa-sharp fa-solid fa-phone mr-4"></i>
                <p className="font-bold tracking-tight">031—26 10 90</p>
              </a>
            </li>
            <li>
              <a href="mailto:info@radio88.se" className="flex items-center">
                <i className="fa-sharp fa-solid fa-envelope mr-4"></i>
                <p className="font-bold tracking-tight">info@radio88.se</p>
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-end sm:basis-1/5">
          <h3 className="mb-4 text-p">Följ oss</h3>
          <ul className="flex gap-4">
            <a
              href="https://www.facebook.com/radio88.se/"
              target="_blank"
              rel="noopener noreferrer">
              <i class="fa-brands fa-square-facebook text-h3"></i>
            </a>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
