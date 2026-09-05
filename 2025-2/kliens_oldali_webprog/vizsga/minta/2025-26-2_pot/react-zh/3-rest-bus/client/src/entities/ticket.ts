export type TicketType = 'single' | '24h' | '72h';
export type TicketStatus = 'unused' | 'active' | 'expired';

export interface Ticket {
  id: number;
  type: TicketType;
  status: TicketStatus;
  buyerName: string;
  purchasedAt: string;
  activatedAt: string | null;
  expiresAt: string | null;
}
