import { createMiddleware } from 'hono/factory'
import { getCookie } from 'hono/cookie'
import { db } from '../db.js'
import type { AppEnv } from '../types.js'

export const requireAuth = createMiddleware<AppEnv>(async (c, next) => {
  const header = c.req.header('Authorization')
  const tokenStr = header?.startsWith('Bearer ')
    ? header.slice(7)
    : getCookie(c, 'auth_token')

  if (!tokenStr) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  const record = await db.token.findUnique({
    where: { token: tokenStr },
    include: { user: true },
  })
  if (!record) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  c.set('user', {
    id: record.user.id,
    name: record.user.name,
    email: record.user.email,
    role: record.user.role,
  })
  await next()
})

export const requireAdmin = createMiddleware<AppEnv>(async (c, next) => {
  if (c.var.user?.role !== 'ADMIN') {
    return c.json({ message: 'Forbidden' }, 403)
  }
  await next()
})
