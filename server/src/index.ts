import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { messageGenerator } from '@/services/index.js'
import { corsMiddleware } from '@/middleware/cors.js'
import routes from '@/routes/index.js'

const app = new Hono()

// Apply CORS middleware
app.use('*', corsMiddleware)

// Mount routes
app.route('/', routes)

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001

// Start background message generator
messageGenerator.start(1000) // Generate messages every 1 second

console.log(`Server is running on port ${port}`)
console.log('Background message generator started')

serve({
  fetch: app.fetch,
  port,
})
