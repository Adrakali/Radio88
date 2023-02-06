import React from "react";

function FacebookCard({ from, message, image, link, created }) {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <article className="w-full border border-gray-200 bg-white">
        <div>
          <div className={image ? "p-4" : "px-4 pt-4"}>
            <h2>{from}</h2>
            <p>{created}</p>
          </div>
          <div>
            <img src={image} className="w-full" alt="Programbild"/>
          </div>
          {message && <p className="p-4">{message}</p>}
        </div>
      </article>
    </a>
  );
}

export default FacebookCard;
