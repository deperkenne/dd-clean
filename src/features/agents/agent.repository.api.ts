// =============================================================================
// agent.repository.api.ts
// -----------------------------------------------------------------------------
// Implémentation réelle : `POST /api/agents` et `GET /api/agents`.
// `http()` joint le jeton Keycloak (`Authorization: Bearer …`) ; le back-end
// vérifie le rôle et ne travaille que sur les agents du client du jeton.
// =============================================================================

import { http } from '@/lib/http'
import type { AgentResponse, CreateAgentRequest } from './agent.dto'
import type { AgentRepository } from './agent.repository'

export class AgentRepositoryApi implements AgentRepository {
  createAgent(request: CreateAgentRequest): Promise<AgentResponse> {
    return http<AgentResponse>('/api/agents', { method: 'POST', body: JSON.stringify(request) })
  }

  getMyAgents(): Promise<AgentResponse[]> {
    return http<AgentResponse[]>('/api/agents')
  }
}
