// =============================================================================
// owner.repository.index.ts
// -----------------------------------------------------------------------------
// Point d'injection unique du OwnerRepository. Les propriétaires passent par
// le vrai back-end : il n'y a pas d'implémentation fictive pour ce domaine.
// =============================================================================

import { OwnerRepositoryApi } from './owner.repository.api'
import type { OwnerRepository } from './owner.repository'

export const ownerRepository: OwnerRepository = new OwnerRepositoryApi()
