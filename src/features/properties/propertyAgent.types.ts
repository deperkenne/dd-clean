import type { z } from 'zod'
import type { assignAgentSchema } from './propertyAgent.schema'

/** Codes d'erreur du choix d'agent : rien choisi, ou valeur hors de la liste. */
export const ASSIGN_AGENT_ERROR_CODES = ['required', 'agent'] as const
export type AssignAgentErrorCode = (typeof ASSIGN_AGENT_ERROR_CODES)[number]

/** Saisie du formulaire d'attribution (texte brut de la liste déroulante). */
export type AssignAgentFormValues = z.input<typeof assignAgentSchema>
