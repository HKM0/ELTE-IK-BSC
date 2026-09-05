export default function TicketStats() {
  const pct = 0;

  return (
    <div className="ticket-stats">
      <span className="stat-badge stat-badge--unused">Nem érvényes: 0</span>
      <span className="stat-badge stat-badge--active">Aktív: 0</span>
      <span className="stat-badge stat-badge--expired">Lejárt: 0</span>
      <div className="stats-progress">
        <div className="progress-bar">
          <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="stats-pct">{pct}%</span>
      </div>
    </div>
  );
}
