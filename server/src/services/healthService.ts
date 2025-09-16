import type { HealthStatus } from '@/types/index.js'

export class HealthService {
  static getHealthStatus(): HealthStatus {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
  }
}
