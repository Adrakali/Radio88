import React, { useContext } from "react";
import ScheduleListItem from "./components/ScheduleListItem";
import { TimeContext } from "./Contexts/TimeContext";

function Schedule() {
  const { currentWeek } = useContext(TimeContext);

  const weekdays = [
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "Söndag",
  ];

  return (
    <div className="container">
      <h1>Tablå</h1>
      <p>Denna vecka är {currentWeek === "Odd" ? "udda" : "jämn"}</p>
      <div>
        {weekdays.map((weekday) => {
          return (
            <div key={weekday}>
              <h2>{weekday}</h2>
              <ScheduleListItem weekday={weekday} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Schedule;
