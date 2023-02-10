import React from "react";
import { format } from "date-fns";

function FacebookCard({ from, message, image, link, created }) {
  var posted = format(new Date(created), "dd MMM yyyy 'kl' HH:mm");

  return (
    <a href={link} target="_blank" rel="noreferrer">
      <article className="w-full border border-gray-200 bg-white">
        <div>
          <div className={image ? "p-8" : "px-8 pt-8"}>
            <div className="flex items-center">
              <img
                src="./images/fb-logo.jpeg"
                alt="Facebook"
                className="mr-4 aspect-square w-14 rounded-full"
              />
              <div>
                <h2 className="mb-1 text-h5">Radio 88</h2>
                <p className="text-psm leading-none">{posted}</p>
              </div>
            </div>
          </div>

          <div>
            <img src={image} className="w-full" alt="Programbild" />
          </div>
          {message && <p className="p-8">{message}</p>}
        </div>
      </article>
    </a>
  );
}

export default FacebookCard;
