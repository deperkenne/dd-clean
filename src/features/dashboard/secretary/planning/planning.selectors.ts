import type { Agent, CleaningJob, Property } from '@/features/properties/Property.types'
import { addDays } from '@/lib/date'
import { createJobListItemMapper } from '../jobListItem'
import type { WeekPlanning } from './planning.types'

const DAYS_PER_WEEK = 7

/**
 * Répartit les jobs d'une semaine (lundi → dimanche) jour par jour.
 * Les jobs annulés ne sont pas planifiés : ils n'apparaissent pas.
 * Fonction pure, testable sans React.
 */
export function buildWeekPlanning(
  jobs: CleaningJob[],
  properties: Property[],
  agents: Agent[],
  weekStart: string,
  today: string,
): WeekPlanning {
  const weekEnd = addDays(weekStart, DAYS_PER_WEEK - 1)
  const toListItem = createJobListItemMapper(properties, agents)
  const weekJobs = jobs.filter(
    (job) => job.status !== 'CANCELLED' && job.scheduledDate >= weekStart && job.scheduledDate <= weekEnd,
  )

  const days = Array.from({ length: DAYS_PER_WEEK }, (_, index) => {
    const date = addDays(weekStart, index)
    return {
      date,
      isToday: date === today,
      jobs: weekJobs.filter((job) => job.scheduledDate === date).map(toListItem),
    }
  })

  return { weekStart, weekEnd, days, totalJobs: weekJobs.length }
}
