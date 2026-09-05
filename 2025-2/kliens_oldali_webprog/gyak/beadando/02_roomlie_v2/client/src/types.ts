export type TableType = 'snooker' | 'air-hockey' | 'foosball';
export type TableCategory = 'competition' | 'normal' | 'kids';
export type UserRole = 'visitor' | 'user' | 'admin';
export type BookingStatus = 'pending' | 'accepted' | 'declined';

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

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Booking {
  tableName: string | undefined;
  id: number;
  tableId: number;
  date: string;
  timeslot: string;
  name: string;
  email: string;
  phone: string;
  headcount: number;
  notes?: string;
  status: BookingStatus;
  table?: TableData;
}