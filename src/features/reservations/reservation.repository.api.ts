// =============================================================================
// reservation.repository.api.ts
// -----------------------------------------------------------------------------
// Implémentation réelle : `GET /api/reservations/mine`.
// `http()` joint le jeton Keycloak (`Authorization: Bearer …`). Le back-end
// vérifie le rôle (`@PreAuthorize`) puis ne renvoie que les réservations de
// l'appelant (`Caller.of(authentication)`) : un client ne peut pas demander
// celles d'un autre, aucun identifiant n'étant envoyé par le navigateur.
// =============================================================================

import { http } from '@/lib/http'
import type { ReservationResponse } from './reservation.dto'
import type { ReservationRepository } from './reservation.repository'

export class ReservationRepositoryApi implements ReservationRepository {
  getMyReservations(): Promise<ReservationResponse[]> {
    return http<ReservationResponse[]>('/api/reservations/mine')
  }
}
