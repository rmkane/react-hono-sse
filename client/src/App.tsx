import { useEffect, useState } from 'react'

import { CounterCard, Footer, Header, ServerCommunicationCard, SSECard } from '@/components'

interface ServerMessage {
  message: string
}

interface ServerTime {
  timestamp: string
  timezone: string
}

function App() {
  const [count, setCount] = useState(0)
  const [serverMessage, setServerMessage] = useState<string>('')
  const [serverTime, setServerTime] = useState<ServerTime | null>(null)

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
        <SSECard />
        <Footer />
      </div>
    </div>
  )
}

export default App
