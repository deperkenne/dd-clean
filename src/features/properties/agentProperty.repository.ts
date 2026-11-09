// =============================================================================
// agentProperty.repository.ts
// -----------------------------------------------------------------------------
// Contrat d'accès aux logements vus par un AGENT de ménage. Les hooks passent
// toujours par `agentProperty.repository.index.ts`.
// =============================================================================

import type { PropertyResponse } from './owner.dto'

export interface AgentPropertyRepository {
  /** Logements attribués à l'agent connecté (déduit du jeton par le back-end). */
  getAssignedProperties(): Promise<PropertyResponse[]>
}
