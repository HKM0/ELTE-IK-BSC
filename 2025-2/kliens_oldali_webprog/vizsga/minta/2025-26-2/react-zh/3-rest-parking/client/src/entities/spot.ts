export type SpotStatus = 'free' | 'occupied';

export interface Spot {
  id: number;
  code: string;
  floor: number;
  place: number;
  row: number;
  col: number;
  status: SpotStatus;
  currentPlate: string | null;
}
