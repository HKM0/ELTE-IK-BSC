import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { TableType, TableCategory } from '../types';

interface AddTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { type: TableType; category: TableCategory; color: string; status: number }) => void;
}

export default function AddTableModal({ isOpen, onClose, onSubmit }: AddTableModalProps) {
  const [formData, setFormData] = useState({
    type: 'snooker' as TableType,
    category: 'normal' as TableCategory,
    color: '#00aa00',
    status: 10
  });

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'status' ? parseInt(value, 10) : value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-card text-card-foreground p-6 rounded-lg w-full max-w-[90%] shadow-lg" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-5 border-b border-border pb-2">Új asztal hozzáadása</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-muted-foreground">Típus:</label>
            <select className="p-2 border border-border rounded focus:ring-ring outline-none" name="type" value={formData.type} onChange={handleChange}>
              <option value="snooker">Biliárd</option>
              <option value="air-hockey">Léghoki</option>
              <option value="foosball">Csocsó</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-muted-foreground">Kategória:</label>
            <select className="p-2 border border-border rounded focus:ring-ring outline-none" name="category" value={formData.category} onChange={handleChange}>
              <option value="competition">Verseny</option>
              <option value="normal">Normál</option>
              <option value="kids">Gyerek</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-muted-foreground">Szín:</label>
            <input className="p-1 border border-border rounded h-10 w-full cursor-pointer" type="color" name="color" value={formData.color} onChange={handleChange} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-muted-foreground">Állapot (1-10):</label>
            <input className="p-2 border border-border rounded focus:ring-ring outline-none" type="number" name="status" min="1" max="10" value={formData.status} onChange={handleChange} required />
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border">
            <button type="button" className="px-4 py-2 bg-secondary text-secondary-foreground rounded transition-colors" onClick={onClose}>Mégse</button>
            <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-colors font-medium">Tovább a lehelyezéshez</button>
          </div>
        </form>
      </div>
    </div>
  );
}