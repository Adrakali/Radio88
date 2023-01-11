import { createContext, useState, useEffect } from "react";

const weekdays = [
  "söndag",
  "måndag",
  "tisdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lördag",
];

export const TimeContext = createContext();

export function TimeProvider({ children }) {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [currentDay, setCurrentDay] = useState();
  const [currentWeek, setCurrentWeek] = useState();

  useEffect(() => {
    const date = new Date();
    setCurrentTime(date.toLocaleTimeString());
    setCurrentDay(weekdays[date.getDay()]);

    var firstJanuary = new Date(date.getFullYear(), 0, 1);
    var dayNr = Math.ceil((date - firstJanuary) / (24 * 60 * 60 * 1000));
    var weekNr = Math.ceil((dayNr + firstJanuary.getDay()) / 7);

    if (weekNr % 2 === 0) {
      setCurrentWeek("even");
    } else {
      setCurrentWeek("odd");
    }

    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <TimeContext.Provider value={{ currentTime, currentDay, currentWeek }}>
      {children}
    </TimeContext.Provider>
  );
}
