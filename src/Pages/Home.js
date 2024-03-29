import React, { useContext, useEffect, useCallback } from "react";
import { TimeContext } from "../Contexts/TimeContext";
import { StreamContext } from "../Contexts/StreamContext";
import useContentful from "../Hooks/useContentful";
import FacebookPosts from "../Components/FacebookPosts";
import CancelBanner from "../Components/CancelBanner";
import Hero from "../Components/Hero";
import TodaysShows from "../Components/TodayShows";
import Slider from "../Components/Slider";

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

  const images = [
    "2hlasse.png",
    "aladdin.jpg",
    "fredagsmys.png",
    "fredans.png",
    "goldenhits.jpg",
    "justintime.jpg",
    "svensktoppar.png",
    "dansband.png",
  ];

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

      <section className="mx-auto grid max-w-[1380px] gap-6 lg:grid-cols-[1fr_0.5fr]">
        <div>
          <Slider images={images} />
          <FacebookPosts />
        </div>
        <TodaysShows filterTodaysShows={filterTodaysShows} data={data} />
      </section>
    </div>
  );
}
