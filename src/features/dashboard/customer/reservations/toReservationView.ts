import { RESERVATION_CANCELLED, type ReservationResponse } from '@/features/reservations/reservation.dto'
import { formatShortDay, parseIsoDay } from '@/lib/date'
import type { Locale } from '@/lib/i18n'
import type { ReservationView } from './myReservations.types'

/** Valeur envoyée par Smoobu quand l'e-mail ne précise pas de chambre. */
const WHOLE_PROPERTY = 'unique'
const DAY_MS = 24 * 60 * 60 * 1000

function nightsBetween(arrival: string, departure: string): number {
  return Math.round((parseIsoDay(departure).getTime() - parseIsoDay(arrival).getTime()) / DAY_MS)
}

/** Réponse de l'API → réservation affichable (dates, prix et annulation mis en forme). */
export function toReservationView(reservation: ReservationResponse, locale: Locale): ReservationView {
  const { roomNumber, price, cancelledAt } = reservation
  return {
    id: reservation.id,
    bookingReference: reservation.bookingReference,
    channel: reservation.channel ?? undefined,
    propertyId: reservation.propertyId,
    propertyName: reservation.propertyName,
    room: roomNumber === WHOLE_PROPERTY ? 'whole' : (roomNumber ?? undefined),
    ownerCustomerId: reservation.ownerCustomerId,
    arrival: formatShortDay(reservation.arrivalDate, locale),
    departure: formatShortDay(reservation.departureDate, locale),
    nights: nightsBetween(reservation.arrivalDate, reservation.departureDate),
    arrivalDay: reservation.arrivalDay ?? undefined,
    price:
      price === null ? undefined : new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(price),
    cancelled: reservation.status === RESERVATION_CANCELLED || cancelledAt !== null,
    cancelledOn: cancelledAt
      ? new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(new Date(cancelledAt))
      : undefined,
  }
}
