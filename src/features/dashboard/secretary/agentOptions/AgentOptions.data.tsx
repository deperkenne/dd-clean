import type { Localized } from '@/lib/i18n'

export const agentOptionsContent: Localized<{
  none: string
  freeThatDay: string
  loadThatDay: (jobs: number, duration: string) => string
}> = {
  fr: {
    none: '— Aucun agent —',
    freeThatDay: 'libre ce jour',
    loadThatDay: (jobs, duration) => `${jobs} job${jobs > 1 ? 's' : ''} ce jour (${duration})`,
  },
  de: {
    none: '— Keine Reinigungskraft —',
    freeThatDay: 'an diesem Tag frei',
    loadThatDay: (jobs, duration) => `${jobs} ${jobs > 1 ? 'Einsätze' : 'Einsatz'} an diesem Tag (${duration})`,
  },
  en: {
    none: '— No agent —',
    freeThatDay: 'free that day',
    loadThatDay: (jobs, duration) => `${jobs} job${jobs > 1 ? 's' : ''} that day (${duration})`,
  },
}
