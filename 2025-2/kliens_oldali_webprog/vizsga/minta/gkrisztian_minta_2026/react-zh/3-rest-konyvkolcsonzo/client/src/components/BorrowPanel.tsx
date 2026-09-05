import { useState } from 'react';
import type { Book } from '../entities';
import { useBorrowBookMutation } from '../services/libraryApi';

interface Props {
  books: Book[];
}

export default function BorrowPanel({ books }: Props) {
  const [selectedBookId, setSelectedBookId] = useState<number | "">("");
  const [borrowerName, setBorrowerName] = useState("");
  const [borrowedAt, setBorrowedAt] = useState(new Date().toISOString().slice(0, 10));

  const [borrowBook] = useBorrowBookMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedBookId || !borrowerName) return;
    // c) Küldj POST /books/:id/borrows kérést a borrowBook mutációval!
    console.log('POST /books/:id/borrows', { selectedBookId, borrowerName, borrowedAt });
    await borrowBook({
      bookId: selectedBookId,
      form: {
        borrowerName,
        borrowedAt: new Date(borrowedAt).toISOString()
      }
    })
    setSelectedBookId("");
    setBorrowerName("");
  }

  return (
    <div className="panel">
      <h2 className="section-title">Kölcsönzés rögzítése</h2>
      <form onSubmit={handleSubmit} className="borrow-form">
        <div className="form-row">
          <label>Könyv</label>
          <select
            className="form-input"
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(Number(e.target.value))}
          >
            <option value="">– válassz –</option>
            {books.filter((b) => b.available).map((b) => (
              <option key={b.id} value={b.id}>{b.title}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>Kölcsönző neve</label>
          <input
            className="form-input"
            type="text"
            placeholder="Teljes névhez..."
            value={borrowerName}
            onChange={(e) => setBorrowerName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Dátum</label>
          <input
            className="form-input"
            type="date"
            value={borrowedAt}
            onChange={(e) => setBorrowedAt(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">Kölcsönzés rögzítése</button>
      </form>
    </div>
  );
}
