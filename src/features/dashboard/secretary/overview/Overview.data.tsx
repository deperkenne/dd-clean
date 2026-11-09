import type { StatusTone } from '@/components/common/StatusDot'
import type { Localized } from '@/lib/i18n'
import type { OverviewStats } from './overview.types'

type StatKey = keyof OverviewStats

type OverviewContent = {
  todayPrefix: string
  statsLabel: string
  stats: Record<StatKey, { label: string; hint: string }>
  upcomingTitle: string
  upcomingMeta: (days: number) => string
  upcomingEmpty: string
  unassigned: string
  agentLabel: string
  durationLabel: string
  propertiesTitle: string
  propertiesMeta: (count: number) => string
  nextJob: string
  noJob: string
  loading: string
  error: string
  retry: string
}

export const statOrder: StatKey[] = ['today', 'toAssign', 'inProgress', 'toVerify']

/**
 * Pastille des compteurs liés à un statut : même couleur que ce statut.
 * « Jobs aujourd'hui » mélange tous les statuts, il n'a donc pas de pastille.
 */
export const statTones: Partial<Record<StatKey, StatusTone>> = {
  toAssign: 'neutral',
  inProgress: 'warning',
  toVerify: 'success',
}

export const overviewContent: Localized<OverviewContent> = {
  fr: {
    todayPrefix: "Aujourd'hui,",
    statsLabel: 'Chiffres clés',
    stats: {
      today: { label: "Jobs aujourd'hui", hint: 'Prévus pour la journée' },
      toAssign: { label: 'À assigner', hint: 'Jobs à venir sans agent' },
      inProgress: { label: 'En cours', hint: 'Agents sur place' },
      toVerify: { label: 'À vérifier', hint: 'Terminés, en attente de contrôle' },
    },
    upcomingTitle: 'Jobs à venir',
    upcomingMeta: (days) => `${days} prochains jours`,
    upcomingEmpty: 'Aucun job de nettoyage prévu sur cette période.',
    unassigned: 'Non assigné',
    agentLabel: 'Agent',
    durationLabel: 'Durée estimée',
    propertiesTitle: 'Biens',
    propertiesMeta: (count) => `${count} bien${count > 1 ? 's' : ''}`,
    nextJob: 'Prochain job',
    noJob: 'Aucun job prévu',
    loading: 'Chargement de la vue d’ensemble…',
    error: "Les données n'ont pas pu être chargées.",
    retry: 'Réessayer',
  },
  de: {
    todayPrefix: 'Heute,',
    statsLabel: 'Kennzahlen',
    stats: {
      today: { label: 'Einsätze heute', hint: 'Für heute geplant' },
      toAssign: { label: 'Zuzuweisen', hint: 'Anstehende Einsätze ohne Reinigungskraft' },
      inProgress: { label: 'Laufend', hint: 'Team vor Ort' },
      toVerify: { label: 'Zu prüfen', hint: 'Erledigt, Kontrolle ausstehend' },
    },
    upcomingTitle: 'Anstehende Einsätze',
    upcomingMeta: (days) => `Nächste ${days} Tage`,
    upcomingEmpty: 'In diesem Zeitraum sind keine Reinigungen geplant.',
    unassigned: 'Nicht zugewiesen',
    agentLabel: 'Reinigungskraft',
    durationLabel: 'Geschätzte Dauer',
    propertiesTitle: 'Objekte',
    propertiesMeta: (count) => `${count} ${count > 1 ? 'Objekte' : 'Objekt'}`,
    nextJob: 'Nächster Einsatz',
    noJob: 'Kein Einsatz geplant',
    loading: 'Überblick wird geladen…',
    error: 'Die Daten konnten nicht geladen werden.',
    retry: 'Erneut versuchen',
  },
  en: {
    todayPrefix: 'Today,',
    statsLabel: 'Key figures',
    stats: {
      today: { label: 'Jobs today', hint: 'Scheduled for today' },
      toAssign: { label: 'To assign', hint: 'Upcoming jobs without an agent' },
      inProgress: { label: 'In progress', hint: 'Agents on site' },
      toVerify: { label: 'To verify', hint: 'Done, awaiting inspection' },
    },
    upcomingTitle: 'Upcoming jobs',
    upcomingMeta: (days) => `Next ${days} days`,
    upcomingEmpty: 'No cleaning jobs scheduled for this period.',
    unassigned: 'Unassigned',
    agentLabel: 'Agent',
    durationLabel: 'Estimated duration',
    propertiesTitle: 'Properties',
    propertiesMeta: (count) => `${count} propert${count > 1 ? 'ies' : 'y'}`,
    nextJob: 'Next job',
    noJob: 'No job scheduled',
    loading: 'Loading overview…',
    error: 'The data could not be loaded.',
    retry: 'Try again',
  },
}
