import { useContext, useEffect, useState } from "react";
import { getNext7Dates, getPrev7Dates } from "../util/date";
import { TodoContext } from "../context/TodoContext";

const HomeHeader = () => {
  const [originalDates, setOriginalDates] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  const { activeDay, onUpdateString, displayTodos } = useContext(TodoContext);

  useEffect(() => {
    const next7Days = getNext7Dates(new Date());
    setSelectedDays(next7Days);
    setOriginalDates(next7Days);
  }, []);

  const dayClickHandler = (e) => {
    onUpdateString(e.target.value);
  };

  const prevClickHandler = () => {
    const firstDate = originalDates[0];
    const prev7Days = getPrev7Dates(firstDate);
    onUpdateString(prev7Days[prev7Days.length - 1].toDateString());
    setOriginalDates(prev7Days);
    setSelectedDays(prev7Days.reverse());
  };

  const nextClickHandler = () => {
    const lastDate = originalDates[selectedDays.length - 1];
    const next7Days = getNext7Dates(lastDate);
    onUpdateString(next7Days[0].toDateString());
    setSelectedDays(next7Days);
    setOriginalDates(next7Days);
  };

  return (
    <div className="px-12 py-4">
      <div className="flex items-center justify-between mb-10 ">
        <button
          onClick={prevClickHandler}
          className="rounded-l-xl bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-500"
        >
          PREV
        </button>
        {selectedDays.map((d) => {
          return (
            <button
              onClick={dayClickHandler}
              key={d}
              value={d.toDateString()}
              className={` cursor-pointer px-4 py-2 rounded-md border-2 ${
                activeDay == d.toDateString()
                  ? "bg-indigo-50 border-indigo-700 text-indigo-700"
                  : "text-slate-500 bg-white"
              }`}
            >
              {d.toDateString()}
            </button>
          );
        })}
        <button
          onClick={nextClickHandler}
          className="bg-indigo-600 text-white px-4 py-2 rounded-r-xl hover:bg-indigo-500"
        >
          NEXT
        </button>
      </div>
      <p className="mb-2 text-indigo-600 font-bold text-lg">
        {displayTodos.length} TASKS
      </p>
      <p className="text-slate-400 text-sm font-bold">
        Showing your tasks for
        {" " + activeDay}
      </p>
    </div>
  );
};

export default HomeHeader;
