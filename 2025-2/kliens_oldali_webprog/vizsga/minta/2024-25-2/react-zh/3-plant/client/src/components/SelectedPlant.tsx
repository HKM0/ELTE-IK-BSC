// react-zh/3-plant/client/src/components/SelectedPlant.tsx
import type { Plant } from "../types";

interface SelectedPlantProps {
  plant: Plant | undefined;
}

const SelectedPlant = ({ plant }: SelectedPlantProps) => {
  if (!plant) {
    return (
      <div className="flex items-center justify-center h-full ">
        <div className="text-center card-body">
          <h2 className="justify-center text-xl card-title">Select a plant</h2>
          <p className="text-base-content/70">
            Click on a plant card to view details
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="p-5 bg-base-200 rounded-xl">
      <div>
        <figure className="py-3  rounded-xl bg-base-100">
          <img
            src={plant.imageUrl ?? ""}
            alt={plant.name}
            className="object-contain w-full rounded-xl h-60"
          />
        </figure>
        <div className="card-body">
          <h2 className="text-2xl card-title">{plant.name}</h2>

          <div className="flex flex-row justify-between py-2">
            <div className="p-0 rounded-lg stat">
              <div className="stat-title">Next Watering</div>
              <div className="text-lg stat-value">
                {new Date(plant.nextWateringOn ?? "").toLocaleDateString()}
              </div>
            </div>
            <div className="p-0 rounded-lg stat">
              <div className="stat-title">Watering Cycle</div>
              <div className="text-lg stat-value">{plant.waterFrequency}</div>
            </div>
          </div>

          <div className="mt-2">
            <h3 className="mb-2 font-semibold">Description</h3>
            <p className="text-base-content/70">
              {plant.description || "No notes available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedPlant;
