import type { PropertyServiceType } from '@/features/properties/Property.types'
import type { JobListItem } from '../jobListItem.types'

/** Compteurs affichés en tête de la vue d'ensemble. */
export type OverviewStats = {
  /** Jobs prévus aujourd'hui (hors annulés). */
  today: number
  /** Jobs à venir encore sans agent. */
  toAssign: number
  /** Jobs en cours d'exécution. */
  inProgress: number
  /** Jobs terminés par l'agent, en attente de vérification. */
  toVerify: number
}

/** Ligne de la liste des biens, avec la date de son prochain job. */
export type PropertySummary = {
  id: string
  label: string
  address: string
  city: string
  serviceType: PropertyServiceType
  nextJobDate: string | null
}

export type SecretaryOverview = {
  today: string
  windowEnd: string
  stats: OverviewStats
  upcomingJobs: JobListItem[]
  properties: PropertySummary[]
}
