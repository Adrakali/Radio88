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
      <div className="bg-accent">
        {loading && <div>Laddar...</div>}
        {error && <div>{error}</div>}
        {data &&
          data
            .filter((show) => show.fields.slug === id)
            .map((filteredShow) => {
              return (
                <div
                  className="mx-auto flex max-w-[1380px] flex-col items-start justify-between px-4 py-6 text-primary sm:flex-row sm:items-end lg:py-8"
                  key={filteredShow.fields.title}>
                  <div>
                    <h1 className="mb-0 leading-none lg:text-h1">
                      {filteredShow.fields.title}
                    </h1>
                    <p className="font-bold lg:text-p">
                      {`${filteredShow.fields.day}
                      ${filteredShow.fields.startTime} - ${filteredShow.fields.endTime}`}
                    </p>
                  </div>
                  {filteredShow.fields.host && (
                    <div className="text-left sm:text-right">
                      <p className="text-p font-bold text-white">
                        Programledare
                      </p>
                      <p className="font-sans text-h4 leading-tight text-white">
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
        <div className="mx-auto max-w-[1380px] px-4">
          <p
            className="mb-4 flex cursor-pointer items-center gap-4 text-psm font-bold hover:text-accent"
            onClick={() => {
              navigate("/program");
            }}>
            <i className="fa-solid fa-arrow-left"></i>
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
                    className="flex flex-col justify-center md:gap-16 md:flex-row">
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
                      {filteredShow.fields.description ? (
                        <div className="prose mb-8 font-body text-p">
                          {filteredShow.fields.description}
                        </div>
                      ) : (
                        <p className="mb-8 font-bold text-p">Programinfo kommer snart...</p>
                      )}
                      {filteredShow.fields.streamurl && (
                        <button
                          className="btn mb-8 flex items-center gap-4 py-4 px-8"
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
