import type { Product } from "../types";

type PaymentPanelProps = {
  selected: Product | null;
  onPay: () => void;
};

function PaymentPanel({ selected, onPay }: PaymentPanelProps) {

  return (
    <div className="vending-selected-panel">
      <p className="vending-selected-label">Kiválasztott</p>

      <div className="vending-selected">
        {selected ? (
          <>
            <span className="vending-selected-emoji">{selected.emoji}</span>
            <span>
              {selected.name}
              <br />
              {selected.price} Ft
            </span>
          </>
        ) : (
          <span className="vending-selected-empty">—</span>
        )}
      </div>

      <button
        type="button"
        className="vending-pay-btn"
        disabled={!selected?.stock}
        onClick={onPay}
      >
        Fizetés
      </button>
    </div>
  );
}

export default PaymentPanel;
