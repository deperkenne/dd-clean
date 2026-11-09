// =============================================================================
// customerProperty.repository.ts
// -----------------------------------------------------------------------------
// Contrat d'accès aux logements du client connecté : la liste, et l'agent de
// ménage attribué à chacun. Les hooks passent toujours par
// `customerProperty.repository.index.ts`.
// =============================================================================

import type { PropertyResponse } from './owner.dto'
import type { AssignAgentRequest } from './propertyAgent.dto'

export interface CustomerPropertyRepository {
  /** Tous les logements du client connecté (déduit du jeton par le back-end). */
  getMyProperties(): Promise<PropertyResponse[]>
  /** Attribue un agent à un logement qui n'en a pas encore. */
  assignAgent(propertyId: string, request: AssignAgentRequest): Promise<PropertyResponse>
  /** Déplace un logement déjà attribué vers un autre agent. */
  moveToAgent(propertyId: string, request: AssignAgentRequest): Promise<PropertyResponse>
}
