import { useState } from "react";

export const TaskB = () => {
  const [value, setValue] = useState("");

  const disabled = value === "";

  return (
    <>
      <h2>2. feladat</h2>
      <input
        type="text"
        value={value}
        onInput={(e) => setValue(e.target.value)}
      />
      <button disabled={disabled}>Submit</button>
    </>
  );
};
