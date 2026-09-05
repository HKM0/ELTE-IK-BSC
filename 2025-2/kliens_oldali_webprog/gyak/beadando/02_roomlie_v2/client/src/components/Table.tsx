import type { TableData } from '../types';

interface TableProps {
    table: TableData;
    isSelected: boolean;
    onSelect: (id: number) => void;
    hasCollision?: boolean;
    onTouchStartDrag?: (id: number, offsetX: number, offsetY: number) => void;
}

// asztal meret tipus szerint 
const TABLE_SIZES = {
    'snooker': { width: 190, height: 100 },
    'air-hockey': { width: 140, height: 70 },
    'foosball': { width: 120, height: 60 }
};

export default function Table({ table, isSelected, onSelect, hasCollision = false, onTouchStartDrag }: TableProps) {
    const size = TABLE_SIZES[table.type];

    const colorOpacity = 0.3 + (table.status / 10) * 0.7;

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        if (table['is-locked']) {
            e.preventDefault();
            return;
        }

        // eltolas szamit
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        e.dataTransfer.setData('text/plain', table.id.toString());
        e.dataTransfer.setData('offsetX', offsetX.toString());
        e.dataTransfer.setData('offsetY', offsetY.toString());

        // drag select
        onSelect(table.id);
    };

    return (
        <div
            className={`
                absolute flex items-center justify-center rounded-md shadow-md box-border transition-all duration-200
                ${table.category === 'competition' ? 'border-8 border-border' : ''}
                ${table.category === 'normal' ? 'border-2 border-border' : ''}
                ${table.category === 'kids' ? 'border-4 border-border border-dotted' : ''}
                ${isSelected ? 'ring-2 ring-ring ring-offset-2 z-10' : ''} 
                ${hasCollision ? 'ring-2 ring-destructive ring-offset-2 animate-pulse' : ''}
            `}
            draggable={!table['is-locked']}
            onDragStart={handleDragStart}
            onClick={(e) => {
                e.stopPropagation(); // nem megy at teremre
                onSelect(table.id);
            }}

            onTouchStart={(e) => {
                if (table['is-locked']) return;
                const touch = e.touches[0];
                const rect = e.currentTarget.getBoundingClientRect();
                const offsetX = touch.clientX - rect.left;
                const offsetY = touch.clientY - rect.top;
                onSelect(table.id);
                if (onTouchStartDrag) {
                    onTouchStartDrag(table.id, offsetX, offsetY);
                }
            }}

            style={{
                left: table.position.x,
                top: table.position.y,
                width: size.width,
                height: size.height,
                backgroundColor: table.color,
                opacity: colorOpacity,
                cursor: table['is-locked'] ? 'not-allowed' : 'pointer',
                touchAction: table['is-locked'] ? 'auto' : 'none'
            }}
        >
            <span className="text-primary-foreground font-bold text-xs drop-shadow-md pointer-events-none text-center wrap-break-word px-1">
                {table.name}
            </span>
        </div>
    );
}