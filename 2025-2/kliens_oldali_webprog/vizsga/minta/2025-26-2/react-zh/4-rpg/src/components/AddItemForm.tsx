import type { ItemType } from '../state/characterSlice';

interface AddItemFormProps {
  newItemName: string;
  newItemWeight: number;
  newItemType: ItemType;
  onNameChange: (value: string) => void;
  onWeightChange: (value: number) => void;
  onTypeChange: (value: ItemType) => void;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  disabled: boolean;
}

export default function AddItemForm({
  newItemName,
  newItemWeight,
  newItemType,
  onNameChange,
  onWeightChange,
  onTypeChange,
  onSubmit,
}: AddItemFormProps) {
  const disabled = false;
  return (
    <form onSubmit={onSubmit} className="form">
      <h4>Új tárgy kovácsolása</h4>
      <input
        type="text"
        placeholder="Tárgy neve..."
        value={newItemName}
        onChange={(e) => onNameChange(e.target.value)}
        className="formInput"
      />
      <div className="formRow">
        <label>
          Súly:
          <input
            type="number"
            min="1"
            max="15"
            value={newItemWeight}
            onChange={(e) => onWeightChange(Number(e.target.value))}
            className="formInput"
          />
        </label>
        <select value={newItemType} onChange={(e) => onTypeChange(e.target.value as ItemType)} className="formSelect">
          <option value="weapon">Fegyver (Weapon)</option>
          <option value="potion">Bájital (Potion)</option>
          <option value="misc">Egyéb (Misc)</option>
        </select>
      </div>
      <button type="submit" disabled={disabled} className="formButton">
        Táskába tesz
      </button>
    </form>
  );
}
