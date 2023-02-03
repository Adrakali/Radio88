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
    <>
      <div className="bg-accent">
        {loading && <div>Laddar...</div>}
        {error && <div>{error}</div>}
        {data &&
          data
            .filter((show) => show.fields.slug === id)
            .map((filteredShow) => {
              return (
                <div
                  className="container flex max-w-[1380px] justify-between py-8 text-white"
                  key={filteredShow.fields.title}>
                  <div>
                    <h1 className="mb-0">{filteredShow.fields.title}</h1>
                    <p className="text-xl font-bold text-primary">
                      {`${filteredShow.fields.day}
                      ${filteredShow.fields.starts.substr(
                        11
                      )} - ${filteredShow.fields.ends.substr(11)}`}
                    </p>
                  </div>
                  {filteredShow.fields.host && (
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">
                        Programledare
                      </p>
                      <p className="font-sans text-4xl text-white">
                        {filteredShow.fields.host.length > 1
                          ? filteredShow.fields.host.join(", ")
                          : filteredShow.fields.host}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
      </div>

      <section>
        <div className="container">
          <p
            className="pointer"
            onClick={() => {
              navigate("/program");
            }}>
            Tillbaka
          </p>
          {loading && <div>Laddar...</div>}
          {error && <div>{error}</div>}
          {data &&
            data
              .filter((show) => show.fields.slug === id)
              .map((filteredShow) => {
                return (
                  <article
                    key={filteredShow.sys.id}
                    className="flex justify-center gap-16">
                    {filteredShow.fields.image && (
                      <div className="max-w-[400px] shadow-[16px_16px_0px_0px_#000000]">
                        <img
                          src={filteredShow.fields.image.fields.file.url}
                          alt={`${filteredShow.fields.title} programbild`}
                          className="showdetails__img h-full border-4 border-black object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-lg">
                        {filteredShow.fields.description}
                      </p>
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
    </>
  );
}
