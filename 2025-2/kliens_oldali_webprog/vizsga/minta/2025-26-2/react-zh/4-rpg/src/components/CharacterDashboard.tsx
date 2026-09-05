import { useState } from 'react';
import type { ItemType } from '../state/characterSlice';
import CharacterHeader from './CharacterHeader';
import AttributePanel from './AttributePanel';
import InventoryPanel from './InventoryPanel';

export default function CharacterDashboard() {
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemWeight, setNewItemWeight] = useState<number>(2);
  const [newItemType, setNewItemType] = useState<ItemType>('weapon');

  const handleAddItem = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Új tárgy hozzáadása:', {
      name: newItemName,
      weight: newItemWeight,
      type: newItemType
    });
    setNewItemName('');
    setNewItemWeight(2);
    setNewItemType('weapon');
  };

  return (
    <div className="app-shell">
      <CharacterHeader />

      <div className="dashboard-grid">
        <AttributePanel />

        <InventoryPanel
          newItemName={newItemName}
          newItemWeight={newItemWeight}
          newItemType={newItemType}
          onNameChange={setNewItemName}
          onWeightChange={setNewItemWeight}
          onTypeChange={setNewItemType}
          onSubmit={handleAddItem}
        />
      </div>
    </div>
  );
}
