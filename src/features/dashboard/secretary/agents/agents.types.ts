import type { JobListItem } from '../jobListItem.types'

/** Un agent et sa charge sur la semaine affichée. */
export type AgentWorkload = {
  id: string
  fullName: string
  phone: string
  jobCount: number
  totalMinutes: number
  /** Jobs de la semaine, triés par date. */
  jobs: JobListItem[]
}
