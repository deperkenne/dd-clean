// =============================================================================
// owner.schema.ts
// -----------------------------------------------------------------------------
// Les mêmes règles que les annotations Bean Validation du back-end, vérifiées
// AVANT l'envoi : une requête qu'on sait refusée (400) n'est jamais envoyée.
//   @NotBlank      → texte obligatoire, pas seulement des espaces
//   @Size(max = n) → n caractères au plus
//   @Email         → adresse e-mail valide (si renseignée)
//   @NotNull @PositiveOrZero @Digits(integer = 8, fraction = 2) → prix ≥ 0,
//                    8 chiffres avant la virgule et 2 après au plus
//
// Le schéma part des valeurs du formulaire (du texte) et produit exactement le
// corps attendu par l'API : espaces retirés, champs facultatifs vides omis,
// prix converti en nombre (« 45,50 » comme « 45.50 »).
// Les messages sont des codes (`OwnerFieldErrorCode`), traduits par l'interface.
// =============================================================================

import { z } from 'zod'
import type { CreateOwnerRequest, CreatePropertyRequest, CreateRoomRequest } from './owner.dto'
import { OWNER_FIELD_ERROR_CODES, type OwnerFieldErrorCode } from './owner.types'

/** Longueurs maximales, identiques aux `@Size` / `length` du back-end. */
export const OWNER_LIMITS = {
  ownerName: 150,
  email: 255,
  phone: 30,
  propertyName: 200,
  emailLabel: 200,
  street: 200,
  postalCode: 10,
  city: 100,
  roomNumber: 20,
} as const

export const isOwnerFieldErrorCode = (value: unknown): value is OwnerFieldErrorCode =>
  (OWNER_FIELD_ERROR_CODES as readonly unknown[]).includes(value)

const requiredText = (max: number) => z.string().trim().min(1, 'required').max(max, 'tooLong')

/** Champ facultatif : vide → absent du corps envoyé (null côté Java). */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, 'tooLong')
    .transform((value) => value || undefined)

const optionalEmail = z
  .string()
  .trim()
  .max(OWNER_LIMITS.email, 'tooLong')
  .refine((value) => value === '' || z.email().safeParse(value).success, 'email')
  .transform((value) => value || undefined)

/** Agent choisi dans la liste : un UUID, ou rien (« aucun agent pour l'instant »). */
const optionalAgentId = z
  .string()
  .trim()
  .refine((value) => value === '' || z.uuid().safeParse(value).success, 'agent')
  .transform((value) => value || undefined)

/** Au plus 2 décimales (`fraction = 2`) ; marge pour les arrondis des nombres JavaScript. */
const hasAtMostTwoDecimals = (value: number) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-6

const priceSchema = z
  .string()
  .trim()
  .min(1, 'required')
  // Virgule décimale acceptée : « 45,50 » est la saisie habituelle en Allemagne et en France.
  .transform((value) => Number(value.replace(',', '.')))
  .pipe(
    z
      .number('price')
      .nonnegative('price')
      .lt(100_000_000, 'price') // `integer = 8` : 99 999 999,99 au plus
      .refine(hasAtMostTwoDecimals, 'price'),
  )

/**
 * Positions des valeurs déjà vues plus haut dans la liste (la première reste
 * valide, les suivantes sont signalées). Comparaison exacte, espaces retirés,
 * comme la contrainte d'unicité de la base.
 */
function duplicatePositions(values: string[]): number[] {
  const seen = new Set<string>()
  return values.flatMap((value, position) => {
    if (seen.has(value)) return [position]
    seen.add(value)
    return []
  })
}

export const createRoomSchema = z.object({
  number: requiredText(OWNER_LIMITS.roomNumber),
  price: priceSchema,
}) satisfies z.ZodType<CreateRoomRequest, unknown>

export const createPropertySchema = z.object({
  name: requiredText(OWNER_LIMITS.propertyName),
  emailLabel: requiredText(OWNER_LIMITS.emailLabel),
  street: optionalText(OWNER_LIMITS.street),
  postalCode: optionalText(OWNER_LIMITS.postalCode),
  city: optionalText(OWNER_LIMITS.city),
  rooms: z.array(createRoomSchema),
  agentId: optionalAgentId,
})
  // Contrainte `uk_room_property_number` : un numéro de chambre est unique dans un logement.
  .superRefine((property, ctx) => {
    for (const position of duplicatePositions(property.rooms.map((room) => room.number))) {
      ctx.addIssue({ code: 'custom', message: 'duplicateRoom', path: ['rooms', position, 'number'] })
    }
  }) satisfies z.ZodType<CreatePropertyRequest, unknown>

export const createOwnerSchema = z.object({
  name: requiredText(OWNER_LIMITS.ownerName),
  email: optionalEmail,
  phone: optionalText(OWNER_LIMITS.phone),
  properties: z.array(createPropertySchema),
})
  // `email_label` est unique dans toute la base : deux logements de la même fiche ne
  // peuvent pas le partager. (Un doublon avec un AUTRE propriétaire, déjà en base,
  // ne peut être vu que par le serveur.)
  .superRefine((owner, ctx) => {
    for (const position of duplicatePositions(owner.properties.map((property) => property.emailLabel))) {
      ctx.addIssue({ code: 'custom', message: 'duplicateEmailLabel', path: ['properties', position, 'emailLabel'] })
    }
  }) satisfies z.ZodType<CreateOwnerRequest, unknown>
