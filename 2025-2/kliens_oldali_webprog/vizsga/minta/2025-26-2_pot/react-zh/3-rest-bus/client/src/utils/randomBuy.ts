import type { BuyTicketFormState, TicketType } from '../entities';
import { toDatetimeLocalValue } from './datetimeLocal';

const BUYER_NAMES = [
  'Kiss Péter', 'Nagy Zsuzsa', 'Kovács Béla', 'Szabó Anna',
  'Horváth Tamás', 'Varga Erzsébet', 'Tóth László', 'Farkas Katalin',
  'Molnár Gábor', 'Fekete Mária', 'Pap István', 'Balogh Júlia',
];

const TYPES: TicketType[] = ['single', '24h', '72h'];

const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export const randomBuyForm = (): BuyTicketFormState => ({
  buyerName: pick(BUYER_NAMES),
  type: pick(TYPES),
  purchasedAt: toDatetimeLocalValue(),
});
