export interface Borrow {
  id: number;
  bookId: number;
  borrowerName: string;
  borrowedAt: string;
  returnedAt: string | null;
  bookTitle: string;
  author: string;
}
