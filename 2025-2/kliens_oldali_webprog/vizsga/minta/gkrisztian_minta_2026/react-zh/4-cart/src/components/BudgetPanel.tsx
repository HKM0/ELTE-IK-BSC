import { useAppSelector } from "../store";

export default function BudgetPanel() {

  const {items, budget} = useAppSelector((state) => state.cart);
  //const budget = 15000;
  const totalPrice = items.reduce((sum, x) => sum + x.price, 0);
  const isOverBudgetThreshold = budget < totalPrice;
  const finalPrice = isOverBudgetThreshold ? Math.round(totalPrice * 0.9) : totalPrice;

  return (
    <div className="panel">
      <h3>Összesítő</h3>
      <p>Keret: <strong>{budget} Ft</strong></p>
      <hr className="divider" />
      <h4>Számított értékek</h4>
      <p>
        🛒 Végösszeg: <strong>{totalPrice} Ft</strong>{' '}
        <small className="smallText">(összes termék ára)</small>
      </p>
      <p className={isOverBudgetThreshold ? 'statNegative' : 'statPositive'}>
        💰 Fizetendő: <strong>{finalPrice} Ft</strong>
        {isOverBudgetThreshold && ' (−10% kedvezmény!)'}
      </p>
    </div>
  );
}
