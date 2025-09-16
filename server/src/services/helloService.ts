import type { ServerMessage } from '@/types/index.js'

export class HelloService {
  static getMessage(): ServerMessage {
    return {
      message: 'Hello from Hono server!',
    }
  }
}
