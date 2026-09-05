import type { Session } from '../entities';
import { sessionActionAt, sortSessionsForFeed } from '../utils/sessionSort';
import sessionsData from '../data/sessions.json';
const isActive = (session: Session): boolean => session.leftAt == null;

const ActivityFeed = () => {
  const sessions = sessionsData;

  const recent = sortSessionsForFeed(sessions?.data ?? []).slice(0, 20);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <p className="shrink-0 border-b border-slate-100 px-4 py-2.5 text-xs font-medium text-slate-500">
        Napló
      </p>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <ul className="divide-y divide-slate-100">
          {recent.length === 0 && (
            <li className="p-6 text-center text-sm text-slate-400">
              Még nincs esemény
            </li>
          )}
          {recent.map((s) => {
            const active = isActive(s);

            return (
              <li key={s.id} className="px-4 py-3 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-base font-semibold text-slate-800">
                    {s.plate}
                  </span>
                  <span
                    className={`badge badge-sm ${active ? 'badge-warning' : 'badge-ghost'}`}
                  >
                    {active ? 'Aktív' : 'Lezárva'}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  {s.spotCode}
                  {s.floor != null ? ` · ${s.floor}. emelet` : ''}
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(sessionActionAt(s)).toLocaleString('hu-HU')}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ActivityFeed;
