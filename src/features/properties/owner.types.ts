import type { z } from 'zod'
import type { createOwnerSchema } from './owner.schema'

/**
 * Codes d'erreur de champ, traduits par le formulaire :
 * - `required` : champ obligatoire vide
 * - `tooLong`  : texte plus long que la limite du back-end
 * - `email`    : adresse e-mail invalide
 * - `price`    : prix négatif, non numérique ou avec plus de 2 décimales
 * - `duplicateRoom`       : même numéro de chambre deux fois dans un logement
 * - `duplicateEmailLabel` : même nom Smoobu sur deux logements de la fiche
 * - `agent`    : agent qui ne vient pas de la liste proposée
 * - `server`   : valeur refusée par le serveur (erreur 400 sur ce champ)
 */
export const OWNER_FIELD_ERROR_CODES = [
  'required',
  'tooLong',
  'email',
  'price',
  'duplicateRoom',
  'duplicateEmailLabel',
  'agent',
  'server',
] as const
export type OwnerFieldErrorCode = (typeof OWNER_FIELD_ERROR_CODES)[number]

/** Valeurs saisies dans le formulaire (le prix est encore du texte, ex. « 45,50 »). */
export type CreateOwnerFormValues = z.input<typeof createOwnerSchema>
