import type { Localized } from '@/lib/i18n'

type CustomerDashboardContent = {
  /** Nom de l'espace, affiché à côté du logo dans la barre supérieure. */
  area: string
}

export const customerDashboardContent: Localized<CustomerDashboardContent> = {
  fr: { area: 'Espace client' },
  de: { area: 'Kundenbereich' },
  en: { area: 'Customer area' },
}
