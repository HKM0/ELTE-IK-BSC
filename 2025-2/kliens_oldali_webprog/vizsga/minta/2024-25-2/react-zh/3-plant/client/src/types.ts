// react-zh/3-plant/client/src/types.ts
export interface Plant {
  id: number;
  name: string;
  species: string;
  waterFrequency: string;
  wateringIntervalDays: number;
  sunlight: string;
  description: string | null;
  imageUrl: string | null;
  lastWateredAt: string | null;
  nextWateringOn: string | null;
  isWatered: boolean;
}

export interface Watering {
  id: number;
  plantId?: number;
  lastWateredAt: string;
  isWatered: boolean;
  notes: string;
}

export interface PlantsResponse {
  total: number;
  limit: number;
  skip: number;
  data: Plant[];
}

export interface WateringsResponse {
  total: number;
  limit: number;
  skip: number;
  data: Watering[];
}
