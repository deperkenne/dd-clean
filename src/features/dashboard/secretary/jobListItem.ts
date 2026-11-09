import type { Agent, CleaningJob, Property } from '@/features/properties/Property.types'
import type { JobListItem } from './jobListItem.types'

/**
 * Prépare un job pour l'affichage en liste (vue d'ensemble, planning) :
 * le bien et l'agent sont résolus à partir de leurs identifiants.
 * Fonction pure, partagée pour que toutes les listes affichent la même chose.
 */
export function createJobListItemMapper(properties: Property[], agents: Agent[]) {
  const propertyById = new Map(properties.map((property) => [property.id, property]))
  const agentById = new Map(agents.map((agent) => [agent.id, agent]))

  return (job: CleaningJob): JobListItem => {
    const property = propertyById.get(job.propertyId)
    return {
      id: job.id,
      scheduledDate: job.scheduledDate,
      status: job.status,
      durationMinutes: job.estimatedDurationMinutes,
      propertyLabel: property?.label ?? job.propertyId,
      propertyCity: property?.city ?? '',
      serviceType: property?.serviceType ?? null,
      agentName: job.assignedAgentId ? (agentById.get(job.assignedAgentId)?.fullName ?? null) : null,
    }
  }
}
