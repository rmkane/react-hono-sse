interface SSEData {
  timestamp: string
  message: string
  random: number
}

interface SSECardProps {
  sseData: SSEData[]
  isSSEConnected: boolean
}

export const SSECard = ({ sseData, isSSEConnected }: SSECardProps) => {
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md transition-colors dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Server-Sent Events (SSE)</h2>
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Status:</span>
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            isSSEConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {isSSEConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </span>
      </div>
      <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors dark:border-gray-600 dark:bg-gray-700">
        <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Real-time Messages:</h3>
        {sseData.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No messages yet...</p>
        ) : (
          <div className="space-y-2">
            {sseData.map((data, index) => (
              <div
                key={index}
                className="rounded border-l-2 border-blue-400 bg-white p-2 text-xs text-gray-800 transition-colors dark:bg-gray-600 dark:text-gray-200"
              >
                <span className="font-medium">{new Date(data.timestamp).toLocaleTimeString()}</span>: {data.message}{' '}
                (Random: {data.random.toFixed(3)})
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
