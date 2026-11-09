import type { Localized } from '@/lib/i18n'

type MyAgentsContent = {
  eyebrow: string
  title: string
  lead: string
  countLabel: (count: number) => string
  activeOf: (active: number, total: number) => string
  newAgent: string
  loading: string
  emptyTitle: string
  empty: string
  error: string
  retry: string
  columns: { position: string; agent: string; contact: string; status: string }
  active: string
  inactive: string
}

export const myAgentsContent: Localized<MyAgentsContent> = {
  fr: {
    eyebrow: 'Mes agents',
    title: 'Votre équipe de ménage',
    lead: 'Les agents rattachés à votre compte. Ce sont eux que vous attribuerez à vos logements.',
    countLabel: (count) => (count === 1 ? 'agent' : 'agents'),
    activeOf: (active, total) => `${active} actif${active > 1 ? 's' : ''} sur ${total}`,
    newAgent: 'Nouvel agent',
    loading: 'Chargement de vos agents…',
    emptyTitle: 'Aucun agent pour l’instant',
    empty: 'Ajoutez votre premier agent de ménage : vous pourrez ensuite l’attribuer à vos logements.',
    error: 'Vos agents n’ont pas pu être chargés.',
    retry: 'Réessayer',
    columns: { position: 'N°', agent: 'Agent', contact: 'Contact', status: 'Statut' },
    active: 'Actif',
    inactive: 'Inactif',
  },
  de: {
    eyebrow: 'Meine Reinigungskräfte',
    title: 'Ihr Reinigungsteam',
    lead: 'Die mit Ihrem Konto verknüpften Reinigungskräfte. Sie ordnen sie Ihren Unterkünften zu.',
    countLabel: (count) => (count === 1 ? 'Reinigungskraft' : 'Reinigungskräfte'),
    activeOf: (active, total) => `${active} von ${total} aktiv`,
    newAgent: 'Neue Reinigungskraft',
    loading: 'Ihre Reinigungskräfte werden geladen…',
    emptyTitle: 'Noch keine Reinigungskräfte',
    empty: 'Legen Sie Ihre erste Reinigungskraft an – danach können Sie sie Ihren Unterkünften zuordnen.',
    error: 'Ihre Reinigungskräfte konnten nicht geladen werden.',
    retry: 'Erneut versuchen',
    columns: { position: 'Nr.', agent: 'Reinigungskraft', contact: 'Kontakt', status: 'Status' },
    active: 'Aktiv',
    inactive: 'Inaktiv',
  },
  en: {
    eyebrow: 'My agents',
    title: 'Your cleaning team',
    lead: 'The agents linked to your account. You will assign them to your properties.',
    countLabel: (count) => (count === 1 ? 'agent' : 'agents'),
    activeOf: (active, total) => `${active} of ${total} active`,
    newAgent: 'New agent',
    loading: 'Loading your agents…',
    emptyTitle: 'No agents yet',
    empty: 'Add your first cleaning agent – you can then assign them to your properties.',
    error: 'Your agents could not be loaded.',
    retry: 'Try again',
    columns: { position: 'No.', agent: 'Agent', contact: 'Contact', status: 'Status' },
    active: 'Active',
    inactive: 'Inactive',
  },
}
