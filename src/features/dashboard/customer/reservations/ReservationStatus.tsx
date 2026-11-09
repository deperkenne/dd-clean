import { StatusBadge } from '@/components/common/StatusBadge'
import { useLocalized } from '@/hooks/useLocale'
import { myReservationsContent } from './MyReservations.data'
import type { ReservationView } from './myReservations.types'

/** Badge « Active » ou « Annulée le … » d'une réservation. */
export function ReservationStatus({ reservation }: { reservation: ReservationView }) {
  const t = useLocalized(myReservationsContent)

  if (!reservation.cancelled) return <StatusBadge tone="success">{t.active}</StatusBadge>
  return (
    <StatusBadge tone="muted">
      {reservation.cancelledOn ? t.cancelledOn(reservation.cancelledOn) : t.cancelled}
    </StatusBadge>
  )
}
