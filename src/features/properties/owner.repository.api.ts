// =============================================================================
// owner.repository.api.ts
// -----------------------------------------------------------------------------
// Implémentation réelle : API Spring Boot `/api/owners` et `/api/owners/mine`.
// `http()` joint le jeton Keycloak (`Authorization: Bearer …`) ; le back-end
// vérifie le rôle CUSTOMER (`@PreAuthorize`) et rattache le propriétaire à
// l'identité lue dans ce jeton — jamais à une donnée envoyée par le navigateur.
// =============================================================================

import { http } from '@/lib/http'
import type { CreateOwnerRequest, OwnerResponse } from './owner.dto'
import type { OwnerRepository } from './owner.repository'

export class OwnerRepositoryApi implements OwnerRepository {
  createOwner(request: CreateOwnerRequest): Promise<OwnerResponse> {
    return http<OwnerResponse>('/api/owners', { method: 'POST', body: JSON.stringify(request) })
  }

  getMyOwners(): Promise<OwnerResponse[]> {
    return http<OwnerResponse[]>('/api/owners/mine')
  }
}
