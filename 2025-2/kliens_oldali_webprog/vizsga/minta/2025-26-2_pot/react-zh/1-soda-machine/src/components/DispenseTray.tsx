import type { Product } from "../types";

type DispenseTrayProps = {
  dispensed: Product | null;
};

function DispenseTray({ dispensed }: DispenseTrayProps) {
  void dispensed;

  return (
    <div className="vending-bottom-area">
      <p className="vending-tray-label">Kiadónyílás</p>
      <div className="vending-tray">

        {/*TODO (e.): feltételes megjelenítés – ha van item, emoji + név, különben hint */}
          <span className="vending-tray-item">🥒</span>
          <p className="vending-tray-hint">Ide esik ki a zöldség</p>
      </div>
    </div>
  );
}

export default DispenseTray;
