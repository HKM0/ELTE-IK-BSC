import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onToggle: (isWishlisted : boolean) => void;
}

const ProductCard = ({ product, onToggle }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  function handleWishlistClick() {
    const next = !isWishlisted;
    setIsWishlisted(next);
    onToggle(next);
  }

  return (
    <div className={`card ${isWishlisted ? "favorite" : ""}`}>
      <img src={product.image} alt={product.name} />
      <div className="card-content">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <button onClick={handleWishlistClick}>
          {isWishlisted ? "Eltávolítás a kívánságlistáról" : "Hozzáadás a kívánságlistához"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
