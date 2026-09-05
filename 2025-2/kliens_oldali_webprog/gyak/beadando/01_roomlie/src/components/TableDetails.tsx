import type { TableData } from '../types';
import { useState } from 'react';

interface TableDetailsProps {
    table: TableData | undefined;
    onDelete: (id: number) => void;
    onUpdateStatus: (id: number, status: number) => void;
    onToggleLock: (id: number, locked: boolean) => void;
    onEdit: (table: TableData) => void;
}

export default function TableDetails({ table, onDelete, onUpdateStatus, onToggleLock, onEdit }: TableDetailsProps) {
    const [localStatus, setLocalStatus] = useState<number>(table?.status ?? 5);
    const [locked, setLocked] = useState<boolean>(table?.['is-locked'] ?? false);

    if (!table) {
        return <p className="text-muted-foreground italic">Válassz ki egy asztalt a teremben!</p>;
    }

    // local state sync
    if (localStatus !== table.status) setLocalStatus(table.status);
    if (locked !== table['is-locked']) setLocked(table['is-locked']);

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-foreground">{table.name}</h3>

            <div className="bg-muted p-3 rounded-md border border-border flex items-center gap-4">
                <div className="w-16 h-12 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-md border" style={{ backgroundColor: table.color, display: 'inline-block' }} />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-foreground"><strong>Típus:</strong> {table.type}</p>
                    <p className="text-sm text-foreground"><strong>Kategória:</strong> {table.category}</p>
                    <p className="text-sm text-foreground"><strong>Pozíció:</strong> X: {Math.round(table.position.x)}, Y: {Math.round(table.position.y)}</p>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-semibold text-foreground">Állapot: <span className="text-sm text-muted-foreground">{localStatus}</span></label>
                <input
                    type="range"
                    min={1}
                    max={10}
                    value={localStatus}
                    onChange={(e) => {
                        const v = parseInt(e.target.value, 10);
                        setLocalStatus(v);
                        onUpdateStatus(table.id, v);
                    }}
                    className="w-full accent-primary"
                />
            </div>

            <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={locked}
                        onChange={(e) => {
                            setLocked(e.target.checked);
                            onToggleLock(table.id, e.target.checked);
                        }}
                        className="h-4 w-4 accent-primary"
                    />
                    <span className="text-sm text-foreground">Rögzítés (is-locked)</span>
                </label>
            </div>

            <div className="flex gap-3 mt-3">
                <button className="px-3 py-2 bg-secondary text-secondary-foreground rounded" onClick={() => onEdit(table)}>Asztal adatainak szerkesztése</button>
                <button className="px-3 py-2 bg-destructive text-destructive-foreground rounded hover:opacity-90" onClick={() => onDelete(table.id)}>Törlés</button>
            </div>
        </div>
    );
}
