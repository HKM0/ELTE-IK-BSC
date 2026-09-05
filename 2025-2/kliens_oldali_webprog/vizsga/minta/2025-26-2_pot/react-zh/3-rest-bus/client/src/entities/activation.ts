import type { TicketType } from './ticket';

export interface Activation {
  id: number;
  ticketId: number;
  buyerName: string;
  type: TicketType;
  activatedAt: string;
}
