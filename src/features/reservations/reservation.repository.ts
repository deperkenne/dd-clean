// =============================================================================
// reservation.repository.ts
// -----------------------------------------------------------------------------
// Contrat d'accès aux réservations, indépendant de la source. Les hooks
// passent toujours par `reservation.repository.index.ts`.
// =============================================================================

import type { ReservationResponse } from './reservation.dto'

export interface ReservationRepository {
  /**
   * Réservations visibles par le compte connecté. Le filtrage est fait par le
   * back-end à partir du jeton : rien ne désigne le client dans la requête.
   */
  getMyReservations(): Promise<ReservationResponse[]>
}
