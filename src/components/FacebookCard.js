import React from "react";

function FacebookCard({ from, message, image, link, created }) {
  return (
    <a href={link} target="_blank">
      <article className="bg-white w-full mb-10">
        <div className="grid grid-cols-2 gap-6">
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
