import booksData from './data/books.json';
import borrowsData from './data/borrows.json';
import BookList from './components/BookList';
import BorrowPanel from './components/BorrowPanel';
import ActivityLog from './components/ActivityLog';
import type { ListResponse, Book, Borrow } from './entities';
import './index.css';
import { useGetBooksQuery, useGetBorrowsQuery } from './services/libraryApi';

function App() {
  
  // SELECT data as booksData FROM valami (SQLben)
  const { data: booksData, isLoading, isError } = useGetBooksQuery();
  const { data: borrowsData } = useGetBorrowsQuery();

  const books = booksData?.data ?? [];
  const borrows = borrowsData?.data ?? [];

  if (isLoading) return <div className="loading">Betöltés...</div>;
  if (isError) return <div className="error">Hiba a betöltés során.</div>;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Könyvkölcsönző</h1>
      </header>
      <div className="app-body">
        <BookList books={books} />
        <div className="app-right-panel">
          {/* c) Foglalás gomb küldjön POST-ot */}
          <BorrowPanel books={books} />
          {/* d) Töltsd be a kölcsönzéseket (GET /borrows)! */}
          <ActivityLog borrows={borrows} />
        </div>
      </div>
    </div>
  );
}

export default App;
