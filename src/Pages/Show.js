import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useContentful from "../Hooks/useContentful";
import { StreamContext } from "../Contexts/StreamContext";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useContentful();
  const { setStreamSrc, setStreamSrcTitle } = useContext(StreamContext);

  return (
    <>
      <div className="mb-16 bg-accent">
        {loading && <div>Laddar...</div>}
        {error && <div>{error}</div>}
        {data &&
          data
            .filter((show) => show.fields.slug === id)
            .map((filteredShow) => {
              return (
                <div
                  className="container flex max-w-[1380px] items-end justify-between px-4 py-6 text-white lg:py-8"
                  key={filteredShow.fields.title}>
                  <div>
                    <h1 className="mb-0 text-2xl leading-none sm:text-4xl lg:text-6xl">
                      {filteredShow.fields.title}
                    </h1>
                    <p className="text-base font-bold lg:text-xl">
                      {`${filteredShow.fields.day}
                      ${filteredShow.fields.startTime} - ${filteredShow.fields.endTime}`}
                    </p>
                  </div>
                  {filteredShow.fields.host && (
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary lg:text-xl">
                        Programledare
                      </p>
                      <p className="font-sans text-xl text-primary sm:text-2xl lg:text-4xl">
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
        <div className="container max-w-[1380px] px-4">
          <p
            className="mb-4 cursor-pointer font-bold hover:text-accent"
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
                    className="flex flex-col justify-center gap-16 md:flex-row">
                    {filteredShow.fields.image && (
                      <div className="order-2 md:order-1">
                        <img
                          src={filteredShow.fields.image.fields.file.url}
                          alt={`${filteredShow.fields.title} programbild`}
                          className="showdetails__img w-full border-4 border-black object-cover lg:shadow-[-16px_16px_0px_0px_#000000]"
                        />
                      </div>
                    )}
                    <div className="order-1 max-w-lg">
                      <div className="prose mb-8 text-xl leading-8">
                        {filteredShow.fields.description}{" "}
                      </div>
                      {filteredShow.fields.streamurl && (
                        <button
                          className="btn mb-8 flex items-center gap-4 rounded-full bg-primary py-4 px-8 hover:bg-accent hover:text-white"
                          onClick={() => {
                            setStreamSrc(filteredShow.fields.streamurl);
                            setStreamSrcTitle(filteredShow.fields.title);
                          }}>
                          <i className="fa-solid fa-play"></i>
                          Lyssna på {filteredShow.fields.title}
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
