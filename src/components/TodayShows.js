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
                    <div
                      key={show.sys.id}
                      className="transition-color group flex cursor-pointer border-b border-accent pt-4 pb-4 duration-150 ease-out hover:bg-accent hover:p-4">
                      <Link
                        to={`/program/${show.fields.slug}`}
                        className="w-full">
                        <div className="transition-color flex items-center gap-2  text-black duration-150 ease-out group-hover:text-primary">
                          <i className="fa-solid fa-clock text-sm"></i>
                          <p className="transition-color text-lg font-bold  text-black duration-150 ease-out group-hover:text-primary">
                            {show.fields.startTime}
                          </p>
                        </div>
                        <p className="transition-color flex items-center justify-between font-body text-2xl font-bold tracking-tight text-black duration-150 ease-out group-hover:text-primary">
                          {show.fields.title}{" "}
                          <i className="fa-sharp fa-solid fa-arrow-right text-[16px] transition-all duration-150 ease-out group-hover:text-[20px]"></i>
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
