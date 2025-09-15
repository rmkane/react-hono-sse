import type { HealthStatus } from '@/types'

export class HealthService {
  static getHealthStatus(): HealthStatus {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
  }
}
