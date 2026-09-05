// react-zh/1-planner/src/components/EventDetails.tsx
// Ezt a komponenst ne változtasd meg!
import { getIcon } from "../data/categoryIcons";
import eventsData from "../data/events.json";

interface EventDetailsProps {
  eventId: number;
}

export function EventDetails({ eventId }: EventDetailsProps) {
  const event = eventsData.find((event) => event.id === eventId) ?? null;
  return (
    <div className="bg-indigo-50 rounded-lg m-4 shadow-lg w-1/2">
      {event ? (
        <div className="flex flex-col items-center text-indigo-900 p-4 w-full">
          <h1 className="text-6xl">{getIcon(event.category)}</h1>
          <p className="text-lg text-indigo-400">{event.time}</p>
          <h2 className="text-3xl font-bold">{event.title}</h2>
          <h2 className="text-2xl">{event.category}</h2>
          <p className="text-lg text-indigo-400">{event.description}</p>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          Válassz ki egy eseményt a részletek megtekintéséhez!
        </div>
      )}
    </div>
  );
}
