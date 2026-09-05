import { useState } from "react";

export const TaskA = () => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <h2>1. feladat</h2>
      <p>
        <button onClick={(e) => setVisible(!visible)}>
          {visible ? "Rejtsd el" : "Jelenítsd meg"} az alábbi elemet
        </button>
      </p>
      {visible && <p>Egyszerű feladat a feltételes renderelésről.</p>}
    </>
  );
};
