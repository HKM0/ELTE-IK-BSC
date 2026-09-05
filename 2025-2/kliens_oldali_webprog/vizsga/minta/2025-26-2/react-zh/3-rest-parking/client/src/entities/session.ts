export interface Session {
  id: number;
  spotId: number;
  plate: string;
  parkedAt: string;
  leftAt: string | null;
  notes: string;
  spotCode: string;
  floor: number | null;
}
