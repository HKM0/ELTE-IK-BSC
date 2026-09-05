// react-zh/3-plant/client/src/App.tsx
import PlantCard from "./components/PlantCard";
import SelectedPlant from "./components/SelectedPlant";
import WateringHistory from "./components/WateringHistory";
import AddNewWatering from "./components/AddNewWatering";
import plants from "./data/plants.json";
import type { PlantsResponse } from "./types";
import "./App.css";

function App() {
  const selectedPlantId = 1;
  const isLoading = false;
  const isError = false;
  const error: unknown = null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading plants...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error: {String(error)}
      </div>
    );
  }

  const plantsData = plants as PlantsResponse;
  const selectedPlant = plantsData.data.find(
    (plant) => plant.id === selectedPlantId,
  );

  return (
    <div className="grid w-full grid-cols-1 gap-5 p-5 lg:h-screen md:grid-cols-6 bg-base-300 0 ">
      <div className="grid h-full max-h-[calc(100vh-40px)] lg:grid-cols-2 col-span-2 gap-5 p-5 overflow-y-auto bg-base-200 rounded-xl">
        {plantsData.data.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            isSelected={selectedPlantId === plant.id}
          />
        ))}
      </div>
      <div className="grid h-full col-span-2 grid-rows-6 gap-5  max-h-[calc(100vh-40px)]">
        <div className="row-span-1 bg-base-200 rounded-xl p-10 overflow-hidden bg-[url(/logo.png)] bg-size-[auto_80px] bg-no-repeat  bg-center"></div>
        <div className="row-span-5 bg-base-200 rounded-xl">
          <SelectedPlant plant={selectedPlant} />
        </div>
      </div>
      <div className="grid h-full col-span-2 grid-rows-6 gap-5 max-h-[calc(100vh-40px)]">
        <div className="row-span-3 overflow-y-scroll bg-base-200 rounded-xl">
          {selectedPlant && <WateringHistory plant={selectedPlant} />}
        </div>
        <div className="row-span-3 bg-base-200 rounded-xl">
          {selectedPlant && <AddNewWatering plant={selectedPlant} />}
        </div>
      </div>
    </div>
  );
}

export default App;
