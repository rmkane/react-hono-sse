import type { ServerTime } from '@/types/index.js'

export class TimeService {
  static getCurrentTime(): ServerTime {
    return {
      timestamp: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  }
}
