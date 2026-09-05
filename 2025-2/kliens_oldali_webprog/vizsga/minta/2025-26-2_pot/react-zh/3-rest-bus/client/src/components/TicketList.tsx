import type { Ticket, TicketStatus, TicketType } from '../entities';

const TYPE_LABEL: Record<TicketType, string> = {
  single: 'Egyszeri',
  '24h':  '24 órás',
  '72h':  '72 órás',
};

const STATUS_LABEL: Record<TicketStatus, string> = {
  unused:  'Nem érvényes',
  active:  'Aktív',
  expired: 'Lejárt',
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleString('hu-HU', { dateStyle: 'short', timeStyle: 'short' });

function TicketRow({ ticket }: { ticket: Ticket }) {
  const isLoading = false;

  function handleActivate() {
    // TODO: érvényesítsd a jegyet a szerveren (PATCH /tickets/{id}/activate)
    console.log('aktiválás:', ticket.id);
  }

  return (
    <tr>
      <td>{ticket.buyerName}</td>
      <td><span className="type-badge">{TYPE_LABEL[ticket.type]}</span></td>
      <td>
        <span className={`badge badge--${ticket.status}`}>
          {STATUS_LABEL[ticket.status]}
        </span>
      </td>
      <td>{new Date(ticket.purchasedAt).toLocaleDateString('hu-HU')}</td>
      <td>
        {ticket.expiresAt ? (
          <span className={`expires--${ticket.status}`}>{fmt(ticket.expiresAt)}</span>
        ) : (
          '—'
        )}
      </td>
      <td>
        {ticket.status === 'unused' && (
          <button
            className="btn btn-primary btn-sm"
            disabled={isLoading}
            onClick={handleActivate}
          >
            Érvényesítés
          </button>
        )}
      </td>
    </tr>
  );
}

export default function TicketList({ tickets }: { tickets: Ticket[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Utas neve</th>
          <th>Típus</th>
          <th>Státusz</th>
          <th>Vásárolva</th>
          <th>Lejárat</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <TicketRow key={t.id} ticket={t} />
        ))}
      </tbody>
    </table>
  );
}
