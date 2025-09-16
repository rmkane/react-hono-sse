import type { SSEData } from '@/types/index.js'

import { messageQueue } from './messageQueue.js'

export class MessageGenerator {
  private intervalId: NodeJS.Timeout | null = null
  private isRunning = false

  // Start generating messages
  start(intervalMs = 1000): void {
    if (this.isRunning) {
      console.log('MessageGenerator: Already running')
      return
    }

    this.isRunning = true
    console.log(`MessageGenerator: Starting with ${intervalMs}ms interval`)

    this.intervalId = setInterval(() => {
      const message = this.generateMessage()
      messageQueue.enqueue(message)
    }, intervalMs)
  }

  // Stop generating messages
  stop(): void {
    if (!this.isRunning) {
      console.log('MessageGenerator: Not running')
      return
    }

    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }

    this.isRunning = false
    console.log('MessageGenerator: Stopped')
  }

  // Generate a single message
  private generateMessage(): SSEData {
    const messages = [
      'Real-time update from server',
      'System status: All green',
      'New data available',
      'Background process completed',
      'User activity detected',
      'Cache refreshed',
      'Database query executed',
      'API response cached',
    ]

    return {
      message: messages[Math.floor(Math.random() * messages.length)],
      random: Math.random(),
      timestamp: new Date().toISOString(),
    }
  }

  // Get current status
  getStatus() {
    return {
      intervalMs: this.intervalId ? 1000 : null,
      isRunning: this.isRunning,
    }
  }
}

// Singleton instance
export const messageGenerator = new MessageGenerator()
