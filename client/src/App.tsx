import { useState, useEffect } from 'react'
import { Header, CounterCard, ServerCommunicationCard, SSECard, Footer } from '@/components'

interface ServerMessage {
  message: string
}

interface ServerTime {
  timestamp: string
  timezone: string
}

interface SSEData {
  timestamp: string
  message: string
  random: number
}

function App() {
  const [count, setCount] = useState(0)
  const [serverMessage, setServerMessage] = useState<string>('')
  const [serverTime, setServerTime] = useState<ServerTime | null>(null)
  const [sseData, setSseData] = useState<SSEData[]>([])
  const [isSSEConnected, setIsSSEConnected] = useState(false)

  const fetchHello = async () => {
    try {
      const response = await fetch('/api/hello')
      const data: ServerMessage = await response.json()
      setServerMessage(data.message)
    } catch (error) {
      console.error('Error fetching hello:', error)
      setServerMessage('Error connecting to server')
    }
  }

  const fetchTime = async () => {
    try {
      const response = await fetch('/api/time')
      const data: ServerTime = await response.json()
      setServerTime(data)
    } catch (error) {
      console.error('Error fetching time:', error)
    }
  }

  useEffect(() => {
    fetchHello()
    fetchTime()
  }, [])

  useEffect(() => {
    console.log('Attempting to connect to SSE endpoint...')
    const eventSource = new EventSource('/api/sse')

    eventSource.onmessage = (event) => {
      console.log('SSE message received:', event.data)
      try {
        const data: SSEData = JSON.parse(event.data)
        setSseData((prev) => [...prev.slice(-9), data]) // Keep last 10 messages
      } catch (error) {
        console.error('Error parsing SSE data:', error)
      }
    }

    eventSource.onopen = () => {
      console.log('SSE connection opened successfully')
      setIsSSEConnected(true)
    }

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error)
      console.log('EventSource readyState:', eventSource.readyState)
      setIsSSEConnected(false)
    }

    return () => {
      console.log('Cleaning up SSE connection')
      eventSource.close()
      setIsSSEConnected(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8 transition-colors dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4">
        <Header />
        <CounterCard count={count} setCount={setCount} />
        <ServerCommunicationCard
          serverMessage={serverMessage}
          serverTime={serverTime}
          fetchHello={fetchHello}
          fetchTime={fetchTime}
        />
        <SSECard sseData={sseData} isSSEConnected={isSSEConnected} />
        <Footer />
      </div>
    </div>
  )
}

export default App
