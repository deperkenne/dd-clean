// =============================================================================
// agent.repository.index.ts
// -----------------------------------------------------------------------------
// Point d'injection unique du AgentRepository. Les agents passent par le vrai
// back-end : il n'y a pas d'implémentation fictive pour ce domaine.
// =============================================================================

import { AgentRepositoryApi } from './agent.repository.api'
import type { AgentRepository } from './agent.repository'

export const agentRepository: AgentRepository = new AgentRepositoryApi()
