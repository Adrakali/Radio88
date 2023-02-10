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
        className="card relative h-full border border-gray-200 bg-white transition-shadow duration-150 ease-out hover:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)]"
        key={id}>
        {img && (
          <img
            src={img}
            alt={title}
            className="card__img h-[20rem] w-full object-cover"
          />
        )}
        <div className="flex items-center gap-4 p-6">
          {streamUrl && (
            <button
              className="btn flex aspect-square items-center gap-4 rounded-full px-7 hover:bg-accent"
              onClick={handleButtonClick}>
              <i className="fa-solid fa-play -mr-1 hover:text-white"></i>
            </button>
          )}
          <div>
            <h2 className="text-h4">{title}</h2>
            <div className="flex">
              <p className="text-psm font-bold">{`${day} ${starts}`}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
