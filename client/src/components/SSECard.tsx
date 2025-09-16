import { useSSE } from '@/hooks/index.js'

interface SSECardProps {
  className?: string
}

export const SSECard = ({ className = '' }: SSECardProps) => {
  const { isConnected, isConnecting, error, messages } = useSSE({
    maxMessages: 10,
    onError: (error) => {
      console.error('SSE error:', error)
    },
    onMessage: (message) => {
      console.log('SSE message received:', message)
    },
  })
  const getStatusDisplay = () => {
    if (isConnecting) return { className: 'bg-yellow-100 text-yellow-800', text: '🟡 Connecting' }
    if (error) return { className: 'bg-red-100 text-red-800', text: '🔴 Error' }
    if (isConnected) return { className: 'bg-green-100 text-green-800', text: '🟢 Connected' }
    return { className: 'bg-red-100 text-red-800', text: '🔴 Disconnected' }
  }

  const status = getStatusDisplay()

  return (
    <div className={`mb-6 rounded-lg bg-white p-6 shadow-md transition-colors dark:bg-gray-800 ${className}`}>
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Server-Sent Events (SSE)</h2>

      <div className="mb-4">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Status:</span>
        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${status.className}`}>
          {status.text}
        </span>
        {error && <div className="mt-2 text-sm text-red-600 dark:text-red-400">Error: {error}</div>}
      </div>

      <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors dark:border-gray-600 dark:bg-gray-700">
        <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Real-time Messages:</h3>
        {messages.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No messages yet...</p>
        ) : (
          <div className="space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className="rounded border-l-2 border-blue-400 bg-white p-2 text-xs text-gray-800 transition-colors dark:bg-gray-600 dark:text-gray-200"
              >
                <span className="font-medium">{new Date(message.timestamp).toLocaleTimeString()}</span>:{' '}
                {message.message} (Random: {message.random.toFixed(3)})
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
