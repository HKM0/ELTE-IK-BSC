import type { Spot } from '../entities';

/** Emeletek a szerver spot adataiból (−1 felül, alul mélyebb szint). */
export const getFloorsFromSpots = (spots: Spot[]): number[] => {
  if (!spots.length) return [-1, -2, -3];
  return [...new Set(spots.map((s) => s.floor))].sort((a, b) => b - a);
};
