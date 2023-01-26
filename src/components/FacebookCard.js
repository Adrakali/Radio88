import React from "react";

function FacebookCard({ from, message, image, link, created }) {
  return (
    <a href={link} target="_blank">
      <article className="bg-white w-full">
        <div className="grid md:grid-cols-fbcard gap-6">
          <div>
            <img src={image} className="w-full" />
          </div>
          <div>
            <h2>{from}</h2>
            <p>{created}</p>
            <p>{message}</p>
          </div>
        </div>
      </article>
    </a>
  );
}

export default FacebookCard;
