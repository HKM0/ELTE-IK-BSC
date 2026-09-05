import { removeFromCart, toggleSelect, type ItemCategory } from '../state/cartSlice';
import { useAppDispatch, useAppSelector } from '../store';
import AddToCartForm from './AddToCartForm';

interface CartPanelProps {
  newItemName: string;
  newItemWeight: number;
  newItemPrice: number;
  newItemCategory: ItemCategory;
  onNameChange: (value: string) => void;
  onWeightChange: (value: number) => void;
  onPriceChange: (value: number) => void;
  onCategoryChange: (value: ItemCategory) => void;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function CartPanel({
  newItemName,
  newItemWeight,
  newItemPrice,
  newItemCategory,
  onNameChange,
  onWeightChange,
  onPriceChange,
  onCategoryChange,
  onSubmit,
}: CartPanelProps) {
  const isOverBudgetThreshold = false;
  /*const items = [
    { id: '1', name: 'Kenyér', price: 400, weight: 0.5, category: 'food' as ItemCategory, selected: false },
    { id: '2', name: 'Cola', price: 300, weight: 1.5, category: 'drink' as ItemCategory, selected: true },
  ];*/

  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const currentWeight = items.reduce((sum, x) => sum + x.weight, 0);
  const disabled = currentWeight + Number(newItemWeight) > 30;

  return (
    <div className="panel">
      <h3>Kosár ({currentWeight} / 30 kg)</h3>

      <div className="inventoryBar">
        <div className={`inventoryBarFilled${isOverBudgetThreshold ? ' encumbered' : ''}`}
          style={{ width: `${(currentWeight / 30) * 100}%` }} />
      </div>

      <ul className="inventoryList">
        {items.map((item) => (
          <li key={item.id} className={`inventoryItem${item.selected ? ' equipped' : ''}`}>
            <div>
              <span>{item.name} ({item.weight} kg – {item.price} Ft)</span>
              {item.selected && <span className="equippedLabel">[Kiválasztva]</span>}
            </div>
            <div className="inventoryItemButtons">
              {item.category !== 'drink' && (
                <button className="inventoryItemButton" onClick={() => dispatch(toggleSelect(item.id))}>
                  {item.selected ? 'Kivesz' : 'Betesz'}
                </button>
              )}
              <button className="inventoryItemButton removeButton" onClick={() => dispatch(removeFromCart(item.id))}>
                X
              </button>
            </div>
          </li>
        ))}
      </ul>

      <AddToCartForm
        newItemName={newItemName}
        newItemWeight={newItemWeight}
        newItemPrice={newItemPrice}
        newItemCategory={newItemCategory}
        onNameChange={onNameChange}
        onWeightChange={onWeightChange}
        onPriceChange={onPriceChange}
        onCategoryChange={onCategoryChange}
        onSubmit={onSubmit}
        disabled={disabled}
      />
    </div>
  );
}
