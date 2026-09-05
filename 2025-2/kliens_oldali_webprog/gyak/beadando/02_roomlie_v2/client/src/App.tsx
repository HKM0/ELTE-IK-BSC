import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import type { TableData, TableType, TableCategory } from './types';
import Room from './components/Room';
import TableDetails from './components/TableDetails';
import AddTableModal from './components/AddTableModal';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { useAppSelector } from "./store/hooks";
import { selectUser } from './store/authSlice';
import { useGetTablesQuery, useUpdateTableMutation, useDeleteTableMutation, useCreateTableMutation, useUpdateTablePositionMutation } from './store/roomlieApi'; import BookingForm from './components/BookingForm';
import MyBookingsPage from './components/MyBookingsPage';
import AdminBookingsPage from './components/AdminBookingsPage';
import Toast from './components/Toast';
import { useAppDispatch } from './store/hooks';
import { showToast } from './store/toastSlice';

function App() {

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  // asztal betolt
  //const [tables, setTables, saveTables] = useLocalStorage<TableData[]>('roomlie-tables', initialTables as TableData[]);
  const { data: tables = [], isLoading } = useGetTablesQuery();

  const [updateTable] = useUpdateTableMutation();
  const [updateTablePositionMutation] = useUpdateTablePositionMutation();
  const [deleteTableMutation] = useDeleteTableMutation();
  const [createTable] = useCreateTableMutation();

  // selected asztal id
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  // terem meret
  const [roomSize] = useState({ width: 800, height: 600 }); // default

  // sidebar / new-table state
  const [activeTab, setActiveTab] = useState<'new' | 'details'>('details');
  const [pendingTableData, setPendingTableData] = useState<Omit<TableData, 'id' | 'position' | 'is-locked'> | null>(null);
  const [newForm, setNewForm] = useState({ type: 'snooker' as TableType, category: 'normal' as TableCategory, color: '#00aa00', status: 10, name: '', 'is-locked': false, position: { x: 0, y: 0 } });
  const [editingTableId, setEditingTableId] = useState<number | null>(null);

  // modal status
  const [isModalOpen, setIsModalOpen] = useState(false);

  //user
  const isAdmin = user?.role === 'admin';
  //const isUser = user?.role === 'user';
  const isVisitor = !user;

  // terem beosztas reset
  /*
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
  */

  const updateTablePosition = async (id: number, x: number, y: number) => {
    if (!isAdmin) return;
    await updateTablePositionMutation({ id, x, y });
    if (editingTableId === id) {
      setNewForm(prev => ({ ...prev, position: { x: Math.round(x), y: Math.round(y) } }));
    }
  };


  const updateTableStatus = async (id: number, status: number) => {
    if (!isAdmin) return;
    await updateTable({ id, status });
    if (editingTableId === id) {
      setNewForm(prev => ({ ...prev, status }));
    }
  };

  const deleteTable = async (id: number) => {
    if (!isAdmin) return;
    await deleteTableMutation(id);
    if (selectedTableId === id) setSelectedTableId(null);
  };

  const handleEditClick = (table: TableData) => {
    setEditingTableId(table.id);
    setNewForm({
      name: table.name,
      type: table.type,
      category: table.category,
      color: table.color,
      status: table.status,
      'is-locked': table['is-locked'],
      position: table.position
    });
    setActiveTab('new');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTableId !== null && isAdmin) {
      try {
        await updateTable({ id: editingTableId, ...newForm }).unwrap();
        dispatch(showToast({ message: 'Asztal sikeresen módosítva!', type: 'success' }));
        setEditingTableId(null);
        setNewForm({ type: 'snooker', category: 'normal', color: '#00aa00', status: 10, name: '', 'is-locked': false, position: { x: 0, y: 0 } });
        setActiveTab('details');
      } catch {
        dispatch(showToast({ message: 'Sikertelen módosítás!', type: 'error' }));
      }
    }
  };

  const handleAddSubmit = (data: { type: TableType; category: TableCategory; color: string; status: number; name: string }) => {
    if (!isAdmin) return;
    setPendingTableData(data);
  };

  const handleRoomClick = async (x: number, y: number) => {
    if (pendingTableData && isAdmin) {
      try {
        await createTable({ ...pendingTableData, position: { x: Math.round(x), y: Math.round(y) }, 'is-locked': false }).unwrap();
        dispatch(showToast({ message: 'Asztal sikeresen létrehozva!', type: 'success' }));
        setPendingTableData(null);
      } catch {
        dispatch(showToast({ message: 'Sikertelen létrehozás!', type: 'error' }));
      }
    } else {
      setSelectedTableId(null);
    }
  };

  const toggleLock = async (id: number, locked: boolean) => {
    if (!isAdmin) return;
    await updateTable({ id, 'is-locked': locked });
    if (editingTableId === id) {
      setNewForm(prev => ({ ...prev, 'is-locked': locked }));
    }
  };

  /*
  const handleResetAll = () => {
    setTables(initialTables as TableData[]);
    setSelectedTableId(null);
    setPendingTableData(null);
    setNewForm({ type: 'snooker', category: 'normal', color: '#00aa00', status: 10, name: '' });
    setActiveTab('new');
  };
  */

  // atlag szamitas
  const getAverageStatus = (category: string) => {
    const filtered = tables.filter(t => t.category === category);
    if (filtered.length === 0) return '-';
    const sum = filtered.reduce((acc, table) => acc + table.status, 0);
    return (sum / filtered.length).toFixed(1);
  };

  const selectedTable = tables.find(t => t.id === selectedTableId);

  if (isLoading) {
    return <div className="p-5 text-center text-muted-foreground">Terem adatok betöltése...</div>;
  }

  return (
    <BrowserRouter>
      <div className="p-5 font-sans max-w-7xl mx-auto bg-background text-foreground">
        <Navbar />

        <Routes>
          <Route path="/" element={
            <div className="flex flex-col lg:flex-row gap-8">
              {/* room */}
              <main className="flex-2">
                {/* cim, mentes, reset */}
                <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-border pb-5 mb-5">
                  <h1 className="text-3xl font-bold text-foreground m-0">Roomlie Teremkezelő</h1>
                </header>

                <h2 className="text-2xl mb-2 text-foreground font-semibold">Terem alaprajz</h2>
                {pendingTableData && (
                  <div className="bg-muted p-2.5 rounded mb-2.5 border border-border text-foreground">
                    <strong>Lehelyezés:</strong> Kattints a teremben az új asztal elhelyezéséhez!
                    <button onClick={() => setPendingTableData(null)} className="ml-4 px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">Mégse</button>
                  </div>
                )}

                <div className="border-2 border-dashed border-border rounded-lg relative bg-card overflow-auto max-w-full">
                  <Room
                    tables={!isAdmin ? tables.map(t => ({ ...t, 'is-locked': true })) : tables}
                    selectedTableId={selectedTableId}
                    onSelectTable={(id) => {
                      if (isVisitor) return;
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
              {!isVisitor && (
                <aside className="flex-1 border border-border rounded-lg p-4 bg-card shadow-sm">
                  <div className="flex gap-2 mb-4">
                    {isAdmin && <button onClick={() => setIsModalOpen(true)} className="px-3 py-2 rounded bg-muted text-muted-foreground">Új asztal</button>}
                    <button onClick={() => setActiveTab('details')} className={`px-3 py-2 rounded ${activeTab === 'details' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Asztal adatai</button>
                    {isAdmin && editingTableId !== null && (
                      <button onClick={() => setActiveTab('new')} className={`px-3 py-2 rounded ${activeTab === 'new' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Szerkesztés</button>
                    )}
                  </div>

                  {activeTab === 'new' && editingTableId !== null && isAdmin && (
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
                      <select value={newForm.color} onChange={(e) => setNewForm(prev => ({ ...prev, color: e.target.value }))} className="p-2 border border-border rounded focus:ring-2 focus:ring-ring outline-none bg-background">
                        <option value="red">Piros (red)</option>
                        <option value="green">Zöld (green)</option>
                        <option value="blue">Kék (blue)</option>
                        <option value="yellow">Sárga (yellow)</option>
                        <option value="purple">Lila (purple)</option>
                      </select>

                      <label className="font-semibold text-foreground">Állapot</label>
                      <input type="number" min={1} max={10} value={newForm.status} onChange={(e) => setNewForm(prev => ({ ...prev, status: Number(e.target.value) }))} className="p-2 border border-border rounded w-24 focus:ring-2 focus:ring-ring outline-none bg-background" />

                      <div className="flex flex-col gap-2 border-t border-border pt-3 mt-1">
                        <label className="flex items-center gap-2 font-semibold text-foreground cursor-pointer">
                          <input type="checkbox" checked={newForm['is-locked']} onChange={(e) => setNewForm(prev => ({ ...prev, 'is-locked': e.target.checked }))} className="h-4 w-4 accent-primary" />
                          Rögzítés (is-locked)
                        </label>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs font-semibold text-muted-foreground block">Pozíció X</label>
                            <input type="number" value={Math.round(newForm.position.x)} onChange={(e) => setNewForm(prev => ({ ...prev, position: { ...prev.position, x: Number(e.target.value) } }))} className="p-1 border border-border rounded w-full text-sm bg-background" />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-muted-foreground block">Pozíció Y</label>
                            <input type="number" value={Math.round(newForm.position.y)} onChange={(e) => setNewForm(prev => ({ ...prev, position: { ...prev.position, y: Number(e.target.value) } }))} className="p-1 border border-border rounded w-full text-sm bg-background" />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-2">
                        <button type="submit" className="px-3 py-2 bg-primary text-primary-foreground rounded hover:opacity-90">Módosítás mentése</button>
                        <button type="button" className="px-3 py-2 bg-secondary text-secondary-foreground rounded" onClick={() => { setEditingTableId(null); setActiveTab('details'); }}>Mégse</button>
                      </div>
                    </form>
                  )}

                  {activeTab === 'details' && (
                    <div>
                      {isAdmin ? (
                        <TableDetails table={selectedTable} onDelete={deleteTable} onUpdateStatus={updateTableStatus} onToggleLock={toggleLock} onEdit={handleEditClick} />
                      ) : (
                        selectedTable && (
                          <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-foreground">{selectedTable.name}</h3>
                            <p className="text-sm"><strong>Típus:</strong> {selectedTable.type}</p>
                            <p className="text-sm"><strong>Kategória:</strong> {selectedTable.category}</p>
                            <BookingForm tableId={selectedTable.id} />
                          </div>
                        )
                      )}
                    </div>
                  )}
                </aside>
              )}
            </div>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/admin-bookings" element={<AdminBookingsPage />} />
        </Routes>
      </div>
      <AddTableModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={(data) => { setIsModalOpen(false); handleAddSubmit({ ...data, name: 'Új asztal' }); }} />
      <Toast />
    </BrowserRouter>
  );
}

export default App;