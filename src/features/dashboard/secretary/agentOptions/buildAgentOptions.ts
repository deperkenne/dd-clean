import type { Agent, CleaningJob } from '@/features/properties/Property.types'
import type { AgentOption } from './agentOptions.types'

/**
 * Charge de chaque agent un jour donné (jobs annulés exclus), pour l'afficher
 * à côté de son nom dans une liste de choix et éviter les doubles réservations.
 * `excludeJobId` : le job en cours de modification, à ne pas compter.
 * Fonction pure, partagée par l'assignation et la création de job.
 */
export function buildAgentOptions(
  agents: Agent[],
  jobs: CleaningJob[],
  date: string,
  excludeJobId?: string,
): AgentOption[] {
  return agents.map((agent) => {
    const sameDay = jobs.filter(
      (job) =>
        job.id !== excludeJobId &&
        job.status !== 'CANCELLED' &&
        job.assignedAgentId === agent.id &&
        job.scheduledDate === date,
    )
    return {
      id: agent.id,
      name: agent.fullName,
      jobsThatDay: sameDay.length,
      minutesThatDay: sameDay.reduce((total, job) => total + job.estimatedDurationMinutes, 0),
    }
  })
}
