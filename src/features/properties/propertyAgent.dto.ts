// =============================================================================
// propertyAgent.dto.ts
// -----------------------------------------------------------------------------
// Corps de `POST /api/properties/{id}/assign` et `/move` (record Java
// AssignAgentRequest). L'agent doit appartenir au même client que le logement :
// c'est le back-end qui le vérifie.
// =============================================================================

import type { Uuid } from '@/lib/api.types'

export type AssignAgentRequest = {
  agentId: Uuid
}
