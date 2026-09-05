import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'node:crypto'
import { setCookie, deleteCookie, getCookie } from 'hono/cookie'
import { db } from '../db.js'
import { requireAuth } from '../middleware/auth.js'
import {
  UserSchema,
  RegisterBodySchema,
  LoginBodySchema,
  ErrorSchema,
} from '../schemas.js'
import { serializeUser } from '../lib/mappers.js'
import type { AppEnv } from '../types.js'

export const authRouter = new OpenAPIHono<AppEnv>()

// ─── POST /register ──────────────────────────────────────────────────────────

authRouter.openapi(
  createRoute({
    method: 'post',
    path: '/register',
    tags: ['Auth'],
    summary: 'Register a new user',
    request: {
      body: { content: { 'application/json': { schema: RegisterBodySchema } } },
    },
    responses: {
      201: {
        description: 'User created',
        content: { 'application/json': { schema: z.object({ user: UserSchema }) } },
      },
      409: {
        description: 'Email already taken',
        content: { 'application/json': { schema: ErrorSchema } },
      },
    },
  }),
  async (c) => {
    const { name, email, password } = c.req.valid('json')

    const existing = await db.user.findUnique({ where: { email } })
    if (existing) return c.json({ message: 'Email already taken' }, 409)

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await db.user.create({ data: { name, email, passwordHash } })

    return c.json({ user: serializeUser(user) }, 201)
  },
)

// ─── POST /login ─────────────────────────────────────────────────────────────

authRouter.openapi(
  createRoute({
    method: 'post',
    path: '/login',
    tags: ['Auth'],
    summary: 'Login and receive a Bearer token',
    request: {
      body: { content: { 'application/json': { schema: LoginBodySchema } } },
    },
    responses: {
      200: {
        description: 'Login successful',
        content: {
          'application/json': {
            schema: z.object({ token: z.string(), user: UserSchema }),
          },
        },
      },
      401: {
        description: 'Invalid credentials',
        content: { 'application/json': { schema: ErrorSchema } },
      },
    },
  }),
  async (c) => {
    const { email, password } = c.req.valid('json')

    const user = await db.user.findUnique({ where: { email } })
    if (!user) return c.json({ message: 'Invalid credentials' }, 401)

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return c.json({ message: 'Invalid credentials' }, 401)

    const token = randomBytes(32).toString('hex')
    await db.token.create({ data: { token, userId: user.id } })

    setCookie(c, 'auth_token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return c.json({ token, user: serializeUser(user) }, 200)
  },
)

// ─── POST /logout ─────────────────────────────────────────────────────────────

authRouter.openapi(
  createRoute({
    method: 'post',
    path: '/logout',
    tags: ['Auth'],
    summary: 'Logout and invalidate token',
    middleware: [requireAuth],
    security: [{ Bearer: [] }],
    responses: {
      204: { description: 'Logged out' },
      401: {
        description: 'Unauthorized',
        content: { 'application/json': { schema: ErrorSchema } },
      },
    },
  }),
  async (c) => {
    const header = c.req.header('Authorization')
    const token = header?.startsWith('Bearer ')
      ? header.slice(7)
      : getCookie(c, 'auth_token')

    if (token) await db.token.deleteMany({ where: { token } })
    deleteCookie(c, 'auth_token', { path: '/' })
    return c.body(null, 204)
  },
)

// ─── GET /me ──────────────────────────────────────────────────────────────────

authRouter.openapi(
  createRoute({
    method: 'get',
    path: '/me',
    tags: ['Auth'],
    summary: 'Get current authenticated user',
    middleware: [requireAuth],
    security: [{ Bearer: [] }],
    responses: {
      200: {
        description: 'Current user',
        content: { 'application/json': { schema: UserSchema } },
      },
      401: {
        description: 'Unauthorized',
        content: { 'application/json': { schema: ErrorSchema } },
      },
    },
  }),
  async (c) => {
    const authUser = c.var.user
    const user = await db.user.findUniqueOrThrow({ where: { id: authUser.id } })
    return c.json(serializeUser(user), 200)
  },
)
