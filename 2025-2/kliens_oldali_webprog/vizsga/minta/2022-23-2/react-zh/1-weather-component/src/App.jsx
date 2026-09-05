import { useState } from "react";
import Forecast from "./Forecast";
import CitiesList from "./CitiesList";
function App() {
  const weatherList = []; // TODO: Cseréld le ezt a változót, hogy a beimportált listára hivatkozzon
  const selectedCity = null; // TODO: Cseréld le ezt a változót, hogy a komponens belső állapotára hivatkozzon
  const handleCityChange = (id) => {
    // TODO: Állítsd be a kiválasztott várost
  };
  return (
    <div className="flex flex-col items-center  w-full">
      <h1 className="text-5xl text-blue-700">Időjárás</h1>
      <CitiesList
        weatherList={weatherList}
        handleCityChange={handleCityChange}
      />
      <Forecast cityData={selectedCity} />
    </div>
  );
}

export default App;
