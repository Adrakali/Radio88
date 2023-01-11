import React, { useContext } from "react";
import { TimeContext } from "./Contexts/TimeContext";
import useContentful from "./Hooks/useContentful";

export default function Home() {
  const { currentTime, currentDay, currentWeek } = useContext(TimeContext);
  const { data, isLoading, error } = useContentful();

  return (
    <div>
      <section className="hero">
        <div className="container">
          <div className="hero__text">
            {currentTime}
            {data &&
              data
                .filter((show) => {
                  return (
                    show.fields.day.toLowerCase() === currentDay &&
                    show.fields.starts.substr(11) <= currentTime &&
                    show.fields.ends.substr(11) >= currentTime
                    // show.fields.oddWeeks === currentWeek
                  );
                })
                .map((show) => {
                  return (
                    <div>
                      <p>Just nu på Radio 88</p>
                      <h1>{show.fields.title}</h1>
                      <p>{show.fields.description}</p>
                    </div>
                  );
                })}
          </div>
          {/* <img src="./images/hero-image.png" alt="Hero" /> */}
        </div>
      </section>
      <section>
        <div className="container">
          <img
            src="./images/aladdin-banner.jpg"
            alt="Hero"
            className="banner"
          />
        </div>
      </section>
    </div>
  );
}
