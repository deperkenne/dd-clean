// =============================================================================
// owner.repository.ts
// -----------------------------------------------------------------------------
// Contrat d'accès aux propriétaires, indépendant de la source. Les hooks
// passent toujours par `owner.repository.index.ts`, jamais par une
// implémentation directement.
// =============================================================================

import type { CreateOwnerRequest, OwnerResponse } from './owner.dto'

export interface OwnerRepository {
  /** Crée un propriétaire (et, s'ils sont fournis, ses logements et leurs chambres). */
  createOwner(request: CreateOwnerRequest): Promise<OwnerResponse>
  /**
   * Propriétaires du compte connecté. Le filtrage est fait par le back-end à
   * partir du jeton : rien ne désigne le client dans la requête.
   */
  getMyOwners(): Promise<OwnerResponse[]>
}
