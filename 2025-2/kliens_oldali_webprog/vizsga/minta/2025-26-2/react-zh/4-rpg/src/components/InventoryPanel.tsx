import type { ItemType } from '../state/characterSlice';
import AddItemForm from './AddItemForm';

interface InventoryPanelProps {
  newItemName: string;
  newItemWeight: number;
  newItemType: ItemType;
  onNameChange: (value: string) => void;
  onWeightChange: (value: number) => void;
  onTypeChange: (value: ItemType) => void;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function InventoryPanel({
  newItemName,
  newItemWeight,
  newItemType,
  onNameChange,
  onWeightChange,
  onTypeChange,
  onSubmit,
}: InventoryPanelProps) {
  const isEncumbered = false;
  const inventory =  [
    { id: '1', name: 'Vas kard', weight: 8, type: 'weapon', equipped: true },
    { id: '2', name: 'Gyógyital', weight: 1, type: 'potion', equipped: false },
  ];
  const currentWeight = 9;
  const disabled = currentWeight + Number(newItemWeight) > 30;

  return (
    <div className="panel">
      <h3>Hátizsák ({currentWeight} / 30 kg)</h3>

      <div className="inventoryBar">
        <div className={`inventoryBarFilled${isEncumbered ? ' encumbered' : ''}`} style={{ width: `${(currentWeight / 30) * 100}%` }} />
      </div>

      <ul className="inventoryList">
        {inventory.map((item) => (
          <li key={item.id} className={`inventoryItem${item.equipped ? ' equipped' : ''}`}>
            <div>
              <span>
                {item.name} ({item.weight} kg)
              </span>
              {item.equipped && (
                <span className="equippedLabel">[Felszerelve]</span>
              )}
            </div>
            <div className="inventoryItemButtons">
              {item.type !== 'potion' && (
                <button className="inventoryItemButton" onClick={() => console.log('TOGGLE_EQUIP_ITEM')}>
                  {item.equipped ? 'Levétel' : 'Felvétel'}
                </button>
              )}
              <button className="inventoryItemButton removeButton" onClick={() => console.log('REMOVE_ITEM_FROM_INVENTORY')}>
                X
              </button>
            </div>
          </li>
        ))}
      </ul>

      <AddItemForm
        newItemName={newItemName}
        newItemWeight={newItemWeight}
        newItemType={newItemType}
        onNameChange={onNameChange}
        onWeightChange={onWeightChange}
        onTypeChange={onTypeChange}
        onSubmit={onSubmit}
        disabled={disabled}
      />
    </div>
  );
}
