import React from "react";
import { Link } from "react-router-dom";
import useContentful from "../Hooks/useContentful";

function ScheduleListItem({ weekday }) {
  const { data, isLoading, error } = useContentful();

  // Filter the data to only show todays shows and sort them by start time
  function filterItems() {
    if (!data) return;
    const filteredItem = data
      .filter((show) => {
        return show.fields.day.toLowerCase() === weekday.toLowerCase();
      })
      .sort((a, b) => {
        return a.fields.startTime < b.fields.startTime ? -1 : 1;
      });
    return filteredItem;
  }

  const listItems = filterItems();
  if (!data) return;

  return (
    <div>
      {error && <div>{error.message}</div>}
      {isLoading && <p>Laddar...</p>}
      {data &&
        listItems.map((show) => (
          <div key={show.sys.id}>
            <Link to={`/program/${show.fields.slug}`}>
              <div key={show.sys.id} className="mb-2 py-1">
                <div className="flex justify-between border-b border-black pb-4">
                  <h3 className="mb-0 font-body text-2xl">
                    {show.fields.title}
                  </h3>
                  <div>
                    <p className="font-body text-2xl">
                      {`${show.fields.startTime} -
                      ${show.fields.endTime}`}
                    </p>
                    {show.fields.week && show.fields.week[0] === "Even" && (
                      <p>Jämna veckor</p>
                    )}
                    {show.fields.week && show.fields.week[0] === "Odd" && (
                      <p>Udda veckor</p>
                    )}
                    {show.fields.cancelled && <p>Inställd denna vecka</p>}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default ScheduleListItem;
