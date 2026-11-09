import type { Agent, CleaningJob, Owner, Property, Reservation } from '@/features/properties/Property.types'

/** Tout ce qu'affiche la page détail d'un job, déjà rassemblé. */
export type JobDetail = {
  job: CleaningJob
  property: Property | null
  owner: Owner | null
  /** Null pour un job manuel (bureaux, fin de chantier…) sans réservation. */
  reservation: Reservation | null
  agent: Agent | null
}

export type JobDetailState =
  | { status: 'loading' }
  | { status: 'error'; retry: () => void }
  | { status: 'notFound' }
  | { status: 'success'; data: JobDetail }
