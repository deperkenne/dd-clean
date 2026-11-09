import { isoDaySchema } from '@/features/reservations/reservation.schema'
import { useLocale } from '@/hooks/useLocale'
import { todayIsoDay } from '@/lib/date'
import { describeDepartureDay } from './groupByDeparture'
import { useMyReservations } from './useMyReservations'

/**
 * Un jour de départ précis (page « journée »).
 *
 * 1. La date lue dans l'adresse est vérifiée (vrai jour ISO) avant usage.
 * 2. Les réservations viennent de la même requête que la liste
 *    (`GET /api/reservations/mine`, déjà en cache si l'on arrive de la liste) :
 *    même filtrage par le back-end, mêmes règles (confirmées, non annulées).
 * 3. Un jour valide sans départ (ex. réservation annulée depuis) reste
 *    affichable : il est simplement vide.
 */
export function useDepartureDay(date: string) {
  const { locale } = useLocale()
  const { schedule, isLoading, isError, isRetrying, retry } = useMyReservations()
  const isValidDate = isoDaySchema.safeParse(date).success

  const found = [...schedule.upcoming, ...schedule.past].find((day) => day.date === date)
  const day = isValidDate ? (found ?? describeDepartureDay(date, locale, todayIsoDay(), [])) : undefined

  return { day, isInvalidDate: !isValidDate, isLoading, isError, isRetrying, retry }
}
