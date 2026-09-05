import { useState } from "react";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  function handleFavoriteClick() {
    setIsFavorite(!isFavorite);
  }

  return (
    <div className={`card ${isFavorite ? "favorite" : ""}`}>
      <img src={product.image} alt={product.name} />
      <div className="card-content">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <button onClick={handleFavoriteClick}>
          {isFavorite
            ? "Eltávolítás a kedvencek közül"
            : "Hozzáadás a kedvencekhez"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
