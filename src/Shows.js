import React from "react";
import useContentful from "./Hooks/useContentful";
import ShowCard from "./components/ShowCard";

export default function Shows() {
  const { data, isLoading, error } = useContentful();

  return (
    <section>
      <div className="page-header">
        <h1>Program</h1>
      </div>
      <div className="container">
        <div className="container grid grid-cols-1 lg:grid-cols-3 mt-10 gap-8">
          {isLoading && <h1 className="text-center col-span-3">Laddar sidan...</h1>}
          {error && <div>{error}</div>}
          {data &&
            data.map((show) => (
              <ShowCard
                key={show.sys.id}
                id={show.sys.id}
                slug={show.fields.slug}
                title={show.fields.title}
                day={show.fields.day}
                starts={show.fields.starts && show.fields.starts.substr(11)}
                desc={show.fields.description}
                img={show.fields.image.fields.file.url}
                streamUrl={show.fields.streamurl}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
