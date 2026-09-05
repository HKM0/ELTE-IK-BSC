import { useState } from "react";

const ImageForm = () => {
  return (
    <form>
      Kép URL:
      <input type="url" />
      <button type="submit">Kép hozzáadása</button>
    </form>
  );
};

export const TaskC = () => {
  return (
    <>
      <h2>3. feladat</h2>
      <ImageForm />
      <h3>Képlista</h3>
      {/* Ez csak egy példa */}
      {/* Ilyen képlistát kell dinamikusan generálni */}
      <img
        src="https://picsum.photos/640/360"
        style={{ height: "200px" }}
        alt=""
      />
      <img
        src="https://picsum.photos/640/360"
        style={{ height: "200px" }}
        alt=""
      />
    </>
  );
};
