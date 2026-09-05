import type { TicketType } from './ticket';

export interface BuyTicketFormState {
  buyerName: string;
  type: TicketType;
  purchasedAt: string;
}

export interface BuyTicketRequest {
  buyerName: string;
  type: TicketType;
  purchasedAt: string;
}

export interface ActivateRequest {
  activatedAt: string;
}

export type FormErrors = Partial<Record<keyof BuyTicketFormState, string>>;
