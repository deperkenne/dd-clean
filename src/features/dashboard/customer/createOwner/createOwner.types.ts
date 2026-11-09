import type { useCreateOwner } from './useCreateOwner'

/** Ce que `useCreateOwner` met à disposition du formulaire. */
export type CreateOwnerController = ReturnType<typeof useCreateOwner>

/**
 * Raison d'un échec d'envoi, traduite par la page :
 * - `invalid`   : 400, le serveur a refusé certaines valeurs
 * - `forbidden` : 403, le compte n'a pas le rôle CUSTOMER
 * - `conflict`  : 409, numéro client ou nom Smoobu déjà utilisé
 * - `unknown`   : réseau, serveur indisponible, autre erreur
 */
export type CreateOwnerFailure = 'invalid' | 'forbidden' | 'conflict' | 'unknown'

/** Récapitulatif affiché après la création, tiré de ce qui a été envoyé. */
export type CreatedOwnerSummary = {
  name: string
  propertyCount: number
  roomCount: number
}
