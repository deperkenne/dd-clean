import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { ReservationResponse } from '@/features/reservations/reservation.dto'
import { reservationRepository } from '@/features/reservations/reservation.repository.index'
import { useLocale } from '@/hooks/useLocale'
import { todayIsoDay } from '@/lib/date'
import { groupByDeparture } from './groupByDeparture'
import type { DepartureSchedule } from './myReservations.types'

/** Clé de cache des réservations du compte connecté (vidée à la déconnexion avec tout le cache). */
export const myReservationsKey = ['reservations', 'mine'] as const

const EMPTY_SCHEDULE: DepartureSchedule = { upcoming: [], past: [], total: 0 }

/**
 * Réservations confirmées du client connecté, classées par jour de départ.
 *
 * `GET /api/reservations/mine` part avec le jeton Keycloak (via le repository et
 * `lib/http.ts`) ; c'est le back-end qui ne renvoie que les réservations de ce
 * client. Le classement est refait à chaque chargement : une réservation
 * annulée depuis disparaît donc d'elle-même de son jour de départ.
 */
export function useMyReservations() {
  const { locale } = useLocale()

  const select = useCallback(
    (reservations: ReservationResponse[]) => groupByDeparture(reservations, locale, todayIsoDay()),
    [locale],
  )

  const query = useQuery({
    queryKey: myReservationsKey,
    queryFn: () => reservationRepository.getMyReservations(),
    select,
  })

  return {
    schedule: query.data ?? EMPTY_SCHEDULE,
    isLoading: query.isPending,
    isError: query.isError,
    isRetrying: query.isError && query.isFetching,
    retry: () => void query.refetch(),
  }
}
