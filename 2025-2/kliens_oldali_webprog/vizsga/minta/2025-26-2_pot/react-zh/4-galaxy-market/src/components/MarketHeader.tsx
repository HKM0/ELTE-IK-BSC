export default function MarketHeader() {

  return (
    <div className="market-header">
      <div>
        <h2>🌌 Galaktikus Bróker terminál (TS)</h2>
        <p>Készpénz: <strong>10000 Credits</strong></p>
      </div>
      <div className="market-header__actions">
        <h3>Nettó vagyon: 10000 Credits</h3>
        <button onClick={() => console.log('RANDOMIZE_PRICES')} className="market-button market-button--primary">
          ⏳ Piaci idő telik
        </button>
        <button onClick={() => console.log('RESET_MARKET')} className="market-button market-button--danger">
          🔄 Reset
        </button>
      </div>
    </div>
  );
}
