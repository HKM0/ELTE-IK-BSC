export interface Attributes {
  strength: number;
  agility: number;
  intelligence: number;
}

export default function AttributePanel() {
  const attributes: Attributes = {
    strength: 10,
    agility: 10,
    intelligence: 10,
  };
  const attributePointsToDistribute = 15;
  const attackPower = 20;
  const currentSpeed = 20;
  const isEncumbered = false;
  const attributeKeys = Object.keys(attributes) as Array<keyof Attributes>;

  return (
    <div className="panel">
      <h3>Karakter Statisztikák</h3>
      <p>
        Felosztható pontok: <strong>{attributePointsToDistribute}</strong>
      </p>

      {attributeKeys.map((attr) => (
        <div key={attr} className="attributeRow">
          <span className="capitalize">
            {attr}: {attributes[attr]}
          </span>
          <div className="buttonRow">
            <button className="actionButton" onClick={() => console.log('DECREMENT_ATTRIBUTE')} disabled={attributes[attr] <= 10}>
              -
            </button>
            <button className="actionButton" onClick={() => console.log('INCREMENT_ATTRIBUTE')} disabled={false}>
              +
            </button>
          </div>
        </div>
      ))}

      <hr className="divider" />

      <h4>Származtatott Értékek (Kalkulált)</h4>
      <p>
        ⚔️ Támadóerő: <strong>{attackPower}</strong>{' '}
        <small className="smallText">(Strength alapon + fegyver)</small>
      </p>
      <p className={isEncumbered ? 'statNegative' : 'statPositive'}>
        🏃 Sebesség: <strong>{currentSpeed}</strong> {isEncumbered && '(TÚLTERHELT - LELEASÍTVA!)'}
      </p>
    </div>
  );
}
