import type { ApiDocumentation } from '@/types'

export class DocumentationService {
  static getApiDocumentation(port: number, environment: string): ApiDocumentation {
    return {
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
        port,
        environment,
        timestamp: new Date().toISOString(),
      },
    }
  }
}
