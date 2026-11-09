import { useAgents, useCleaningJobs, useProperties } from '@/features/properties/Userproperties'
import { todayIsoDay } from '@/lib/date'
import { buildSecretaryOverview } from './overview.selectors'

/**
 * Données de la vue d'ensemble secrétaire.
 *
 * Réutilise les hooks TanStack Query du domaine properties (qui passent par le
 * repository : mock aujourd'hui, Smoobu demain) et combine leurs résultats.
 * Le composant ne voit qu'un état unique : chargement, erreur ou données prêtes.
 */
export function useSecretaryOverview() {
  const jobs = useCleaningJobs()
  const properties = useProperties()
  const agents = useAgents()
  const queries = [jobs, properties, agents]

  const retry = () => {
    for (const query of queries) if (query.isError) void query.refetch()
  }

  if (queries.some((query) => query.isError)) return { status: 'error' as const, retry }
  if (!jobs.data || !properties.data || !agents.data) return { status: 'loading' as const }

  return {
    status: 'success' as const,
    data: buildSecretaryOverview(jobs.data, properties.data, agents.data, todayIsoDay()),
  }
}
