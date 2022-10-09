import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useContentful from "./Hooks/useContentful";

export default function ShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useContentful();
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
              console.log(data);
              return (
                <article key={filteredShow.sys.id}>
                  <h1>{filteredShow.fields.title}</h1>
                  <p>
                    {filteredShow.fields.day} kl. {filteredShow.fields.time}
                  </p>
                  <p>{filteredShow.fields.description}</p>
                  <img
                    src={filteredShow.fields.image.fields.file.url}
                    alt={`${filteredShow.fields.title} programbild`}
                    className="showdetails__img"
                  />
                  <button>
                    <a href={filteredShow.fields.streamurl}>
                      Lyssna på senaste avsnittet av {filteredShow.fields.title}
                    </a>
                  </button>
                </article>
              );
            })}
      </div>
    </section>
  );
}
