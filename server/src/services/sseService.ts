import type { SSEData } from '@/types/index.js'

export class SSEService {
  static generateSSEData(): SSEData {
    return {
      timestamp: new Date().toISOString(),
      message: 'Real-time update from server',
      random: Math.random(),
    }
  }

  static createSSEStream(onData: () => SSEData, onCleanup: () => void): ReadableStream {
    return new ReadableStream({
      start(controller) {
        const interval = setInterval(() => {
          const data = onData()
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`)
        }, 1000)

        // Clean up interval when connection closes
        const cleanup = () => {
          clearInterval(interval)
          controller.close()
          onCleanup()
        }

        return cleanup
      },
    })
  }
}
