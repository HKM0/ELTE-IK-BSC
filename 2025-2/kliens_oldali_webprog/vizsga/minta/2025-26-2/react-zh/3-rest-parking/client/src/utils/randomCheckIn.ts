import type { CheckInFormState, Spot } from '../entities';
import { toDatetimeLocalValue } from './datetimeLocal';

const NOTE_SAMPLES = [
  'Vendég parkolás',
  'Délutáni érkezés',
  'Teszt foglalás',
  'Heti bérlet',
  'Egy órás megállás',
];

export const pick = <T,>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)];

export const randomPlate = (): string => {
  const letter = () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `${letter()}${letter()}${letter()}-${Math.floor(100 + Math.random() * 900)}`;
};

export const getFreeOnFloor = (spots: Spot[], floor: number | string): Spot[] =>
  spots
    .filter(
      (s) => s.status === 'free' && Number(s.floor) === Number(floor),
    )
    .sort((a, b) => a.place - b.place);

export const randomCheckInForm = (spots: Spot[]): CheckInFormState => {
  const parkedAt = toDatetimeLocalValue();
  const free = spots.filter((s) => s.status === 'free');

  if (free.length === 0) {
    return {
      floor: '',
      place: '',
      plate: randomPlate(),
      parkedAt,
      notes: pick(NOTE_SAMPLES),
    };
  }

  const floorsWithFree = [...new Set(free.map((s) => s.floor))];
  const floor = pick(floorsWithFree);
  const freeOnFloor = getFreeOnFloor(spots, floor);
  const spot = pick(freeOnFloor);

  return {
    floor: String(floor),
    place: String(spot.id),
    plate: randomPlate(),
    parkedAt,
    notes: pick(NOTE_SAMPLES),
  };
};
