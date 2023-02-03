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
      <div className="mb-8 bg-accent py-10 text-primary">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-6xl">Tablå</h1>
          <p>Denna vecka är {currentWeek === "Odd" ? "udda" : "jämn"}</p>
        </div>
      </div>
      <div className="container max-w-4xl">
        <div className="flex-grow">
          {weekdays.map((weekday) => {
            return (
              <div key={weekday} className="mb-12">
                <h2 className="mb-8 bg-black px-4 py-2 text-3xl text-lbrown">
                  {weekday}
                </h2>
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
