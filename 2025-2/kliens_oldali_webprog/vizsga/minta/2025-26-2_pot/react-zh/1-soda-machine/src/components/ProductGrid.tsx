import type { Product } from "../types";

type ProductGridProps = {
  products?: Product[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

function ProductGrid({ selectedId, onSelect }: ProductGridProps) {

  return (
    <div className="vending-window">
      <div className="vending-slots">
        {/* TODO (a.): A productsot propként add át, és minden elemét jelenítsd meg */}
          <button
            type="button"
            className={`vending-slot${"A1" === selectedId ? " vending-slot-selected" : ""}`}
            onClick={() => onSelect("A1")}
          >
            <span className="vending-slot-code">A1</span>
            <span className="vending-slot-emoji">🍅</span>
            <span className="vending-slot-name">Paradicsom</span>
            <span className="vending-slot-stock">8 db</span>
          </button>

      </div>
    </div>
  );
}

export default ProductGrid;
