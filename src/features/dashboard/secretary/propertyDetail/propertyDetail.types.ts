import type { Owner, Property, Reservation } from '@/features/properties/Property.types'
import type { JobListItem } from '../jobListItem.types'

export type PropertyDetail = {
  property: Property
  owner: Owner | null
  /** Réservations triées par date d'arrivée. */
  reservations: Reservation[]
  /** Jobs à venir (aujourd'hui compris, hors annulés), du plus proche au plus lointain. */
  upcomingJobs: JobListItem[]
  /** Jobs passés ou annulés, du plus récent au plus ancien. */
  pastJobs: JobListItem[]
}

export type PropertyDetailState =
  | { status: 'loading' }
  | { status: 'error'; retry: () => void }
  | { status: 'notFound' }
  | { status: 'success'; data: PropertyDetail }
