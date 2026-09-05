import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { db } from '../db.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import {
  BookingSchema,
  CreateBookingBodySchema,
  UpdateBookingStatusBodySchema,
  IdParamSchema,
  ErrorSchema,
} from '../schemas.js'
import { serializeBooking, toDbBookingStatus } from '../lib/mappers.js'
import { TIMESLOTS } from '../lib/timeslots.js'
import type { AppEnv } from '../types.js'

export const bookingsRouter = new OpenAPIHono<AppEnv>()

// ─── GET /my ──────────────────────────────────────────────────────────────────

bookingsRouter.openapi(
  createRoute({
    method: 'get',
    path: '/my',
    tags: ['Bookings'],
    summary: "Get current user's bookings",
    middleware: [requireAuth],
    security: [{ Bearer: [] }],
    responses: {
      200: {
        description: 'User bookings',
        content: { 'application/json': { schema: z.array(BookingSchema) } },
      },
      401: { description: 'Unauthorized', content: { 'application/json': { schema: ErrorSchema } } },
    },
  }),
  async (c) => {
    const userId = c.var.user.id
    const bookings = await db.booking.findMany({
      where: { userId },
      include: { table: true },
      orderBy: [{ date: 'desc' }, { startTime: 'asc' }],
    })
    return c.json(bookings.map(serializeBooking), 200)
  },
)

// ─── GET / ────────────────────────────────────────────────────────────────────

bookingsRouter.openapi(
  createRoute({
    method: 'get',
    path: '/',
    tags: ['Bookings'],
    summary: 'Get all bookings (admin)',
    middleware: [requireAuth, requireAdmin],
    security: [{ Bearer: [] }],
    responses: {
      200: {
        description: 'All bookings',
        content: { 'application/json': { schema: z.array(BookingSchema) } },
      },
      401: { description: 'Unauthorized', content: { 'application/json': { schema: ErrorSchema } } },
      403: { description: 'Forbidden', content: { 'application/json': { schema: ErrorSchema } } },
    },
  }),
  async (c) => {
    const bookings = await db.booking.findMany({
      include: { table: true },
      orderBy: [{ date: 'desc' }, { startTime: 'asc' }],
    })
    return c.json(bookings.map(serializeBooking), 200)
  },
)

// ─── POST / ───────────────────────────────────────────────────────────────────

bookingsRouter.openapi(
  createRoute({
    method: 'post',
    path: '/',
    tags: ['Bookings'],
    summary: 'Create a booking',
    middleware: [requireAuth],
    security: [{ Bearer: [] }],
    request: {
      body: { content: { 'application/json': { schema: CreateBookingBodySchema } } },
    },
    responses: {
      201: {
        description: 'Booking created',
        content: { 'application/json': { schema: BookingSchema } },
      },
      400: { description: 'Invalid timeslot', content: { 'application/json': { schema: ErrorSchema } } },
      401: { description: 'Unauthorized', content: { 'application/json': { schema: ErrorSchema } } },
      404: { description: 'Table not found', content: { 'application/json': { schema: ErrorSchema } } },
      409: { description: 'Timeslot already taken', content: { 'application/json': { schema: ErrorSchema } } },
    },
  }),
  async (c) => {
    const body = c.req.valid('json')
    const userId = c.var.user.id

    const table = await db.table.findUnique({ where: { id: body.tableId } })
    if (!table) return c.json({ message: 'Table not found' }, 404)

    const validSlot = TIMESLOTS.find((s) => s.startTime === body.startTime && s.endTime === body.endTime)
    if (!validSlot) return c.json({ message: 'Invalid timeslot' }, 400)

    const conflict = await db.booking.findFirst({
      where: {
        tableId: body.tableId,
        date: body.date,
        startTime: body.startTime,
        status: { not: 'DECLINED' },
      },
    })
    if (conflict) return c.json({ message: 'Timeslot already taken' }, 409)

    const booking = await db.booking.create({
      data: {
        tableId: body.tableId,
        userId,
        date: body.date,
        startTime: body.startTime,
        endTime: body.endTime,
        name: body.name,
        email: body.email,
        phone: body.phone,
        headcount: body.headcount,
        notes: body.notes ?? '',
      },
      include: { table: true },
    })
    return c.json(serializeBooking(booking), 201)
  },
)

// ─── PATCH /:id/status ────────────────────────────────────────────────────────

bookingsRouter.openapi(
  createRoute({
    method: 'patch',
    path: '/{id}/status',
    tags: ['Bookings'],
    summary: 'Accept or decline a booking (admin)',
    middleware: [requireAuth, requireAdmin],
    security: [{ Bearer: [] }],
    request: {
      params: IdParamSchema,
      body: { content: { 'application/json': { schema: UpdateBookingStatusBodySchema } } },
    },
    responses: {
      200: {
        description: 'Updated booking',
        content: { 'application/json': { schema: BookingSchema } },
      },
      401: { description: 'Unauthorized', content: { 'application/json': { schema: ErrorSchema } } },
      403: { description: 'Forbidden', content: { 'application/json': { schema: ErrorSchema } } },
      404: { description: 'Not found', content: { 'application/json': { schema: ErrorSchema } } },
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    const { status } = c.req.valid('json')

    const existing = await db.booking.findUnique({ where: { id } })
    if (!existing) return c.json({ message: 'Booking not found' }, 404)

    const updated = await db.booking.update({
      where: { id },
      data: { status: toDbBookingStatus(status) },
      include: { table: true },
    })
    return c.json(serializeBooking(updated), 200)
  },
)
