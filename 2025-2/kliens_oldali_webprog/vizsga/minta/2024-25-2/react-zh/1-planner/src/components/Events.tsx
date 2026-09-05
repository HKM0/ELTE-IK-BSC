// react-zh/1-planner/src/components/Events.tsx
import type { Event } from "../types";

interface EventsProps {
  events: Event[];
}

export function Events({ events: _events }: EventsProps) {
  const weekdays = [
    "hétfő",
    "kedd",
    "szerda",
    "csütörtök",
    "péntek",
    "szombat",
    "vasárnap",
  ];

  return (
    <div className="p-4 flex flex-col gap-4 w-1/2 min-w-96">
      {weekdays.map((weekday) => (
        <div key={weekday} className="flex flex-col">
          <h2 className="text-4xl ml-1 bg-yellow-100 w-44 text-center rounded-t-md">
            {weekday}
          </h2>
          <div className="flex flex-wrap gap-4 p-4 bg-indigo-50 rounded-md">
            {
              // TODO: Az adott nap eseményeinek listázása, használd az EventIcon komponenst!
            }
          </div>
        </div>
      ))}
    </div>
  );
}
