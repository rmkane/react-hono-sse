import { Hono } from 'hono'

import {
  DocumentationService,
  HealthService,
  HelloService,
  messageGenerator,
  messageQueue,
  SSEService,
  TimeService,
} from '@/services/index.js'

const app = new Hono()

// Root endpoint - API documentation
app.get('/', (c) => {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001
  const environment = process.env.NODE_ENV || 'development'
  const documentation = DocumentationService.getApiDocumentation(port, environment)
  return c.json(documentation)
})

// Health check endpoint
app.get('/health', (c) => {
  const healthStatus = HealthService.getHealthStatus()
  return c.json(healthStatus)
})

// API routes
app.get('/api/hello', (c) => {
  const message = HelloService.getMessage()
  return c.json(message)
})

app.get('/api/time', (c) => {
  const timeData = TimeService.getCurrentTime()
  return c.json(timeData)
})

// Queue statistics endpoint
app.get('/api/queue/stats', (c) => {
  const queueStats = messageQueue.getStats()
  const generatorStatus = messageGenerator.getStatus()

  return c.json({
    generator: generatorStatus,
    queue: queueStats,
  })
})

// SSE endpoint for real-time updates
app.get('/api/sse', (c) => {
  const stream = SSEService.createSSEStream(() => {
    // Cleanup callback - can be used for logging or other cleanup tasks
    console.log('SSE connection closed')
  })

  // Handle connection cleanup
  const cleanup = () => {
    console.log('SSE connection cleanup')
  }

  c.req.raw.signal?.addEventListener('abort', cleanup)

  return new Response(stream, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
    },
  })
})

export default app
