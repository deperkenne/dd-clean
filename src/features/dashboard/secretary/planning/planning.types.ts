import type { JobListItem } from '../jobListItem.types'

/** Une journée du planning et ses jobs, dans l'ordre d'affichage. */
export type PlanningDay = {
  date: string
  isToday: boolean
  jobs: JobListItem[]
}

export type WeekPlanning = {
  weekStart: string
  weekEnd: string
  days: PlanningDay[]
  totalJobs: number
}
