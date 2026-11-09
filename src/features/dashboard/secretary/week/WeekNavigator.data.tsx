import type { Localized } from '@/lib/i18n'

export const weekNavigatorContent: Localized<{ label: string; previous: string; next: string; current: string }> = {
  fr: {
    label: 'Changer de semaine',
    previous: 'Semaine précédente',
    next: 'Semaine suivante',
    current: 'Cette semaine',
  },
  de: {
    label: 'Woche wechseln',
    previous: 'Vorherige Woche',
    next: 'Nächste Woche',
    current: 'Diese Woche',
  },
  en: {
    label: 'Change week',
    previous: 'Previous week',
    next: 'Next week',
    current: 'This week',
  },
}
