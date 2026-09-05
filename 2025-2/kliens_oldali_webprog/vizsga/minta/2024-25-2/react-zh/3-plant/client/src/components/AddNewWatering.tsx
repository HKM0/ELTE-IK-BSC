// react-zh/3-plant/client/src/components/AddNewWatering.tsx
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Plant } from "../types";

interface AddNewWateringProps {
  plant: Plant;
}

const AddNewWatering = ({ plant }: AddNewWateringProps) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 16),
    notes: `Regular watering for ${plant.name}`,
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="p-0 m-0 text-sm italic">Add New Watering to: </h3>
        <h2 className="p-0 m-0 text-xl font-bold leading-0.75 mb-3">
          {plant.name}
        </h2>
        <form className="flex flex-col gap-1 mt-5" onSubmit={onSubmit}>
          <fieldset className="fieldset ">
            <legend className="p-0 fieldset-legend">Date</legend>
            <input
              type="datetime-local"
              className="w-full input"
              name="date"
              value={formData.date}
              onChange={onInputChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="p-0 fieldset-legend">Notes</legend>
            <input
              type="text"
              className="w-full input"
              name="notes"
              placeholder="Type here"
              value={formData.notes}
              onChange={onInputChange}
            />
          </fieldset>
          <button type="submit" className="btn btn-secondary">
            Add Watering
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewWatering;
