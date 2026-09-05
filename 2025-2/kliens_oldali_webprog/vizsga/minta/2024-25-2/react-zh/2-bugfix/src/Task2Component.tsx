// react-zh/2-bugfix/src/Task2Component.tsx
import { useEffect, useState } from "react";

interface RandomUserResponse {
  results: { picture: { large: string } }[];
}

export function Task2Component() {
  const [imgCount, setImgCount] = useState(0);
  const [imgArray, setImgArray] = useState<string[]>([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`https://randomuser.me/api/`);
        const data = (await response.json()) as RandomUserResponse;
        if (imgArray.length < imgCount) {
          setImgArray([...imgArray, data.results[0].picture.large]);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  const handleIncrement = () => {
    setImgCount(imgCount + 1);
  };

  return (
    <div>
      <h2>Második feladat</h2>
      <div>
        {imgArray.map((img, i) => (
          <img key={i} src={img} alt="Random image" />
        ))}
      </div>
      <div>
        <p>Képek száma: {imgCount}</p>
        <button onClick={handleIncrement}>Növelés</button>
      </div>
    </div>
  );
}
