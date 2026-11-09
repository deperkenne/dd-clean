import type { Agent, CleaningJob, Property } from '@/features/properties/Property.types'
import { addDays } from '@/lib/date'
import { createJobListItemMapper } from '../jobListItem'
import type { PropertySummary, SecretaryOverview } from './overview.types'

/** Nombre de jours couverts par la liste « jobs à venir », aujourd'hui compris. */
export const UPCOMING_WINDOW_DAYS = 7

/**
 * Calcule la vue d'ensemble à partir des données brutes du repository.
 * Fonction pure : mêmes entrées → même résultat, testable sans React.
 * Les dates ISO « AAAA-MM-JJ » se comparent directement comme des chaînes.
 */
export function buildSecretaryOverview(
  jobs: CleaningJob[],
  properties: Property[],
  agents: Agent[],
  today: string,
): SecretaryOverview {
  const windowEnd = addDays(today, UPCOMING_WINDOW_DAYS - 1)
  const toListItem = createJobListItemMapper(properties, agents)

  const activeJobs = jobs.filter((job) => job.status !== 'CANCELLED')
  const comingJobs = activeJobs.filter((job) => job.scheduledDate >= today)

  const stats = {
    today: activeJobs.filter((job) => job.scheduledDate === today).length,
    toAssign: comingJobs.filter((job) => job.assignedAgentId === null).length,
    inProgress: activeJobs.filter((job) => job.status === 'IN_PROGRESS').length,
    toVerify: activeJobs.filter((job) => job.status === 'DONE').length,
  }

  const upcomingJobs = comingJobs
    .filter((job) => job.scheduledDate <= windowEnd)
    .sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate))
    .map(toListItem)

  const nextJobDate = (propertyId: string) =>
    comingJobs
      .filter((job) => job.propertyId === propertyId && job.status !== 'VERIFIED')
      .map((job) => job.scheduledDate)
      .sort()[0] ?? null

  const propertySummaries: PropertySummary[] = properties
    .map((property) => ({
      id: property.id,
      label: property.label,
      address: property.address,
      city: property.city,
      serviceType: property.serviceType,
      nextJobDate: nextJobDate(property.id),
    }))
    // Biens avec un job prévu d'abord (le plus proche en tête), puis les autres.
    .sort((a, b) => (a.nextJobDate ?? '9999').localeCompare(b.nextJobDate ?? '9999'))

  return { today, windowEnd, stats, upcomingJobs, properties: propertySummaries }
}
