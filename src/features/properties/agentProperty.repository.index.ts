// =============================================================================
// agentProperty.repository.index.ts
// -----------------------------------------------------------------------------
// Point d'injection unique du AgentPropertyRepository (vrai back-end).
// =============================================================================

import { AgentPropertyRepositoryApi } from './agentProperty.repository.api'
import type { AgentPropertyRepository } from './agentProperty.repository'

export const agentPropertyRepository: AgentPropertyRepository = new AgentPropertyRepositoryApi()
