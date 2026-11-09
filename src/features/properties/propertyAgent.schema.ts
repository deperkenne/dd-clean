// Même règle que `@NotNull UUID agentId` du back-end, vérifiée avant l'envoi.

import { z } from 'zod'
import type { AssignAgentRequest } from './propertyAgent.dto'
import { ASSIGN_AGENT_ERROR_CODES, type AssignAgentErrorCode } from './propertyAgent.types'

export const assignAgentSchema = z.object({
  agentId: z.string().trim().min(1, 'required').pipe(z.uuid('agent')),
}) satisfies z.ZodType<AssignAgentRequest, unknown>

export const isAssignAgentErrorCode = (value: unknown): value is AssignAgentErrorCode =>
  (ASSIGN_AGENT_ERROR_CODES as readonly unknown[]).includes(value)
