import { createContext, useState, useEffect, useMemo } from "react";

export const TimeContext = createContext();

export function TimeProvider({ children }) {
  const [currentTime, setCurrentTime] = useState();
  const [currentDay, setCurrentDay] = useState();
  const [currentWeek, setCurrentWeek] = useState();
  const weekdays = useMemo(() => {
    return ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"]
  }, []);

  useEffect(() => {
    //Calculating and formatting the current day
    const date = new Date();
    setCurrentTime(date.toLocaleTimeString().substr(0, 5));
    setCurrentDay(
      weekdays[date.getDay()].charAt(0).toUpperCase() +
        weekdays[date.getDay()].slice(1)
    );
  }, [weekdays]);

  useEffect(() => {
    //Calculating the current week
    const date = new Date();
    const firstJanuary = new Date(date.getFullYear(), 0, 1);
    const dayNr = Math.ceil((date - firstJanuary) / (24 * 60 * 60 * 1000));
    const weekNr = Math.ceil((dayNr + firstJanuary.getDay()) / 7);
    if (weekNr % 2 === 0) {
      setCurrentWeek("Even");
    } else {
      setCurrentWeek("Odd");
    }
  }, []);

  return (
    <TimeContext.Provider
      value={{
        currentTime,
        setCurrentTime,
        currentDay,
        currentWeek,
        weekdays,
      }}>
      {children}
    </TimeContext.Provider>
  );
}
