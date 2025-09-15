import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

// CORS middleware
app.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*')
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (c.req.method === 'OPTIONS') {
    return c.text('', 200)
  }

  await next()
})

// Root endpoint - API documentation
app.get('/', (c) => {
  return c.json({
    name: 'Hono + SSE Server',
    version: '1.0.0',
    description: 'A Hono server with TypeScript providing REST API and Server-Sent Events',
    endpoints: {
      'GET /': {
        description: 'API documentation (this endpoint)',
        response: 'JSON object with available endpoints',
      },
      'GET /health': {
        description: 'Health check endpoint',
        response: 'JSON object with server status and timestamp',
      },
      'GET /api/hello': {
        description: 'Simple hello message endpoint',
        response: 'JSON object with greeting message',
      },
      'GET /api/time': {
        description: 'Server time and timezone information',
        response: 'JSON object with timestamp and timezone',
      },
      'GET /api/sse': {
        description: 'Server-Sent Events stream for real-time updates',
        response: 'Event stream with real-time data every second',
        note: 'Returns text/event-stream content type',
      },
    },
    server: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 3001,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    },
  })
})

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API routes
app.get('/api/hello', (c) => {
  return c.json({ message: 'Hello from Hono server!' })
})

app.get('/api/time', (c) => {
  return c.json({
    timestamp: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })
})

// SSE endpoint for real-time updates
app.get('/api/sse', (c) => {
  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        const data = {
          timestamp: new Date().toISOString(),
          message: 'Real-time update from server',
          random: Math.random(),
        }

        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`)
      }, 1000)

      // Clean up interval when connection closes
      c.req.raw.signal?.addEventListener('abort', () => {
        clearInterval(interval)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    },
  })
})

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
