import type { Localized } from '@/lib/i18n'

type SecretaryDashboardContent = {
  area: string
  eyebrow: string
  title: string
}

export const secretaryDashboardContent: Localized<SecretaryDashboardContent> = {
  fr: { area: 'Secrétariat', eyebrow: 'Back-office', title: 'Tableau de bord' },
  de: { area: 'Sekretariat', eyebrow: 'Backoffice', title: 'Übersicht' },
  en: { area: 'Secretary', eyebrow: 'Back office', title: 'Dashboard' },
}
