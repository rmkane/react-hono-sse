export interface ServerMessage {
  message: string
}

export interface ServerTime {
  timestamp: string
  timezone: string
}

export interface SSEData {
  timestamp: string
  message: string
  random: number
}

export interface HealthStatus {
  status: string
  timestamp: string
}

export interface ApiDocumentation {
  name: string
  version: string
  description: string
  endpoints: Record<
    string,
    {
      description: string
      response: string
      note?: string
    }
  >
  server: {
    port: number
    environment: string
    timestamp: string
  }
}
