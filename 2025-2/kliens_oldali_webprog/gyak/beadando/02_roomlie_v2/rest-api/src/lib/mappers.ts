import type { UserModel } from '../../prisma/generated/prisma/models/User.js'
import type { BookingModel } from '../../prisma/generated/prisma/models/Booking.js'
import type { TableModel } from '../../prisma/generated/prisma/models/Table.js'

type TableType = 'snooker' | 'air-hockey' | 'foosball'
type TableCategory = 'competition' | 'normal' | 'kids'
type TableColor = 'red' | 'green' | 'blue' | 'yellow' | 'purple'
type BookingStatus = 'pending' | 'accepted' | 'declined'
type UserRole = 'user' | 'admin'

type UserDto = {
  id: number
  name: string
  email: string
  role: UserRole
}

type TableDto = {
  id: number
  name: string
  type: TableType
  category: TableCategory
  color: TableColor
  status: number
  position: { x: number; y: number }
  isLocked: boolean
}

type BookingDto = {
  id: number
  tableId: number
  tableName: string
  userId: number
  date: string
  startTime: string
  endTime: string
  name: string
  email: string
  phone: string
  headcount: number
  notes?: string
  status: BookingStatus
}

// ─── Table type / category / color ─────────────────────────────────────────

const TABLE_TYPE_TO_CLIENT: Record<string, TableType> = {
  SNOOKER: 'snooker',
  AIR_HOCKEY: 'air-hockey',
  FOOSBALL: 'foosball',
}
const TABLE_TYPE_TO_DB: Record<TableType, string> = {
  snooker: 'SNOOKER',
  'air-hockey': 'AIR_HOCKEY',
  foosball: 'FOOSBALL',
}
const CATEGORY_TO_CLIENT: Record<string, TableCategory> = {
  COMPETITION: 'competition',
  NORMAL: 'normal',
  KIDS: 'kids',
}
const CATEGORY_TO_DB: Record<TableCategory, string> = {
  competition: 'COMPETITION',
  normal: 'NORMAL',
  kids: 'KIDS',
}
const COLOR_TO_CLIENT: Record<string, TableColor> = {
  RED: 'red',
  GREEN: 'green',
  BLUE: 'blue',
  YELLOW: 'yellow',
  PURPLE: 'purple',
}
const COLOR_TO_DB: Record<TableColor, string> = {
  red: 'RED',
  green: 'GREEN',
  blue: 'BLUE',
  yellow: 'YELLOW',
  purple: 'PURPLE',
}
const STATUS_TO_CLIENT: Record<string, BookingStatus> = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
}
const STATUS_TO_DB: Record<BookingStatus, string> = {
  pending: 'PENDING',
  accepted: 'ACCEPTED',
  declined: 'DECLINED',
}

function toClientTableType(value: string): TableType {
  const mapped = TABLE_TYPE_TO_CLIENT[value] ?? value.toLowerCase()
  if (mapped === 'snooker' || mapped === 'air-hockey' || mapped === 'foosball') return mapped
  throw new Error(`Unknown table type in DB: ${value}`)
}

function toClientCategory(value: string): TableCategory {
  const mapped = CATEGORY_TO_CLIENT[value] ?? value.toLowerCase()
  if (mapped === 'competition' || mapped === 'normal' || mapped === 'kids') return mapped
  throw new Error(`Unknown table category in DB: ${value}`)
}

function toClientColor(value: string): TableColor {
  const mapped = COLOR_TO_CLIENT[value] ?? value.toLowerCase()
  if (mapped === 'red' || mapped === 'green' || mapped === 'blue' || mapped === 'yellow' || mapped === 'purple') return mapped
  throw new Error(`Unknown table color in DB: ${value}`)
}

function toClientBookingStatus(value: string): BookingStatus {
  const mapped = STATUS_TO_CLIENT[value] ?? value.toLowerCase()
  if (mapped === 'pending' || mapped === 'accepted' || mapped === 'declined') return mapped
  throw new Error(`Unknown booking status in DB: ${value}`)
}

export const toDbTableType = (v: TableType) => TABLE_TYPE_TO_DB[v]
export const toDbCategory = (v: TableCategory) => CATEGORY_TO_DB[v]
export const toDbColor = (v: TableColor) => COLOR_TO_DB[v]
export const toDbBookingStatus = (v: BookingStatus) => STATUS_TO_DB[v]

// ─── Serializers ────────────────────────────────────────────────────────────

export function serializeUser(user: UserModel): UserDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role === 'ADMIN' ? 'admin' : 'user',
  }
}

export function serializeTable(table: TableModel): TableDto {
  return {
    id: table.id,
    name: table.name,
    type: toClientTableType(table.type),
    category: toClientCategory(table.category),
    color: toClientColor(table.color),
    status: table.status,
    position: { x: table.x, y: table.y },
    isLocked: table.isLocked,
  }
}

export function serializeBooking(
  booking: BookingModel & { table: TableModel },
): BookingDto {
  return {
    id: booking.id,
    tableId: booking.tableId,
    tableName: booking.table.name,
    userId: booking.userId,
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    headcount: booking.headcount,
    notes: booking.notes || undefined,
    status: toClientBookingStatus(booking.status),
  }
}
