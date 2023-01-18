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
        className="card relative shadow-sm bg-white border-black border-[3px]"
        key={id}>
        {img && (
          <img
            src={img}
            alt={title}
            className="card__img w-full object-cover h-[20rem]"
          />
        )}
        <div className="p-6">
          <h2 className="text-3xl">{title}</h2>
          <div className="flex">
            <p className="text-base mb-4 font-bold text-gray-600">
              {`${day}ar ${starts}`}
            </p>
          </div>
          <p className="pb-8 text-lg truncate">{desc}</p>
          {streamUrl && (
            <button
              className="btn text-base cursor-pointer px-4 py-2"
              onClick={handleButtonClick}>
              Lyssna på senaste avsnittet av {title}
            </button>
          )}
        </div>
      </article>
    </Link>
  );
}
