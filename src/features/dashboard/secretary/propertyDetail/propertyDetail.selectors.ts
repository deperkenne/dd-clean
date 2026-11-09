import type { Agent, CleaningJob, Owner, Property, Reservation } from '@/features/properties/Property.types'
import { createJobListItemMapper } from '../jobListItem'
import type { PropertyDetail } from './propertyDetail.types'

/**
 * Rassemble la fiche d'un bien : réservations triées, jobs séparés entre
 * « à venir » et « historique ». Fonction pure, testable sans React.
 */
export function buildPropertyDetail(
  property: Property,
  owner: Owner | null,
  reservations: Reservation[],
  jobs: CleaningJob[],
  agents: Agent[],
  today: string,
): PropertyDetail {
  const toListItem = createJobListItemMapper([property], agents)
  const isUpcoming = (job: CleaningJob) => job.status !== 'CANCELLED' && job.scheduledDate >= today

  return {
    property,
    owner,
    reservations: [...reservations].sort((a, b) => a.checkIn.localeCompare(b.checkIn)),
    upcomingJobs: jobs
      .filter(isUpcoming)
      .sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate))
      .map(toListItem),
    pastJobs: jobs
      .filter((job) => !isUpcoming(job))
      .sort((a, b) => b.scheduledDate.localeCompare(a.scheduledDate))
      .map(toListItem),
  }
}
