import React from "react";
import useContentful from "./Hooks/useContentful";
import ShowCard from "./Components/ShowCard";

export default function Shows() {
  const { data, isLoading, error } = useContentful();

  data &&
    data.sort((a, b) => {
      return a.fields.title < b.fields.title ? -1 : 1;
    });

  return (
    <section>
      <div className="bg-accent py-10 text-primary">
        <h1 className="max-w-[1380px] mx-auto text-6xl">Program</h1>
      </div>
      <div className="max-w-[1380px] mx-auto">
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && <h1 className="col-span-3 text-center">Laddar...</h1>}
          {error && <div>{error}</div>}
          {data &&
            data.map((show) => (
              <ShowCard
                key={show.sys.id}
                id={show.sys.id}
                slug={show.fields.slug}
                title={show.fields.title}
                day={show.fields.day}
                starts={show.fields.startTime}
                desc={show.fields.description}
                img={show.fields.image && show.fields.image.fields.file.url}
                streamUrl={show.fields.streamurl}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
