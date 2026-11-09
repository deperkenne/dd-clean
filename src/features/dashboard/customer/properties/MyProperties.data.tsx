import type { Localized } from '@/lib/i18n'
import type { PropertyAgentFilter } from './myProperties.types'

type MyPropertiesContent = {
  eyebrow: string
  title: string
  lead: string
  countLabel: (count: number) => string
  unassigned: (count: number) => string
  allAssigned: string
  newOwner: string
  filterLabel: string
  filters: Record<PropertyAgentFilter, string>
  loading: string
  emptyTitle: string
  empty: string
  emptyFiltered: string
  error: string
  retry: string
  columns: { position: string; property: string; owner: string; agent: string }
  smoobuLabel: string
  noAddress: string
  ownerRef: string
  agentLabel: string
  noAgent: string
}

export const myPropertiesContent: Localized<MyPropertiesContent> = {
  fr: {
    eyebrow: 'Mes logements',
    title: 'Vos logements et leurs agents',
    lead: 'Tous les logements de vos propriétaires. Attribuez à chacun l’agent de ménage qui s’en occupe, ou changez-le.',
    countLabel: (count) => (count === 1 ? 'logement' : 'logements'),
    unassigned: (count) => (count === 1 ? '1 logement sans agent' : `${count} logements sans agent`),
    allAssigned: 'Tous vos logements ont un agent',
    newOwner: 'Nouveau propriétaire',
    filterLabel: 'Filtrer les logements',
    filters: { all: 'Tous', unassigned: 'Sans agent' },
    loading: 'Chargement de vos logements…',
    emptyTitle: 'Aucun logement pour l’instant',
    empty: 'Les logements se créent avec leur propriétaire. Créez un propriétaire et ajoutez-lui ses logements.',
    emptyFiltered: 'Tous vos logements ont déjà un agent.',
    error: 'Vos logements n’ont pas pu être chargés.',
    retry: 'Réessayer',
    columns: { position: 'N°', property: 'Logement', owner: 'Propriétaire', agent: 'Agent de ménage' },
    smoobuLabel: 'Nom Smoobu',
    noAddress: 'Adresse non renseignée',
    ownerRef: 'Réf. client',
    agentLabel: 'Agent',
    noAgent: 'Aucun agent',
  },
  de: {
    eyebrow: 'Meine Unterkünfte',
    title: 'Ihre Unterkünfte und ihre Reinigungskräfte',
    lead: 'Alle Unterkünfte Ihrer Eigentümer. Ordnen Sie jeder die zuständige Reinigungskraft zu oder ändern Sie sie.',
    countLabel: (count) => (count === 1 ? 'Unterkunft' : 'Unterkünfte'),
    unassigned: (count) =>
      count === 1 ? '1 Unterkunft ohne Reinigungskraft' : `${count} Unterkünfte ohne Reinigungskraft`,
    allAssigned: 'Alle Unterkünfte haben eine Reinigungskraft',
    newOwner: 'Neuer Eigentümer',
    filterLabel: 'Unterkünfte filtern',
    filters: { all: 'Alle', unassigned: 'Ohne Reinigungskraft' },
    loading: 'Ihre Unterkünfte werden geladen…',
    emptyTitle: 'Noch keine Unterkünfte',
    empty: 'Unterkünfte werden mit ihrem Eigentümer angelegt. Legen Sie einen Eigentümer mit seinen Unterkünften an.',
    emptyFiltered: 'Alle Ihre Unterkünfte haben bereits eine Reinigungskraft.',
    error: 'Ihre Unterkünfte konnten nicht geladen werden.',
    retry: 'Erneut versuchen',
    columns: { position: 'Nr.', property: 'Unterkunft', owner: 'Eigentümer', agent: 'Reinigungskraft' },
    smoobuLabel: 'Smoobu-Name',
    noAddress: 'Keine Adresse angegeben',
    ownerRef: 'Kundenref.',
    agentLabel: 'Reinigungskraft',
    noAgent: 'Keine Reinigungskraft',
  },
  en: {
    eyebrow: 'My properties',
    title: 'Your properties and their agents',
    lead: 'All your owners’ properties. Assign each one the cleaning agent in charge, or change it.',
    countLabel: (count) => (count === 1 ? 'property' : 'properties'),
    unassigned: (count) => (count === 1 ? '1 property without an agent' : `${count} properties without an agent`),
    allAssigned: 'Every property has an agent',
    newOwner: 'New owner',
    filterLabel: 'Filter properties',
    filters: { all: 'All', unassigned: 'Without agent' },
    loading: 'Loading your properties…',
    emptyTitle: 'No properties yet',
    empty: 'Properties are created with their owner. Create an owner and add their properties.',
    emptyFiltered: 'All your properties already have an agent.',
    error: 'Your properties could not be loaded.',
    retry: 'Try again',
    columns: { position: 'No.', property: 'Property', owner: 'Owner', agent: 'Cleaning agent' },
    smoobuLabel: 'Smoobu name',
    noAddress: 'No address provided',
    ownerRef: 'Customer ref.',
    agentLabel: 'Agent',
    noAgent: 'No agent',
  },
}
