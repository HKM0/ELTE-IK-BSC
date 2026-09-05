import logo from "./assets/logo.png";
import { EventDetails } from "./components/EventDetails";
import { Events } from "./components/Events";
import data from "./data/events.json"
import "./index.css";
function App() {
  const eventsData = data;
  return (
    <>
    {void eventsData}
    <div className="text-center text-4xl fixed bg-white/10 left-1/2 p-2 top-2 rounded-lg shadow-md -translate-x-1/2">
    <img className="h-10" src={logo} alt="plannr" />
    </div>
    <div className="flex items-center gap-2">
      <Events events={[]} />
      <EventDetails eventId={1} />
    </div>
    </>
  );
}

export default App;
