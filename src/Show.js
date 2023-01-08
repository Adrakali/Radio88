import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useContentful from "./Hooks/useContentful";
// import { StreamContext } from "./Context/StreamContext";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useContentful();
  // const { setStreamSrc, setStreamSrcTitle } = useContext(StreamContext);

  return (
    <section>
      <div className="container">
        <p
          className="pointer"
          onClick={() => {
            navigate("/program");
          }}
        >
          Tillbaka
        </p>
        {loading && <div>Laddar sidan...</div>}
        {error && <div>{error}</div>}
        {data &&
          data
            .filter((show) => show.fields.slug === id)
            .map((filteredShow) => {
              return (
                <article key={filteredShow.sys.id}>
                  <h1>{filteredShow.fields.title}</h1>
                  <p>
                    {filteredShow.fields.day} kl. {filteredShow.fields.time}
                  </p>
                  <p>{filteredShow.fields.description}</p>
                  <button
                  // onClick={() => {
                  //   setStreamSrc(filteredShow.fields.streamurl);
                  //   setStreamSrcTitle(filteredShow.fields.title);
                  // }}
                  >
                    Lyssna på senaste avsnittet av {filteredShow.fields.title}
                  </button>
                  <img
                    src={filteredShow.fields.image.fields.file.url}
                    alt={`${filteredShow.fields.title} programbild`}
                    className="showdetails__img"
                  />
                </article>
              );
            })}
      </div>
    </section>
  );
}
