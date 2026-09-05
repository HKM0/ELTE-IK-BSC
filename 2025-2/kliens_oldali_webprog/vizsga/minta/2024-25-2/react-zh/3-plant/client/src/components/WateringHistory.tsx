// react-zh/3-plant/client/src/components/WateringHistory.tsx
import { Trash } from "lucide-react";
import wateringHistory from "../data/waterings.json";
import type { Plant, WateringsResponse } from "../types";

declare function deleteWatering(id: number): void;

interface WateringHistoryProps {
  plant: Plant;
}

const WateringHistory = ({ plant }: WateringHistoryProps) => {
  if (!plant) {
    return <div>No plant selected</div>;
  }

  const history = wateringHistory as WateringsResponse;

  return (
    <div className="bg-base-200">
      <ul className="list bg-base-200 rounded-box">
        <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
          Watering History
        </li>
        {history?.data.map((watering, id) => (
          <li className="list-row" key={id}>
            <div className="text-4xl font-thin opacity-30 tabular-nums">
              {id + 1}
            </div>
            <div className="list-col-grow">
              <div>
                {new Date(watering.lastWateredAt).toLocaleDateString() +
                  " " +
                  new Date(watering.lastWateredAt).toLocaleTimeString()}
              </div>
              <p className="text-xs list-col-wrap">
                {watering.notes || "No notes"}
              </p>
            </div>
            <button
              className="btn btn-square btn-ghost"
              onClick={() => deleteWatering(watering.id)}
            >
              <Trash className="text-red-900 size-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WateringHistory;
