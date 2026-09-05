import type { TableData } from '../types';
import Table from './Table';
import { useState } from 'react';

interface RoomProps {
  tables: TableData[];
  selectedTableId: number | null;
  onSelectTable: (id: number | null) => void;
  onUpdatePosition: (id: number, x: number, y: number) => void;
  roomSize: { width: number; height: number };
  pendingTableData?: Omit<TableData, 'id' | 'position' | 'is-locked'> | null;
  onRoomClick?: (x: number, y: number, isCollision: boolean) => void;
}

// konstansok asztol korul
const SPACING = {
  'snooker': 50,
  'air-hockey': 40,
  'foosball': 30
};

const TABLE_SIZES = {
  'snooker': { width: 190, height: 100 },
  'air-hockey': { width: 140, height: 70 },
  'foosball': { width: 120, height: 60 }
};

export default function Room({ tables, selectedTableId, onSelectTable, onUpdatePosition, roomSize, pendingTableData, onRoomClick }: RoomProps) {
  const [activeTouchDrag, setActiveTouchDrag] = useState<{ id: number; offsetX: number; offsetY: number } | null>(null);

  const checkCollision = (table: TableData) => {
    const size = TABLE_SIZES[table.type];
    const spacing = SPACING[table.type];

    // oldal utkozes
    if (
      table.position.x - spacing < 0 ||
      table.position.y - spacing < 0 ||
      table.position.x + size.width + spacing > roomSize.width ||
      table.position.y + size.height + spacing > roomSize.height
    ) {
      return true;
    }

    // asztal utkozes
    for (const other of tables) {
      if (other.id === table.id) continue;

      const otherSize = TABLE_SIZES[other.type];
      const otherSpacing = SPACING[other.type];

      const rect1 = {
        left: table.position.x - spacing,
        right: table.position.x + size.width + spacing,
        top: table.position.y - spacing,
        bottom: table.position.y + size.height + spacing
      };

      const rect2 = {
        left: other.position.x - otherSpacing,
        right: other.position.x + otherSize.width + otherSpacing,
        top: other.position.y - otherSpacing,
        bottom: other.position.y + otherSize.height + otherSpacing
      };

      if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
      ) {
        return true;
      }
    }
    return false;
  };

  const checkPhysicalCollision = (table: TableData) => {
    const size = TABLE_SIZES[table.type];

    // terem kint check
    if (
      table.position.x < 0 ||
      table.position.y < 0 ||
      table.position.x + size.width > roomSize.width ||
      table.position.y + size.height > roomSize.height
    ) {
      return true;
    }

    // egymasra rakas check
    for (const other of tables) {
      if (other.id === table.id) continue;
      const otherSize = TABLE_SIZES[other.type];

      if (
        table.position.x < other.position.x + otherSize.width &&
        table.position.x + size.width > other.position.x &&
        table.position.y < other.position.y + otherSize.height &&
        table.position.y + size.height > other.position.y
      ) {
        return true;
      }
    }
    return false;
  };



  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const idStr = e.dataTransfer.getData('text/plain');
    if (!idStr) return;

    const id = parseInt(idStr, 10);
    const offsetX = parseFloat(e.dataTransfer.getData('offsetX')) || 0;
    const offsetY = parseFloat(e.dataTransfer.getData('offsetY')) || 0;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - offsetX;
    const y = e.clientY - rect.top - offsetY;

    const targetTable = tables.find(t => t.id === id);
    if (!targetTable) return;

    const tempTable = { ...targetTable, position: { x, y } };

    if (!checkPhysicalCollision(tempTable)) {
      onUpdatePosition(id, x, y);
    }

    //onUpdatePosition(id, x, y);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // dragdrop-hoz kell
  };

  const handleRoomClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pendingTableData && onRoomClick) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const testTable: TableData = {
        ...pendingTableData,
        id: -1,
        position: { x, y },
        'is-locked': false
      };

      if (checkPhysicalCollision(testTable)) {
        return; // lerakas utkozes block
      }

      onRoomClick(x, y, checkCollision(testTable));
    } else {
      onSelectTable(null);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!activeTouchDrag) return;

    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left - activeTouchDrag.offsetX;
    const y = touch.clientY - rect.top - activeTouchDrag.offsetY;

    const targetTable = tables.find(t => t.id === activeTouchDrag.id);
    if (!targetTable) return;

    const tempTable = { ...targetTable, position: { x, y } };

    if (!checkPhysicalCollision(tempTable)) {
      onUpdatePosition(activeTouchDrag.id, x, y);
    }
  };

  const handleTouchEnd = () => {
    setActiveTouchDrag(null);
  };

  return (
    // ures resz kattinva, unselect
    <div
      className="absolute top-0 left-0 w-full h-full overflow-hidden"
      onClick={handleRoomClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ width: roomSize.width, height: roomSize.height, position: 'relative' }}
    >
      {tables.map((table) => (
        <Table
          key={table.id}
          table={table}
          isSelected={table.id === selectedTableId}
          onSelect={onSelectTable}
          hasCollision={checkCollision(table)}
          onTouchStartDrag={(id, offsetX, offsetY) => setActiveTouchDrag({ id, offsetX, offsetY })}
        />
      ))}
    </div>
  );
}