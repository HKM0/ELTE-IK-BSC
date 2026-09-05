// react-zh/3-plant/client/src/components/PlantCard.tsx
import { Droplets } from "lucide-react";
import type { Plant } from "../types";

function sameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

interface PlantCardProps {
  plant: Plant;
  isSelected: boolean;
  setSelectedPlantId?: (id: number | null) => void;
}

const PlantCard = ({
  plant,
  isSelected,
  setSelectedPlantId: _setSelectedPlantId,
}: PlantCardProps) => {
  const nextWateringOn = new Date(plant.nextWateringOn ?? "");
  const today = new Date();

  return (
    <div
      className={`card bg-base-100 z-1  transition-all cursor-pointer shadow-none ${isSelected ? "ring-2 ring-primary" : ""}`}
      onClick={() => {
        console.log("clicked");
      }}
    >
      <figure className="px-4 pt-4 rounded-t-xl">
        <img
          src={plant.imageUrl ?? ""}
          alt={plant.name}
          className="object-contain w-full h-40 rounded-xl"
        />
      </figure>
      <div className="flex flex-row justify-between p-4 card-body">
        <h2 className="text-lg card-title">{plant.name}</h2>
      </div>
      <div
        className={`absolute top-4 right-4 items-center gap-2 px-2 py-4 text-right  border-2 badge ${sameDay(nextWateringOn, today) ? "bg-green-100 text-green-700 border-green-500/30" : nextWateringOn > today ? "bg-blue-100 text-blue-700 border-blue-500/30" : "bg-red-100 text-red-700 border-red-500/30"}`}
      >
        <Droplets />
        <span className="text-xs">
          {sameDay(nextWateringOn, today)
            ? "Water today!"
            : nextWateringOn > today
              ? "Watered"
              : "Needs water!"}
        </span>
      </div>
    </div>
  );
};

export default PlantCard;
