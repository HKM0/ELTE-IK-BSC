import type { Borrow } from '../entities';
import { useReturnBookMutation } from '../services/libraryApi';

interface Props {
  borrows: Borrow[];
}

export default function ActivityLog({ borrows }: Props) {
  const [returnBook] = useReturnBookMutation();

  async function handleReturn(borrowId: number) {
    await returnBook({ borrowId, returnedAt: new Date().toISOString() })
  }
  return (
    <div className="panel">
      <h2 className="section-title">Kölcsönzési napló</h2>
      {borrows.length === 0 ? (
        <p className="muted">Nincs kölcsönzési bejegyzés.</p>
      ) : (
        <ul className="activity-list">
          {borrows.map((borrow) => (
            <li key={borrow.id} className="activity-item">
              <span className="activity-item__title">{borrow.bookTitle}</span>
              <p className="activity-item__meta">
                {borrow.borrowerName} · {new Date(borrow.borrowedAt).toLocaleDateString('hu-HU')}
              </p>
              {borrow.returnedAt ? "Visszahozva" : "Aktív"}
              {/* d) Státusz badge: "Aktív" vagy "Visszahozva" */}
              {/* e) Visszahozás gomb: csak ha returnedAt === null */}

              {borrow.returnedAt === null && <button onClick={() => handleReturn(borrow.id)}>Visszahozva</button>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
