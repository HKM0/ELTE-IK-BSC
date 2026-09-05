import type { ItemCategory } from '../state/cartSlice';

interface AddToCartFormProps {
  newItemName: string;
  newItemWeight: number;
  newItemPrice: number;
  newItemCategory: ItemCategory;
  onNameChange: (value: string) => void;
  onWeightChange: (value: number) => void;
  onPriceChange: (value: number) => void;
  onCategoryChange: (value: ItemCategory) => void;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  disabled: boolean;
}

export default function AddToCartForm({
  newItemName, newItemWeight, newItemPrice, newItemCategory,
  onNameChange, onWeightChange, onPriceChange, onCategoryChange,
  onSubmit, disabled
}: AddToCartFormProps) {
  return (
    <form onSubmit={onSubmit} className="form">
      <h4>Új termék hozzáadása</h4>
      <input type="text" placeholder="Termék neve..." value={newItemName} onChange={(e) => onNameChange(e.target.value)} className="formInput" />
      <div className="formRow">
        <label>Súly (kg):
          <input type="number" min="0.1" step="0.1" max="15" value={newItemWeight} onChange={(e) => onWeightChange(Number(e.target.value))} className="formInput" />
        </label>
        <label>Ár (Ft):
          <input type="number" min="1" value={newItemPrice} onChange={(e) => onPriceChange(Number(e.target.value))} className="formInput" />
        </label>
      </div>
      <select value={newItemCategory} onChange={(e) => onCategoryChange(e.target.value as ItemCategory)} className="formSelect">
        <option value="food">Étel</option>
        <option value="drink">Ital</option>
        <option value="other">Egyéb</option>
      </select>
      <button type="submit" disabled={disabled} className="formButton">Kosárba tesz</button>
    </form>
  );
}
