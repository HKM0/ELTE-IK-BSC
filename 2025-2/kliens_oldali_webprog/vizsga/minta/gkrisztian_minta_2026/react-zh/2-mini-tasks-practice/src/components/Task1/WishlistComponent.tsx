import { useState } from "react";
import ProductCard from "./ProductCard";

const products = [
  { id: "1", name: "Kék hátizsák", description: "Praktikus hátizsák mindennapra", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" },
  { id: "2", name: "Piros kulacs", description: "Rozsdamentes acél kulacs 500ml", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500" },
];

const WishlistComponent = () => {
  //const wishlistCount = 0;
  const [wishlistCount, setWishlistCount] = useState(0);

  function handleToggle(isWishlisted:boolean) {
    setWishlistCount(prev => prev + (isWishlisted ? 1 : -1));

  }

  return (
    <section className="page">
      <section className="hero">
        <h1>Task 1 – Kívánságlista</h1>
        <p>Kívánságlistán: {wishlistCount} termék</p>
      </section>
      <section className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onToggle={handleToggle} />
        ))}
      </section>
    </section>
  );
};

export default WishlistComponent;
