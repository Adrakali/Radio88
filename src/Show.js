import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useContentful from "./Hooks/useContentful";
import { StreamContext } from "./Contexts/StreamContext";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useContentful();
  const { setStreamSrc, setStreamSrcTitle } = useContext(StreamContext);

  return (
    <section>
      <div className="container">
        <p
          className="pointer"
          onClick={() => {
            navigate("/program");
          }}>
          Tillbaka
        </p>
        {loading && <div>Laddar sidan...</div>}
        {error && <div>{error}</div>}
        {data &&
          data
            .filter((show) => show.fields.slug === id)
            .map((filteredShow) => {
              return (
                <article
                  key={filteredShow.sys.id}
                  className="flex gap-16 justify-center">
                  {filteredShow.fields.image && (
                    <div className="shadow-[16px_16px_0px_0px_#000000] max-w-[400px]">
                      <img
                        src={filteredShow.fields.image.fields.file.url}
                        alt={`${filteredShow.fields.title} programbild`}
                        className="showdetails__img h-full object-cover border-black border-4"
                      />
                    </div>
                  )}
                  <div>
                    <h1 className="mb-0">{filteredShow.fields.title}</h1>
                    <p className="font-bold text-xl">
                      {filteredShow.fields.day} kl.{" "}
                      {filteredShow.fields.starts.substr(11)}
                    </p>
                    <p className="text-lg">{filteredShow.fields.description}</p>
                    {filteredShow.fields.streamurl && (
                      <button
                        className="btn mb-8 py-4 px-8"
                        onClick={() => {
                          setStreamSrc(filteredShow.fields.streamurl);
                          setStreamSrcTitle(filteredShow.fields.title);
                        }}>
                        Lyssna på senaste avsnittet av{" "}
                        {filteredShow.fields.title}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
      </div>
    </section>
  );
}
