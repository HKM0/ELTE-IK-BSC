import { getFloorsFromSpots } from '../utils/floors';
import type { Spot } from '../entities';

const COLS = 4;
const ROWS = 2;

type SpotCellProps = {
  spot: Spot;
};

const SpotCell = ({ spot }: SpotCellProps) => {
  
  // TODO: A spot állapotát add meg ennek a változónak, és nézd meg hogy a spot occupied milyen értéket vesz fel
  const occupied = false;

  const handleCheckOut = () => {
    // TODO: A kiállás elindítását a szerverre küldve itt indítsd el
  };

  return (
    <div
      className={`flex h-[4.5rem] flex-col justify-between rounded-lg border px-1.5 py-1 shadow-sm
        ${occupied ? 'border-rose-200/80 bg-gradient-to-b from-rose-50 to-white' : 'border-emerald-200/80 bg-gradient-to-b from-emerald-50 to-white'}`}
    >
      <span className="text-center font-mono text-[10px] font-semibold text-slate-500">
        {spot.code}
      </span>

      <div className="flex min-h-0 flex-1 items-center justify-center px-0.5">
        <span
          className={`max-w-full truncate text-center font-mono font-bold leading-none
            ${occupied ? `text-sm text-rose-700` : `text-xs text-slate-300`}`}
          title={occupied ? (spot.currentPlate ?? undefined) : undefined}
        >
          {occupied ? spot.currentPlate : '—'}
        </span>
      </div>

      <div className="h-6 shrink-0">

        {/* Itt jelenítsd meg a Kiállás gombot, ha a spot occupied állapotú */}
        {occupied ? (
          <button
            type="button"
            className="btn btn-error btn-xs h-6 min-h-6 w-full px-0 text-[10px] font-semibold"
            onClick={handleCheckOut}
          >
            Kiállás
          </button>
        ) : (
          <span className="flex h-6 w-full items-center justify-center rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700">
            Szabad
          </span>
        )}
      </div>
    </div>
  );
};

type ParkingMapProps = {
  spots: Spot[];
};

const ParkingMap = ({ spots }: ParkingMapProps) => {
  const floors = getFloorsFromSpots(spots);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1.5">
        {floors.map((floor) => {
          const floorSpots = spots
            .filter((s) => Number(s.floor) === Number(floor))
            .sort((a, b) => a.place - b.place);

          const cellAt = (row: number, col: number) =>
            floorSpots.find((s) => s.row === row && s.col === col);

          return (
            <div
              key={floor}
              className="rounded-lg border border-slate-100 bg-slate-50/60 px-2 py-1.5"
            >
              <p className="mb-1 text-center text-[10px] font-medium text-slate-400">
                {floor}. emelet
              </p>
              <div
                className="grid gap-1.5"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: ROWS }, (_, ri) =>
                  Array.from({ length: COLS }, (_, ci) => {
                    const spot = cellAt(ri + 1, ci + 1);
                    if (!spot) return null;
                    return <SpotCell key={spot.id} spot={spot} />;
                  }),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParkingMap;
