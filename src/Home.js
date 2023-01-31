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
        <section className=" bg-red-300 border-b-[3px] border-black">
          <div className="container flex px-2 items-center py-2">
            <i class="fa-sharp fa-solid fa-circle-exclamation mr-2"></i>
            <p className="pb-0 font-bold">
              {filterCurrentShow()[0].fields.title} är inställd idag
            </p>
          </div>
        </section>
      )}

      <section className="hero relative flex h-96 py-60 items-center justify-center overflow-hidden border-b-[3px] border-black">
        <img
          src="images/mick-haupt-FGrGhzaSl0s-unsplash.jpg"
          className="hero-bg absolute object-cover inset-0 -z-20"
        />
        <div className="hero-overlay bg-[#790027] absolute inset-0 opacity-95 -z-10"></div>
        <div className="container">
          <div className="hero__left flex flex-col justify-center text-white items-center">
            {isLoading && <div>Laddar...</div>}
            {error && <div>Error: {error.message}</div>}
            {isLive && !isCancelled ? (
              data &&
              filterCurrentShow().map((show) => {
                return (
                  <div key={show.sys.id}>
                    <div className="flex items-center object-contain space-x-6 mb-10">
                      {show.fields.image && (
                        <div className="w-96 shadow-md">
                          <img src={show.fields.image.fields.file.url} />
                        </div>
                      )}
                      <div>
                        <p className="font-bold mb-4 text-2xl text-primary">
                          Just nu på Radio 88
                        </p>
                        <h1 className="drop-shadow-[4px_4px_0px_#000000]">
                          {show.fields.title}
                        </h1>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-white">
                <h1 className="text-7xl w-[27ch] drop-shadow-[4px_4px_0px_#000000]">
                  Vi spelar musiken som du glömt att du kommer ihåg
                </h1>
              </div>
            )}
            {!isPlaying && (
              <div>
                <button
                  onClick={playRadio}
                  className="px-16 py-4 mt-16 bg-primary border-black border-4 uppercase font-extrabold text-black drop-shadow-[4px_4px_0px_#000000]">
                  <i className="fa-solid fa-play mr-4"></i>Lyssna nu
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-lg grid md:grid-cols-[1fr_0.5fr] gap-6 py-14">
        <div>
          <img src="images/aladdin-banner.jpg" className="w-full mb-6" />
          <FacebookPosts />
        </div>
        <div>
          {filterTodaysShows() && filterTodaysShows().length > 0 ? (
            <section className="bg-black p-8 sticky top-[184px]">
              <div className="container">
                <div className="text-white w-full">
                  <h2>Dagens program</h2>
                  <div>
                    {data &&
                      filterTodaysShows().map((show) => (
                        <div key={show.sys.id} className="flex mt-4">
                          <Link to={`/program/${show.fields.slug}`}>
                            <div className="flex items-center gap-2 text-primary">
                              <i className="fa-solid fa-clock text-sm"></i>
                              <p className="font-bold text-primary text-lg">
                                {show.fields.starts.substr(11)}
                              </p>
                            </div>
                            <p className="text-white block text-3xl font-sans">
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
