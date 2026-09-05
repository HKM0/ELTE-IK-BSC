import 'dotenv/config'
import { serve } from '@hono/node-server'
import { createApp } from './app.js'

const port = Number(process.env.PORT ?? 3000)
const app = createApp()

serve({ fetch: app.fetch, port }, () => {
  console.log(`🚀 Roomlie API running on http://localhost:${port}`)
  console.log(`📖 Swagger UI: http://localhost:${port}/docs`)
})
