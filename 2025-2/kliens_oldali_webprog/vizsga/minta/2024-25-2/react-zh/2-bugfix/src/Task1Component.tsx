// react-zh/2-bugfix/src/Task1Component.tsx
import { useState } from "react";

export function getRandomIndex(arrayLength: number): number {
  return Math.floor(Math.random() * arrayLength);
}

const DECK = [
  "Cica",
  "Cica",
  "Kutya",
  "Kutya",
  "Béka",
  "Béka",
  "Majom",
  "Majom",
  "Fekete Péter",
] as const;

export function Task1Component() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(getRandomIndex(DECK.length));
    if (DECK[index] === "Fekete Péter") {
      alert("Kihúztad a Fekete Pétert.");
    }
  }

  return (
    <>
      <h2>Első feladat</h2>
      <div>
        <div>Húzott kártya: {DECK[index]}</div>
        <button onClick={handleClick}>Lap húzás</button>
      </div>
    </>
  );
}
