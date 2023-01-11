import React, { useState, useEffect, useContext } from "react";
import useContentful from "./Hooks/useContentful";
import { TimeContext } from "./Contexts/TimeContext";

function Schedule() {
  const { data, loading, error } = useContentful();
  const { currentDay, currentTime, currentWeek } = useContext(TimeContext);

  return (
    <div>
      <h1>Tablå</h1>
      <div>
        {error && <div>{error}</div>}
        {loading && <p>Laddar...</p>}
        {data &&
          data
            .filter((item) => item.fields.day.toLowerCase() === currentDay)
            .map((item) => (
              <div key={item.sys.id}>
                <h2>{item.fields.day}</h2>
                <p>{item.fields.title}</p>
                <p>{item.fields.starts.substr(11)}</p>
                <p>{item.fields.ends.substr(11)}</p>
                <p>{item.fields.oddWeeks}</p>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Schedule;
