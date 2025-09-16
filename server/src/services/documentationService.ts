/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { ApiDocumentation } from '@/types/index.js'

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
        'GET /api/hello': {
          description: 'Simple hello message endpoint',
          response: 'JSON object with greeting message',
        },
        'GET /api/sse': {
          description: 'Server-Sent Events stream for real-time updates',
          note: 'Returns text/event-stream content type',
          response: 'Event stream with real-time data every second',
        },
        'GET /api/time': {
          description: 'Server time and timezone information',
          response: 'JSON object with timestamp and timezone',
        },
        'GET /health': {
          description: 'Health check endpoint',
          response: 'JSON object with server status and timestamp',
        },
      },
      server: {
        environment,
        port,
        timestamp: new Date().toISOString(),
      },
    }
  }
}
