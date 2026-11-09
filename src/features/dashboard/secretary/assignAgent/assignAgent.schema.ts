import { z } from 'zod'

/**
 * Validation du choix d'agent, AVANT tout appel au repository : la valeur doit
 * être vide (retirer l'agent) ou l'identifiant d'un agent réellement connu.
 * Une valeur modifiée à la main dans le navigateur est donc refusée ici.
 */
export function createAssignAgentSchema(knownAgentIds: string[]) {
  return z.object({
    agentId: z
      .string()
      .refine((id) => id === '' || knownAgentIds.includes(id), { message: 'unknown_agent' }),
  })
}
