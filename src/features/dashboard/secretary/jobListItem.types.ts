import type { CleaningJobStatus, PropertyServiceType } from '@/features/properties/Property.types'

/** Job prêt à afficher dans une liste : bien et agent déjà résolus. */
export type JobListItem = {
  id: string
  scheduledDate: string
  status: CleaningJobStatus
  durationMinutes: number
  propertyLabel: string
  propertyCity: string
  serviceType: PropertyServiceType | null
  agentName: string | null
}
