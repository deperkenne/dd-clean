// =============================================================================
// customerProperty.repository.index.ts
// -----------------------------------------------------------------------------
// Point d'injection unique du CustomerPropertyRepository (vrai back-end).
// =============================================================================

import { CustomerPropertyRepositoryApi } from './customerProperty.repository.api'
import type { CustomerPropertyRepository } from './customerProperty.repository'

export const customerPropertyRepository: CustomerPropertyRepository = new CustomerPropertyRepositoryApi()
