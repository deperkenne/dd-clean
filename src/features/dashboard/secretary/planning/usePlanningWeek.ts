import { useAgents, useCleaningJobs, useProperties } from '@/features/properties/Userproperties'
import { useWeekParam } from '../week/useWeekParam'
import { buildWeekPlanning } from './planning.selectors'

/**
 * Logique du planning hebdomadaire : la semaine vient de l'adresse
 * (useWeekParam), les jobs du repository via les hooks TanStack Query.
 */
export function usePlanningWeek() {
  const week = useWeekParam()
  const jobs = useCleaningJobs()
  const properties = useProperties()
  const agents = useAgents()
  const queries = [jobs, properties, agents]

  if (queries.some((query) => query.isError)) {
    return {
      ...week,
      status: 'error' as const,
      retry: () => {
        for (const query of queries) if (query.isError) void query.refetch()
      },
    }
  }
  if (!jobs.data || !properties.data || !agents.data) return { ...week, status: 'loading' as const }

  return {
    ...week,
    status: 'success' as const,
    data: buildWeekPlanning(jobs.data, properties.data, agents.data, week.weekStart, week.today),
  }
}
