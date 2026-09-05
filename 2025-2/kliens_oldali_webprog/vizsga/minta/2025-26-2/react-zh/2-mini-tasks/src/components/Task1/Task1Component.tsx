import ProductCard from "./ProductCard";

const products = [
  {
    id: "1",
    name: "React Hoodie",
    description: "Nagyon kényelmes felső React fejlesztők számára",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
  },
  {
    id: "2",
    name: "Szürke Pulcsi",
    description: "Átlagos pulcsi",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
  },
];

const Task1Component = () => {
  const favoriteCount = 0;

  return (
    <section className="page">
      <section className="hero">
        <h1>Task 1 - Áruház</h1>
        <p>Kedvencek száma: {favoriteCount}</p>
      </section>

      <section className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </section>
  );
};

export default Task1Component;
