import React, { useContext, useEffect } from "react";
import { TimeContext } from "./Contexts/TimeContext";
import { StatusContext } from "./Contexts/StatusContext";
import useContentful from "./Hooks/useContentful";
import { Link } from "react-router-dom";
import FacebookPosts from "./components/FacebookPosts";

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
          !show.fields.cancelled &&
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

      <section className="hero relative flex h-96 py-60 items-center justify-center overflow-hidden">
        <img
          src="images/hero-bg.jpg"
          className="hero-bg absolute inset-0 -z-20"
        />
        <div className="hero-overlay bg-[#790027] absolute inset-0 opacity-90 -z-10"></div>
        <div className="container">
          <div className="hero__left flex justify-center items-center">
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
              <div className="text-center text-white">
                <h1 className="text-7xl mb-16 w-[27ch] drop-shadow-[4px_4px_0px_#000000]">
                  Vi spelar musiken som du glömt att du kommer ihåg
                </h1>
                <button className="px-16 py-4 bg-primary border-black border-4 uppercase font-extrabold text-black drop-shadow-[4px_4px_0px_#000000]">
                  <i className="fa-solid fa-play mr-4"></i>Lyssna nu
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {filterTodaysShows() && filterTodaysShows().length > 0 ? (
        <section className="bg-black py-2">
          <div className="container max-w-2xl">
            <div className="hero__right bg-black text-white w-full flex justify-between">
              <h2>Nästa program</h2>
              <div className="flex gap-20">
                {data &&
                  filterTodaysShows().map((show) => (
                    <div key={show.sys.id} className="flex">
                      <Link to={`/program/${show.fields.slug}`}>
                        <p className="font-bold text-primary">
                          {show.fields.starts.substr(11)}
                          <p className="text-white text-3xl font-sans">
                            {show.fields.title}
                          </p>
                        </p>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section>
        <div className="container">
          <img src="images/aladdin-banner.jpg" className="m-auto w-3/4" />
        </div>
      </section>
      <FacebookPosts />
    </div>
  );
}
