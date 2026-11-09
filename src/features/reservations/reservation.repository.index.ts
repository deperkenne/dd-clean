// =============================================================================
// reservation.repository.index.ts
// -----------------------------------------------------------------------------
// Point d'injection unique du ReservationRepository. Les réservations passent
// par le vrai back-end : pas d'implémentation fictive pour ce domaine.
// =============================================================================

import { ReservationRepositoryApi } from './reservation.repository.api'
import type { ReservationRepository } from './reservation.repository'

export const reservationRepository: ReservationRepository = new ReservationRepositoryApi()
