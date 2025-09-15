import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface ServerMessage {
  message: string;
}

interface ServerTime {
  timestamp: string;
  timezone: string;
}

interface SSEData {
  timestamp: string;
  message: string;
  random: number;
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
        setSseData(prev => [...prev.slice(-9), data]) // Keep last 10 messages
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
  }, []) // Remove isSSEConnected dependency to allow reconnection

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React + Hono + SSE</h1>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <div className="card">
        <h3>Server Communication</h3>
        <button onClick={fetchHello}>
          Fetch Hello from Server
        </button>
        <p>{serverMessage}</p>
        
        <button onClick={fetchTime}>
          Fetch Server Time
        </button>
        {serverTime && (
          <div>
            <p>Server Time: {new Date(serverTime.timestamp).toLocaleString()}</p>
            <p>Timezone: {serverTime.timezone}</p>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Server-Sent Events (SSE)</h3>
        <p>Status: {isSSEConnected ? '🟢 Connected' : '🔴 Disconnected'}</p>
        <div style={{ maxHeight: '200px', overflow: 'auto', border: '1px solid #ccc', padding: '10px' }}>
          {sseData.map((data, index) => (
            <div key={index} style={{ marginBottom: '5px', fontSize: '12px' }}>
              <strong>{new Date(data.timestamp).toLocaleTimeString()}</strong>: {data.message} (Random: {data.random.toFixed(3)})
            </div>
          ))}
        </div>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
