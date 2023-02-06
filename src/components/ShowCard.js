import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StreamContext } from "../Contexts/StreamContext";

export default function ShowCard({
  streamUrl,
  title,
  day,
  starts,
  desc,
  img,
  slug,
  id,
}) {
  const { setStreamSrc, setStreamSrcTitle } = useContext(StreamContext);
  const handleButtonClick = (event) => {
    setStreamSrc(streamUrl);
    setStreamSrcTitle(title);
    event.preventDefault();
  };

  return (
    <Link to={`/program/${slug}`}>
      <article
        className="card relative h-full border border-gray-200 bg-white"
        key={id}>
        {img && (
          <img
            src={img}
            alt={title}
            className="card__img h-[20rem] w-full object-cover"
          />
        )}
        <div className="p-6">
          <h2 className="text-3xl">{title}</h2>
          <div className="flex">
            <p className="mb-4 text-base font-bold text-gray-600">
              {`${day}ar ${starts}`}
            </p>
          </div>
          <p className="prose truncate pb-8 text-lg">
            {desc}
          </p>
          {streamUrl && (
            <button
              className="btn mt-auto flex items-center gap-4 rounded-full bg-primary py-2 px-6 hover:bg-accent hover:text-white"
              onClick={handleButtonClick}>
              <i className="fa-solid fa-play"></i>
              Lyssna på {title}
            </button>
          )}
        </div>
      </article>
    </Link>
  );
}
