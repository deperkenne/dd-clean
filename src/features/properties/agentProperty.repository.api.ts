// =============================================================================
// agentProperty.repository.api.ts
// -----------------------------------------------------------------------------
// Implémentation réelle : `GET /api/properties/assigned`.
// `http()` joint le jeton Keycloak ; le back-end lit l'agent dans le jeton et
// ne renvoie que SES logements — aucun identifiant n'est envoyé par le front.
// =============================================================================

import { http } from '@/lib/http'
import type { PropertyResponse } from './owner.dto'
import type { AgentPropertyRepository } from './agentProperty.repository'

export class AgentPropertyRepositoryApi implements AgentPropertyRepository {
  getAssignedProperties(): Promise<PropertyResponse[]> {
    return http<PropertyResponse[]>('/api/properties/assigned')
  }
}
