import type { Localized } from '@/lib/i18n'

type AssignedPropertiesContent = {
  eyebrow: string
  title: string
  lead: string
  countLabel: (count: number) => string
  listLabel: string
  loading: string
  emptyTitle: string
  empty: string
  error: string
  retry: string
  owner: string
}

export const assignedPropertiesContent: Localized<AssignedPropertiesContent> = {
  fr: {
    eyebrow: 'Mes logements',
    title: 'Les logements dont vous vous occupez',
    lead: 'Les logements qui vous sont attribués pour le ménage.',
    countLabel: (count) => (count === 1 ? 'logement' : 'logements'),
    listLabel: 'Logements attribués',
    loading: 'Chargement de vos logements…',
    emptyTitle: 'Aucun logement attribué pour l’instant',
    empty: 'Dès qu’un logement vous sera attribué, il apparaîtra ici.',
    error: 'Vos logements n’ont pas pu être chargés.',
    retry: 'Réessayer',
    owner: 'Propriétaire',
  },
  de: {
    eyebrow: 'Meine Unterkünfte',
    title: 'Die Unterkünfte, die Sie betreuen',
    lead: 'Die Unterkünfte, die Ihnen für die Reinigung zugeordnet sind.',
    countLabel: (count) => (count === 1 ? 'Unterkunft' : 'Unterkünfte'),
    listLabel: 'Zugeordnete Unterkünfte',
    loading: 'Ihre Unterkünfte werden geladen…',
    emptyTitle: 'Noch keine Unterkunft zugeordnet',
    empty: 'Sobald Ihnen eine Unterkunft zugeordnet wird, erscheint sie hier.',
    error: 'Ihre Unterkünfte konnten nicht geladen werden.',
    retry: 'Erneut versuchen',
    owner: 'Eigentümer',
  },
  en: {
    eyebrow: 'My properties',
    title: 'The properties you look after',
    lead: 'The properties assigned to you for cleaning.',
    countLabel: (count) => (count === 1 ? 'property' : 'properties'),
    listLabel: 'Assigned properties',
    loading: 'Loading your properties…',
    emptyTitle: 'No property assigned yet',
    empty: 'As soon as a property is assigned to you, it will appear here.',
    error: 'Your properties could not be loaded.',
    retry: 'Try again',
    owner: 'Owner',
  },
}
