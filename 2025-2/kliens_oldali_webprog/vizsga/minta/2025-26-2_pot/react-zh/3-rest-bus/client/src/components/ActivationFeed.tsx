import activationsData from '../data/activations.json';
import type { ListResponse, Activation } from '../entities';

const TYPE_LABEL: Record<string, string> = {
  single: 'Egyszeri',
  '24h':  '24 órás',
  '72h':  '72 órás',
};

export default function ActivationFeed() {
  const activations = activationsData as ListResponse<Activation>;

  const recent = [...activations.data]
    .sort((a, b) => new Date(b.activatedAt).getTime() - new Date(a.activatedAt).getTime())
    .slice(0, 20);

  return (
    <div className="panel">
      <h2>Érvényesítési napló</h2>
      <div className="feed">
        {recent.length === 0 ? (
          <p className="feed-empty">Még nincs érvényesítés</p>
        ) : (
          <ul className="feed-list">
            {recent.map((a) => (
              <li key={a.id} className="feed-item">
                <div className="feed-item__name">{a.buyerName}</div>
                <div className="feed-item__meta">
                  <span className="feed-item__date">
                    {new Date(a.activatedAt).toLocaleString('hu-HU')}
                  </span>
                  <span className="type-badge">{TYPE_LABEL[a.type] ?? a.type}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
