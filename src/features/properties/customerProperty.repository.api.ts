// =============================================================================
// customerProperty.repository.api.ts
// -----------------------------------------------------------------------------
// Implémentation réelle :
//   GET  /api/properties/mine
//   POST /api/properties/{id}/assign   (logement sans agent)
//   POST /api/properties/{id}/move     (logement déjà attribué)
// `http()` joint le jeton Keycloak ; le back-end vérifie le rôle CUSTOMER et
// que le logement et l'agent appartiennent bien au client du jeton.
// =============================================================================

import { http } from '@/lib/http'
import type { PropertyResponse } from './owner.dto'
import type { AssignAgentRequest } from './propertyAgent.dto'
import type { CustomerPropertyRepository } from './customerProperty.repository'

const agentPath = (propertyId: string, action: 'assign' | 'move') =>
  `/api/properties/${encodeURIComponent(propertyId)}/${action}`

export class CustomerPropertyRepositoryApi implements CustomerPropertyRepository {
  getMyProperties(): Promise<PropertyResponse[]> {
    return http<PropertyResponse[]>('/api/properties/mine')
  }

  assignAgent(propertyId: string, request: AssignAgentRequest): Promise<PropertyResponse> {
    return http<PropertyResponse>(agentPath(propertyId, 'assign'), { method: 'POST', body: JSON.stringify(request) })
  }

  moveToAgent(propertyId: string, request: AssignAgentRequest): Promise<PropertyResponse> {
    return http<PropertyResponse>(agentPath(propertyId, 'move'), { method: 'POST', body: JSON.stringify(request) })
  }
}
