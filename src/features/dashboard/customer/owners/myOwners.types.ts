/** Un propriétaire prêt à afficher : textes déjà formatés dans la langue active. */
export type OwnerView = {
  id: string
  /** Rang dans la liste, sur deux chiffres : « 01 », « 02 »… */
  position: string
  name: string
  /** Une ou deux lettres pour le monogramme : « Marie Dupont » → « MD ». */
  initials: string
  customerId: string
  email?: string
  phone?: string
  /** Numéro sans espaces ni séparateurs, pour le lien `tel:`. */
  phoneHref?: string
  /** « 4 novembre 2026 » */
  addedOn: string
}
