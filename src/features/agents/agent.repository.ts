// =============================================================================
// agent.repository.ts
// -----------------------------------------------------------------------------
// Contrat d'accès aux agents de ménage, indépendant de la source. Les hooks
// passent toujours par `agent.repository.index.ts`.
// =============================================================================

import type { AgentResponse, CreateAgentRequest } from './agent.dto'

export interface AgentRepository {
  /** Crée un agent de ménage rattaché au client connecté (déduit du jeton par le back-end). */
  createAgent(request: CreateAgentRequest): Promise<AgentResponse>
  /** Les agents du client connecté : le back-end filtre d'après le jeton. */
  getMyAgents(): Promise<AgentResponse[]>
}
