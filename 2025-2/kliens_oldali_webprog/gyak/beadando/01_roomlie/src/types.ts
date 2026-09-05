export type TableType = 'snooker' | 'air-hockey' | 'foosball';
export type TableCategory = 'competition' | 'normal' | 'kids';

export interface Position {
  x: number;
  y: number;
}

export interface TableData {
  id: number;
  name: string;
  type: TableType;
  category: TableCategory;
  color: string;
  status: number;
  position: Position;
  'is-locked': boolean;
}