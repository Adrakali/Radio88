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
    <section>
      <div className="container">
        <h1>Tablå</h1>
        <p>Denna vecka är {currentWeek === "Odd" ? "udda" : "jämn"}</p>
        <div>
          {weekdays.map((weekday) => {
            return (
              <div key={weekday} className="mb-12">
                <h2 className="bg-black text-lbrown px-4 py-2">{weekday}</h2>
                <ScheduleListItem weekday={weekday} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Schedule;
