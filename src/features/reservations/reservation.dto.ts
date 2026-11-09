// =============================================================================
// reservation.dto.ts
// -----------------------------------------------------------------------------
// Réservation telle que renvoyée par `GET /api/reservations/mine` (record Java
// `ReservationResponse`), champ pour champ. Attention : les noms diffèrent de
// l'entité (`bookingReference` = `bookingNumber`, `arrivalDate` = `checkIn`,
// `departureDate` = `checkOut`). Un champ facultatif en base peut valoir `null`.
// =============================================================================

import type { Decimal, IsoDate, IsoInstant, Uuid } from '@/lib/api.types'

/** Statut Smoobu d'une réservation annulée (`Reservation.CANCELLED` côté Java). */
export const RESERVATION_CANCELLED = 'CANCELLED'

/** Statut Smoobu d'une réservation confirmée. */
export const RESERVATION_CONFIRMED = 'CONFIRMED'

export type ReservationResponse = {
  id: number
  /** Buchungsnummer, ex. "6041336634". */
  bookingReference: string
  /** Anreise. */
  arrivalDate: IsoDate
  /** Jour d'arrivée tel qu'écrit dans l'e-mail Smoobu, ex. "Montag". */
  arrivalDay: string | null
  /** Abreise. */
  departureDate: IsoDate
  /** Canal de réservation, ex. "Booking.com", "Airbnb". */
  channel: string | null
  /** Statut Smoobu : `RESERVATION_CONFIRMED`, `RESERVATION_CANCELLED`… */
  status: string | null
  /** Date de la première annulation ; null si la réservation n'est pas annulée. */
  cancelledAt: IsoInstant | null
  /** Prix de la chambre copié au moment de la réservation ; null si la chambre n'est pas connue. */
  price: Decimal | null
  propertyId: Uuid
  propertyName: string
  /** Numéro de la chambre réservée, ou "unique" si l'e-mail Smoobu n'en donne pas. */
  roomNumber: string | null
  /** Numéro client du propriétaire du logement (ex. DD-0001). */
  ownerCustomerId: string
}
