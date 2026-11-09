import { useLocation } from 'react-router-dom'

export type BackTarget = 'overview' | 'planning' | 'agents' | 'property'

const OVERVIEW_PATH = '/dashboard/secretary'

/** Pages qui peuvent ouvrir un détail de job et vers lesquelles on revient. */
const RETURN_PAGES: { matches: (from: string) => boolean; target: BackTarget }[] = [
  { matches: (from) => isPage(from, '/dashboard/secretary/planning'), target: 'planning' },
  { matches: (from) => isPage(from, '/dashboard/secretary/agents'), target: 'agents' },
  { matches: (from) => /^\/dashboard\/secretary\/properties\/[\w-]+$/.test(from), target: 'property' },
]

/** La page exacte, éventuellement suivie de paramètres (?week=…). */
function isPage(from: string, path: string) {
  return from === path || from.startsWith(`${path}?`)
}

/**
 * Où renvoie le bouton « retour » du détail d'un job.
 *
 * La page d'origine (planning, agents, fiche d'un bien) transmet sa propre
 * adresse, avec la semaine affichée le cas échéant, dans l'état de navigation. On ne l'accepte que si c'est
 * bien l'une de ces pages de l'espace secrétaire ; sinon (accès direct,
 * favori…) on revient à la vue d'ensemble.
 */
export function useJobDetailBackLink(): { to: string; target: BackTarget } {
  const { state } = useLocation()
  const from: unknown = state && typeof state === 'object' && 'from' in state ? state.from : undefined

  if (typeof from === 'string') {
    const page = RETURN_PAGES.find(({ matches }) => matches(from))
    if (page) return { to: from, target: page.target }
  }
  return { to: OVERVIEW_PATH, target: 'overview' }
}
