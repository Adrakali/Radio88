import React, { useState, useEffect, useContext } from "react";
import useContentful from "./Hooks/useContentful";
import { TimeContext } from "./Contexts/TimeContext";

function Schedule() {
  const { data, isLoading, error } = useContentful();
  const { weekdays } = useContext(TimeContext);

  //Sort the data based on start time
  data &&
    data.sort((a, b) => {
      return weekdays.indexOf(a.fields.day) > weekdays.indexOf(b.fields.day)
        ? -1
        : 1;
    });

  console.log(data);
  return (
    <div className="container">
      <h1>Tablå</h1>
      <div>
        {error && <div>{error.message}</div>}
        {isLoading && <p>Laddar...</p>}
        {data &&
          data.map((show) => {
            return (
              <div key={show.sys.id}>
                <h2>{show.fields.day}</h2>
                <p>{show.fields.title}</p>
                <p>{show.fields.starts.substr(11)}</p>
                <p>{show.fields.ends.substr(11)}</p>
                <p>{show.fields.oddWeeks}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Schedule;
