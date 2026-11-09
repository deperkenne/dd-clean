import type { Agent, CleaningJob, Property } from '@/features/properties/Property.types'
import { createJobListItemMapper } from '../jobListItem'
import type { AgentWorkload } from './agents.types'

/**
 * Charge de chaque agent entre `weekStart` et `weekEnd` (inclus), jobs
 * annulés exclus. Agents triés par nom. Fonction pure, testable sans React.
 */
export function buildAgentsWorkload(
  agents: Agent[],
  jobs: CleaningJob[],
  properties: Property[],
  weekStart: string,
  weekEnd: string,
): AgentWorkload[] {
  const toListItem = createJobListItemMapper(properties, agents)
  const weekJobs = jobs
    .filter((job) => job.status !== 'CANCELLED' && job.scheduledDate >= weekStart && job.scheduledDate <= weekEnd)
    .sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate))

  return [...agents]
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
    .map((agent) => {
      const own = weekJobs.filter((job) => job.assignedAgentId === agent.id)
      return {
        id: agent.id,
        fullName: agent.fullName,
        phone: agent.phone,
        jobCount: own.length,
        totalMinutes: own.reduce((total, job) => total + job.estimatedDurationMinutes, 0),
        jobs: own.map(toListItem),
      }
    })
}
