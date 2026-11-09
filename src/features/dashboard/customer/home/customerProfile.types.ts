/** Ce que l'espace client affiche du compte connecté, lu dans le jeton Keycloak. */
export type CustomerProfile = {
  name?: string
  email?: string
  /** Date du jour en toutes lettres, dans la langue active. */
  today: string
}
