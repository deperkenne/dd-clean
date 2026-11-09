import {
  useAgents,
  useCleaningJobsByPropertyId,
  usePropertyById,
  useReservationsByPropertyId,
} from '@/features/properties/Userproperties'
import { todayIsoDay } from '@/lib/date'
import { useOwner } from '../useOwner'
import { buildPropertyDetail } from './propertyDetail.selectors'
import type { PropertyDetailState } from './propertyDetail.types'

/**
 * Données de la fiche d'un bien : le bien, son propriétaire, ses réservations
 * et ses jobs, chacun via le repository et TanStack Query. Les jobs du bien
 * sont sous la clé ['cleaning-jobs', id] : une assignation ou un changement de
 * statut (qui invalide ['cleaning-jobs']) met donc aussi cette fiche à jour.
 */
export function usePropertyDetail(propertyId: string): PropertyDetailState {
  const property = usePropertyById(propertyId)
  const owner = useOwner(property.data?.ownerId ?? '')
  const reservations = useReservationsByPropertyId(propertyId)
  const jobs = useCleaningJobsByPropertyId(propertyId)
  const agents = useAgents()

  const queries = [property, owner, reservations, jobs, agents]
  if (queries.some((query) => query.isError)) {
    return {
      status: 'error',
      retry: () => {
        for (const query of queries) if (query.isError) void query.refetch()
      },
    }
  }

  if (property.isPending) return { status: 'loading' }
  if (!property.data) return { status: 'notFound' }
  // Une requête désactivée (bien sans propriétaire) reste « pending » : on ne l'attend pas.
  const ownerLoading = Boolean(property.data.ownerId) && owner.isPending
  if (reservations.isPending || jobs.isPending || agents.isPending || ownerLoading) return { status: 'loading' }

  return {
    status: 'success',
    data: buildPropertyDetail(
      property.data,
      owner.data ?? null,
      reservations.data ?? [],
      jobs.data ?? [],
      agents.data ?? [],
      todayIsoDay(),
    ),
  }
}
