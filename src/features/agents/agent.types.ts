import type { z } from 'zod'
import type { createAgentSchema } from './agent.schema'

/** Codes d'erreur d'un champ du formulaire agent, traduits par l'interface. */
export const AGENT_FIELD_ERROR_CODES = ['required', 'tooLong', 'email', 'phone', 'emailUsed', 'server'] as const

export type AgentFieldErrorCode = (typeof AGENT_FIELD_ERROR_CODES)[number]

/** Saisie du formulaire (texte brut, avant nettoyage par Zod). */
export type CreateAgentFormValues = z.input<typeof createAgentSchema>
