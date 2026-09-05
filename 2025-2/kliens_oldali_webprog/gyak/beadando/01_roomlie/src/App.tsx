import { useState } from 'react';
import initialTables from './data/tables.json';
import type { TableData, TableType, TableCategory } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Room from './components/Room';
import TableDetails from './components/TableDetails';
import AddTableModal from './components/AddTableModal';


function App() {
  // asztal betolt
  const [tables, setTables, saveTables] = useLocalStorage<TableData[]>('roomlie-tables', initialTables as TableData[]);

  // selected asztal id
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  // terem meret
  const [roomSize, setRoomSize] = useState({ width: 800, height: 600 }); // default

  // sidebar / new-table state
  const [activeTab, setActiveTab] = useState<'new' | 'details'>('details');
  const [pendingTableData, setPendingTableData] = useState<Omit<TableData, 'id' | 'position' | 'is-locked'> | null>(null);
  const [newForm, setNewForm] = useState({ type: 'snooker' as TableType, category: 'normal' as TableCategory, color: '#00aa00', status: 10, name: '' });
  const [editingTableId, setEditingTableId] = useState<number | null>(null);

  // modal status
  const [isModalOpen, setIsModalOpen] = useState(false);


  // terem beosztas reset
  const handleResize = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const w = Number(formData.get('width'));
    const h = Number(formData.get('height'));
    if (w > 0 && h > 0) {
      setRoomSize({ width: w, height: h });
      setTables([]); // terem default: megettem az asztalokat xd
      setSelectedTableId(null);
    }
  };

  const updateTablePosition = (id: number, x: number, y: number) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, position: { x, y } } : t));
  };

  const updateTableStatus = (id: number, status: number) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const deleteTable = (id: number) => {
    setTables(prev => prev.filter(t => t.id !== id));
    if (selectedTableId === id) setSelectedTableId(null);
  };
  const handleEditClick = (table: TableData) => {
    setEditingTableId(table.id);
    setNewForm({
      name: table.name,
      type: table.type,
      category: table.category,
      color: table.color,
      status: table.status
    });
    setActiveTab('new');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTableId !== null) {
      setTables(prev => prev.map(t => t.id === editingTableId ? { ...t, ...newForm } : t));
      setEditingTableId(null);
      setNewForm({ type: 'snooker', category: 'normal', color: '#00aa00', status: 10, name: '' });
      setActiveTab('details');
    } else {
      handleAddSubmit(newForm);
    }
  };


  const handleAddSubmit = (data: { type: TableType; category: TableCategory; color: string; status: number; name: string }) => {
    setPendingTableData(data);
    setActiveTab('details');
  };

  const handleRoomClick = (x: number, y: number,) => {
    if (pendingTableData) {

      const newId = tables.length > 0 ? Math.max(...tables.map(t => t.id)) + 1 : 1;
      const newTable: TableData = {
        ...pendingTableData,
        id: newId,
        position: { x, y },
        'is-locked': false
      };

      setTables([...tables, newTable]);
      setPendingTableData(null);
    } else {
      setSelectedTableId(null);
    }
  };

  const selectedTable = tables.find(t => t.id === selectedTableId);

  const toggleLock = (id: number, locked: boolean) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, 'is-locked': locked } : t));
  };

  const handleResetAll = () => {
    setTables(initialTables as TableData[]);
    setSelectedTableId(null);
    setPendingTableData(null);
    setNewForm({ type: 'snooker', category: 'normal', color: '#00aa00', status: 10, name: '' });
    setActiveTab('new');
  };

  // atlag szamitas
  const getAverageStatus = (category: string) => {
    const filtered = tables.filter(t => t.category === category);
    if (filtered.length === 0) return '-';
    const sum = filtered.reduce((acc, table) => acc + table.status, 0);
    return (sum / filtered.length).toFixed(1);
  };

  return (
    <div className="p-5 font-sans max-w-7xl mx-auto bg-background text-foreground">

      {/* cim, mentes, reset */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-border pb-5 mb-5">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-bold text-foreground m-0">Roomlie Teremkezelő</h1>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 bg-primary text-primary-foreground rounded hover:opacity-90" onClick={saveTables}>Mentés</button>
            <button className="px-3 py-2 bg-destructive text-destructive-foreground rounded" onClick={handleResetAll}>Alaphelyzet</button>
          </div>
        </div>

        <form onSubmit={handleResize} className="flex gap-3 items-center">
          <label className="font-bold">Terem mérete (px):</label>
          <input className="p-1.5 border border-border rounded w-20 focus:ring-2 focus:ring-ring outline-none" type="number" name="width" defaultValue={roomSize.width} min="300" required />
          <span>x</span>
          <input className="p-1.5 border border-border rounded w-20 focus:ring-2 focus:ring-ring outline-none" type="number" name="height" defaultValue={roomSize.height} min="300" required />
          <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90">Alkalmaz</button>
        </form>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* room */}
        <main className="flex-2">
          <h2 className="text-2xl mb-2 text-foreground font-semibold">Terem alaprajz</h2>
          {pendingTableData && (
            <div className="bg-muted p-2.5 rounded mb-2.5 border border-border text-foreground">
              <strong>Lehelyezés:</strong> Kattints a teremben az új asztal elhelyezéséhez!
              <button onClick={() => setPendingTableData(null)} className="ml-4 px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">Mégse</button>
            </div>
          )}

          <div className={`border-2 border-dashed border-border rounded-lg relative bg-card overflow-auto max-w-full ${pendingTableData ? 'cursor-crosshair' : ''}`}>
            <Room
              tables={tables}
              selectedTableId={selectedTableId}
              onSelectTable={(id) => {
                setSelectedTableId(id);
                setActiveTab('details');
              }}
              onUpdatePosition={updateTablePosition}
              roomSize={roomSize}
              pendingTableData={pendingTableData}
              onRoomClick={handleRoomClick}
            />
          </div>

          {/* infok alul */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['competition', 'normal', 'kids'] as TableCategory[]).map((c) => {
              const filtered = tables.filter(x => x.category === c);
              const count = filtered.length;
              const avg = getAverageStatus(c);
              return (
                <div key={c} className="flex items-center gap-3 p-3 bg-card border border-border rounded shadow-sm">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: filtered[0]?.color ?? '#ccc' }} />
                  <div className="flex-1 text-sm">
                    <div className="font-medium">{c}</div>
                    <div className="text-xs text-muted-foreground">{count} db • Ø {avg}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* info panel, uj asztal */}
        <aside className="flex-1 border border-border rounded-lg p-4 bg-card shadow-sm">
          <div className="flex gap-2 mb-4">
            <button onClick={() => setIsModalOpen(true)} className="px-3 py-2 rounded bg-muted text-muted-foreground">Új asztal</button>
            <button onClick={() => setActiveTab('details')} className={`px-3 py-2 rounded ${activeTab === 'details' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Asztal adatai</button>
            {editingTableId !== null && (
              <button onClick={() => setActiveTab('new')} className={`px-3 py-2 rounded ${activeTab === 'new' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Szerkesztés</button>
            )}
          </div>

          {activeTab === 'new' && editingTableId !== null && (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
              <label className="font-semibold text-foreground">Név</label>
              <input required value={newForm.name} onChange={(e) => setNewForm(prev => ({ ...prev, name: e.target.value }))} className="p-2 border border-border rounded focus:ring-2 focus:ring-ring outline-none bg-background" />

              <label className="font-semibold text-foreground">Típus</label>
              <select value={newForm.type} onChange={(e) => setNewForm(prev => ({ ...prev, type: e.target.value as TableType }))} className="p-2 border border-border rounded focus:ring-2 focus:ring-ring outline-none bg-background">
                <option value="snooker">Biliárd</option>
                <option value="air-hockey">Léghoki</option>
                <option value="foosball">Csocsó</option>
              </select>

              <label className="font-semibold text-foreground">Kategória</label>
              <select value={newForm.category} onChange={(e) => setNewForm(prev => ({ ...prev, category: e.target.value as TableCategory }))} className="p-2 border border-border rounded focus:ring-2 focus:ring-ring outline-none bg-background">
                <option value="competition">Verseny</option>
                <option value="normal">Normál</option>
                <option value="kids">Gyerek</option>
              </select>

              <label className="font-semibold text-foreground">Szín</label>
              <input type="color" value={newForm.color} onChange={(e) => setNewForm(prev => ({ ...prev, color: e.target.value }))} className="w-20 h-10 p-1 rounded border border-border bg-background" />

              <label className="font-semibold text-foreground">Állapot</label>
              <input type="number" min={1} max={10} value={newForm.status} onChange={(e) => setNewForm(prev => ({ ...prev, status: Number(e.target.value) }))} className="p-2 border border-border rounded w-24 focus:ring-2 focus:ring-ring outline-none bg-background" />

              <div className="flex gap-2 mt-2">
                <button type="submit" className="px-3 py-2 bg-primary text-primary-foreground rounded hover:opacity-90">Módosítás mentése</button>
                <button type="button" className="px-3 py-2 bg-secondary text-secondary-foreground rounded" onClick={() => { setEditingTableId(null); setActiveTab('details'); }}>Mégse</button>
              </div>
            </form>
          )}

          {activeTab === 'details' && (
            <div>
              <TableDetails table={selectedTable} onDelete={deleteTable} onUpdateStatus={updateTableStatus} onToggleLock={toggleLock} onEdit={handleEditClick} />
            </div>
          )}
        </aside>
      </div>
      <AddTableModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={(data) => { setIsModalOpen(false); handleAddSubmit({ ...data, name: 'Új asztal' }); }} />
    </div>
  );
}

export default App;