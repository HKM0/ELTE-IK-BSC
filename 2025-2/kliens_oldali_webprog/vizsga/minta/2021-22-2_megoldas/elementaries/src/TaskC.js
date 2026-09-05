import { useState } from "react";

const ImageForm = ({ onSave }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      Kép URL:
      <input
        type="url"
        value={value}
        onInput={(e) => setValue(e.target.value)}
      />
      <button type="submit">Kép hozzáadása</button>
    </form>
  );
};

export const TaskC = () => {
  const [images, setImages] = useState([]);

  const handleSave = (src) => setImages([...images, src]);

  return (
    <>
      <h2>3. feladat</h2>
      <ImageForm onSave={handleSave} />
      {images.map((imageSrc) => (
        <img src={imageSrc} style={{ height: "200px" }} alt="" />
      ))}
    </>
  );
};
