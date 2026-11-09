import { RESERVATION_CONFIRMED, type ReservationResponse } from '@/features/reservations/reservation.dto'
import { addDays, formatWeekday, parseIsoDay } from '@/lib/date'
import type { Locale } from '@/lib/i18n'
import type { DepartureDay, DepartureSchedule, ReservationView } from './myReservations.types'
import { toReservationView } from './toReservationView'

/**
 * Une réservation est classée seulement si elle est confirmée ET pas annulée.
 * `cancelledAt` est aussi vérifié : une réservation annulée après coup sort
 * de son jour de départ même si Smoobu n'a pas encore changé son statut.
 */
function isConfirmed(reservation: ReservationResponse): boolean {
  return reservation.status === RESERVATION_CONFIRMED && reservation.cancelledAt === null
}

function byPropertyThenArrival(a: ReservationResponse, b: ReservationResponse): number {
  return a.propertyName.localeCompare(b.propertyName) || a.arrivalDate.localeCompare(b.arrivalDate)
}

/** Un jour de départ nommé (« lundi », « 9 novembre 2026 », aujourd'hui / demain) avec ses réservations. */
export function describeDepartureDay(
  date: string,
  locale: Locale,
  today: string,
  reservations: ReservationView[],
): DepartureDay {
  return {
    date,
    weekday: formatWeekday(date, locale),
    fullDate: new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(
      parseIsoDay(date),
    ),
    relative: date === today ? 'today' : date === addDays(today, 1) ? 'tomorrow' : undefined,
    reservations,
  }
}

/**
 * Classe les réservations confirmées par jour de départ (checkout) : toutes
 * celles qui partent le même jour, quel que soit leur propriétaire, sont
 * réunies sous ce jour, nommé avec son jour de la semaine.
 */
export function groupByDeparture(
  reservations: ReservationResponse[],
  locale: Locale,
  today: string,
): DepartureSchedule {
  const byDay = new Map<string, ReservationResponse[]>()
  for (const reservation of reservations.filter(isConfirmed)) {
    const day = byDay.get(reservation.departureDate) ?? []
    day.push(reservation)
    byDay.set(reservation.departureDate, day)
  }

  const days: DepartureDay[] = [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, list]) =>
      describeDepartureDay(
        date,
        locale,
        today,
        list.sort(byPropertyThenArrival).map((reservation) => toReservationView(reservation, locale)),
      ),
    )

  return {
    upcoming: days.filter((day) => day.date >= today),
    past: days.filter((day) => day.date < today).reverse(),
    total: days.reduce((sum, day) => sum + day.reservations.length, 0),
  }
}
