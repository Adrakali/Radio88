import React, { useContext, useEffect } from "react";
import { TimeContext } from "./Contexts/TimeContext";
import { StreamContext } from "./Contexts/StreamContext";
import useContentful from "./Hooks/useContentful";
import { Link } from "react-router-dom";
import FacebookPosts from "./components/FacebookPosts";

export default function Home() {
  const { data, isLoading, error } = useContentful();
  const { currentTime, setCurrentTime, currentDay, currentWeek } =
    useContext(TimeContext);
  const {
    isLive,
    setIsLive,
    isCancelled,
    setIsCancelled,
    playRadio,
    isPlaying,
  } = useContext(StreamContext);

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
          show.fields.starts
          // && show.fields.starts.substr(11) >= currentTime
        );
      })
      .sort((a, b) => {
        return a.fields.starts.substr(11) < b.fields.starts.substr(11) ? -1 : 1;
      });
    return todaysShows;
  }

  function handleClick() {
    console.log("click");
  }

  return (
    <div>
      {filterCurrentShow() && isCancelled && filterCurrentShow()[0] && (
        <section className=" border-b-[3px] border-black bg-red-300">
          <div className="container flex items-center px-2 py-2">
            <i class="fa-sharp fa-solid fa-circle-exclamation mr-2"></i>
            <p className="pb-0 font-bold">
              {filterCurrentShow()[0].fields.title} är inställd idag
            </p>
          </div>
        </section>
      )}

      <section className="hero relative flex items-center justify-center overflow-hidden py-16">
        <img
          src="images/mick-haupt-FGrGhzaSl0s-unsplash.jpg"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className="hero-overlay absolute inset-0 -z-10 bg-[#790027] opacity-95"></div>
        <div>
          <div className="hero__left flex flex-col items-center justify-center text-white">
            {isLoading && <div>Laddar...</div>}
            {error && <div>Error: {error.message}</div>}
            {isLive && !isCancelled ? (
              data &&
              filterCurrentShow().map((show) => {
                return (
                  <div key={show.sys.id}>
                    <div className="flex items-center gap-8 text-center">
                      {show.fields.image && (
                        <div className="w-[450px] shadow-md">
                          <img src={show.fields.image.fields.file.url} />
                        </div>
                      )}
                      <div className="text-left">
                        <p className="mb-2 font-bold text-primary md:mb-4 md:text-2xl">
                          Just nu på Radio 88
                        </p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                          {show.fields.title}
                        </h1>
                        {!isPlaying && (
                          <div>
                            <button
                              onClick={playRadio}
                              className="rounded-full bg-primary px-16 py-4 font-extrabold uppercase text-black md:mt-4 lg:mt-8 ">
                              <i className="fa-solid fa-play mr-4"></i>Lyssna nu
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-primary">
                <h1 className="max-w-[27ch] text-2xl drop-shadow-[4px_4px_0px_#000000] sm:text-4xl md:text-5xl lg:text-7xl">
                  Vi spelar musiken som du glömt att du kommer ihåg
                </h1>
                {!isPlaying && (
                  <div>
                    <button
                      onClick={playRadio}
                      className="mt-8 rounded-full bg-primary px-16 py-4 font-extrabold uppercase text-black md:mt-12 lg:mt-16 ">
                      <i className="fa-solid fa-play mr-4"></i>Lyssna nu
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1380px] gap-6 py-14 md:grid-cols-[1fr_0.5fr]">
        <div>
          <img src="images/aladdin-banner.jpg" className="mb-6 w-full" />
          <FacebookPosts />
        </div>
        <div>
          {filterTodaysShows() && filterTodaysShows().length > 0 ? (
            <section className="sticky top-[184px] bg-black p-8">
              <div className="container">
                <div className="w-full text-white">
                  <h2>Dagens program</h2>
                  <div>
                    {data &&
                      filterTodaysShows().map((show) => (
                        <div key={show.sys.id} className="mt-4 flex">
                          <Link to={`/program/${show.fields.slug}`}>
                            <div className="flex items-center gap-2 text-primary">
                              <i className="fa-solid fa-clock text-sm"></i>
                              <p className="text-lg font-bold text-primary">
                                {show.fields.starts.substr(11)}
                              </p>
                            </div>
                            <p className="block font-sans text-3xl text-white">
                              {show.fields.title}
                            </p>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </div>
  );
}
