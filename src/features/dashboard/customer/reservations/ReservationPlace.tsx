import type { ReservationView } from './myReservations.types'

/** Logement réservé et numéro client de son propriétaire. */
export function ReservationPlace({ reservation }: { reservation: ReservationView }) {
  return (
    <div className="min-w-0">
      <p className="font-medium break-words text-ink">{reservation.propertyName}</p>
      <p className="mt-0.5 text-[13px] break-words text-muted-foreground">
        <span className="font-mono tracking-[0.04em]">{reservation.ownerCustomerId}</span>
      </p>
    </div>
  )
}
