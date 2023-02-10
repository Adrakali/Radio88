import React, { useContext } from "react";
import ScheduleListItem from "../Components/ScheduleListItem";
import { TimeContext } from "../Contexts/TimeContext";
import PageHeader from "../Components/PageHeader";

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
    <div>
      <PageHeader
        width={"960px"}
        title={"Tablå"}
        info={`Denna vecka är ${currentWeek === "Odd" ? "udda" : "jämn"}`}
      />

      <section>
        <div className="mx-auto max-w-4xl">
          <div className="flex-grow">
            {weekdays.map((weekday) => {
              return (
                <div key={weekday} className="mb-12">
                  <h2 className=" bg-primary px-4 py-2 text-3xl text-black">
                    {weekday}
                  </h2>
                  <ScheduleListItem weekday={weekday} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Schedule;
