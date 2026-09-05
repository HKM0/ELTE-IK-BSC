import type { Book } from '../entities';

interface Props {
  books: Book[];
}

export default function BookList({ books }: Props) {
  return (
    <div className="book-list">
      <h2 className="section-title">Könyvek</h2>
      {books.map((book) => (
        <div
          key={book.id}
          className={`book-item ${book.available ? 'book-item--available' : 'book-item--occupied'}`}
        >
          <p className="book-item__title">{book.title}</p>
          <p className="book-item__author">{book.author} ({book.year})</p>
          {/* b) Állapot megjelenítése: "Szabad" vagy "Kölcsönözve: <name>" */}
          
          <span className={`book-item__status ${book.available ? 'book-item__status--available' : 'book-item__status--occupied'}`}>
            {book.available ? "Szabad" : `Kölcsönzi: ${book.currentBorrower}`}
          </span>
        </div>
      ))}
    </div>
  );
}
