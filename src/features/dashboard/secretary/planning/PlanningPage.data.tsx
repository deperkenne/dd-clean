import type { Localized } from '@/lib/i18n'

type PlanningContent = {
  eyebrow: string
  title: string
  jobsCount: (count: number) => string
  today: string
  emptyDay: string
  emptyWeek: string
  unassigned: string
  agentLabel: string
  durationLabel: string
  loading: string
  error: string
  retry: string
}

export const planningContent: Localized<PlanningContent> = {
  fr: {
    eyebrow: 'Back-office',
    title: 'Planning',
    jobsCount: (count) => (count === 0 ? 'Aucun job' : `${count} job${count > 1 ? 's' : ''}`),
    today: "Aujourd'hui",
    emptyDay: 'Aucun job',
    emptyWeek: 'Aucun job de nettoyage prévu cette semaine.',
    unassigned: 'Non assigné',
    agentLabel: 'Agent',
    durationLabel: 'Durée estimée',
    loading: 'Chargement du planning…',
    error: "Le planning n'a pas pu être chargé.",
    retry: 'Réessayer',
  },
  de: {
    eyebrow: 'Backoffice',
    title: 'Wochenplan',
    jobsCount: (count) => (count === 0 ? 'Keine Einsätze' : `${count} ${count > 1 ? 'Einsätze' : 'Einsatz'}`),
    today: 'Heute',
    emptyDay: 'Keine Einsätze',
    emptyWeek: 'Diese Woche sind keine Reinigungen geplant.',
    unassigned: 'Nicht zugewiesen',
    agentLabel: 'Reinigungskraft',
    durationLabel: 'Geschätzte Dauer',
    loading: 'Wochenplan wird geladen…',
    error: 'Der Wochenplan konnte nicht geladen werden.',
    retry: 'Erneut versuchen',
  },
  en: {
    eyebrow: 'Back office',
    title: 'Schedule',
    jobsCount: (count) => (count === 0 ? 'No jobs' : `${count} job${count > 1 ? 's' : ''}`),
    today: 'Today',
    emptyDay: 'No jobs',
    emptyWeek: 'No cleaning jobs scheduled this week.',
    unassigned: 'Unassigned',
    agentLabel: 'Agent',
    durationLabel: 'Estimated duration',
    loading: 'Loading schedule…',
    error: 'The schedule could not be loaded.',
    retry: 'Try again',
  },
}
