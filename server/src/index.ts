import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { corsMiddleware } from '@/middleware/cors'
import routes from '@/routes'

const app = new Hono()

// Apply CORS middleware
app.use('*', corsMiddleware)

// Mount routes
app.route('/', routes)

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
