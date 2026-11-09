/** Un agent prêt à afficher. */
export type AgentView = {
  id: string
  /** Rang dans la liste, sur deux chiffres : « 01 », « 02 »… */
  position: string
  fullName: string
  /** « Marie Dupont » → « MD » */
  initials: string
  email?: string
  phone?: string
  /** Numéro sans espaces ni séparateurs, pour le lien `tel:`. */
  phoneHref?: string
  active: boolean
}
