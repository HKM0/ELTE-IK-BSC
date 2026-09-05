export interface OccupancyStats {
  occupied: number;
  free: number;
  total: number;
}

export interface CheckInFormState {
  floor: string;
  place: string;
  plate: string;
  parkedAt: string;
  notes: string;
}

export interface CheckInRequest {
  spotId: number;
  plate: string;
  parkedAt: string;
  notes?: string;
}

export interface CheckOutRequest {
  spotId: number;
  leftAt: string;
  notes?: string;
}

export type FormErrors = Partial<Record<keyof CheckInFormState, string>>;
