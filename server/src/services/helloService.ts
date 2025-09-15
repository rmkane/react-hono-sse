import type { ServerMessage } from '@/types'

export class HelloService {
  static getMessage(): ServerMessage {
    return {
      message: 'Hello from Hono server!',
    }
  }
}
