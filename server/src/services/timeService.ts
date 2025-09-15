import type { ServerTime } from '@/types'

export class TimeService {
  static getCurrentTime(): ServerTime {
    return {
      timestamp: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  }
}
