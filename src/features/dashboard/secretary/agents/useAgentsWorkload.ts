import { useAgents, useCleaningJobs, useProperties } from '@/features/properties/Userproperties'
import { useWeekParam } from '../week/useWeekParam'
import { buildAgentsWorkload } from './agents.selectors'

/**
 * Logique de la page Agents : semaine dans l'adresse (useWeekParam), agents et
 * jobs depuis le repository via TanStack Query, charge calculée par agent.
 */
export function useAgentsWorkload() {
  const week = useWeekParam()
  const agents = useAgents()
  const jobs = useCleaningJobs()
  const properties = useProperties()
  const queries = [agents, jobs, properties]

  if (queries.some((query) => query.isError)) {
    return {
      ...week,
      status: 'error' as const,
      retry: () => {
        for (const query of queries) if (query.isError) void query.refetch()
      },
    }
  }
  if (!agents.data || !jobs.data || !properties.data) return { ...week, status: 'loading' as const }

  return {
    ...week,
    status: 'success' as const,
    data: buildAgentsWorkload(agents.data, jobs.data, properties.data, week.weekStart, week.weekEnd),
  }
}
