import {
  useAgents,
  useCleaningJobs,
  usePropertyById,
  useReservationsByPropertyId,
} from '@/features/properties/Userproperties'
import { useOwner } from '../useOwner'
import type { JobDetailState } from './jobDetail.types'

/**
 * Données de la page détail d'un job.
 *
 * Le job est retrouvé dans la liste déjà en cache (la vue d'ensemble l'a
 * chargée) ; on charge ensuite, à partir de lui, son bien, son propriétaire,
 * ses réservations et les agents. Chaque requête passe par le repository
 * (mock aujourd'hui, Smoobu demain) via TanStack Query.
 */
export function useJobDetail(jobId: string): JobDetailState {
  const jobs = useCleaningJobs()
  const job = jobs.data?.find((candidate) => candidate.id === jobId)

  const property = usePropertyById(job?.propertyId ?? '')
  const ownerId = property.data?.ownerId ?? ''
  const owner = useOwner(ownerId)
  const reservations = useReservationsByPropertyId(job?.propertyId ?? '')
  const agents = useAgents()

  const queries = [jobs, property, owner, reservations, agents]
  if (queries.some((query) => query.isError)) {
    return {
      status: 'error',
      retry: () => {
        for (const query of queries) if (query.isError) void query.refetch()
      },
    }
  }

  if (!jobs.data) return { status: 'loading' }
  if (!job) return { status: 'notFound' }

  // Requêtes dépendantes : on attend celles qui ont réellement été lancées.
  const waiting =
    property.isPending ||
    reservations.isPending ||
    agents.isPending ||
    (Boolean(ownerId) && owner.isPending)
  if (waiting) return { status: 'loading' }

  return {
    status: 'success',
    data: {
      job,
      property: property.data ?? null,
      owner: owner.data ?? null,
      reservation: reservations.data?.find((resa) => resa.id === job.reservationId) ?? null,
      agent: agents.data?.find((agent) => agent.id === job.assignedAgentId) ?? null,
    },
  }
}
