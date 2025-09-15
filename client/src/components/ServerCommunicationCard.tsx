interface ServerTime {
  timestamp: string
  timezone: string
}

interface ServerCommunicationCardProps {
  serverMessage: string
  serverTime: ServerTime | null
  fetchHello: () => void
  fetchTime: () => void
}

export const ServerCommunicationCard = ({
  serverMessage,
  serverTime,
  fetchHello,
  fetchTime,
}: ServerCommunicationCardProps) => {
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md transition-colors dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Server Communication</h2>
      <div className="space-y-4">
        <div>
          <button
            onClick={fetchHello}
            className="mr-3 rounded-lg bg-green-500 px-4 py-2 font-medium text-white transition-colors hover:bg-green-600"
          >
            Fetch Hello from Server
          </button>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{serverMessage}</p>
        </div>

        <div>
          <button
            onClick={fetchTime}
            className="mr-3 rounded-lg bg-purple-500 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-600"
          >
            Fetch Server Time
          </button>
          {serverTime && (
            <div className="mt-2 space-y-1">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Server Time:</span> {new Date(serverTime.timestamp).toLocaleString()}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Timezone:</span> {serverTime.timezone}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
