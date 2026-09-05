export type PadelPoint = 0 | 15 | 30 | 40;

export type FinishedGame = {
  id: number;
  scoreA: PadelPoint;
  scoreB: PadelPoint;
};

export type Court = {
  id: number;
  name: string;
  bookedBy: string | null;
};
