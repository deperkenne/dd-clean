// =============================================================================
// agent.schema.ts
// -----------------------------------------------------------------------------
// Les mêmes règles que les annotations du back-end, vérifiées AVANT l'envoi :
//   @NotBlank → texte obligatoire, pas seulement des espaces
//   @Email    → adresse e-mail valide
// Le back-end ne fixe pas de longueur : on borne à 255 caractères (taille par
// défaut d'une colonne JPA) et le téléphone à un format plausible, pour ne
// jamais envoyer une valeur que la base refuserait.
// Les messages sont des codes (`AgentFieldErrorCode`), traduits par l'interface.
// =============================================================================

import { z } from 'zod'
import type { CreateAgentRequest } from './agent.dto'
import { AGENT_FIELD_ERROR_CODES, type AgentFieldErrorCode } from './agent.types'

export const AGENT_LIMITS = { name: 255, email: 255, phone: 30 } as const

export const isAgentFieldErrorCode = (value: unknown): value is AgentFieldErrorCode =>
  (AGENT_FIELD_ERROR_CODES as readonly unknown[]).includes(value)

const requiredText = (max: number) => z.string().trim().min(1, 'required').max(max, 'tooLong')

/** Chiffres, espaces et + ( ) - / . : « +49 911 123 45 67 », « 0176/9876543 ». */
const PHONE_PATTERN = /^\+?[\d\s()./-]{6,}$/

export const createAgentSchema = z.object({
  firstName: requiredText(AGENT_LIMITS.name),
  lastName: requiredText(AGENT_LIMITS.name),
  email: requiredText(AGENT_LIMITS.email).pipe(z.email('email')),
  phone: z
    .string()
    .trim()
    .max(AGENT_LIMITS.phone, 'tooLong')
    .refine((value) => value === '' || PHONE_PATTERN.test(value), 'phone')
    .transform((value) => value || undefined),
}) satisfies z.ZodType<CreateAgentRequest, unknown>
