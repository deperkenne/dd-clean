/** Un logement prêt à afficher. */
export type PropertyView = {
  id: string
  /** Rang dans la liste, sur deux chiffres : « 01 », « 02 »… */
  position: string
  name: string
  /** Nom tel qu'il apparaît dans les e-mails Smoobu. */
  emailLabel: string
  /** « Hauptstraße 1, 90402 Nürnberg » ; absent si rien n'est renseigné. */
  address?: string
  ownerName: string
  ownerCustomerId: string
  /** Absents si aucun agent n'est attribué. */
  agentId?: string
  agentName?: string
}

/** Filtre de la liste : tous les logements, ou seulement ceux sans agent. */
export type PropertyAgentFilter = 'all' | 'unassigned'
