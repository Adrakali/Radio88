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
          <div key={show.sys.id} className=" group hover:bg-accent">
            <Link to={`/program/${show.fields.slug}`}>
              <div key={show.sys.id} className="">
                <div className="flex justify-between border-b border-black py-4 group-hover:px-4">
                  <p className="transition-color mb-0 flex items-center justify-between pl-4 font-body font-bold tracking-tight text-black duration-150 ease-out group-hover:pl-0 group-hover:text-primary">
                    {show.fields.title}
                  </p>
                  <div>
                    <p className="transition-color mb-0 flex items-center justify-between pr-4 font-body font-bold tracking-tight text-black duration-150 ease-out group-hover:pr-0 group-hover:text-primary">
                      {`${show.fields.startTime} -
                      ${show.fields.endTime}`}
                    </p>
                    {show.fields.week && show.fields.week[0] === "Even" && (
                      <p className="pr-4 text-psm font-bold group-hover:pr-0 group-hover:text-primary">
                        Jämna veckor
                      </p>
                    )}
                    {show.fields.week && show.fields.week[0] === "Odd" && (
                      <p className="pr-4 text-psm font-bold group-hover:pr-0 group-hover:text-primary">
                        Udda veckor
                      </p>
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
