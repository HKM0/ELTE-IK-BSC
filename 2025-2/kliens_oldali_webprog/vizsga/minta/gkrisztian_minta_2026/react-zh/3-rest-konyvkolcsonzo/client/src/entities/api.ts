export type ListResponse<T> = { total: number; limit: number; skip: number; data: T[] };
export type ApiTag = 'Books' | 'Borrows';
