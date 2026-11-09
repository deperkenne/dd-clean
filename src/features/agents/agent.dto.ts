// =============================================================================
// agent.dto.ts
// -----------------------------------------------------------------------------
// Contrats JSON de `/api/agents` (records Java CreateAgentRequest et AgentResponse).
// Ni customerId ni rôle dans la création : le back-end les déduit du jeton, le
// client ne peut pas les choisir. Les règles de validation vivent dans
// `agent.schema.ts`.
// =============================================================================

import type { Uuid } from '@/lib/api.types'

/** Corps de `POST /api/agents`. */
export type CreateAgentRequest = {
  firstName: string
  lastName: string
  email: string
  /** Facultatif : omis s'il est vide. */
  phone?: string
}

/** Un agent de ménage, tel que renvoyé par `POST /api/agents` et `GET /api/agents`. */
export type AgentResponse = {
  id: Uuid
  fullName: string
  email: string
  phone: string | null
  active: boolean
}
