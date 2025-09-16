import type { SSEData } from '@/types/index.js'

import { messageQueue } from './messageQueue.js'

export class SSEService {
  static createSSEStream(onCleanup: () => void): ReadableStream {
    return new ReadableStream({
      start(controller) {
        // Send recent messages first
        const recentMessages = messageQueue.getRecentMessages(5)
        recentMessages.forEach((item) => {
          controller.enqueue(`data: ${JSON.stringify(item.data)}\n\n`)
        })

        // Subscribe to new messages
        const unsubscribe = messageQueue.subscribe((item) => {
          controller.enqueue(`data: ${JSON.stringify(item.data)}\n\n`)
        })

        // Clean up when connection closes
        const cleanup = () => {
          unsubscribe()
          controller.close()
          onCleanup()
        }

        return cleanup
      },
    })
  }

  // Legacy method for backward compatibility
  static generateSSEData(): SSEData {
    return {
      timestamp: new Date().toISOString(),
      message: 'Real-time update from server',
      random: Math.random(),
    }
  }
}
