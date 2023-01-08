import React from "react";
import useContentful from "./Hooks/useContentful";
import ShowCard from "./components/ShowCard";

export default function Shows() {
  const { data, loading, error } = useContentful();

  return (
    <section>
      <div className="container">
        <h1>Program</h1>
        <div className="container grid">
          {error && <div>{error}</div>}
          {loading && <h1>Laddar sidan...</h1>}
          {data &&
            data.map((show) => (
              <ShowCard
                key={show.sys.id}
                id={show.sys.id}
                slug={show.fields.slug}
                title={show.fields.title}
                desc={show.fields.description}
                img={show.fields.image.fields.file.url}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
