import type { SSEData } from '@/types/index.js'

export interface MessageQueueItem {
  id: string
  data: SSEData
  timestamp: number
}

export class MessageQueue {
  private queue: MessageQueueItem[] = []
  private subscribers: Set<(item: MessageQueueItem) => void> = new Set()
  private maxSize: number

  constructor(maxSize = 100) {
    this.maxSize = maxSize
  }

  // Add a message to the queue
  enqueue(data: SSEData): void {
    const item: MessageQueueItem = {
      data,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    }

    this.queue.push(item)

    // Maintain max size by removing oldest items
    if (this.queue.length > this.maxSize) {
      this.queue.shift()
    }

    // Notify all subscribers
    this.subscribers.forEach((subscriber) => subscriber(item))
  }

  // Subscribe to new messages
  subscribe(callback: (item: MessageQueueItem) => void): () => void {
    this.subscribers.add(callback)

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback)
    }
  }

  // Get recent messages (for new subscribers)
  getRecentMessages(count = 10): MessageQueueItem[] {
    return this.queue.slice(-count)
  }

  // Get queue stats
  getStats() {
    return {
      maxSize: this.maxSize,
      queueSize: this.queue.length,
      subscriberCount: this.subscribers.size,
    }
  }

  // Clear the queue
  clear(): void {
    this.queue = []
  }
}

// Singleton instance
export const messageQueue = new MessageQueue()
