import { useState } from "react";

const Forecast = ({ cityData }) => {
  const handleUnitChange = (e) => {
    // TODO: Állítsd be a komponens belső állapotát a radio input alapján
  };

  return (
    <div className="rounded-lg shadow-lg bg-white p-10 flex items-center justify-center scale-125 mt-20">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <h2 className="text-2xl font-medium text-blue-500">
            {"Budapest" /* TODO: Jelenítsd meg a város nevét */}
          </h2>
          <div id="tempUnitChanger" className="ml-auto">
            <div className="inline-flex">
              <div className="switch-field">
                <input
                  type="radio"
                  id="radio-one"
                  name="tempUnitChanger"
                  value="F"
                  checked={
                    false /* TODO: Alakítsd át, hogy ha F a kiválasztott mértékegység, legyen "true" */
                  }
                  onChange={handleUnitChange}
                />
                <label htmlFor="radio-one">F</label>
                <input
                  type="radio"
                  id="radio-two"
                  name="tempUnitChanger"
                  checked={
                    true /* TODO: Alakítsd át, hogy ha C a kiválasztott mértékegység, legyen "true" */
                  }
                  value="C"
                  onChange={handleUnitChange}
                />
                <label htmlFor="radio-two">C</label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-20">
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-5">
              <img
                src={
                  "/assets/rainy.png" /* TODO: Add meg a hozzátartozó iconURL-t */
                }
                alt="weathericon"
                className="w-20"
              />
              <span className="text-9xl text-blue-400">
                20
                {/* TODO: Jelenítsd meg a hőmérsékletet a választott mértékegységben */}
                °
              </span>
            </div>
          </div>
          <table className="text-blue-400 w-1/2">
            <tbody>
              <tr>
                <td>Wind:</td>
                <td className="text-right">
                  {"69" /* TODO: Jelenítsd meg a szélerősség értékét*/} km/h
                </td>
              </tr>
              <tr>
                <td>Humidity:</td>
                <td className="text-right">
                  {"100" /* TODO: Jelenítsd meg a páratartalom értékét*/}%
                </td>
              </tr>
              <tr>
                <td>Condition:</td>
                <td className="text-right">
                  {
                    "Cloudy" /* TODO: Jelenítsd meg az időjárás körülmények értékét*/
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
