import React, { useContext, useEffect, useCallback } from "react";
import { TimeContext } from "./Contexts/TimeContext";
import { StreamContext } from "./Contexts/StreamContext";
import useContentful from "./Hooks/useContentful";
import FacebookPosts from "./components/FacebookPosts";
import CancelBanner from "./components/CancelBanner";
import Hero from "./components/Hero";
import TodaysShows from "./components/TodayShows";

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
  }, [setCurrentTime]);

  // Filter the data to only show the current show
  const filterCurrentShow = useCallback(() => {
    if (!data) return;
    const currentShow = data.filter((show) => {
      return (
        (!show.fields.week || show.fields.week[0] === currentWeek) &&
        show.fields.day === currentDay &&
        show.fields.startTime &&
        show.fields.startTime <= currentTime &&
        show.fields.endTime &&
        show.fields.endTime > currentTime
      );
    });
    return currentShow;
  }, [currentDay, currentWeek, currentTime, data]);

  // Check if there is a show live
  useEffect(() => {
    if (!data) return;
    if (filterCurrentShow().length > 0) {
      setIsLive(true);
    }
  }, [
    data,
    currentTime,
    currentDay,
    currentWeek,
    filterCurrentShow,
    setIsLive,
  ]);

  // Check if the current show is cancelled
  useEffect(() => {
    if (!data) return;
    const currentShow = filterCurrentShow();
    if (currentShow.length > 0 && currentShow[0].fields.cancelled) {
      setIsCancelled(true);
    }
  }, [
    data,
    currentTime,
    currentDay,
    currentWeek,
    filterCurrentShow,
    setIsCancelled,
  ]);

  // Filter the data to only show todays shows and sort them by start time
  function filterTodaysShows() {
    if (!data) return;
    const todaysShows = data
      .filter((show) => {
        return (
          (!show.fields.week || show.fields.week[0] === currentWeek) &&
          !show.fields.cancelled &&
          show.fields.day === currentDay &&
          show.fields.startTime
          // && show.fields.startTime >= currentTime
        );
      })
      .sort((a, b) => {
        return a.fields.startTime < b.fields.startTime ? -1 : 1;
      });
    return todaysShows;
  }

  return (
    <div>
      <CancelBanner
        filterCurrentShow={filterCurrentShow}
        isCancelled={isCancelled}
      />
      <Hero
        isLoading={isLoading}
        error={error}
        isLive={isLive}
        isCancelled={isCancelled}
        data={data}
        filterCurrentShow={filterCurrentShow}
        isPlaying={isPlaying}
        playRadio={playRadio}
      />

      <section className="mx-auto grid max-w-[1380px] gap-6 py-14 md:grid-cols-[1fr_0.5fr]">
        <div>
          <img
            src="images/aladdin-banner.jpg"
            className="mb-6 w-full"
            alt="Radio 88 nyhetsbanner"
          />
          <FacebookPosts />
        </div>
        <TodaysShows filterTodaysShows={filterTodaysShows} data={data} />
      </section>
    </div>
  );
}
