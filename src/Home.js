import React, { useContext, useEffect, useState } from "react";
import { TimeContext } from "./Contexts/TimeContext";
import useContentful from "./Hooks/useContentful";

export default function Home() {
  const { currentTime, setCurrentTime, currentDay, currentWeek, weekdays } =
    useContext(TimeContext);
  const { data, isLoading, error } = useContentful();
  const [showIsLive, setShowIsLive] = useState(false);

  useEffect(() => {
    //Updating the current time
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //Sort the data based on start time
  data &&
    data.sort((a, b) => {
      return weekdays.indexOf(a.fields.starts) <
        weekdays.indexOf(b.fields.starts)
        ? -1
        : 1;
    });
  console.log(data);

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
    if (currentShow) return currentShow;
    if (!currentShow) return setShowIsLive(true);
  }

  // useEffect(() => {
  //   if (!data) return;
  //   filterCurrentShow();
  // }, [data]);

  console.log(currentWeek);

  return (
    <div>
      <section className="hero">
        <div className="container flex">
          <div className="hero__left flex-grow">
            <div>{currentTime}</div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {data &&
              filterCurrentShow().map((show) => {
                return (
                  <div key={show.sys.id}>
                    <p>Just nu på Radio 88</p>
                    <h1>{show.fields.title}</h1>
                    <p>{show.fields.description}</p>
                    <div className="w-40">
                      <img src={show.fields.image.fields.file.url} />
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="hero__right h-full">
            <h2>Nästa program</h2>
            {data &&
              data
                .filter(
                  (show) =>
                    show.fields.day === currentDay &&
                    show.fields.starts &&
                    show.fields.starts.substr(11) >= currentTime
                )
                .map((show) => (
                  <div key={show.sys.id} className="flex">
                    <p className="font-bold text-lg">
                      {show.fields.starts.substr(11)} {show.fields.title}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
