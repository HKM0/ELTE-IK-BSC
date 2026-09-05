import ParkingMap from './components/ParkingMap';
import CheckInPanel from './components/CheckInPanel';
import ActivityFeed from './components/ActivityFeed';
import OccupancyBar from './components/OccupancyBar';
import spotsData from './data/spots.json';
import type { Spot } from './entities';
function App() {
  const isLoading = false;
  const isError = false;
  const error: unknown = null;

  // TODO: A helyek adatait a szerverről töltsd be
  const spots = spotsData;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="alert alert-error shadow-lg">
          <span>Szerver hiba: {String(error)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-[calc(100dvh-1rem)] max-h-screen max-w-5xl flex-col overflow-hidden px-3 py-2 md:px-4">
      <div className="grid min-h-0 flex-1 grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="flex min-h-0 flex-col overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:overflow-visible">
        <header className="shrink-0 border-b border-slate-100 pb-2">
          <p className="text-[10px] font-medium uppercase tracking-wider text-primary">
            Parking
          </p>
          <h2 className="text-lg font-bold leading-tight text-slate-800">
            Parkolóház
          </h2>
          <p className="text-[10px] text-slate-500">
              {spots?.total} hely · 3 emelet
            </p>
            <OccupancyBar  />
          </header>
          <ParkingMap spots={spots.data as Spot[]} />
        </section>

        <aside className="flex max-h-[min(50vh,28rem)] min-h-0 flex-col gap-3 overflow-hidden lg:h-full lg:max-h-none">
          <CheckInPanel spots={spots.data as Spot[]} />
          <ActivityFeed />
        </aside>
      </div>
    </div>
  );
}

export default App;
