/** Raison d'un échec d'envoi, traduite par l'UI. Le 409 (e-mail déjà utilisé) s'affiche sous le champ e-mail. */
export type CreateAgentFailure = 'invalid' | 'forbidden' | 'notFound' | 'unknown'

/** Agent que l'on vient de créer, pour l'écran de confirmation. */
export type CreatedAgentSummary = {
  fullName: string
  email: string
}
