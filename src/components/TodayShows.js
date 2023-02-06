import React from "react";
import { Link } from "react-router-dom";

function TodayShows({ filterTodaysShows, data }) {
  return (
    <div>
      <section className="sticky top-[184px] bg-primary p-8">
        <div className="container">
          <div className="w-full text-accent">
            <h2>Dagens program</h2>

            {filterTodaysShows() && filterTodaysShows().length ? (
              <div>
                {data &&
                  filterTodaysShows().map((show) => (
                    <div key={show.sys.id} className="mt-4 flex">
                      <Link to={`/program/${show.fields.slug}`}>
                        <div className="flex items-center gap-2 text-black">
                          <i className="fa-solid fa-clock text-sm"></i>
                          <p className="text-lg font-bold text-black">
                            {show.fields.startTime}
                          </p>
                        </div>
                        <p className="block font-body text-2xl font-bold text-black">
                          {show.fields.title}
                        </p>
                      </Link>
                    </div>
                  ))}
              </div>
            ) : (
              <p>Radio 88 är tillbaka imorgon kl. 18:00</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TodayShows;
