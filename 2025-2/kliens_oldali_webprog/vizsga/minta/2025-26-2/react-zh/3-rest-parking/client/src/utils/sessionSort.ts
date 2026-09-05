import type { Session } from '../entities';

/** Utolsó esemény ideje: kiálláskor leftAt, egyébként parkedAt. */
export const sessionActionAt = (session: Session): number =>
  session.leftAt != null
    ? new Date(session.leftAt).getTime()
    : new Date(session.parkedAt).getTime();

/** Napló: legutóbbi esemény felül (be- vagy kiállás), azonos időnél nagyobb id. */
export const sortSessionsForFeed = (sessions: Session[]): Session[] =>
  [...sessions].sort(
    (a, b) => sessionActionAt(b) - sessionActionAt(a) || b.id - a.id,
  );
