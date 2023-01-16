import React from "react";
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
        return a.fields.starts.substr(11) < b.fields.starts.substr(11) ? -1 : 1;
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
            <h3>{show.fields.title}</h3>
            <div>
              <p>
                {show.fields.starts.substr(11)} - {show.fields.ends.substr(11)}
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
        ))}
    </div>
  );
}

export default ScheduleListItem;
