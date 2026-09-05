import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { db } from '../db.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import {
  TableSchema,
  TimeslotSchema,
  CreateTableBodySchema,
  UpdateTableBodySchema,
  UpdatePositionBodySchema,
  IdParamSchema,
  ErrorSchema,
} from '../schemas.js'
import {
  serializeTable,
  toDbTableType,
  toDbCategory,
  toDbColor,
} from '../lib/mappers.js'
import { getAvailableTimeslots } from '../lib/timeslots.js'
import type { AppEnv } from '../types.js'

export const tablesRouter = new OpenAPIHono<AppEnv>()

// ─── GET / ────────────────────────────────────────────────────────────────────

tablesRouter.openapi(
  createRoute({
    method: 'get',
    path: '/',
    tags: ['Tables'],
    summary: 'Get all tables',
    responses: {
      200: {
        description: 'List of tables',
        content: { 'application/json': { schema: z.array(TableSchema) } },
      },
    },
  }),
  async (c) => {
    const tables = await db.table.findMany()
    return c.json(tables.map(serializeTable), 200)
  },
)

// ─── POST / ───────────────────────────────────────────────────────────────────

tablesRouter.openapi(
  createRoute({
    method: 'post',
    path: '/',
    tags: ['Tables'],
    summary: 'Create a new table (admin)',
    middleware: [requireAuth, requireAdmin],
    security: [{ Bearer: [] }],
    request: {
      body: { content: { 'application/json': { schema: CreateTableBodySchema } } },
    },
    responses: {
      201: {
        description: 'Table created',
        content: { 'application/json': { schema: TableSchema } },
      },
      401: { description: 'Unauthorized', content: { 'application/json': { schema: ErrorSchema } } },
      403: { description: 'Forbidden', content: { 'application/json': { schema: ErrorSchema } } },
    },
  }),
  async (c) => {
    const body = c.req.valid('json')
    const name = body.name ?? `${faker.word.adjective()} ${faker.word.noun()}`
    const table = await db.table.create({
      data: {
        name,
        type: toDbTableType(body.type),
        category: toDbCategory(body.category),
        color: toDbColor(body.color),
        status: body.status,
        x: body.position.x,
        y: body.position.y,
        isLocked: body.isLocked,
      },
    })
    return c.json(serializeTable(table), 201)
  },
)

// ─── PATCH /:id ───────────────────────────────────────────────────────────────

tablesRouter.openapi(
  createRoute({
    method: 'patch',
    path: '/{id}',
    tags: ['Tables'],
    summary: 'Update table details (admin)',
    middleware: [requireAuth, requireAdmin],
    security: [{ Bearer: [] }],
    request: {
      params: IdParamSchema,
      body: { content: { 'application/json': { schema: UpdateTableBodySchema } } },
    },
    responses: {
      200: {
        description: 'Updated table',
        content: { 'application/json': { schema: TableSchema } },
      },
      401: { description: 'Unauthorized', content: { 'application/json': { schema: ErrorSchema } } },
      403: { description: 'Forbidden', content: { 'application/json': { schema: ErrorSchema } } },
      404: { description: 'Not found', content: { 'application/json': { schema: ErrorSchema } } },
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    const body = c.req.valid('json')

    const existing = await db.table.findUnique({ where: { id } })
    if (!existing) return c.json({ message: 'Table not found' }, 404)

    const updated = await db.table.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.type !== undefined && { type: toDbTableType(body.type) }),
        ...(body.category !== undefined && { category: toDbCategory(body.category) }),
        ...(body.color !== undefined && { color: toDbColor(body.color) }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.isLocked !== undefined && { isLocked: body.isLocked }),
      },
    })
    return c.json(serializeTable(updated), 200)
  },
)

// ─── PATCH /:id/position ──────────────────────────────────────────────────────

tablesRouter.openapi(
  createRoute({
    method: 'patch',
    path: '/{id}/position',
    tags: ['Tables'],
    summary: 'Update table position via drag-and-drop (admin)',
    middleware: [requireAuth, requireAdmin],
    security: [{ Bearer: [] }],
    request: {
      params: IdParamSchema,
      body: { content: { 'application/json': { schema: UpdatePositionBodySchema } } },
    },
    responses: {
      200: {
        description: 'Updated table',
        content: { 'application/json': { schema: TableSchema } },
      },
      401: { description: 'Unauthorized', content: { 'application/json': { schema: ErrorSchema } } },
      403: { description: 'Forbidden', content: { 'application/json': { schema: ErrorSchema } } },
      404: { description: 'Not found', content: { 'application/json': { schema: ErrorSchema } } },
      409: { description: 'Table is locked', content: { 'application/json': { schema: ErrorSchema } } },
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    const { x, y } = c.req.valid('json')

    const existing = await db.table.findUnique({ where: { id } })
    if (!existing) return c.json({ message: 'Table not found' }, 404)
    if (existing.isLocked) return c.json({ message: 'Table is locked' }, 409)

    const updated = await db.table.update({ where: { id }, data: { x, y } })
    return c.json(serializeTable(updated), 200)
  },
)

// ─── DELETE /:id ──────────────────────────────────────────────────────────────

tablesRouter.openapi(
  createRoute({
    method: 'delete',
    path: '/{id}',
    tags: ['Tables'],
    summary: 'Delete a table (admin)',
    middleware: [requireAuth, requireAdmin],
    security: [{ Bearer: [] }],
    request: { params: IdParamSchema },
    responses: {
      204: { description: 'Deleted' },
      401: { description: 'Unauthorized', content: { 'application/json': { schema: ErrorSchema } } },
      403: { description: 'Forbidden', content: { 'application/json': { schema: ErrorSchema } } },
      404: { description: 'Not found', content: { 'application/json': { schema: ErrorSchema } } },
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param')

    const existing = await db.table.findUnique({ where: { id } })
    if (!existing) return c.json({ message: 'Table not found' }, 404)

    await db.table.delete({ where: { id } })
    return c.body(null, 204)
  },
)

// ─── GET /:id/timeslots ───────────────────────────────────────────────────────

tablesRouter.openapi(
  createRoute({
    method: 'get',
    path: '/{id}/timeslots',
    tags: ['Tables'],
    summary: 'Get available timeslots for a table on a given date',
    request: {
      params: IdParamSchema,
      query: z.object({
        date: z.string().openapi({
          param: { name: 'date', in: 'query' },
          example: '2026-06-01',
        }),
      }),
    },
    responses: {
      200: {
        description: 'Timeslots',
        content: { 'application/json': { schema: z.array(TimeslotSchema) } },
      },
      404: { description: 'Table not found', content: { 'application/json': { schema: ErrorSchema } } },
    },
  }),
  async (c) => {
    const { id } = c.req.valid('param')
    const { date } = c.req.valid('query')

    const table = await db.table.findUnique({ where: { id } })
    if (!table) return c.json({ message: 'Table not found' }, 404)

    const timeslots = await getAvailableTimeslots(id, date)
    return c.json(timeslots, 200)
  },
)
