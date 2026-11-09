import type { Localized } from '@/lib/i18n'

type AgentsContent = {
  eyebrow: string
  title: string
  agentsCount: (count: number) => string
  workloadLabel: string
  jobsLabel: string
  timeLabel: string
  noJobs: string
  weekJobsLabel: string
  empty: string
  loading: string
  error: string
  retry: string
}

export const agentsContent: Localized<AgentsContent> = {
  fr: {
    eyebrow: 'Back-office',
    title: 'Agents',
    agentsCount: (count) => `${count} agent${count > 1 ? 's' : ''}`,
    workloadLabel: 'Charge de la semaine',
    jobsLabel: 'Jobs',
    timeLabel: 'Temps prévu',
    noJobs: 'Aucun job cette semaine : disponible.',
    weekJobsLabel: 'Jobs de la semaine',
    empty: 'Aucun agent enregistré.',
    loading: 'Chargement des agents…',
    error: "Les agents n'ont pas pu être chargés.",
    retry: 'Réessayer',
  },
  de: {
    eyebrow: 'Backoffice',
    title: 'Reinigungskräfte',
    agentsCount: (count) => `${count} ${count > 1 ? 'Reinigungskräfte' : 'Reinigungskraft'}`,
    workloadLabel: 'Auslastung der Woche',
    jobsLabel: 'Einsätze',
    timeLabel: 'Geplante Zeit',
    noJobs: 'Diese Woche keine Einsätze: verfügbar.',
    weekJobsLabel: 'Einsätze der Woche',
    empty: 'Keine Reinigungskräfte erfasst.',
    loading: 'Reinigungskräfte werden geladen…',
    error: 'Die Reinigungskräfte konnten nicht geladen werden.',
    retry: 'Erneut versuchen',
  },
  en: {
    eyebrow: 'Back office',
    title: 'Agents',
    agentsCount: (count) => `${count} agent${count > 1 ? 's' : ''}`,
    workloadLabel: 'Workload this week',
    jobsLabel: 'Jobs',
    timeLabel: 'Planned time',
    noJobs: 'No jobs this week: available.',
    weekJobsLabel: 'Jobs this week',
    empty: 'No agents registered.',
    loading: 'Loading agents…',
    error: 'The agents could not be loaded.',
    retry: 'Try again',
  },
}
