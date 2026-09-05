import { z } from '@hono/zod-openapi'

// ─── Primitives ─────────────────────────────────────────────────────────────

export const TableTypeSchema = z.enum(['snooker', 'air-hockey', 'foosball'])
export const TableCategorySchema = z.enum(['competition', 'normal', 'kids'])
export const TableColorSchema = z.enum(['red', 'green', 'blue', 'yellow', 'purple'])
export const BookingStatusSchema = z.enum(['pending', 'accepted', 'declined'])

// ─── Models ─────────────────────────────────────────────────────────────────

export const UserSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: 'John Doe' }),
    email: z.string().openapi({ example: 'john@example.com' }),
    role: z.enum(['user', 'admin']).openapi({ example: 'user' }),
  })
  .openapi('User')

export const TableSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: 'Biliárd 1' }),
    type: TableTypeSchema,
    category: TableCategorySchema,
    color: TableColorSchema,
    status: z.number().min(1).max(10).openapi({ example: 8 }),
    position: z.object({ x: z.number(), y: z.number() }),
    isLocked: z.boolean(),
  })
  .openapi('Table')

export const TimeslotSchema = z
  .object({
    startTime: z.string().openapi({ example: '10:00' }),
    endTime: z.string().openapi({ example: '12:00' }),
    isAvailable: z.boolean(),
  })
  .openapi('Timeslot')

export const BookingSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    tableId: z.number(),
    tableName: z.string(),
    userId: z.number(),
    date: z.string().openapi({ example: '2026-06-01' }),
    startTime: z.string().openapi({ example: '10:00' }),
    endTime: z.string().openapi({ example: '12:00' }),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    headcount: z.number(),
    notes: z.string().optional(),
    status: BookingStatusSchema,
  })
  .openapi('Booking')

// ─── Request bodies ──────────────────────────────────────────────────────────

export const RegisterBodySchema = z.object({
  name: z.string().min(1).openapi({ example: 'John Doe' }),
  email: z.email().openapi({ example: 'john@example.com' }),
  password: z.string().min(6).openapi({ example: 'secret123' }),
})

export const LoginBodySchema = z.object({
  email: z.email().openapi({ example: 'admin@example.com' }),
  password: z.string().min(1).openapi({ example: 'admin' }),
})

export const CreateTableBodySchema = z.object({
  name: z.string().min(1).optional().openapi({ example: 'Biliárd 1' }),
  type: TableTypeSchema,
  category: TableCategorySchema,
  color: TableColorSchema,
  status: z.number().min(1).max(10).openapi({ example: 8 }),
  position: z.object({ x: z.number(), y: z.number() }),
  isLocked: z.boolean(),
})

export const UpdateTableBodySchema = z.object({
  name: z.string().min(1).optional(),
  type: TableTypeSchema.optional(),
  category: TableCategorySchema.optional(),
  color: TableColorSchema.optional(),
  status: z.number().min(1).max(10).optional(),
  isLocked: z.boolean().optional(),
})

export const UpdatePositionBodySchema = z.object({
  x: z.number().openapi({ example: 120 }),
  y: z.number().openapi({ example: 80 }),
})

export const CreateBookingBodySchema = z.object({
  tableId: z.number(),
  date: z.string().openapi({ example: '2026-06-01' }),
  startTime: z.string().openapi({ example: '10:00' }),
  endTime: z.string().openapi({ example: '12:00' }),
  name: z.string().min(1),
  email: z.email(),
  phone: z.string().min(1),
  headcount: z.number().int().min(1),
  notes: z.string().optional(),
})

export const UpdateBookingStatusBodySchema = z.object({
  status: z.enum(['accepted', 'declined']),
})

// ─── Path params ─────────────────────────────────────────────────────────────

export const IdParamSchema = z.object({
  id: z.coerce.number().int().openapi({ param: { name: 'id', in: 'path' }, example: 1 }),
})

// ─── Errors ──────────────────────────────────────────────────────────────────

export const ErrorSchema = z.object({ message: z.string() }).openapi('Error')
