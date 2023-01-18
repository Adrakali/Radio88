import React, { useContext, useEffect } from "react";
import { TimeContext } from "./Contexts/TimeContext";
import { StatusContext } from "./Contexts/StatusContext";
import useContentful from "./Hooks/useContentful";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, isLoading, error } = useContentful();
  const { currentTime, setCurrentTime, currentDay, currentWeek } =
    useContext(TimeContext);
  const { isLive, setIsLive, isCancelled, setIsCancelled } =
    useContext(StatusContext);

  // Get the current time
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      if (date.getMinutes() === 0 && date.getSeconds() === 0) {
        setCurrentTime(date.toLocaleTimeString());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter the data to only show the current show
  function filterCurrentShow() {
    if (!data) return;
    const currentShow = data.filter((show) => {
      return (
        (!show.fields.week || show.fields.week[0] === currentWeek) &&
        show.fields.day === currentDay &&
        show.fields.starts &&
        show.fields.starts.substr(11) <= currentTime &&
        show.fields.ends &&
        show.fields.ends.substr(11) >= currentTime
      );
    });
    return currentShow;
  }

  // Check if there is a show live
  useEffect(() => {
    if (!data) return;
    if (filterCurrentShow().length > 0) {
      setIsLive(true);
    }
  }, [data, currentTime, currentDay, currentWeek]);

  // Check if the current show is cancelled
  useEffect(() => {
    if (!data) return;
    const currentShow = filterCurrentShow();
    if (currentShow.length > 0 && currentShow[0].fields.cancelled) {
      setIsCancelled(true);
    }
  }, [data, currentTime, currentDay, currentWeek]);

  // Filter the data to only show todays shows and sort them by start time
  function filterTodaysShows() {
    if (!data) return;
    const todaysShows = data
      .filter((show) => {
        return (
          (!show.fields.week || show.fields.week[0] === currentWeek) &&
          show.fields.day === currentDay &&
          show.fields.starts &&
          show.fields.starts.substr(11) >= currentTime
        );
      })
      .sort((a, b) => {
        return a.fields.starts.substr(11) < b.fields.starts.substr(11) ? -1 : 1;
      });
    return todaysShows;
  }

  return (
    <div>
      {filterCurrentShow() && isCancelled && filterCurrentShow()[0] && (
        <section className=" bg-red-300 border-b-2 border-black">
          <div className="container py-2">
            <p className="pb-0">
              {filterCurrentShow()[0].fields.title} är inställd idag
            </p>
          </div>
        </section>
      )}
      <section className="hero">
        <div className="container flex">
          <div className="hero__left flex-grow">
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {isLive && !isCancelled ? (
              data &&
              filterCurrentShow().map((show) => {
                return (
                  <div key={show.sys.id}>
                    <p>Just nu på Radio 88</p>
                    <div className="flex space-x-6 mb-10">
                      {show.fields.image && (
                        <div className="w-40">
                          <img src={show.fields.image.fields.file.url} />
                        </div>
                      )}
                      <div>
                        <h1>{show.fields.title}</h1>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>Det är ingen show just nu</h1>
            )}
          </div>
          {filterTodaysShows() && filterTodaysShows().length > 0 ? (
            <div className="hero__right h-full">
              <h2>Nästa program</h2>
              {data &&
                filterTodaysShows().map((show) => (
                  <Link to={`/program/${show.fields.slug}`}>
                    <div key={show.sys.id} className="flex">
                      <p className="font-bold text-lg">
                        {show.fields.starts.substr(11)} {show.fields.title}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
