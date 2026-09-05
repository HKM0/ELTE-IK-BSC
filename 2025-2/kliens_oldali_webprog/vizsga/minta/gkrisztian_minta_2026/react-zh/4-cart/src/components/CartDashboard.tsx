import { useState } from 'react';
import { addToCart, type ItemCategory } from '../state/cartSlice';
import CartHeader from './CartHeader';
import BudgetPanel from './BudgetPanel';
import CartPanel from './CartPanel';
import { useAppDispatch } from '../store';

export default function CartDashboard() {
  const dispatch = useAppDispatch();
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemWeight, setNewItemWeight] = useState<number>(0.5);
  const [newItemPrice, setNewItemPrice] = useState<number>(500);
  const [newItemCategory, setNewItemCategory] = useState<ItemCategory>('food');

  const handleAddItem = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('ADD_TO_CART', { name: newItemName, weight: newItemWeight, price: newItemPrice, category: newItemCategory });

    dispatch(addToCart({
      name: newItemName,
      weight: newItemWeight,
      price: newItemPrice,
      category: newItemCategory
    }))
    
    setNewItemName('');
    setNewItemWeight(0.5);
    setNewItemPrice(500);
    setNewItemCategory('food');
  };

  return (
    <div className="app-shell">
      <CartHeader />
      <div className="dashboard-grid">
        <BudgetPanel />
        <CartPanel
          newItemName={newItemName}
          newItemWeight={newItemWeight}
          newItemPrice={newItemPrice}
          newItemCategory={newItemCategory}
          onNameChange={setNewItemName}
          onWeightChange={setNewItemWeight}
          onPriceChange={setNewItemPrice}
          onCategoryChange={setNewItemCategory}
          onSubmit={handleAddItem}
        />
      </div>
    </div>
  );
}
