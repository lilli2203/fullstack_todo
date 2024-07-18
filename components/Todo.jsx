/* eslint-disable react/prop-types */
import { useState } from "react";
import { updateTodo } from "../../src/services/todoServices";

const Todo = ({ done, title, _id: id }) => {
  const [completed, setCompleted] = useState(done);

  const handleCheckboxChange = () => {
    // Make an API call to update the todo completion status
    updateTodo(id);

    // Toggle the completed state locally
    setCompleted(!completed);
  };

  const handleTitleClick = () => {
    // Add functionality to handle title click (example: expand/collapse details)
  };

  return (
    <div
      className={`px-2 py-2 border-b-2 ${
        completed ? "bg-gray-100 text-slate-500 cursor-pointer" : "bg-white"
      }`}
    >
      <div className="flex gap-4 w-1/2 justify-start py-1">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
          className="w-6 h-6 rounded-full"
        />
        <div
          className={`todo-details flex ${completed ? "line-through" : ""}`}
          onClick={handleTitleClick}
        >
          <h2>{title}</h2>
        </div>
        <button className="ml-auto px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-500">
          Edit
        </button>
        <button className="ml-2 px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-500">
          Delete
        </button>
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
                activeDay === d.toDateString()
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
      </div>
      <div className={`${completed ? "block" : "hidden"} mt-2`}>
        <p className="text-sm text-gray-600">
          Additional details or notes can be displayed here.
        </p>
      </div>
    </div>
  );
};

export default Todo;
