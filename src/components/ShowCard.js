import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StreamContext } from "../Contexts/StreamContext";

export default function ShowCard(props) {
  const { setStreamSrc, setStreamSrcTitle } = useContext(StreamContext);
  const handleButtonClick = (event) => {
    setStreamSrc(props.streamUrl);
    setStreamSrcTitle(props.title);
    event.preventDefault();
  };
  return (
    <Link to={`/program/${props.slug}`}>
      <article className="card relative h-[550px]" key={props.id}>
        <img src={props.img} alt={props.title} className="card__img mb-4" />
        <h2 className="text-3xl">{props.title}</h2>
        <div className="flex">
          <p className="text-base mb-4 font-bold text-gray-600">
            {`${props.day.charAt(0).toUpperCase() + props.day.slice(1)}ar ${
              props.starts
            }`}
          </p>
        </div>
        <p className="pb-24 text-lg truncate">{props.desc}</p>
        <button
          className="btn text-base w-full cursor-pointer py-8 absolute bottom-0 left-0"
          onClick={handleButtonClick}>
          Lyssna på senaste avsnittet av {props.title}
        </button>
      </article>
    </Link>
  );
}
