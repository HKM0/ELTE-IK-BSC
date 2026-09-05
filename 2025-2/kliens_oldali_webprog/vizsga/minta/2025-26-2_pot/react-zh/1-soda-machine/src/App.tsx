import { useState } from "react";
import "./App.css";
import MachineLayout from "./components/MachineLayout";
import ProductGrid from "./components/ProductGrid";
import PaymentPanel from "./components/PaymentPanel";
import DispenseTray from "./components/DispenseTray";
import type { Product } from "./types";

const INITIAL_PRODUCTS: Product[] = [
  { id: "A1", name: "Paradicsom", emoji: "🍅", price: 350, stock: 8 },
  { id: "A2", name: "Uborka", emoji: "🥒", price: 280, stock: 6 },
  { id: "B1", name: "Répa", emoji: "🥕", price: 220, stock: 10 },
  { id: "B2", name: "Brokkoli", emoji: "🥦", price: 420, stock: 5 },
];

function App() {

  // TODO (c.): a frissíthető készletet a komponens állapotváltozójában tárold
  const products = INITIAL_PRODUCTS;

  // TODO (b.): Oldd meg, egy állapotváltozó segítségével, hogy látszódjon, hogy melyik a kiválasztott termék!
  const selectedId = null;

  const dispensed = null;

  const selected = products.find((product) => product.id === selectedId) ?? null;

  const pay = () => {
    
    if (!selected?.stock) return;

    // TODO (c.): csökkentsd a készletet eggyel, majd az új készletet tárold a komponens állapotváltozójában
    // TODO (d.): állítsd be a kiadott zöldséget (setDispensed)
  };

  return (
    <MachineLayout>
      <div className="vending-main-area">
        <ProductGrid
          selectedId={selectedId}
          onSelect={()=>{/* TODO (b.): Add meg ehelyett a függvény helyett az állapotváltozó setterét */}}
        />
        <PaymentPanel
          selected={selected}
          onPay={pay}
        />
      </div>

      <DispenseTray dispensed={dispensed} />
    </MachineLayout>
  );
}

export default App;
