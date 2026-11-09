import type { Localized } from '@/lib/i18n'

type AgentLayoutContent = {
  /** Nom de l'espace, affiché à côté du logo dans la barre supérieure. */
  area: string
}

export const agentLayoutContent: Localized<AgentLayoutContent> = {
  fr: { area: 'Espace agent' },
  de: { area: 'Bereich Reinigungskraft' },
  en: { area: 'Agent area' },
}
