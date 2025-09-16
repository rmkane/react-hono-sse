import { useEffect, useRef, useState } from 'react'

interface SSEMessage {
  timestamp: string
  message: string
  random: number
}

interface UseSSEOptions {
  url?: string
  reconnectInterval?: number
  maxReconnectAttempts?: number
  maxMessages?: number
  onMessage?: (message: SSEMessage) => void
  onError?: (error: Event) => void
  onOpen?: () => void
  onClose?: () => void
}

interface UseSSEReturn {
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  lastMessage: SSEMessage | null
  messages: SSEMessage[]
  connect: () => void
  disconnect: () => void
  reconnect: () => void
}

export function useSSE(options: UseSSEOptions = {}): UseSSEReturn {
  const {
    maxMessages = 10,
    maxReconnectAttempts = 5,
    onClose,
    onError,
    onMessage,
    onOpen,
    reconnectInterval = 3000,
    url = '/api/sse',
  } = options

  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastMessage, setLastMessage] = useState<SSEMessage | null>(null)
  const [messages, setMessages] = useState<SSEMessage[]>([])

  const eventSourceRef = useRef<EventSource | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttemptsRef = useRef(0)
  const callbacksRef = useRef({ onClose, onError, onMessage, onOpen })

  // Update callbacks ref when they change
  useEffect(() => {
    callbacksRef.current = { onClose, onError, onMessage, onOpen }
  })

  const cleanup = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
  }

  const disconnect = () => {
    cleanup()
    setIsConnected(false)
    setIsConnecting(false)
    setError(null)
    reconnectAttemptsRef.current = 0
  }

  const reconnect = () => {
    disconnect()
    reconnectAttemptsRef.current = 0
    connect()
  }

  // Auto-connect on mount
  useEffect(() => {
    const connect = () => {
      if (eventSourceRef.current?.readyState === EventSource.OPEN) {
        return // Already connected
      }

      setIsConnecting(true)
      setError(null)
      cleanup()

      try {
        const eventSource = new EventSource(url)
        eventSourceRef.current = eventSource

        eventSource.onopen = () => {
          setIsConnected(true)
          setIsConnecting(false)
          setError(null)
          reconnectAttemptsRef.current = 0
          callbacksRef.current.onOpen?.()
        }

        eventSource.onmessage = (event) => {
          try {
            const message: SSEMessage = JSON.parse(event.data)
            setLastMessage(message)
            setMessages((prev) => [...prev.slice(-(maxMessages - 1)), message]) // Keep last N messages
            callbacksRef.current.onMessage?.(message)
          } catch (err) {
            console.error('Failed to parse SSE message:', err)
            setError('Failed to parse message')
          }
        }

        eventSource.onerror = (event) => {
          setIsConnected(false)
          setIsConnecting(false)
          setError('Connection error')
          callbacksRef.current.onError?.(event)

          // Attempt to reconnect
          if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            reconnectAttemptsRef.current++
            reconnectTimeoutRef.current = setTimeout(() => {
              console.log(`Reconnecting... attempt ${reconnectAttemptsRef.current}`)
              connect()
            }, reconnectInterval)
          } else {
            setError('Max reconnection attempts reached')
          }
        }

        eventSource.addEventListener('close', () => {
          setIsConnected(false)
          setIsConnecting(false)
          callbacksRef.current.onClose?.()
        })
      } catch (err) {
        setIsConnecting(false)
        setError('Failed to create EventSource')
        console.error('SSE connection error:', err)
      }
    }

    connect()

    return () => {
      cleanup()
    }
  }, [maxMessages, maxReconnectAttempts, reconnectInterval, url])

  const connect = () => {
    if (eventSourceRef.current?.readyState === EventSource.OPEN) {
      return // Already connected
    }

    setIsConnecting(true)
    setError(null)
    cleanup()

    try {
      const eventSource = new EventSource(url)
      eventSourceRef.current = eventSource

      eventSource.onopen = () => {
        setIsConnected(true)
        setIsConnecting(false)
        setError(null)
        reconnectAttemptsRef.current = 0
        callbacksRef.current.onOpen?.()
      }

      eventSource.onmessage = (event) => {
        try {
          const message: SSEMessage = JSON.parse(event.data)
          setLastMessage(message)
          setMessages((prev) => [...prev.slice(-(maxMessages - 1)), message]) // Keep last N messages
          callbacksRef.current.onMessage?.(message)
        } catch (err) {
          console.error('Failed to parse SSE message:', err)
          setError('Failed to parse message')
        }
      }

      eventSource.onerror = (event) => {
        setIsConnected(false)
        setIsConnecting(false)
        setError('Connection error')
        callbacksRef.current.onError?.(event)

        // Attempt to reconnect
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`Reconnecting... attempt ${reconnectAttemptsRef.current}`)
            connect()
          }, reconnectInterval)
        } else {
          setError('Max reconnection attempts reached')
        }
      }

      eventSource.addEventListener('close', () => {
        setIsConnected(false)
        setIsConnecting(false)
        callbacksRef.current.onClose?.()
      })
    } catch (err) {
      setIsConnecting(false)
      setError('Failed to create EventSource')
      console.error('SSE connection error:', err)
    }
  }

  return {
    connect,
    disconnect,
    error,
    isConnected,
    isConnecting,
    lastMessage,
    messages,
    reconnect,
  }
}
